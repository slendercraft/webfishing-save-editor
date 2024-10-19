// https://docs.godotengine.org/en/3.5/tutorials/io/binary_serialization_api.html
export interface BinaryInterface {
  data: Uint8Array;
  view: DataView;
  length: number;
  position: number;
}

export class BinaryReader implements BinaryInterface {
  data: Uint8Array;
  view: DataView;
  length: number;
  position: number;

  constructor(data: Uint8Array) {
    this.data = data;
    this.view = new DataView(data.buffer);

    this.length = data.length;
    this.position = 0;
  }

  readUInt16() {
    return this._read(this.view.getUint16, 2);
  }

  readInt32() {
    return this._read(this.view.getInt32, 4);
  }

  readUInt32() {
    return this._read(this.view.getUint32, 4);
  }

  readInt64() {
    return this._read(this.view.getBigInt64, 8);
  }

  readFloat() {
    return this._read(this.view.getFloat32, 4);
  }

  readDouble() {
    return this._read(this.view.getFloat64, 8);
  }

  read(length: number) {
    const data = this.data.subarray(this.position, this.position + length);
    this.position += length;
    return data;
  }

  private _read<T>(func: (position: number, littleEndian?: boolean) => T, length: number): T {
    const result = func.call(this.view, this.position, true);
    this.position += length;
    return result;
  }
}

export class BinaryWriter implements BinaryInterface {
  data: Uint8Array;
  view: DataView;
  length: number;
  position: number;

  constructor() {
    this.data = new Uint8Array(1024 * 1024);
    this.view = new DataView(this.data.buffer);

    this.length = 0;
    this.position = 0;
  }

  toBytes() {
    return this.data.subarray(0, this.position);
  }

  writeUInt16(value: number) {
    this._write(this.view.setUint16, value, 2);
  }

  writeInt32(value: number) {
    this._write(this.view.setInt32, value, 4);
  }

  writeUInt32(value: number) {
    this._write(this.view.setUint32, value, 4);
  }

  writeInt64(value: bigint) {
    this._write(this.view.setBigInt64, value, 8);
  }

  writeFloat(value: number) {
    this._write(this.view.setFloat32, value, 4);
  }

  writeDouble(value: number) {
    this._write(this.view.setFloat64, value, 8);
  }

  write(data: Uint8Array) {
    this.grow(data.length);
    this.data.set(data, this.position);
    this.position += data.length;
  }

  private _write<T>(func: (position: number, value: T, littleEndian?: boolean) => void, value: T, length: number) {
    this.grow(length);
    func.call(this.view, this.position, value, true);
    this.position += length;
  }

  private grow(length: number) {
    const required = this.length - (this.position + length);
    if (required <= 0) return;

    const newData = new Uint8Array(this.length + required);
    newData.set(this.data);
    this.data = newData;
    this.view = new DataView(this.data.buffer);
  }
}

export function readFile(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(reader.result));
      } else {
        reject(new Error("FileReader result is not an ArrayBuffer"));
      }
    };

    reader.readAsArrayBuffer(file);
  });
}

export function writeFile(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
