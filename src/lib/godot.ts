import { BinaryWriter, type BinaryReader } from "./binary";
import {
  type GodotVariant,
  GodotVariantType,
  type GodotDictionary,
  type GodotInt,
  type GodotBool,
  type GodotString,
  type GodotVector2,
  type GodotReal,
  type GodotArray,
  type GodotNil,
  type GodotCustomDictionary,
  type GodotCustomArray
} from "./types";

export function parseFlags(flags: number) {
  return {
    is64: (flags & 1) !== 0
  };
}

export function readVariant(data: BinaryReader): GodotVariant {
  const type = data.readUInt16() as GodotVariantType;
  const flags = data.readUInt16();
  const { is64 } = parseFlags(flags);

  switch (type) {
    case GodotVariantType.Nil: {
      return { $type: GodotVariantType.Nil, flags };
    }

    case GodotVariantType.Bool: {
      const value = data.readUInt32() !== 0;
      return {
        $type: GodotVariantType.Bool,
        value,
        flags
      };
    }

    case GodotVariantType.Int: {
      const value = is64 ? Number(data.readInt64()) : data.readInt32();
      return {
        $type: GodotVariantType.Int,
        value,
        flags
      };
    }

    case GodotVariantType.Real: {
      const value = is64 ? data.readDouble() : data.readFloat();
      return {
        $type: GodotVariantType.Real,
        value,
        flags
      };
    }

    case GodotVariantType.String: {
      const length = data.readUInt32();
      let pad = 0;
      if (length % 4 != 0) {
        pad = 4 - (length % 4);
      }
      if (pad === 4) pad = 0;

      const bytes = data.read(length);
      data.read(pad);

      const value = new TextDecoder().decode(bytes);
      return {
        $type: GodotVariantType.String,
        value,
        flags
      };
    }

    case GodotVariantType.Vector2: {
      const x = is64 ? data.readDouble() : data.readFloat();
      const y = is64 ? data.readDouble() : data.readFloat();
      return {
        $type: GodotVariantType.Vector2,
        value: [x, y],
        flags
      };
    }

    case GodotVariantType.Dictionary: {
      const size = data.readUInt32();

      const dict: GodotDictionary["value"] = {};
      dict.__saveEditor_order = [];

      for (let i = 0; i < size; i++) {
        const key = readVariant(data);
        if (key.$type !== GodotVariantType.String && key.$type !== GodotVariantType.Int)
          throw new Error("Dictionary key must be a string, got " + GodotVariantType[key.$type]);

        const keyStr = key.$type === GodotVariantType.String ? key.value : key.value.toString();
        if (key.$type === GodotVariantType.Int) {
          dict.__saveEditor_intKeys ??= {};
          dict.__saveEditor_intKeys[keyStr] = key.value;
        }

        dict.__saveEditor_order.push(keyStr);

        const value = readVariant(data);
        dict[keyStr] = value;
      }

      return {
        $type: GodotVariantType.Dictionary,
        value: dict,
        flags
      };
    }

    case GodotVariantType.Array: {
      const size = data.readUInt32();
      const array = new Array(size);
      for (let i = 0; i < size; i++) {
        array[i] = readVariant(data);
      }

      return {
        $type: GodotVariantType.Array,
        value: array,
        flags
      };
    }

    default: {
      throw new Error(`Unknown variant type: ${GodotVariantType[type]} ${type}`);
    }
  }
}

export function writeVariant(data: BinaryWriter, variant: GodotVariant): void {
  data.writeUInt16(variant.$type);
  const flags = variant.flags ?? 0;
  data.writeUInt16(flags);
  const { is64 } = parseFlags(flags);

  switch (variant.$type) {
    case GodotVariantType.Nil: {
      break;
    }

    case GodotVariantType.Bool: {
      data.writeUInt32(variant.value ? 1 : 0);
      break;
    }

    case GodotVariantType.Int: {
      if (is64) {
        data.writeInt64(BigInt(variant.value));
      } else {
        data.writeInt32(variant.value);
      }
      break;
    }

    case GodotVariantType.Real: {
      if (is64) {
        data.writeDouble(variant.value);
      } else {
        data.writeFloat(variant.value);
      }
      break;
    }

    case GodotVariantType.String: {
      const bytes = new TextEncoder().encode(variant.value);
      data.writeUInt32(bytes.length);
      data.write(bytes);

      if (bytes.length % 4 != 0) {
        const pad = 4 - (bytes.length % 4);
        data.write(new Uint8Array(pad));
      }

      break;
    }

    case GodotVariantType.Vector2: {
      const [x, y] = variant.value;
      if (is64) {
        data.writeDouble(x);
        data.writeDouble(y);
      } else {
        data.writeFloat(x);
        data.writeFloat(y);
      }
      break;
    }

    case GodotVariantType.Dictionary: {
      // Ensure we serialized integers properly and that the order is preserved
      // This would be solved if we used Map, but I want it to be easy ergonomically from UI code
      const intKeys = variant.value.__saveEditor_intKeys ?? {};
      delete variant.value.__saveEditor_intKeys;

      const order = variant.value.__saveEditor_order ?? [];
      delete variant.value.__saveEditor_order;

      const keys = Object.keys(variant.value);
      keys.sort((a, b) => {
        const ai = order.indexOf(a);
        const bi = order.indexOf(b);
        if (ai === -1 && bi === -1) return a.localeCompare(b);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });

      data.writeUInt32(keys.length);
      for (const key of keys) {
        if (key in intKeys) {
          writeVariant(data, { $type: GodotVariantType.Int, value: intKeys[key], flags: 0 });
        } else {
          writeVariant(data, { $type: GodotVariantType.String, value: key, flags: 0 });
        }

        writeVariant(data, variant.value[key]);
      }
      break;
    }

    case GodotVariantType.Array: {
      data.writeUInt32(variant.value.length);
      for (const elem of variant.value) {
        writeVariant(data, elem);
      }
      break;
    }
  }
}

export function nil(): GodotNil {
  return { $type: GodotVariantType.Nil, flags: 0 };
}

export function bool(value: boolean): GodotBool {
  return { $type: GodotVariantType.Bool, value, flags: 0 };
}

export function int(value: number): GodotInt {
  return { $type: GodotVariantType.Int, value, flags: 0 };
}

export function real(value: number): GodotReal {
  return { $type: GodotVariantType.Real, value, flags: 0 };
}

export function vector2(value: [number, number]): GodotVector2 {
  return { $type: GodotVariantType.Vector2, value, flags: 0 };
}

export function string(value: string): GodotString {
  return { $type: GodotVariantType.String, value, flags: 0 };
}

export function dict(value: GodotDictionary["value"]): GodotDictionary {
  return { $type: GodotVariantType.Dictionary, value, flags: 0 };
}

export function customDict<T>(value: T): GodotCustomDictionary<T> {
  return { $type: GodotVariantType.Dictionary, value, flags: 0 };
}

export function array(value: GodotVariant[]): GodotArray {
  return { $type: GodotVariantType.Array, value, flags: 0 };
}

export function customArray<T>(value: T): GodotCustomArray<T> {
  return { $type: GodotVariantType.Array, value, flags: 0 };
}
