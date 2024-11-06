<script lang="ts">
  import type { WebfishingSave } from "./game/types";
  import type { ComponentType, SvelteComponent } from "svelte";

  import Player from "./parts/Player.svelte";
  import Upgrades from "./parts/Upgrades.svelte";
  import Inventory from "./parts/Inventory.svelte";
  import Cosmetics from "./parts/Cosmetics.svelte";
  import Journal from "./parts/Journal.svelte";
  import Lures from "./parts/Lures.svelte";

  export let save: WebfishingSave;

  const sections: ComponentType<SvelteComponent<{ save: WebfishingSave }>>[] = [
    Player,
    Upgrades,
    Inventory,
    Cosmetics,
    Journal,
    Lures
  ];
</script>

{#each sections as Section, i}
  <Section {save} />
{/each}
