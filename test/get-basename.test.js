import getBasename from '../src/utils/get-basename'

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

test('特殊字符', () => {
  const str1 = '//localhost/example+1.png'
  const str2 = '//localhost/example%2B1.png'

  expect(getBasename(str1)).toBe('example+1.png')
  expect(getBasename(str2)).toBe('example+1.png')
})
