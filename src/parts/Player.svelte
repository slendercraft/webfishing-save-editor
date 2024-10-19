<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";

  export let save: WebfishingSave;
</script>

<Section title="Player">
  <div>
    <label for="money">Money</label>
    <input type="number" bind:value={save.value.money.value} id="money" />
  </div>

  <div>
    <label for="level">Level</label>
    <input type="number" bind:value={save.value.level.value} id="level" />
  </div>

  <div>
    <label for="exp">Experience</label>
    <input type="number" bind:value={save.value.xp.value} id="exp" />
  </div>

  <div>
    <label for="fishCaught">Fish caught</label>
    <input type="number" bind:value={save.value.fish_caught.value} id="fishCaught" />
  </div>
</Section>
