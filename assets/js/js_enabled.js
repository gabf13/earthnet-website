'use strict'

// This script is used to add stylesheet only when JS is enabled
// the script doesn't need to check for that, since if it gets executed then JS is indeed enabled otherwise it isn't
{
  const stylesheet = document.createElement('style')
  stylesheet.innerText = `
    #content-wrapper .heading-anchor {
      color: #606060;
    }
    #nav ul:not(:first-child):not(.active) {
      visibility: hidden;
      display: none !important;
    }
  `
  document.head.appendChild(stylesheet)
}
