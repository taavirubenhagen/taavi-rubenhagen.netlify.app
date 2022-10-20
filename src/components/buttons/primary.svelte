<script lang="ts">
  import { fade, fly } from "svelte/transition";

	import "../../global.postcss";
	import { defaultFade } from "../.././stores";




  export let className = ""

  export let title = ""
  export let href = ""
  export let onclick = () => {}




  type tCurrentClass = "" | "text-onprimary"
  let currentClass = ""
</script>








<div class="relative grid justify-items-center items-center" transition:fade={ defaultFade }>
  
  <a href={href}>
    <button
      title={title}
      class="{className} primary_button"
      on:mouseenter={() => currentClass = "text-onprimary"}
      on:mouseleave={() => currentClass = ""}
      on:click={onclick}
    >
      <div class="text-transparent">
        <slot/>
      </div>
    </button>
  </a>
  <div class="flex_row_center absolute click-through {currentClass}">
    <slot/>
  </div>
</div>