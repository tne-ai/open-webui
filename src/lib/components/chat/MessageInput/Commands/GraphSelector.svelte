<script>
    import { createEventDispatcher } from 'svelte';
    import * as graphDataSet from '../../Agents/iterative_analysis';
    import { selectedGraph } from '$lib/stores/index';
  	import { get } from 'svelte/store';

    const dispatch = createEventDispatcher();
  
    export let command = '';
    export const graphNames = Object.keys(graphDataSet);
  
    let selectedIndex = 0;
  
    $: filteredGraphs = graphNames.filter(name => 
      name.toLowerCase().includes(command.slice(1).toLowerCase())
    );
  
    export const selectUp = () => {
      if (selectedIndex > 0) {
        selectedIndex--;
      }
    };
  
    export const selectDown = () => {
      if (selectedIndex < filteredGraphs.length - 1) {
        selectedIndex++;
      }
    };

  </script>
  
  <div
    id="commands-container"
    class="px-2 mb-2 text-left w-full absolute bottom-0 left-0 right-0 z-10"
  >
    <div class="flex w-full rounded-xl border border-gray-50 dark:border-gray-850">
      <div
        class="max-h-60 overflow-y-auto flex flex-col w-full rounded-xl bg-white dark:bg-gray-900 dark:text-gray-100"
      >
        {#each filteredGraphs as graph, index}
        <button
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left flex items-center gap-2 {index === selectedIndex ? 'selected-command-option-button bg-gray-100 dark:bg-gray-700' : ''}"
          on:click={() => {
            selectedGraph.set(graph);
            dispatch('select', {
              type: 'graph',
              data: graph
            });
          }}
        >
          {graph}
        </button>
        {/each}
      </div>
    </div>
  </div>