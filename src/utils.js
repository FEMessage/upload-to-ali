import crypto from 'crypto-browserify'

/**
 * 签名函数参考
 * https://help.aliyun.com/document_detail/29442.html?spm=a2c4g.11186623.2.13.2c541605Ky1bxj
 */
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
/**
 * 默认上传方法
 * @param {*} file
 */
export function defaultRequest(file) {
  const formData = new FormData()
  ;['bucket', 'region', 'customDomain', 'dir']
    .filter(key => this[key])
    .forEach(key => formData.append(key, this[key]))
  formData.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response.payload.url)
      } else {
        reject(xhr.response)
      }
    }
    xhr.onerror = reject
    const timestamp = Date.now()
    const sep = this.action.indexOf('?') > -1 ? '&' : '?'
    const url = `${this.action}${sep}_=${timestamp}`
    xhr.open('POST', url, true)

    const signature = getSignature(location.origin, timestamp)
    xhr.setRequestHeader('x-upload-timestamp', timestamp)
    xhr.setRequestHeader('x-upload-signature', signature)

    xhr.send(formData)
  })
}
