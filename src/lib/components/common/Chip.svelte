<script>
    export let label = '';
    export let onRemove = () => {};
</script>

<div class="mdc-chip" role="row">
<div class="mdc-chip__ripple"></div>
<span role="gridcell">
    <span role="button" tabindex="0" class="mdc-chip__primary-action">
    <span class="mdc-chip__text">{label}</span>
    </span>
</span>
{#if onRemove}
    <span role="gridcell">
    <button 
        class="mdc-chip__icon mdc-chip__icon--trailing" 
        tabindex="-1"
        on:click={onRemove}
    >
        <svg class="h-4 w-4" viewBox="0 0 24 24">
        <path 
            fill="currentColor" 
            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        />
        </svg>
    </button>
    </span>
{/if}
</div>

<style>
.mdc-chip {
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    height: 28px;
    border-radius: 14px;
    background-color: #e0e0e0;
    color: rgba(0, 0, 0, 0.87);
    font-size: 13px;
}

.mdc-chip__text {
    margin: 0 4px;
}

.mdc-chip__icon--trailing {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 18px;
    height: 18px;
    border: none;
    background: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
}

:global(.dark) .mdc-chip {
    background-color: #3b3b3b;
    color: rgba(255, 255, 255, 0.87);
}

:global(.dark) .mdc-chip__icon--trailing {
    color: rgba(255, 255, 255, 0.54);
}
</style>