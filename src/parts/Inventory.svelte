<script lang="ts">
  import type { InventoryItem, WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { randi } from "../game/util";
  import { string, int, real, array, customDict } from "../lib/godot";
  import Item from "../components/Item.svelte";

  export let save: WebfishingSave;

  function addItem() {
    const item: InventoryItem = {
      id: string("fishing_rod_simple"),
      quality: int(0),
      ref: int(randi()),
      size: real(1),
      tags: array([])
    };
    save.value.inventory.value.push(customDict(item));
    save = save;
  }

  function removeItem(ref: number) {
    save.value.inventory.value = save.value.inventory.value.filter((item) => item.value.ref.value !== ref);

    // Clear hotbar - this type sucks lol
    const hotbarSlots = [
      save.value.hotbar.value["0"],
      save.value.hotbar.value["1"],
      save.value.hotbar.value["2"],
      save.value.hotbar.value["3"],
      save.value.hotbar.value["4"]
    ];
    for (const slot of hotbarSlots) {
      if (slot.value === ref) {
        slot.value = 0;
      }
    }

    // Clear aqua fish
    if (save.value.saved_aqua_fish.value.ref.value === ref) {
      save.value.saved_aqua_fish.value.ref.value = 0;
    }

    save = save;
  }
</script>

<Section title="Inventory">
  {#each save.value.inventory.value as item, i (item)}
    <Item {i} {item} on:explode={() => removeItem(item.value.ref.value)} />

    {#if i < save.value.inventory.value.length - 1}
      <hr />
    {/if}
  {/each}

  <button on:click={addItem}>Add item</button>
</Section>
