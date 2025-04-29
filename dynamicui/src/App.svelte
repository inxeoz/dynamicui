<script lang="ts">
  import ColorPicker from 'svelte-awesome-color-picker';
  import { writable } from 'svelte/store';

  const defaultBlock = () => ({
    color: '#053284',
    label: '',
  });

  let blocks = Array.from({ length: 5 }, defaultBlock);
  let selectedId: number | null = null;
  let hex = '#000000';
  let label = '';
  const itemid = writable('');

  // Select a block
  function selectBlock(index: number) {
    if (selectedId === index) {
      selectedId = null;
      itemid.set('');
      return;
    }

    selectedId = index;
    const block = blocks[index];
    hex = block.color;
    label = block.label;
    itemid.set(index.toString());
  }

  // Apply changes to selected block
  function applyChanges() {
    if (selectedId === null) return;
    blocks[selectedId] = {
      ...blocks[selectedId],
      color: hex,
      label,
    };
  }

  // Remove selected block
  function removeSelectedBlock() {
    if (selectedId === null) return;
    blocks = blocks.filter((_, i) => i !== selectedId);
    selectedId = null;
    hex = '#000000';
    label = '';
    itemid.set('');
  }

  // Add a new block
  function addBlock() {
    blocks = [...blocks, defaultBlock()];
  }

  // Drag-and-drop logic
  let draggedIndex: number | null = null;

  function onDragStart(index: number) {
    draggedIndex = index;
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(index: number) {
    if (draggedIndex === null || draggedIndex === index) return;

    const updatedBlocks = [...blocks];
    const [removed] = updatedBlocks.splice(draggedIndex, 1);
    updatedBlocks.splice(index, 0, removed);

    blocks = updatedBlocks;
    draggedIndex = null;
  }
</script>

<div class="toolbox">
  <div class="controls">
    <ColorPicker bind:hex position="responsive" />
    <input type="text" bind:value={label} placeholder="Label" class="label-input" />
    <button on:click={applyChanges} disabled={selectedId === null}>Apply Changes</button>
    <button on:click={removeSelectedBlock} disabled={selectedId === null}>Remove Selected</button>
    <button on:click={addBlock}>+ Add Block</button>
  </div>

  <div class="main">
    {#each blocks as block, index (index)}
      <div
              class="block {selectedId === index ? 'selected' : ''}"
              style="background-color: {block.color};"
              draggable="true"
              on:click={() => selectBlock(index)}
              on:dragstart={() => onDragStart(index)}
              on:dragover={onDragOver}
              on:drop={() => onDrop(index)}
      >
        {block.label}
      </div>
    {/each}
  </div>
</div>

<style>
  .toolbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1.5rem;
  }

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

  .main {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 2rem;
    background: #1d566b;
    min-height: 200px;
    width: 100%;
    max-width: 800px;
    justify-content: center;
    resize: both;
    overflow: auto;
  }

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
