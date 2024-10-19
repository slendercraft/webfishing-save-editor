export enum GodotVariantType {
  Nil,

  // atomic types
  Bool,
  Int,
  Real,
  String,

  // math types
  Vector2,
  Rect2,
  Vector3,
  Transform2D,
  Plane,
  Quat,
  AaBb,
  Basis,
  Transform,

  // misc types
  Color,
  NodePath,
  Rid,
  Object,
  Dictionary,
  Array,

  // arrays
  PoolByteArray,
  PoolIntArray,
  PoolRealArray,
  PoolStringArray,
  PoolVector2Array,
  PoolVector3Array,
  PoolColorArray
}

export type HasFlags = {
  flags: number;
};

export type GodotNil = HasFlags & {
  $type: GodotVariantType.Nil;
};
export type GodotBool = HasFlags & {
  $type: GodotVariantType.Bool;
  value: boolean;
};
export type GodotNumber = HasFlags & {
  value: number;
};
export type GodotInt = HasFlags & {
  $type: GodotVariantType.Int;
} & GodotNumber;
export type GodotReal = HasFlags & {
  $type: GodotVariantType.Real;
} & GodotNumber;
export type GodotString = HasFlags & {
  $type: GodotVariantType.String;
  value: string;
};
export type GodotVector2 = HasFlags & {
  $type: GodotVariantType.Vector2;
  value: [number, number];
};
export type GodotDictionary = HasFlags & {
  $type: GodotVariantType.Dictionary;
  value: Record<string, GodotVariant> & {
    __saveEditor_order?: string[];
    __saveEditor_intKeys?: Record<string, number>;
  };
};
export type GodotArray = HasFlags & {
  $type: GodotVariantType.Array;
  value: GodotVariant[];
};

export type GodotVariant =
  | GodotNil
  | GodotBool
  | GodotInt
  | GodotReal
  | GodotString
  | GodotVector2
  | GodotDictionary
  | GodotArray;

export type GodotCustomArray<T = GodotVariant[]> = HasFlags & {
  $type: GodotVariantType.Array;
  value: T;
};

export type GodotCustomDictionary<T = Record<string, GodotVariant>> = HasFlags & {
  $type: GodotVariantType.Dictionary;
  value: T;
};
