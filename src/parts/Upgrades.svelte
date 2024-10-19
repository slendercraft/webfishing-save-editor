<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";

  export let save: WebfishingSave;
</script>

<Section title="Upgrades">
  <label for="loanLevel">Loan level</label>
  <input type="number" id="loanLevel" bind:value={save.value.loan_level.value} />

  <label for="loanLeft">Loan left</label>
  <input type="number" id="loanLeft" bind:value={save.value.loan_left.value} />

  <label for="maxBait">Max bait</label>
  <input type="number" id="maxBait" bind:value={save.value.max_bait.value} />

  <label for="buddyLevel">Buddy level</label>
  <input type="number" id="buddyLevel" bind:value={save.value.buddy_level.value} />

  <label for="buddySpeed">Buddy speed</label>
  <input type="number" id="buddySpeed" bind:value={save.value.buddy_speed.value} />

  <label for="rodChance">Rod chance</label>
  <input type="number" id="rodChance" bind:value={save.value.rod_chance.value} />

  <label for="rodLuck">Rod luck</label>
  <input type="number" id="rodLuck" bind:value={save.value.rod_luck.value} />

  <label for="rodPower">Rod power</label>
  <input type="number" id="rodPower" bind:value={save.value.rod_power.value} />

  <label for="rodSpeed">Rod speed</label>
  <input type="number" id="rodSpeed" bind:value={save.value.rod_speed.value} />
</Section>
