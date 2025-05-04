<script lang="ts">
    import { selected_id } from "./store";
    import Ublock from "./Ublock.svelte";

    // Track created blocks
    const blocks = new Map<string, { element: HTMLElement; instance?: Ublock }>();
    let mainDiv: HTMLDivElement;

    function selectBlock(e: MouseEvent) {
        const target = e.currentTarget as HTMLElement;
        let div_id = target.id;

        if (!div_id) {
            div_id = crypto.randomUUID();
            target.id = div_id;
        }

        if (div_id === $selected_id) {
            selected_id.set('');
            target.style.background = '#053284';
        } else {
            selected_id.set(div_id);
            target.style.background = '#f25757';
        }
    }

    function addBlock() {
        const target = $selected_id ? document.getElementById($selected_id) : mainDiv;
        if (!target) return;

        const id = crypto.randomUUID();
        const container = document.createElement('div');

        // Mount new Ublock component
        const instance = new Ublock({
            target: container,
            props: { selectBlock }
        });

        container.id = id;
        container.style.background = '#e32b2b'
        target.appendChild(container);
        blocks.set(id, { element: container, instance });
    }
</script>

<div class="main" id="main" bind:this={mainDiv}>
    <div class="toolbar center">
        <button class="add_block" on:click={addBlock}>
            Add Block
        </button>
    </div>

    <!-- Initial block -->
    <Ublock {selectBlock} />
</div>

<style>
    .main {
        width: 100vw;
        height: 100vh;
        background: #1b334a;
        justify-content: space-around;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .toolbar {
        height: 100px;
        width: 500px;
        background: #3172b5;
    }
</style>
