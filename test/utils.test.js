import {getBasename, encodePath} from '../src/utils'

describe('getBasename', () => {
  test('仅存在文件名', () => {
    const str = 'README.md'
    expect(getBasename(str)).toBe('README.md')
  })

  test('小于 40 字符文件地址', () => {
    const str = '//localhost/all-contributorsrc'
    expect(getBasename(str)).toBe('all-contributorsrc')
  })

  test('大于 40 字符中英文混合文件地址', () => {
    const fileName = '苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'
    const str = `//localhost/${fileName}`
    expect(getBasename(str)).toBe(`${fileName.slice(0, 40)}...`)
  })

  test('文件名被 encode 的文件地址', () => {
    const str2 = '//localhost/example%2B1.png'
    expect(getBasename(str2)).toBe('example+1.png')
  })
})

describe('encodePath', () => {
  test('文件名带有特殊字符的文件地址', () => {
    const url = '//example+1-1563433997757.jpg'
    expect(encodePath(url)).toBe('//example%2B1-1563433997757.jpg')
  })
})
