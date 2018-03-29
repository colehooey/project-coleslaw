// # Modal

// ## Cache values
const modalTriggerElement = document.getElementsByClassName('js-navigate-to-contact')


// ## Methods
const bindCloseModal = modalElement => {
  const closeButtonElement = modalElement.getElementsByClassName('js-modal-close')[0]

  closeButtonElement.addEventListener('click', event => {
    closeModal(modalElement)
  })
  document.onkeydown = function(event) {
    if (event.key !== "Escape" && event.key !== "Esc") return
    closeModal(modalElement)
  }
}

const closeModal = modalElement => {
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

  document.body.classList.add('modal__page-container')
  document.body.appendChild(modalElement)
}

const triggerModal = (triggerElem, url) =>
  fetchContent(url).then(pageContent => {
    createModal(pageContent)
  }).catch(error => {
    console.warn(error)
  })


// ## Bind events
window.onload = () => {
  if (!modalTriggerElement) return

  modalTriggerElement[0].addEventListener('click', event => {
    event.preventDefault()
    triggerModal(event.target, '/contact.html')
  })
}
