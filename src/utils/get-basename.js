export default function getBasename(url) {
  const filename = url ? decodeURIComponent(url.split('/').pop()) : ''
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
