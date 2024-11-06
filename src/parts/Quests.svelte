<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import QuestItem from "../components/QuestItem.svelte";
  import Section from "../components/Section.svelte";
  import type { GodotCustomDictionary, GodotCustomArray, GodotString, GodotInt, GodotReal, GodotBool } from "../lib/types";

  export let save: WebfishingSave;

  // Extract quests, ensuring nested value types are handled properly
  let quests = save.value.quests.value;
  const questKeys = Object.keys(quests).filter((key) => !key.startsWith("_"));

  // Helper function to safely access title and other fields in a quest
  const getQuestTitle = (questKey: string) => {
    return quests[questKey]?.value?.title?.value || "Untitled Quest";
  };

  const getQuest = (questKey: string) => {
    const quest = quests[questKey]?.value;

    return {
      title: quest?.title?.value || "",
      tier: quest?.tier?.value || 0,
      action: quest?.action?.value || "",
      gold_reward: quest?.gold_reward?.value || 0,
      xp_reward: quest?.xp_reward?.value || 0,
      rewards: quest?.rewards?.value || [],
      goal_id: quest?.goal_id?.value || "",
      icon: quest?.icon?.value || "",
      progress: quest?.progress?.value || 0,
      max_level: quest?.max_level?.value || 0,
      hidden: quest?.hidden?.value || false,
      goal_amt: quest?.goal_amt?.value || 0,
      goal_array: quest?.goal_array?.value || [],
      flags: Array.isArray(quest?.flags?.value) ? quest.flags.value.map(flag => Number(flag.value)) : []
    };
  };

  // Helper function to update quest progress
  const updateQuestProgress = (questKey: string, progress: number) => {
    // Ensure quest exists before updating progress
    if (quests[questKey]) {
      quests[questKey].value.progress.value = progress;
    }
  };
</script>

<Section title="Quests">
  <div class="questsContainer">
    {#each questKeys as questKey}
      <!-- Explicitly cast each quest entry to match the expected type -->
      <Section title={getQuestTitle(questKey)}>
        <QuestItem
          updateProgress={(progress) => updateQuestProgress(questKey, progress)}
          quest={getQuest(questKey)}
          questId={questKey}
        />
      </Section>
    {/each}
  </div>
</Section>

<style>
  .questsContainer {
    margin-left: 1rem;
  }
</style>
