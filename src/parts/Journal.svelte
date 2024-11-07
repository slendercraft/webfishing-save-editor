<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import Section from "../components/Section.svelte";
  import JournalSection from "../components/JournalSection.svelte";

  export let save: WebfishingSave;

  const sections = Object.keys(save.value.journal.value).filter((x) => !x.startsWith("_"));
  const sectionNames: Record<string, string> = {
    lake: "Lake",
    ocean: "Ocean",
    rain: "Rain",
    water_trash: "Trash",
    alien: "Alien",
    void: "Void"
  };
</script>

<Section title="Journal">
  <div class="indented">
    {#each sections as key}
      <Section title={sectionNames[key] ?? key}>
        <JournalSection {save} sectionName={key} />
      </Section>
    {/each}
  </div>
</Section>

<style>
  .indented {
    margin-left: 1rem;
  }
</style>
