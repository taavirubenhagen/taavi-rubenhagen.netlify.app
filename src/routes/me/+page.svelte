<script defer lang="ts">
  import { onMount } from 'svelte'
  import { fade, fly } from "svelte/transition"

  import * as scroller from "svelte-scrollto"
  import ChevronDown from "svelte-material-icons/ArrowDown.svelte"
  import ChevronRight from "svelte-material-icons/ArrowRight.svelte"

	import "../.././global.postcss"
  import * as g from "../.././stores"




  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
  const sleepSync = (delay: number) => {
    const end = new Date().getTime() + delay;
    while (new Date().getTime() < end) {}
  }





  // Function for typewriting transition. Values are in ms.   // TODO: Implement delay; Make parameters optional  // TODO: Move to stores.ts
  function typewrite(node: HTMLElement, { delay = 0, charDuration = g.defaultCharDuration }: any): __sveltets_2_SvelteTransitionReturnType {
    const text = node.textContent!
    const duration = text.length * charDuration
    return {
      duration: duration,
      tick:(t: number) => {
        node.textContent = text.slice(0, Math.floor(text.length * t))
      }
    }
  }




  const subheaderText = "I build and distribute blazingly fast, bleeding-edge cross-platform apps."
  
  
  
  
  // TODO: Change back to false
  
  let isVisibleHeader1 = g.debug;
  let isVisibleHeader2 = g.debug;
  let isVisibleSubheader = g.debug;
  let isVisibleRest = g.debug || true;




  onMount(() => {
    let currentDelay = 0
    currentDelay += 500
    setTimeout(() => isVisibleHeader1 = true, currentDelay)
    currentDelay += "Hi, I'm\n".length * g.defaultCharDuration
    setTimeout(() => isVisibleHeader2 = true, currentDelay)
    currentDelay += "Taavi Rübenhagen.\n".length * ( 0.75 * g.defaultCharDuration ) + 10 * g.defaultCharDuration
    setTimeout(() => isVisibleSubheader = true, currentDelay)
    setTimeout(
      () => {
        g.isVisibleMenuStore.update(_ => true)
        isVisibleRest = true
      },
      g.debug ? 0 : subheaderText.length * ( g.defaultCharDuration / 5 ) + 40 * g.defaultCharDuration)
  })
</script>







<main>
  <div class="flex flex-col justify-between items-center">
    <div class="size_screen max-h-screen flex flex-col justify-center items-start">
      {#if isVisibleHeader1}
        <h3 transition:typewrite={{}}>Hi, I'm</h3>
      {:else}
        <!-- svelte-ignore a11y-missing-content -->
        <h3></h3>
      {/if}
      <div class="h-4"></div>
      <div class="h-24">
      {#if isVisibleHeader2}
      <!-- TODO: Make "Rübenhagen" appear selected -->
        <h1 class="select-text" transition:typewrite={{ charDuration: 0.75 * g.defaultCharDuration }}>Taavi Rübenhagen.</h1>
      {:else}
        <!-- svelte-ignore a11y-missing-content -->
        <h1></h1>
      {/if}
      </div>
      <div class="h-16"></div>
      <!--
        Blazingly fast
        Bleeding-Edge
        Next-gen
        Holistic approach
        Highly interactive
      -->
        <div class="h-7">
        {#if isVisibleSubheader}
          <div>
            <p1 transition:typewrite={{ charDuration: g.defaultCharDuration / 5 }}>{subheaderText}</p1>
          </div>
        {:else}
          <div><p1></p1></div>
        {/if}
        </div>
    </div>
    {#if isVisibleRest}
      <button
        title="Scroll down"
        class="transition_all_quick relative opacity-20 bottom-24 hover:opacity-100 hover:p-2 hover:rounded-full"
        transition:fade={g.defaultFade}
        on:click={() => scroller.scrollTo({ offset: window.outerHeight, duration: 1000 })}
      >
        <ChevronDown size=64 color="white"/>
      </button>
    {/if}
  </div>
  <div class="size_screen flex flex-col justify-start items-start">
    <button
      title="Projects"
      transition:fade={g.defaultFade}
      on:click={() => {}}
      class="my-8"
    >
      <a class="clickable_headline" href="/projects">
        <h2>Projects</h2>
        <ChevronRight size=64 color="white"/>
      </a>
    </button>
    <div class="h-8"></div>
    <div
      class="inner_size_screen grid gap-8"
      style="
        min-height: 0;
        grid-template-columns: repeat(auto-fit, minmax(400px, calc(( 100vw - 2 * 4rem - 2rem ) / 2)));
      "
    >
      {#each
        [
          [
            "The Presentation Master",
            [
              "Every presentation tool in one app.",
              "Remote control, timer, speaker notes and much more, directly on your phone.",
            ],
          ],
          [
            "The Simplest Counter",
            [
              "Count anything. As simple as possible.",
            ],
            //"There are many counter apps in the app stores to count pushups, votes, rounds, anything;&nbsp but none of them are designed for humans.&nbsp The Simplest counter is as simple as possible for maximum focus."
          ],
          [
            "Tavy Components for Flutter",
            [
              "Custom dart functions and flutter widgets designed to simplify and standardize the development of my Flutter apps.",
            ],
          ],
          [
            "Personal Website",
            [
              "You see it here.",
            ],
            //"There are many counter apps in the app stores to count pushups, votes, rounds, anything;&nbsp but none of them are designed for humans.&nbsp The Simplest counter is as simple as possible for maximum focus."
          ],
        ]
        as texts, _
      }
      <div
        class="
          border border-gray-500 rounded-xl p-8
          flex flex-col
        "
      >
        <div class="flex justify-center">
          <button title={texts[0].toString()}>
            <a href={texts[1].toString()}>
              <h4 class="default_link_button text-center">{texts[0]}</h4>
            </a>
          </button>
        </div>
        <div class="h-4"></div>
        {#each texts[1] as paragraph}
          <p1>{paragraph}</p1>
        {/each}
      </div>
      {/each}
    </div>
  </div>
</main>