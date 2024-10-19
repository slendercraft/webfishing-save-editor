<script lang="ts">
  import Editor from "./Editor.svelte";
  import type { WebfishingSave } from "./game/types";
  import { readFile, BinaryReader, BinaryWriter, writeFile } from "./lib/binary";
  import { readVariant, writeVariant } from "./lib/godot";
  import type { GodotVariant } from "./lib/types";

  let save: WebfishingSave | null;

  async function uploadSave(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file != null) {
      const bytes = await readFile(file);
      const reader = new BinaryReader(bytes);
      reader.readUInt32(); // Size, which we don't care about
      save = readVariant(reader) as unknown as WebfishingSave;
      console.log(save);
    }
  }

  function downloadSave() {
    const writer = new BinaryWriter();
    writeVariant(writer, save as unknown as GodotVariant);
    const bytes = writer.toBytes();

    const writer2 = new BinaryWriter();
    writer2.writeUInt32(bytes.length);
    writer2.write(bytes);

    writeFile(writer2.toBytes(), "webfishing_migrated_data.save");
  }
</script>

<hgroup>
  <h1>WEBFISHING Save Editor</h1>
  <p>by <a href="https://notnite.com/">NotNite</a> and <a href="https://hl2.sh/">Jay</a></p>
</hgroup>

<p>
  Your save is located at <code>%AppData%\Godot\app_userdata\webfishing_2_newver\webfishing_migrated_data.save</code>.
  Back up your save before editing it!
</p>

<div class="fileUpload" role="group">
  <input type="file" name="file" accept=".save" on:change={uploadSave} />

  {#if save}
    <input type="button" value="Download save" on:click={downloadSave} />
  {/if}
</div>

{#if save}
  <div id="editor">
    <Editor {save} />
  </div>
{/if}
