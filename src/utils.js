const events = new Map()

export function addEvent(el, name, fn) {
  events.set(name, fn)
  el.addEventListener(name, fn)
}

export function clearEvent(el) {
  events.forEach((fn, name) => {
    el.removeEventListener(name, fn)
  })
}
