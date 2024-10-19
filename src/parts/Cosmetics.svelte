<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import { cosmetics } from "../game/things";
  import { string } from "../lib/godot";

  export let save: WebfishingSave;

  function setCosmetic(id: string, value: boolean) {
    if (save.value.cosmetics_unlocked.value.find((i) => i.value === id)) {
      save.value.cosmetics_unlocked.value = save.value.cosmetics_unlocked.value.filter((i) => i.value !== id);
    } else {
      save.value.cosmetics_unlocked.value.push(string(id));
    }
  }

  function setCosmeticWrapped(id: string, event: Event) {
    setCosmetic(id, (event.target as HTMLInputElement).checked);
  }

  // These are cosmetics the developer gave to their friends with specific Steam IDs
  // These mean something to the people who have them - don't be an asshole
  let blockedCosmetics = [
    "title_stupididiotbaby",
    "title_imnormal",
    "title_bipedalanimaldrawer",
    "pcolor_west",
    "title_lamedev",
    "title_lamedev_real",
    "scolor_midnight_special"
  ];

  const filteredCosmetics = Object.fromEntries(
    Object.entries(cosmetics).filter(([id, cosmetic]) => !blockedCosmetics.includes(id))
  );
</script>

<Section title="Cosmetics">
  {#each Object.entries(filteredCosmetics) as [id, cosmetic]}
    <div>
      <input
        type="checkbox"
        id={`cosmetic-${id}`}
        checked={save.value.cosmetics_unlocked.value.find((i) => i.value === id) != null}
        on:change={(e) => setCosmeticWrapped(id, e)}
      />
      <img src={`/icons/${cosmetic.icon}`} alt={cosmetic.name} class="icon" />
      <label for={`cosmetic-${id}`}>{cosmetic.name}</label>
    </div>
  {/each}
</Section>

<style>
  .icon {
    max-width: 3rem;
  }
</style>
