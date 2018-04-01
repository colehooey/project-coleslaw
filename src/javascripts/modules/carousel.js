// # Carousel

const wrapperClass = 'js-carousel'
const itemClass = 'js-carousel-item'
const itemHiddenClass = 'is-hidden'
const groupSize = window.innerWidth < 600 ? 4 : 8
const updateDelay = 10 // Seconds

// ## Methods
const hideItems = (itemElements, callback) => {
  const removeItem = item => {
    item.style.display = 'none'
    callback()
  }

  itemElements.forEach(item => {
    item.classList.add(itemHiddenClass)
    item.addEventListener('transitionend', () => {
      removeItem(item)
    }, { once: true })
  })
}

const showItems = itemElements => {
  itemElements.forEach(item => {
    item.style.display = 'block'
    window.setTimeout(
      () => item.classList.remove(itemHiddenClass),
      60
    )
  })
}

const scheduleUpdate = (carouselItemElements, groupNumber = 0) =>
  window.setTimeout(
    () => updateDisplay(carouselItemElements, groupNumber),
    updateDelay * 1000
  )

const startRotation = carouselElement => {
  const carouselItemElements = carouselElement.getElementsByClassName(itemClass)

  updateDisplay(carouselItemElements)
}

const updateDisplay = (carouselItemElements, currentGroup = 0) => {
  const groupCount = Math.ceil(carouselItemElements.length / groupSize)
  const groupStart = currentGroup * groupSize
  const groupEnd = (currentGroup + 1) * groupSize
  const isLastGroup = currentGroup >= groupCount - 1
  const nextGroup = isLastGroup ? 0 : currentGroup + 1
  const isItemInCurrentGroup = index => index >= groupStart && index < groupEnd

  currentGroup = isLastGroup ? 0 : currentGroup

  const currentGroupItems = Array.from(carouselItemElements).filter((item, index) => isItemInCurrentGroup(index))
  const otherGroupItems = Array.from(carouselItemElements).filter((item, index) => !isItemInCurrentGroup(index))

  hideItems(currentGroupItems, () => showItems(otherGroupItems))
  scheduleUpdate(carouselItemElements, nextGroup)
}

// ## Bind events
window.addEventListener('load', () => {
  const carouselElement = document.getElementsByClassName(wrapperClass)[0]

  if (!carouselElement) return
  startRotation(carouselElement)
}, { once: true })
