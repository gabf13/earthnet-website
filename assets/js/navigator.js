'use strict'

const sidebar = document.getElementById('sidebar')
const content = document.getElementById('content-wrapper')
const nav = document.getElementById('nav')

// Get all anchors the sidebar has
const anchors = {}
for (const i of nav.getElementsByTagName('a')) {
  anchors[i.hash?.slice(1) || i.id] = i
}

// Get the actual elements the anchors refers to
const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
elements.reverse()

function iterParents(elm, cb) {
  if (!elm) return
  while (elm) {
    if (cb.call(cb, elm) === false) break
    elm = elm.parentElement
  }
}

function resetContent() {
  contentScroll = 0
  content.style.position = ''
  content.style.bottom = ''
}

function needsScroll(elm) {
  return document.body.offsetHeight - elm.offsetTop - 300 < window.innerHeight
}

// Fired when the scroll-spy change sections
const SectionChangeEvent = new Event('sectionchange')

// Scroll-spy
let contentScroll = 0
let ignoreScroll = false
let selected, lastAnchor

const scrollSpy = (() => {

  return () => {
    const current = elements.find((elm) => window.scrollY + (contentScroll > 0 ? contentScroll - 300 : 0) >= elm.offsetTop - 75)

    if (current === selected) return
    if (!current) {
      // Deactivate all anchors
      iterParents(lastAnchor, (elm) => { elm.nodeName === 'UL' && elm.classList.remove('active') })
      // Unselect last selected anchor
      lastAnchor?.parentElement.classList.remove('selected')
      selected = undefined
      // Update page history removing any hash
      history?.replaceState(null, null, document.location.pathname)
      // Inform other components that the section have been changed to nothing
      dispatchEvent(SectionChangeEvent)
      return
    }
    selected = current

    // Find what anchor <a> represents the current header
    let anchor = anchors[current.id]
    if (!anchor) { // No anchor found, choose the closest one
      const currentIndex = elements.indexOf(current)
      for (let i = currentIndex + 1; i < elements.length; i++) {
        const header = elements[i]
        anchor = anchors[header.id]
        if (anchor) break
      }
      if (!anchor) return // Can't find any
    }

    // Sync the URL hash with the selected anchor
    history?.replaceState(null, null, document.location.pathname + '#' + current.id)

    // Deactivate previous anchors
    iterParents(lastAnchor, (elm) => {
      if (elm === anchor.parentElement.parentElement) return false
      if (elm.nodeName === 'UL') elm.classList.remove('active')
    })
    lastAnchor?.parentElement.classList.remove('selected')

    // Activate new anchor
    iterParents(anchor, (elm) => {
      if (elm.classList.contains('active')) return false
      if (elm.nodeName === 'UL') elm.classList.add('active')
    })
    anchor.parentElement.classList.add('selected')

    // Scroll the sidebar if necessary
    if (sidebar.scrollTop + sidebar.offsetHeight <= anchor.offsetTop + anchor.offsetHeight) {
      sidebar.scrollTo(0, anchor.offsetTop - sidebar.offsetHeight / 1.2)
    } else if (sidebar.scrollTop > anchor.offsetTop) {
      sidebar.scrollTo(0, anchor.offsetTop - anchor.offsetHeight * 1.2)
    }

    // Tell other components that we have moved into a new section
    dispatchEvent(SectionChangeEvent)

    // Update states
    lastAnchor = anchor
  }
})()

// Sidebar sticky positioning
// The difference between this and the CSS implementation is that CSS's static <=> fixed
// when this is absolute <=> fixed. This helps with keeping the main content wrapper position good.
// Shouldn't be that bad on performance... I think.
const positionSpy = (() => {
  const originalTop = sidebar.offsetTop
  const originalMargin = getComputedStyle(sidebar).marginTop

  return () => {
    if (window.scrollY < originalTop) {
      sidebar.style.position = 'absolute'
      sidebar.style.top = 'initial'
    } else {
      sidebar.style.position = 'fixed'
      sidebar.style.top = '-' + originalMargin
    }
  }
})()

// Fake scroll will move the whole content wrapper either up or down to simulate scrolling.
// Doing this to make sure that there is always a chance to highlight the last header on the page,
// since sometimes there is just no enough space to scroll to that part of the page.  
function fakeScroll (e) {
  if (e.deltaY > 0 && window.scrollY + window.innerHeight >= document.body.offsetHeight && contentScroll < window.innerHeight - 280) {
    content.style.position = 'relative'
    contentScroll += 30
  } else if (contentScroll > 0 && e.deltaY <= 0) {
    contentScroll -= 30
    if (contentScroll <= 0) content.style.position = 'initial'
  } else {
    return
  }

  e.preventDefault()
  content.style.bottom = contentScroll + 'px'
  scrollSpy()
}

// Do a fake scroll (raise the content wrapper up) if necessary
function jumpAnchor (e) {
  // Sometimes, the window location is NOT updated to the actual new URL.
  // To make the chance of that failing really small, using the event newURL (which looks like is always updated to the right thing)
  // when possible (the e.window is not updated sometimes as well).
  const hash = e ? (new URL(e.newURL)).hash?.slice(1) : window.location.hash?.slice(1)
  const elm = elements.find(elm => elm.id === hash)
  if (!elm) return

  // Do we need to do a fake scroll or not?
  if (!needsScroll(elm)) return

  content.style.position = 'relative'
  contentScroll = Math.ceil(elm.getBoundingClientRect().top) + contentScroll
  content.style.bottom = contentScroll + 'px'

  scrollSpy()
}

// Initial positioning
ignoreScroll = true
positionSpy()
jumpAnchor()
scrollSpy()

// TODO: Unassign unneeded listeners if the navigator is hidden (e.g on phone screens)

// Assign a click event for all anchors elements (<a>).
// This is used to correct the fake scroll layout __before__ the hash changes
// since if hash change is fired then updated the fake scroll
// the browser won't jump to the correct anchor header.
this.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'A') return

  // If the element is an anchor, we want to check the actual element it refers to
  let elm = e.target
  if (elm.nodeName === 'A') elm = document.getElementById(e.target.hash?.slice(1))

  if (!needsScroll(elm)) resetContent()
  ignoreScroll = true
})

// Assign a hashchange to check if the anchor header needs a fake scroll to be displayed correctly or not.
this.addEventListener('hashchange', jumpAnchor)

// Assign a wheel listener to implement fake scrolling for headers elements.
this.addEventListener('wheel', fakeScroll, { passive: false })

// Assign a scroll event to implement sticky sidebar, and scrollspy
this.addEventListener('scroll', () => {
  // Requesting an animation frame should hopefully be more performance efficient
  window.requestAnimationFrame(() => {
    // If the user manages to bypass the `wheel` event, make sure to reset the fake scrolled content
    // So it doesn't affect the actual content positioning.
    if (contentScroll > 0 && !ignoreScroll) resetContent()
    ignoreScroll = false

    positionSpy()
    scrollSpy()
  })
})
