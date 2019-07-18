import {getBasename, encodeUrl, decodeUrl} from '../src/utils'

describe('getBasename', () => {
  test('字符串处理测试', () => {
    const str = 'README.md'
    expect(getBasename(str)).toBe('README.md')
  })

  test('小于 40 字符文件名', () => {
    const str = '//localhost/all-contributorsrc'
    expect(getBasename(str)).toBe('all-contributorsrc')
  })

  test('大于 40 字符文件名', () => {
    const fileName = 'pneumonoultramicroscopicsilicovolcanoconiosis-plan.txt'
    const str = `//localhost/${fileName}`
    expect(getBasename(str)).toBe(`${fileName.slice(0, 40)}...`)
  })

  test('大于 40 字符中英文混合', () => {
    const fileName = '苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'
    const str = `//localhost/${fileName}`
    expect(getBasename(str)).toBe(`${fileName.slice(0, 40)}...`)
  })
})

describe('decodeUrl', () => {
  test('正常字符转义', () => {
    const str1 = '//localhost/example+1.png'
    expect(decodeUrl(str1)).toBe('example+1.png')
  })

  test('被 encode 字符转义', () => {
    const str2 = '//localhost/example%2B1.png'
    expect(decodeUrl(str2)).toBe('example+1.png')
  })
})

describe('encodeUrl', () => {
  test('文件名内存在特殊字符', () => {
    const filename = 'example+1.png'
    expect(encodeUrl(filename)).toBe('example%2B1.png')
  })

  test('带路径、特殊字符的文件名', () => {
    const filename = 'apple/banana/water-melon/example+1.jpg'
    expect(encodeUrl(filename)).toBe('apple/banana/water-melon/example%2B1.jpg')
  })
})
