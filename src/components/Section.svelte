<script lang="ts">
  export let title: string;
</script>

<details>
  <summary>{title}</summary>
  <div class="content">
    <slot />
  </div>
</details>
