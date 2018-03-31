// # Carousel

const wrapperClass = 'js-carousel'
const itemClass = 'js-carousel-item'
const itemHiddenClass = 'carousel__item--hidden'
const groupSize = window.innerWidth < 600 ? 4 : 8

// ## Methods
const scheduleUpdate = (carouselItemElements, groupNumber = 0) =>{
  window.setTimeout(
    () => updateDisplay(carouselItemElements, groupNumber),
    10000
  )
}
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

  currentGroup = isLastGroup ? 0 : currentGroup

  Array.from(carouselItemElements).forEach((item, index) => {
    const itemIsInCurrentGroup = index >= groupStart && index < groupEnd

    if (itemIsInCurrentGroup) {
      item.classList.remove(itemHiddenClass)
    } else {
      item.classList.add(itemHiddenClass)
    }
  })

  scheduleUpdate(carouselItemElements, nextGroup)
}

// ## Bind events
window.addEventListener('load', () => {
  const carouselElement = document.getElementsByClassName(wrapperClass)[0]

  if (!carouselElement) return
  startRotation(carouselElement)
})
