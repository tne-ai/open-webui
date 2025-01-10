import { onMount } from "svelte";
import type { GraphData, NodeData } from "graphai";
import { NodeState, sleep, isObject } from "graphai";
import type { DataSource } from "graphai/lib/type";

import cytoscape from "cytoscape";
import type { Core, NodeSingular, NodeDefinition, EdgeDefinition, EdgeSingular, Position, EdgeDataDefinition } from "cytoscape";
import klay from "cytoscape-klay";

cytoscape.use(klay);
const layout = "klay";

const colorPriority = "#f80";
const colorStatic = "#88f";

const calcNodeWidth = (label: string) => {
  if (label === null || label === undefined) {
    return "50px";
  }
  return Math.max(50, label.length * 8) + "px";
};

const cyStyle = [
  {
    selector: "node",
    style: {
      "background-color": "data(color)",
      label: "data(id)",
      shape: (ele: NodeSingular) => (ele.data("isStatic") ? "rectangle" : "roundrectangle"),
      width: (ele: EdgeSingular) => calcNodeWidth(ele.data("id")),
      color: "#fff",
      height: "30px",
      "text-valign": "center" as const,
      "text-halign": "center" as const,
      "font-size": "12px",
    },
  },
  {
    selector: "edge",
    style: {
      width: 3,
      "line-color": "#888",
      "target-arrow-color": "#888",
      "target-arrow-shape": "triangle",
      "curve-style": "straight" as const,
      "text-background-color": "#ffffff",
      "text-background-opacity": 0.8,
      "text-background-shape": "rectangle" as const,
      "font-size": "10px",
    },
  },
  {
    selector: "edge[label]",
    style: {
      label: "data(label)",
    },
  },
  {
    selector: "edge[isUpdate]",
    style: {
      color: "#ddd",
      "line-color": "#ddd",
      "line-style": "dashed",
      "curve-style": "unbundled-bezier" as const,
      "target-arrow-color": "#ddd",
    },
  },
  {
    selector: "edge[isResult]",
    style: {
      color: "#d00",
      "line-color": "#d00",
      "line-style": "dotted",
      "curve-style": "unbundled-bezier" as const,
      "target-arrow-color": "#d00",
    },
  },
];

const colorMap = {
  [NodeState.Waiting]: "#888",
  [NodeState.Completed]: "#000",
  [NodeState.Executing]: "#0f0",
  ["executing-server"]: "#FFC0CB",
  [NodeState.Queued]: "#ff0",
  [NodeState.Injected]: "#00f",
  [NodeState.TimedOut]: "#f0f",
  [NodeState.Failed]: "#f00",
  [NodeState.Skipped]: "#0ff",
};

const parseInput = (input: string) => {
  // WARNING: Assuming the first character is always ":"
  const ids = input.slice(1).split(".");
  const source = ids.shift() || "";
  const label = ids.length ? ids.join(".") : undefined;
  return { source, label };
};

export const inputs2dataSources = (inputs: any): string[] => {
  if (Array.isArray(inputs)) {
    return inputs.map((inp) => inputs2dataSources(inp)).flat();
  }
  if (isObject(inputs)) {
    return Object.values(inputs)
      .map((input) => inputs2dataSources(input))
      .flat();
  }
  if (typeof inputs === "string") {
    const templateMatch = Array.from(inputs.matchAll(/\${(:[^}]+)}/g)).map((m) => m[1]);
    if (templateMatch.length > 0) {
      return inputs2dataSources(templateMatch);
    }
  }
  return inputs;
};

export const dataSourceNodeIds = (sources: DataSource[]): string[] => {
  return sources.filter((source: DataSource) => source.nodeId).map((source) => source.nodeId!);
};

const node2cyNode = (node: NodeData, nodeId: string) => {
  const isStatic = !("agent" in node);
  const cyNode = {
    data: {
      id: nodeId,
      color: isStatic ? colorStatic : colorMap[NodeState.Waiting],
      isStatic,
    },
  };
  return cyNode;
};

const node2cyEdge = (node: NodeData, nodeId: string) => {
  const edges: EdgeDefinition[] = [];
  if ("inputs" in node) {
    // computed node
    inputs2dataSources(node.inputs).forEach((input: string) => {
      if (input[0] === ":") {
        const { source, label } = parseInput(input);
        edges.push({
          data: {
            source,
            target: nodeId,
            label,
          },
        });
      }
    });
  }
  if ("update" in node && node.update) {
    // static node
    inputs2dataSources([node.update]).forEach((input: string) => {
      if (input[0] === ":") {
        const { source, label } = parseInput(input);
        edges.push({
          data: {
            source,
            target: nodeId,
            isUpdate: true,
            label,
          },
        });
      }
    });
  }
  return edges;
};

const cytoscapeFromGraph = (_graph_data: GraphData) => {
  const elements: {
    nodes: NodeDefinition[];
    edges: EdgeDefinition[];
    map: Record<string, NodeDefinition>;
  } = { nodes: [], edges: [], map: {} };

  const pushEdge = (data: EdgeDataDefinition) => {
    elements.edges.push({ data });
  };

  const toGraph = (graph_data: GraphData) => {
    Object.keys(graph_data.nodes || {}).forEach((nodeId) => {
      const node: NodeData = graph_data.nodes[nodeId];
      const cyNode = node2cyNode(node, nodeId);
      elements.nodes.push(cyNode);
      elements.map[nodeId] = cyNode;

      node2cyEdge(node, nodeId).forEach((edge) => {
        elements.edges.push(edge);
      });
      // nested
      if ("agent" in node && node.agent === "nestedAgent") {
        const graph = typeof node.graph === "string" ? JSON.parse(node.graph) : { ...node.graph };

        const staticInputs: Record<string, string[]> = Object.keys(graph.nodes)
          .filter((key: string) => !("agent" in graph.nodes[key]))
          .reduce((tmp: Record<string, string[]>, key: string) => {
            if (graph.nodes[key].value[0] === ":") {
              const { source } = parseInput(graph.nodes[key].value);
              if (!tmp[source]) {
                tmp[source] = [];
              }
              tmp[source].push(key);
            }
            return tmp;
          }, {});

        Object.keys(node.inputs).forEach((parentInputNodeId) => {
          if (!graph.nodes[parentInputNodeId]) {
            graph.nodes[parentInputNodeId] = { value: "dummy" };
          }
          inputs2dataSources([node.inputs[parentInputNodeId]]).forEach((input: string) => {
            const { source } = parseInput(input);
            pushEdge({ source: nodeId, target: parentInputNodeId, label: source });
            if (staticInputs[parentInputNodeId]) {
              staticInputs[parentInputNodeId].forEach((id) => {
                pushEdge({ source: nodeId, target: id, label: parentInputNodeId });
              });
            }
          });
        });
        toGraph(graph);
        Object.keys(graph.nodes).forEach((key) => {
          const childNode = graph.nodes[key];
          if ("agent" in childNode && childNode.isResult) {
            pushEdge({ source: key, target: nodeId, label: "result", isResult: true });
          }
        });
      }
    });
  };
  toGraph(_graph_data);

  return { elements };
};

export const useCytoscape = () => {
  let cy: null | Core = null;

  let selectedGraph: GraphData = {};
  let cytoscapeData = { nodes: {} }; // export;
  let cytoscapeRef: HTMLDivElement | null = null;
  let zoomingEnabled = true;

  const updateCytoscape = async (nodeId: string, state: NodeState) => {
    const node = cy.getElementById(nodeId);
    if ([NodeState.Completed, NodeState.Waiting].includes(state)) {
      await sleep(100);
    }
    node.data('color', colorMap[state]);
    const nodeData = (selectedGraph?.nodes ?? {})[nodeId] ?? [];
    if ("agent" in nodeData && state === NodeState.Queued && (nodeData.priority ?? 0) > 0) {
      // computed node
      node.data('color', colorPriority);
    } else if (!("agent" in nodeData) && state === NodeState.Waiting) {
      // static node
      node.data('color', colorPriority);
    }
    if (state === NodeState.Injected) {
      await sleep(100);
      node.data('color', colorStatic);
    }
  };

  const createCytoscape = () => {
    if (cy === null) {
      try {
        cy = cytoscape({
          container: cytoscapeRef,
          style: cyStyle,
          layout: {
            name: layout,
          },
        });
        cy.on("mouseup", storePositions);
        cy.on("touchend", storePositions);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const updateGraphData = async (graphData) => {
    if (selectedGraph.version) {
      resetCytoscape();
    }
    selectedGraph = graphData;
    cytoscapeData = cytoscapeFromGraph(selectedGraph);
    if (cy) {
      cy.elements().remove();
      cy.add(cytoscapeData.elements);
      cy.layout({ name: "klay" }).run();
      cy.fit();
      if (name === layout) {
        await sleep(400);
        storePositions();
      }
    }
  };

  const storePositions = () => {
    console.log("storePositions");
    if (cy) {
      cy.nodes().forEach((cynode: NodeSingular) => {
        const id = cynode.id();
        const pos = cynode.position();
        const node = cytoscapeData.elements.map[id];
        node.position = pos;
      });
    }
  };

  const resetCytoscape = () => {
    const elements = cytoscapeData.elements;
    Object.keys(elements.map).forEach((nodeId) => {
      const nodeData = selectedGraph.nodes[nodeId];
      if (nodeData) {
        elements.map[nodeId].data.color = "agent" in nodeData ? colorMap[NodeState.Waiting] : colorStatic;
      }
    });
    cytoscapeData = { elements };
  };

  const setRef = (tmp) => {
    if (cytoscapeRef === null) {
      cytoscapeRef = tmp;
    }
  };
  
  return {
    setRef,
    createCytoscape,
    updateCytoscape,
    resetCytoscape,
    updateGraphData,
    
    zoomingEnabled,
  };
};
