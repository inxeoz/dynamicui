<script lang="ts">
    export let block: { color: string, label: string };
    export let index: number;
    export let isSelected: boolean;
    export let selectBlock: (index: number) => void;
    export let onDragStart: (index: number) => void;
    export let onDragOver: (event: DragEvent) => void;
    export let onDrop: (index: number) => void;
</script>

<div
        class="block {isSelected ? 'selected' : ''}"
        style="background-color: {block.color};"
        draggable="true"
        on:click={() => selectBlock(index)}
        on:dragstart={() => onDragStart(index)}
        on:dragover={onDragOver}
        on:drop={() => onDrop(index)}
>
    {block.label}
</div>

<style>
    .block {
        width: 100px;
        height: 100px;
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        transition: transform 0.2s, border 0.2s;
        border: none;
        resize: both;
        overflow: hidden;
    }

    .block.selected {
        border: 2px solid #fff;
    }

    .block:hover {
        transform: scale(1.05);
    }
</style>
