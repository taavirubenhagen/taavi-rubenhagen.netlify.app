<script lang="ts">
  import { get } from "svelte/store"

  import Saos from "saos"
  import * as scroller from "svelte-scrollto"
  import ChevronDown from "svelte-material-icons/ChevronDown.svelte"

  import * as g from "../.././stores"




  export let index = 1
  export let hasAnimation = true

  export let title = "The Presenter."
  export let subtitle: string = ""
</script>




<div class="h-screen relative">
  <div class="size_screen flex_col_center">
    <Saos once={true} animation={hasAnimation ? g.defaultScrollBottom : ""}>
      <div class="flex_col_center">
        <h1>{@html title}</h1>
        {#if title}
          <div class="h-8"></div>
          <p1>{subtitle}</p1>
        {/if}
      </div>
    </Saos>
  </div>
  <div class="absolute bottom-24 sm:bottom-8 w-full flex_row_center">
    <button
      title="Scroll down"
      class="scroll_down_button relative right-8 opacity-20"
      on:click={() => scroller.scrollTo({ offset: index * get(g.wih), duration: 1000 })}
    >
      <ChevronDown size=64 color="white"/>
    </button>
  </div>
</div>