<script lang="ts">
    import { writable } from 'svelte/store';
    import ColorPicker from 'svelte-awesome-color-picker';
    import {hex_color} from "./store";

    export let hex: string;
    export let label: string;
    export let selectedId: number | null;
    export let applyChanges: () => void;
    export let removeSelectedBlock: () => void;
    export let addBlock: () => void;

    $: hex_color.set(hex);


</script>

<div class="controls">
    <ColorPicker bind:hex position="responsive" />
    <input type="text" bind:value={label} placeholder="Label" class="label-input" />
    <button on:click={applyChanges} disabled={selectedId === null}>Apply Changes</button>
    <button on:click={removeSelectedBlock} disabled={selectedId === null}>Remove Selected</button>
    <button on:click={addBlock}>+ Add Block</button>
</div>

<style>
    .controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .label-input {
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        background: #333;
        color: white;
        border: none;
        transition: background 0.3s;
    }

    button:disabled {
        background: #888;
        cursor: not-allowed;
    }
</style>
