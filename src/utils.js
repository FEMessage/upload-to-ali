export function encodePath(url) {
  return url
    .split('/')
    .map(str => encodeURIComponent(str))
    .join('/')
}

export function getBasename(url = '') {
  const filename = decodeURIComponent(url.split('/').pop())
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
