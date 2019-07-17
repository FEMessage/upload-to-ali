import {encodeBasename} from '../src/utils'

test('文件名内存在特殊字符', () => {
  const filename = 'example+1.png'
  expect(encodeBasename(filename)).toBe('example%2B1.png')
})

test('带路径、特殊字符的文件名', () => {
  const filename = 'apple/banana/water-melon/example+1.jpg'
  expect(encodeBasename(filename)).toBe('apple/banana/water-melon/example%2B1.jpg')
})
