<script>
  import Draggable from "./draggable.svelte";

  export let myClass = "";
</script>

<div
  class="{myClass} fixed top-0 left-0 min-w-[1200px] w-[90vw] h-full bg-gray-900"
>
  <Draggable />
</div>
