<script lang="ts">
    export let selectBlock: (e: MouseEvent) => void;
    let element: HTMLButtonElement;
</script>

<button
        class="block selected"
        bind:this={element}
        on:click={selectBlock}
>
    Block
</button>

<style>
    .block {
        width: 200px;
        height: 200px;
        background: #053284;
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        transition: all 0.2s;
        border: none;
        margin: 1rem;
    }

    .block.selected {
        border: 2px solid #fff;
    }

    .block:hover {
        transform: scale(1.05);
    }
</style>
