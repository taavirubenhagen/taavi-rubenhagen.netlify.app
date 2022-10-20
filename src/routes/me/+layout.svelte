<script lang="ts">
  import { fade, fly } from "svelte/transition"

  import Close from "svelte-material-icons/Close.svelte"
  import DotsHorizontal from "svelte-material-icons/DotsHorizontal.svelte"

	import "../.././global.postcss"
	import * as g from "../.././stores"
	import SecondaryButton from "../.././components/buttons/secondary.svelte"




	export let isMenuAllowed = true
	export let isVisibleMenu = false




	g.isVisibleMenuStore.update(_ => isVisibleMenu)
	g.isVisibleMenuStore.subscribe(value => isVisibleMenu = isMenuAllowed && value)




	let scrollY = 0
	$: isY0 = scrollY === 0
	let previousScrollY = scrollY

	type tHeaderClass = "-top-24" | "top-0"
	function updateHeaderVisibility(y: number): tHeaderClass {
		const dy = scrollY - previousScrollY
		previousScrollY = y
		return dy > 0 ? "-top-24" : "top-0"
	}
	$: headerClass = updateHeaderVisibility(scrollY)


  function moveCursor(left: number, top: number) {
    document.querySelector("#cursor")?.setAttribute("style", `top: ${top}px; left: ${left}px;`)
  }


	type tContactButtonClass = "" | "text-onprimary"
	let contactButtonClass: tContactButtonClass = ""




	//$: isMoreButtonVisible = !isVisibleMenu && !isMenuAllowed
	//onMount(() => isMoreButtonVisible = true)
</script>




<svelte:window
  bind:scrollY={scrollY}
/>








<main
  on:pointermove={(e) => moveCursor(e.pageX, e.pageY)}
  class=""
>
  <div id="cursor" class="pointer-events-none absolute z-50 opacity-50 w-8 h-8 -m-4 rounded-full bg-gray-300 flex_col_center">
    <div class="w-2 h-2 rounded-full bg-transparent"></div>
  </div>
	<div class="flex flex-col items-start overflow-x-hidden bg-black">
    <header
      class="
        {headerClass} transition_all duration-1000 delay-1000
        fixed z-10 w-screen h-24 pl-16 pr-16 pt-8 pb-8 bg-background flex justify-between items-center"
      >
      {#if isVisibleMenu}
        <div class="flex items-center">
          <div class="w-8 h-8 mr-4 rounded-2xl bg-primary" transition:fade={g.defaultFade}>
            <img src="/my_face_circle.png" alt="img">
          </div>
          {#each [
            ["Taavi Rübenhagen", ""],
          ] as data, i}
              <SecondaryButton hasUnderline={true} title={data[0]}>
                <a href={data[1]}>
                  <p3>{data[0]}</p3>
                </a>
              </SecondaryButton>
          {/each}
        </div>
        <div class="flex items-center">
          {#each [
            ["About", ""],
            ["Projects", ""],	// TODO: Link to section
            ["Timeline", ""],
          ] as data, i}
            <SecondaryButton title={data[0]}>
              <a href={data[1]}>
                <p3>{data[0]}</p3>
              </a>
            </SecondaryButton>
            <div class="w-16"></div>
          {/each}
          <SecondaryButton
            dropdown="all"
            title="More"
            items={[
              ["Rules", ""],
              ["Inspirations", ""],
              ["Rules", ""],
            ]}
          />
          <div class="w-16"></div>
          <div class="grid justify-items-center items-center" transition:fade={ g.defaultFade }>
            <button
              title="Contact"
              class="primary_button"
              style="grid-column: 1; grid-row: 1;"
              on:mouseenter={() => contactButtonClass = "text-onprimary"}
              on:mouseleave={() => contactButtonClass = ""}
              on:click={() => {
                isVisibleMenu = !isVisibleMenu
              }}
            >
              <p3 class="text-transparent">Contact</p3>
            </button>
            <p3
              class="{contactButtonClass} click-through relative z-80 align-text-top"
              style="grid-column: 1; grid-row: 1;"
            >
              Contact
            </p3>
          </div>
        </div>
      {/if}
      {#if isVisibleMenu}
        <div class="absolute right-4 opacity-10" transition:fade={g.defaultFade}>
          <button
            on:click={() => {
              g.isVisibleMenuStore.update(_ => false);
              isVisibleMenu = false;
            }}
          >
            <Close size=24/>
          </button>
        </div>
      {:else}
        <div class="absolute right-4 opacity-25" transition:fade={g.defaultFade}>
          <button
            on:click={() => {
              g.isVisibleMenuStore.update(_ => true)
              isVisibleMenu = true
            }}
          >
            <DotsHorizontal size=24/>
          </button>
        </div>
      {/if}
    </header>
    <slot></slot>
	</div>
</main>