import {throttle} from './throttle.js'
import {bus} from './bus.js'

const emit = () => {
  bus.emit('scrolling', window.pageYOffset)
}

const optimizedScroll = throttle(emit)

export const scrolling = () => {
  bus.register({ channel: 'scrolling', emits: 'window.pageYOffset', description: 'Window is scrolling, emits location of window top.'})
  window.addEventListener("scroll", optimizedScroll)
}