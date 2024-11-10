<script lang="ts">
  import type { WebfishingSave } from "../game/types";
  import things from "../game/things";
  import { GodotVariantType, type GodotString } from "../lib/types";
  import { dictWithoutSpecial } from "../game/util";
  import { array, string } from "../lib/godot";

  export let save: WebfishingSave;

  const fallbackCosm: Record<string, string | string[]> = {
    species: "species_cat",
    pattern: "pattern_none",
    primary_color: "pcolor_white",
    secondary_color: "scolor_tan",
    hat: "hat_none",
    undershirt: "shirt_none",
    overshirt: "overshirt_none",
    title: "title_rank_1",
    bobber: "bobber_default",
    eye: "eye_halfclosed",
    nose: "nose_cat",
    mouth: "mouth_default",
    accessory: [],
    tail: "tail_cat",
    legs: "legs_none"
  };

  function checkCorrupt() {
    const journalFish = Object.values(dictWithoutSpecial(save.value.journal.value))
      .map((x) => Object.keys(x.value))
      .flat()
      .filter((x) => !x.startsWith("__saveEditor"));
    if (journalFish.some((x) => !(x in things))) {
      console.log(
        "Corrupt save from journalFish",
        journalFish.filter((x) => !(x in things))
      );
      return true;
    }

    const cosmeticsEquipped = Object.values(dictWithoutSpecial(save.value.cosmetics_equipped.value))
      .map((x) => (x.$type === GodotVariantType.String ? [x] : x.value) as GodotString[])
      .flat()
      .map((x) => x.value);
    if (cosmeticsEquipped.some((x) => !(x in things))) {
      console.log(
        "Corrupt save from cosmeticsEquipped",
        cosmeticsEquipped.filter((x) => !(x in things))
      );
      return true;
    }

    const cosmeticsUnlocked = save.value.cosmetics_unlocked.value.map((x) => x.value).flat();
    if (cosmeticsUnlocked.some((x) => !(x in things))) {
      console.log(
        "Corrupt save from cosmeticsUnlocked",
        cosmeticsUnlocked.filter((x) => !(x in things))
      );
      return true;
    }

    return false;
  }

  let isCorrupt = checkCorrupt();

  function fixCorrupt() {
    for (const [key, value] of Object.entries(save.value.journal.value)) {
      if (key.startsWith("__saveEditor")) continue;

      for (const [key2, value2] of Object.entries(value.value)) {
        if (key2.startsWith("__saveEditor")) continue;
        if (!(key2 in things)) {
          console.log(`Deleting ${key2} from journal`);
          delete value.value[key2];
        }
      }
    }

    const untypedCosmeticsEquipped: Record<any, any> = save.value.cosmetics_equipped.value;
    for (const [key, value] of Object.entries(save.value.cosmetics_equipped.value)) {
      if (key.startsWith("__saveEditor")) continue;

      if (value.$type === GodotVariantType.String) {
        if (!(value.value in things)) {
          console.log(`Deleting ${value.value} from equipped cosmetics`);
          const fallback = fallbackCosm[key];
          untypedCosmeticsEquipped[key] = Array.isArray(fallback) ? array(fallback.map(string)) : string(fallback);
        }
      } else {
        const cloned = [...value.value];

        for (let i = 0; i < cloned.length; i++) {
          const item = cloned[i];
          if (!(item.value in things)) {
            console.log(`Deleting ${item.value} from equipped cosmetics`);
            value.value.splice(value.value.indexOf(item), 1);
          }
        }
      }
    }

    const cloned = [...save.value.cosmetics_unlocked.value];
    for (let i = 0; i < cloned.length; i++) {
      const item = cloned[i];
      if (!(item.value in things)) {
        console.log(`Deleting ${item.value} from unlocked cosmetics`);
        save.value.cosmetics_unlocked.value.splice(save.value.cosmetics_unlocked.value.indexOf(item), 1);
      }
    }

    isCorrupt = false;
  }
</script>

{#if isCorrupt}
  <article>
    <header>Potentially corrupt save</header>
    <p>
      Your save seems to be corrupted. Clicking the button below will attempt to fix the save by removing the corrupted
      content.
    </p>
    <p>
      This may be a false positive triggered by new game content, or a broken mod that wrote into your save. If the game
      just updated and you see this error without having used mods before, leave an issue on the GitHub repository.
    </p>
    <footer>
      <button on:click={fixCorrupt}>Fix</button>
    </footer>
  </article>
  <h2>Potentially Corrupt Save</h2>
{/if}
