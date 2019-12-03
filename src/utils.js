import crypto from 'crypto-browserify'

export function getSignature(origin, timestamp) {
  const param = {
    origin,
    timestamp,
    signatureMethod: 'HMAC-SHA1'
  }
  const paramStr = Object.keys(param)
    .sort()
    .map(k => `${k}=${encodeURIComponent(param[k])}`)
    .join('&')
  const signStr = 'POST&%2F&' + encodeURIComponent(paramStr)

  return crypto
    .createHmac('sha1', 'nonce')
    .update(signStr)
    .digest('base64')
}

export function getBasename(url = '') {
  const filename = decodeURIComponent(url.split('/').pop())
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}
