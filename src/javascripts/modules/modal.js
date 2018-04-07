// # Modal

const isUsingIE11 = !!navigator.userAgent.match(/Trident\/7\./)
const modalOpenPageClass = 'modal__page-container'

// ## Methods
const bindCloseModal = (triggerElement, modalElement) => {
  const closeButtonElement = modalElement.getElementsByClassName('js-modal-close')[0]

  closeButtonElement.addEventListener('click', event => {
    closeModal(triggerElement, modalElement)
  }, { once: true })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      closeModal(triggerElement, modalElement)
    }
  }, { once: true });
}

const closeModal = (triggerElement, modalElement) => {
  document.body.classList.remove(modalOpenPageClass)
  modalElement.style.display = 'none'
  triggerElement.focus()
}

const openModal = (triggerElement, modalElement) => {
  const modalFirstHeading = modalElement.querySelectorAll('h1, h2, h3')[0]

  modalElement.style.display = 'block'
  bindCloseModal(triggerElement, modalElement)

  document.body.classList.add(modalOpenPageClass)
  document.body.appendChild(modalElement)

  modalFirstHeading.setAttribute('tabindex', '0')
  modalFirstHeading.focus()
}

// ## Bind events
window.addEventListener('load', () => {
  const modalElement = document.getElementsByClassName('js-contact-modal')
  const modalTriggerElements = document.querySelectorAll('[href*="/contact"]')

  if (!modalElement.length || !modalTriggerElements.length || isUsingIE11) return

  Array.from(modalTriggerElements).forEach(modalTrigger => {
    modalTrigger.addEventListener('click', event => {
      event.preventDefault()
      openModal(event.target, modalElement[0])
    })
  })
}, { once: true })
