<script>
  import { Sortable, Plugins } from "@shopify/draggable";
  import { onMount } from "svelte";

  onMount(async () => {
    const rootEl = document.querySelectorAll(".dropzone");

    //console.log(rootEl);

    const drag = new Sortable(rootEl, {
      draggable: ".preview-draggable",
      classes: {
        "draggable:over": ["draggable--over", "bg-red-200", "bg-opacity-25"],
        "source:dragging": ["bg-blue-200 max-w-[100px]"],
        mirror: ["opacity-40", "scale-10", "mirror-object"],
      },
      dropzone: ".dropzone",
    });

    drag.on("snap:in", () => console.log("snap:in"));
    drag.on("snap:out", () => console.log("snap:out"));

    document.ontouchmove = function (event) {
      event.preventDefault();
    };
  });
</script>

<div class="flex w-full h-full justify-between">
  <div>
    <ul class="text-white">
      <li>Headers</li>
      <li>Content</li>
    </ul>
  </div>

  <div id="root" class="dropzone h-full w-1/2 p-4 overflow-y-auto">
    <div class="preview-draggable">
      <img src="/templates/1.png" alt="" class="object-contain h-auto" />
    </div>
    <div class="preview-draggable">
      <img src="/templates/2.png" alt="" class="object-contain h-auto" />
    </div>
    <div class="preview-draggable">
      <img src="/templates/3.png" alt="" class="object-contain h-auto" />
    </div>
    <div class="preview-draggable">
      <img src="/templates/4.png" alt="" class="object-contain h-auto" />
    </div>
  </div>

  <div
    id="outline"
    class="dropzone p-10 bg-white w-[500px] h-full overflow-y-auto flex flex-col items-center justify-items-start"
  />
</div>

<style>
  #root {
    display: flex;
    flex-direction: column;
  }
  .preview-draggable {
    padding: 0px;
    max-width: 350px;
    display: inline-block;
    user-select: none;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 0px 4px rgba(0, 0, 0, 0.07),
      0 0px 8px rgba(0, 0, 0, 0.07), 0 0px 16px rgba(0, 0, 0, 0.07),
      0 0px 32px rgba(0, 0, 0, 0.07), 0 0px 64px rgba(0, 0, 0, 0.07);

    clip-path: inset(0 -64px 0 -64px);
  }
  img {
    /* width: 500px; */
    height: auto;
  }
  .preview-draggable.mirror-object {
    border: 1px solid blue !important;
    opacity: 10 !important;
  }
</style>
