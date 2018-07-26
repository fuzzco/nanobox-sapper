const channels = {
  z: {
    channel: 'z',
    description: 'Getting nothing but static, getting nothing but static / Static in my attic from Channel Z',
    emits: 'Space Junk',
    listeners: []
  }
}

const check = channel => typeof channels[channel] == 'object'

const register = object => {
  object.listeners = new Array()
  if (check(object.channel)) {
    return false
  } else {
    channels[object.channel] = object
    return true
  }
}

const on = (channel, cb) => {
  if (check(channel)) {
    if (channels[channel].listeners.includes(cb)) {
      return false
    }
    channels[channel].listeners.push(cb)
    return true
  } else {
    return false
  }
}

const emit = (channel, ...params) => {
  if (!channels[channel]) {
    return false
  } else {
    channels[channel].listeners.map(fn => {
      fn(...params)
    })
    return true
  }
}

const off = (channel, cb) => {
 if (!channels[channel]) {
  return false
 } else {
  channels[channel].listeners = channels[channel].listeners.filter(fn => fn != cb)
  return true
 }
}

export const bus = {
  channels: channels,
  register: register,
  check: check,
  on: on,
  emit: emit,
  off: off
}