export function encodeUrl(url) {
  return url
    .split('/')
    .map(str => encodeURIComponent(str))
    .join('/')
}

export function decodeUrl(url) {
  const name = url
    .split('/')
    .pop()

  return decodeURIComponent(name)
}

export function getBasename(url) {
  const filename = url ? decodeUrl(url) : ''
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
