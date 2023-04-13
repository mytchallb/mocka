<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let myClass = "";

  function dispatchUp(msg) {
    dispatch("message", {
      msg: msg,
    });
  }
</script>

<!-- navbar.svelte -->
<div
  class="z-20 bg-gray-200 fixed top-0 left-0 w-full {myClass ||
    ''} h-[var(--nav-height)]
    "
>
  <button
    on:click={() => {
      dispatchUp("toggleNav");
    }}>Toggle nav</button
  >
  <button
    on:click={() => {
      dispatchUp("download");
    }}>Download</button
  >
</div>
