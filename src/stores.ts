import { writable } from "svelte/store"




export const debug = false;


export const defaultFade =  { duration: 500 }
export const defaultCharDuration = 85;
export function genDefaultScrollBottom(delay = 500): string {
  return `scroll_bottom_fade 1s ease-out ${delay}ms both`
}
export const defaultScrollBottom = genDefaultScrollBottom()
export const defaultScrollFade = "scroll_fade 1s ease-out 1000ms both"

export const defaultCursorSize = 8




function resizeCursor(size = defaultCursorSize) {
  cursorSizeTW.update(_ => size)
}

export function setupCursor(d: Document) {
  let hoverTypes16 = ["h1", "h2", "h3", "h4", "h5", "h6"] // Every element that lets the cursor expand to size 16 on hover

  for (let t of hoverTypes16) {
    let elements = d.body.querySelectorAll(t + ":not(.text-transparent)")
    console.log("!!!: " + elements[0])
    for (let e of elements) {
      e.addEventListener("mouseenter", () => resizeCursor(16), false)
      e.addEventListener("mouseleave", () => resizeCursor(), false)
    }
  }
}




export const wih = writable(0)

export const scrollYStore = writable(0)

export const isVisibleMenuStore = writable(debug)




export const cursorSizeTW = writable(defaultCursorSize)