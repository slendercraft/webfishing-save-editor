<script lang="ts">
  import type { JournalItem } from "../game/types";
  import { items } from "../game/things";
  import { int } from "../lib/godot";
  import { iconsDir } from "../lib/site";

  export let id: string;
  export let item: JournalItem;

  const rarities = ["Normal", "Shining", "Glistening", "Opulent", "Radiant", "Alpha"];

  function setRarity(rarity: number) {
    if (item.quality.value.find((q) => q.value === rarity)) {
      item.quality.value = item.quality.value.filter((q) => q.value !== rarity);
    } else {
      item.quality.value.push(int(rarity));
    }
  }

  function updateCount(event: Event) {
    const target = event.target as HTMLInputElement;
    item.count.value = parseInt(target.value, 10) || 0; // Ensure count is a valid number
  }
</script>

<fieldset class="grid journalItem">
  <div class="journalItemName">
    <img src={`${iconsDir}/${items[id].icon}`} alt={items[id].name} />
    <span>{items[id].name}</span>
  </div>

  <!-- Rarity selection -->
  <div>
    {#each [0, 1, 2, 3, 4, 5] as rarity}
      <div>
        <input
          type="checkbox"
          id={`journalItem-${id}-quality-${rarity}`}
          checked={item.quality.value.find((q) => q.value === rarity) != null}
          on:change={() => setRarity(rarity)}
        />
        <label for={`journalItem-${id}-quality-${rarity}`}>
          {rarities[rarity]}
        </label>
      </div>
    {/each}
  </div>

  <!-- Record display -->
  <div>
    <label for={`journalItem-${id}-record`}>Record</label>
    <input type="number" bind:value={item.record.value} id={`journalItem-${id}-record`} />
  </div>

  <!-- Count editing -->
  <div>
    <label for={`journalItem-${id}-count`}>Amount Caught</label>
    <input
      type="number"
      id={`journalItem-${id}-count`}
      bind:value={item.count.value}
      on:input={updateCount}
      min="0"
    />
  </div>
</fieldset>

<style>
  .journalItem {
    align-items: center;
  }

  .journalItemName {
    display: flex;
    align-items: center;
    margin-bottom: var(--pico-spacing);
    gap: var(--pico-spacing);
  }

  .journalItemName img {
    max-height: 1.5rem;
    aspect-ratio: 1 / 1;
  }
</style>
