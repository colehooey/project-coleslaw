// # Modal

const isUsingIE11 = !!navigator.userAgent.match(/Trident\/7\./)
const modalOpenPageClass = 'modal__page-container'

// ## Methods
const bindCloseModal = modalElement => {
  const closeButtonElement = modalElement.getElementsByClassName('js-modal-close')[0]

  closeButtonElement.addEventListener('click', event => {
    closeModal(modalElement)
  })
  document.onkeydown = function(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeModal(modalElement)
    }
  }
}

const closeModal = modalElement => {
  document.onkeydown = null
  document.body.classList.remove(modalOpenPageClass)
  modalElement.remove()
}

const createModal = content => {
  const sourcePageContent = document.createElement('div')

  // Get page content
  sourcePageContent.innerHTML = content
  const modalElementContent = sourcePageContent.getElementsByClassName('js-page-content')[0]

  openModal(modalElementContent)
}

const fetchContent = url =>
  fetch(url).then(response => response.text())

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
  const modalTriggerElement = document.getElementsByClassName('js-navigate-to-contact')

  if (!modalTriggerElement || isUsingIE11) return

  modalTriggerElement[0].addEventListener('click', event => {
    event.preventDefault()
    triggerModal(event.target, '/contact.html')
  })
})
