// From LURE_DATA in playerdata.gd

type Bait = {
  icon: string;
  name: string;
  desc: string;
  cost: number;
};

type Lure = {
  icon: string;
  name: string;
  desc: string;
  effect_id: string;
};

export const baits: Record<string, Bait> = {
  worms: {
    icon: "bait_icons2.png",
    name: "Worms",
    desc: "Low Quality Cheap Bait\nCatches Low Tier fish only",
    cost: 0
  },
  cricket: {
    icon: "bait_icons3.png",
    name: "Crickets",
    desc: "Standard Quality Cheap Bait\nCatches all Tiers of fish\nLow chance of finding SHINING fish",
    cost: 20
  },
  leech: {
    icon: "bait_icons4.png",
    name: "Leeches",
    desc: "Above Standard Quality Bait\nCatches all Tiers of fish\nLow chance of finding GLISTENING fish",
    cost: 50
  },
  minnow: {
    icon: "bait_icons5.png",
    name: "Minnows",
    desc: "High Quality Bait\nCatches all Tiers of fish\nLow chance of finding OPULENT fish",
    cost: 100
  },
  squid: {
    icon: "bait_icons6.png",
    name: "Squid",
    desc: "Very High Quality Bait\nCatches all Tiers of fish\nLow chance of finding RADIANT fish",
    cost: 200
  },
  nautilus: {
    icon: "bait_icons7.png",
    name: "Nautiluses",
    desc: "Pristine Quality Bait\nCatches all Tiers of fish\nLow chance of finding ALPHA fish",
    cost: 500
  }
};

export const lures: Record<string, Lure> = {
  fly_hook: {
    icon: "bait_icons10.png",
    name: "Fly Hook",
    desc: "Catches have a higher chance of being smaller fish",
    effect_id: "small"
  },
  lucky_hook: {
    icon: "bait_icons11.png",
    name: "Lucky Hook",
    desc: "Gain a small amount of cash on every catch",
    effect_id: "lucky"
  },
  patient_lure: {
    icon: "bait_icons12.png",
    name: "Patient Lure",
    desc: "Catches wait for your input before beginning to reel in",
    effect_id: "patient"
  },
  quick_jig: {
    icon: "bait_icons13.png",
    name: "Quick Jig",
    desc: "Reel Quicker and gain Rod Power",
    effect_id: "quick"
  },
  salty_lure: {
    icon: "bait_icons19.png",
    name: "Salty Lure",
    desc: "Always catch Saltwater fish, no matter the body of water.",
    effect_id: "salty"
  },
  fresh_lure: {
    icon: "bait_icons21.png",
    name: "Fresh Lure",
    desc: "Always catch Freshwater fish, no matter the body of water.",
    effect_id: "fresh"
  },
  efficient_lure: {
    icon: "bait_icons14.png",
    name: "Efficient Lure",
    desc: "Chance to not consume bait on catch",
    effect_id: "efficient"
  },
  magnet_lure: {
    icon: "bait_icons15.png",
    name: "Magnet Lure",
    desc: "Higher chance of catching treasure (and garbage...)",
    effect_id: "magnet"
  },
  large_lure: {
    icon: "bait_icons16.png",
    name: "Large Lure",
    desc: "Higher chance of catching bigger fish\n... chance to consume extra bait on catch",
    effect_id: "large"
  },
  attractive_angler: {
    icon: "bait_icons17.png",
    name: "Attractive Angler",
    desc: "Higher catch chance",
    effect_id: "attractive"
  },
  sparkling_lure: {
    icon: "bait_icons18.png",
    name: "Sparkling Lure",
    desc: "Higher chance of catching greater tiers of fish\n... chance to consume extra bait on catch",
    effect_id: "sparkling"
  },
  double_hook: {
    icon: "bait_icons20.png",
    name: "Double Hook",
    desc: "Low Chance of doubling fish on catch\n... chance to consume extra bait on catch",
    effect_id: "double"
  },
  gold_hook: {
    icon: "bait_icons22.png",
    name: "Golden Hook",
    desc: "Higher chance of catching extremely rare fish\n... always consumes 3x bait.",
    effect_id: "gold"
  },
  challenge_lure: {
    icon: "bait_icons23.png",
    name: "Challenge Lure",
    desc: "Popups appear during the fishing minigame, clicking them gives cash- but missing them hurts you!",
    effect_id: "challenge"
  }
};
