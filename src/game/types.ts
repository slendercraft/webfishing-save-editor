import type {
  GodotString,
  GodotInt,
  GodotReal,
  GodotArray,
  GodotCustomDictionary,
  GodotCustomArray,
  GodotVector2,
  GodotBool,
  GodotNumber
} from "../lib/types";

export type InventoryItem = {
  id: GodotString;
  quality: GodotInt;
  ref: GodotInt;
  size: GodotReal;
  tags: GodotArray; // TODO
};
export type JournalItem = {
  count: GodotInt;
  quality: GodotCustomArray<GodotInt[]>; // TODO
  record: GodotReal;
};
export type JournalEntry = GodotCustomDictionary<Record<string, GodotCustomDictionary<JournalItem>>>;

export type WebfishingSave = GodotCustomDictionary<{
  bait_inv: GodotCustomDictionary<Record<string, GodotInt>>;
  bait_selected: GodotString;
  bait_unlocked: GodotCustomArray<GodotString[]>;
  buddy_level: GodotInt;
  buddy_speed: GodotInt;
  cash_total: GodotInt;
  cosmetics_equipped: GodotCustomDictionary<{
    accessory: GodotCustomArray<GodotString[]>;
    bobber: GodotString;
    eye: GodotString;
    hat: GodotString;
    legs: GodotString;
    mouth: GodotString;
    nose: GodotString;
    overshirt: GodotString;
    pattern: GodotString;
    primary_color: GodotString;
    secondary_color: GodotString;
    species: GodotString;
    tail: GodotString;
    title: GodotString;
    undershirt: GodotString;
  }>;
  cosmetics_unlocked: GodotCustomArray<GodotString[]>;
  fish_caught: GodotInt;
  guitar_shapes: GodotCustomArray<GodotCustomArray<GodotInt>[]>;
  hidden_players: GodotArray; // TODO
  hotbar: GodotCustomDictionary<{
    "0": GodotInt;
    "1": GodotInt;
    "2": GodotInt;
    "3": GodotInt;
    "4": GodotInt;
  }>;
  inbound_mail: GodotArray; // TODO
  inventory: GodotCustomArray<GodotCustomDictionary<InventoryItem>[]>;
  journal: GodotCustomDictionary<{
    alien: JournalEntry;
    lake: JournalEntry;
    ocean: JournalEntry;
    rain: JournalEntry;
    water_trash: JournalEntry;
  }>;
  level: GodotInt;
  loan_left: GodotInt;
  loan_level: GodotInt;
  lure_selected: GodotString;
  lure_unlocked: GodotCustomArray<GodotString[]>;
  max_bait: GodotInt;
  money: GodotInt;
  muted_players: GodotArray; // TODO
  new_cosmetics: GodotArray; // TODO
  player_options: GodotCustomDictionary<{
    fps_limit: GodotInt;
    fullscreen: GodotInt;
    key_rebindings: GodotArray; // TODO
    main_vol: GodotReal;
    mouse_invert: GodotInt;
    mouse_sens: GodotReal;
    music_vol: GodotReal;
    pixel: GodotInt;
    punchable: GodotInt;
    res: GodotVector2;
    resizeable: GodotInt;
    sfx_vol: GodotReal;
    view_distance: GodotInt;
    vsync: GodotInt;
    water: GodotInt;
  }>;
quests: GodotCustomDictionary<
    Record<
      string,
      GodotCustomDictionary<{
        action: GodotString;
        goal_amt: GodotInt;
        goal_array: GodotCustomArray<GodotInt[]>;
        goal_id: GodotString;
        gold_reward: GodotReal;
        hidden: GodotBool;
        icon: GodotString;
        max_level: GodotInt;
        progress: GodotInt;
        rewards: GodotCustomArray<GodotString[]>;
        tier: GodotInt;
        title: GodotString;
        xp_reward: GodotReal;
        flags?: GodotCustomArray<GodotString[]>; // Ensure flags is always present
      }>
    >
  >;
  recorded_time: GodotCustomDictionary<{
    hour: GodotNumber;
    minute: GodotNumber;
    second: GodotNumber;
  }>;
  rod_chance: GodotInt;
  rod_luck: GodotInt;
  rod_power: GodotInt;
  rod_speed: GodotInt;
  saved_aqua_fish: GodotCustomDictionary<InventoryItem>;
  saved_tags: GodotCustomArray<GodotString[]>;
  shop: GodotArray; // TODO
  version: GodotReal;
  voice_pitch: GodotReal;
  voice_speed: GodotReal;
  xp: GodotReal;
}>;

export enum Category {
  Species = "species",
  Accessory = "accessory",
  Bobber = "bobber",
  Eye = "eye",
  Hat = "hat",
  Legs = "legs",
  Mouth = "mouth",
  Nose = "nose",
  Overshirt = "overshirt",
  Pattern = "pattern",
  PrimaryColor = "primary_color",
  SecondaryColor = "secondary_color",
  Tail = "tail",
  Title = "title",
  Undershirt = "undershirt",
  Fish = "fish",
  None = "none",
  Tool = "tool",
  Furniture = "furniture"
}

export type Thing = {
  name: string;
  category: `${Category}`;
  icon: string;
};

export type Things = Record<string, Thing>;
