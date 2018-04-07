// # Modal

const isUsingIE11 = !!navigator.userAgent.match(/Trident\/7\./)
const modalOpenPageClass = 'modal__page-container'

// ## Methods
const bindCloseModal = modalElement => {
  const closeButtonElement = modalElement.getElementsByClassName('js-modal-close')[0]

  closeButtonElement.addEventListener('click', event => {
    closeModal(modalElement)
  }, { once: true })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeModal(modalElement)
    }
  }, { once: true });
}

const closeModal = modalElement => {
  document.onkeydown = null
  document.body.classList.remove(modalOpenPageClass)
  modalElement.remove()
}

const createModal = content => {
  var sourcePageContent = document.createElement('div')
  sourcePageContent.innerHTML = content
  const scriptElements = sourcePageContent.querySelectorAll('script[src]')

  scriptElements.forEach(scriptElement => {
    const script = document.createElement('script');
    script.src = scriptElement.getAttribute('src');
    document.body.appendChild(script);
  })
  sourcePageContent = sourcePageContent.getElementsByClassName('js-page-content')[0]
  debugger
  openModal(sourcePageContent)
}

const fetchContent = url =>
  fetch(url, { credentials: 'same-origin' })
    .then(response => response.text())

const openModal = (modalContent) => {
  const modalElement = document.createElement('div')

  modalElement.classList.add('modal')
  modalElement.appendChild(modalContent)
  bindCloseModal(modalElement)

  const modalFirstHeading = modalElement.querySelectorAll('h1, h2, h3')[0]
  modalFirstHeading.setAttribute('tabindex', '0')

  document.body.classList.add(modalOpenPageClass)
  document.body.appendChild(modalElement)
  modalFirstHeading.focus()
}

const triggerModal = (triggerElem, url) =>
  fetchContent(url)
    .then(pageContent => createModal(pageContent))
    .catch(error => console.warn(error))

// ## Bind events
window.addEventListener('load', () => {
  const modalTriggerElements = document.querySelectorAll('[href*="/contact"]')
  if (!modalTriggerElements.length || isUsingIE11) return

  Array.from(modalTriggerElements).forEach(modalTrigger => {
    const relativeUrl = modalTrigger.getAttribute('href').replace(/^.*\/\/[^\/]+/, '')

    modalTrigger.addEventListener('click', event => {
      event.preventDefault()
      triggerModal(event.target, relativeUrl)
    })
  })
}, { once: true })
