<script lang="ts">
    export let block: { color: string, label: string, height: string, width: string};
    export let isSelected: boolean;
    export let selectBlock: (e: MouseEvent) => void;


</script>

<button
        class="block {isSelected ? 'selected' : ''}"
        style="background-color: {block.color}; --height: {block.height}; --width: {block.width};"
        on:click={selectBlock}
>
    {block.label}
</button>

<style>
    .block {
        width: var(--width);
        height: var(--height);
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
