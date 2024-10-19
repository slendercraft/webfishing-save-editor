<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { lures, baits } from "../game/lure";
  import { string } from "../lib/godot";
  import { iconsDir } from "../lib/site";

  export let save: WebfishingSave;

  function setLure(id: string, value: boolean) {
    if (save.value.lure_unlocked.value.find((i) => i.value === id)) {
      save.value.lure_unlocked.value = save.value.lure_unlocked.value.filter((i) => i.value !== id);
    } else {
      save.value.lure_unlocked.value.push(string(id));
    }
  }

  function setLureWrapped(id: string, event: Event) {
    setLure(id, (event.target as HTMLInputElement).checked);
  }

  function setBait(id: string, value: boolean) {
    if (save.value.bait_unlocked.value.find((i) => i.value === id)) {
      save.value.bait_unlocked.value = save.value.bait_unlocked.value.filter((i) => i.value !== id);
    } else {
      save.value.bait_unlocked.value.push(string(id));
    }
  }

  function setBaitWrapped(id: string, event: Event) {
    setBait(id, (event.target as HTMLInputElement).checked);
  }
</script>

<Section title="Baits & lures">
  {#each Object.keys(baits) as bait, i}
    <div>
      <input
        type="checkbox"
        id={`bait-${bait}`}
        checked={save.value.bait_unlocked.value.find((l) => l.value === bait) != null}
        on:change={(e) => setBaitWrapped(bait, e)}
      />
      <img src={`${iconsDir}/${baits[bait].icon}`} alt={baits[bait].name} class="icon" />
      <label for={`bait-${bait}`}>{baits[bait].name}</label>
    </div>
  {/each}

  {#each Object.keys(lures) as lure, i}
    <div>
      <input
        type="checkbox"
        id={`lure-${lure}`}
        checked={save.value.lure_unlocked.value.find((l) => l.value === lure) != null}
        on:change={(e) => setLureWrapped(lure, e)}
      />
      <img src={`${iconsDir}/${lures[lure].icon}`} alt={lures[lure].name} class="icon" />
      <label for={`lure-${lure}`}>{lures[lure].name}</label>
    </div>
  {/each}
</Section>

<style>
  .icon {
    max-width: 3rem;
  }
</style>
