import cutdownFileName from '../src/components/cutdownFileName'

test('字符串处理测试', () => {
  const str = 'README.md'
  expect(cutdownFileName(str)).toBe('README.md')
})

test('小于 40 字符文件名', () => {
  const str = '//localhost/all-contributorsrc'
  expect(cutdownFileName(str)).toBe('all-contributorsrc')
})

test('大于 40 字符文件名', () => {
  const fileName = 'pneumonoultramicroscopicsilicovolcanoconiosis-plan.txt'
  const str = `//localhost/${fileName}`
  expect(cutdownFileName(str)).toBe(`${fileName.slice(0, 40)}...`)
})

test('大于 40 字符中英文混合', () => {
  const fileName = '苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'
  const str = `//localhost/${fileName}`
  expect(cutdownFileName(str)).toBe(`${fileName.slice(0, 40)}...`)
})

test('特殊字符', () => {
  const str1 = '//localhost/example+1.png'
  const str2 = '//localhost/example%2B1.png'

  expect(cutdownFileName(str1)).toBe('example+1.png')
  expect(cutdownFileName(str2)).toBe('example+1.png')
})
