// # Carousel

const wrapperClass = 'js-carousel'
const itemClass = 'js-carousel-item'
const itemHiddenClass = 'is-hidden'
const animationDuration = 400 // Milliseconds
const groupSize = window.innerWidth < 600 ? 4 : 8
const updateDelay = 3 // Seconds

// ## Methods
const hideItems = (itemElements, callback) => {
  var callbackWasRun = false
  const runCallback = () => {
    if (callbackWasRun) return
    callback()
    callbackWasRun = true
  }
  const hideItem = (item) => {
    item.style.display = 'none'
    runCallback()
  }

  itemElements.forEach((item, index) => {
    item.classList.add(itemHiddenClass)
    window.setTimeout(
      () => hideItem(item),
      animationDuration
    )
  })
}

const showItems = itemElements =>
  itemElements.forEach(item => {
    item.style.display = 'block'
    window.requestAnimationFrame(() =>
      item.classList.remove(itemHiddenClass)
    )
  })

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
  const currentGroupItems = Array.from(carouselItemElements).filter((item, index) => isItemInCurrentGroup(index))
  const otherGroupItems = Array.from(carouselItemElements).filter((item, index) => !isItemInCurrentGroup(index))

  hideItems(otherGroupItems, () => {
    showItems(currentGroupItems)
    scheduleUpdate(carouselItemElements, nextGroup)
  })
}

// ## Bind events
window.addEventListener('load', () => {
  const carouselElement = document.getElementsByClassName(wrapperClass)[0]

  if (!carouselElement) return
  startRotation(carouselElement)
}, { once: true })
