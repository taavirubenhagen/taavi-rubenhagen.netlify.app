<!-- TODO: IMPLEMENT A TEXT COMPONENT WITH HOVER AND SELECTION EFFECTS BUILT IN -->

<script lang="ts">
  import { get } from "svelte/store"
  import { onMount } from "svelte"

  import Close from "svelte-material-icons/Close.svelte"
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte"

	import "./work.postcss"
	import * as g from "../../stores"
	import SecondaryButton from "../../components/buttons/secondary.svelte"




  let cursorSizeTW = g.defaultCursorSize
  g.cursorSizeTW.subscribe(value => {
    cursorSizeTW = value
    console.log(cursorSizeTW)
  })
  $: cursorSizeClass = `w-${cursorSizeTW} h-${cursorSizeTW}`

  let cursorX = 0
  let cursorY = 0
  let isCursorVisible = false
  
  
  function moveCursor(left: number, top: number) {
    isCursorVisible = true
    cursorX = left
    cursorY = top
    const cursor = document.getElementById("cursor")!
    cursor.style.transform = `translate(${-get(g.cursorSizeTW) * 4 / 2}px, ${-get(g.cursorSizeTW) * 4 / 2}px)`
    cursor.style.left = `${left}px`
    cursor.style.top = `${top}px`
  }


  onMount(() => g.setupCursor(document))
</script>




<svelte:window
  on:mousemove={(e) => moveCursor(e.pageX, e.pageY)}
  on:scroll={() => isCursorVisible = false}
/>




<main class="">
  <header class="fixed z-40 w-screen h-16 px-4 flex justify-end items-center">
    <h3 class="text-2xl font-bold">Menu</h3>
  </header>
  <slot></slot>
  <div id="cursor" class="cursor {cursorSizeClass}" style="transition-duration: 400ms;"></div>
</main>