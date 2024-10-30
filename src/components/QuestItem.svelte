<script lang="ts">
  export let quest: {
    title: string;
    tier: number;
    action: string;
    gold_reward: number;
    xp_reward: number;
    rewards: { value: string; flags?: number }[];
    goal_id: string;
    icon: string;
    progress: number;
    max_level: number;
    hidden: boolean;
    goal_amt: number;
    goal_array: { value: number; flags?: number }[];
    flags: number[];
  };
  export let questId: string;
  export let updateProgress: (progress: number) => void;
  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    updateProgress(parseInt(input.value, 10));
  }
</script>

<fieldset class="questItem">
  <div class="questDetails">
    <span class="questTitle">{quest.title}</span>
    <p>Action: {quest.action}</p>
    <p>Goal: {quest.goal_amt}</p>
    <p>Progress: {quest.progress} / {quest.goal_amt}</p>
  </div>

  <div class="questControls">
    <label for={`quest-progress-${questId}`}>Edit Progress:</label>
    <input
      type="number"
      on:input={handleInput}
      bind:value={quest.progress}
      min="0"
      max={quest.goal_amt}
      on:input={handleInput}
    />
  </div>
</fieldset>
