<script>
  import { afterUpdate, onMount } from "svelte";
  import Library from "../lib/library.svelte";
  import Editor from "../lib/editor.svelte";
  import Nav from "../lib/navbar.svelte";
  import ImageHeader from "../wireframes/content/image-header.svelte";
  import ImageFull from "../wireframes/content/image-full.svelte";

  console.log("init");

  const options = [ImageHeader, ImageFull];

  onMount(() => {});

  let navigatorOpen = true;
  const handleNavMessage = (event) => {
    event.detail.msg;
    switch (event.detail.msg) {
      case "toggleNav":
        console.log("toggleNav!");
        navigatorOpen = !navigatorOpen;
        break;
      case "download":
        console.log("download");
        break;
      default:
        break;
    }
  };

  afterUpdate(async () => {
    // Add editable class to every element in elementsToMakeEditable
    const elementsToMakeEditable = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "a",
      "button",
    ];
    elementsToMakeEditable.forEach((element) => {
      const editorElement = document.querySelector(".editor-content");
      editorElement.querySelectorAll(element).forEach((element) => {
        element.classList.add("editable");
      });
    });

    // Add contenteditable to editableTextElements
    document.querySelectorAll(".editable").forEach((element) => {
      //console.log("element", element);
      element.setAttribute("contenteditable", "true");
    });

    /*
    // For every p and  element, replace each character with █
    document.querySelectorAll("p").forEach((element) => {
      const text = element.innerText;
      const newText = text.replace(/./g, "█");
      element.innerText = newText;
    });
    */

    // when enter is pressed inside contenteditable change it to shift+enter
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        if (e.target.getAttribute("contenteditable") !== "true") return;
        e.target.blur();
        e.preventDefault();
      }
    });
  });
</script>

<h1>Mocker</h1>

<div class="">
  <Nav on:message={handleNavMessage} myClass="z-20 h-[var(--nav-height)]" />
  <Library
    myClass="mt-[var(--nav-height)] {navigatorOpen ? 'block' : 'hidden'}"
  />
  <Editor myClass="">
    {#each options as option}
      <svelte:component this={option} />
    {/each}
  </Editor>
</div>
