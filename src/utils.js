export function encodePath(url) {
  return url
    .split('/')
    .map(str => encodeURIComponent(str))
    .join('/')
}

export function decodeBasename(url) {
  const name = url
    .split('/')
    .pop()

  return decodeURIComponent(name)
}

export function getBasename(url = '') {
  const filename = decodeBasename(url)
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
