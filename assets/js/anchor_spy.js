'use strict'

// Get the '#' text elements near a header
const headingElms = Array.from(document.getElementsByClassName('heading-anchor'))
let headingAnchors = {}

// Using a map over the array for faster lookups
for (const anchor of headingElms) {
  headingAnchors[anchor.hash] = anchor
}

// Track current anchor
let lastHeader
addEventListener("sectionchange", () => {
  lastHeader?.removeAttribute("selected")
  lastHeader = headingAnchors['#' + selected?.id]
  lastHeader?.setAttribute("selected", true)
})
