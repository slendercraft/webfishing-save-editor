<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import JournalItem from "./JournalItem.svelte";

  export let save: WebfishingSave;
  export let sectionName: string;

  let typedSectionName = sectionName as keyof WebfishingSave["value"]["journal"]["value"];
  let section = save.value.journal.value[typedSectionName];

  const keys = Object.keys(section.value).filter((key) => !key.startsWith("_"));
</script>

{#each keys as key}
  <JournalItem id={key} item={section.value[key].value} />
{/each}
