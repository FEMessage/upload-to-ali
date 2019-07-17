export function encodeBasename(name) {
  return name
    .split('/')
    .map(str => encodeURIComponent(str))
    .join('/')
}

export function getBasename(url) {
  const filename = url ? decodeURIComponent(url.split('/').pop()) : ''
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
