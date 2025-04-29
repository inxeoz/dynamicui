<script lang="ts">
  import { writable } from 'svelte/store';
  import ToolboxControls from './ToolboxControls.svelte';
  import Block from './Block.svelte';
  import {hex_color} from "./store";

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
      color: $hex_color,
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
  <ToolboxControls
          {hex}
          {label}
          {selectedId}
          {applyChanges}
          {removeSelectedBlock}
          {addBlock}
  />

  <div class="main">
    {#each blocks as block, index (index)}
      <Block
              {block}
              {index}
              isSelected={selectedId === index}
              selectBlock={selectBlock}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
      />
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
</style>
