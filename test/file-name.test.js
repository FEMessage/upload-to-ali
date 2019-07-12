function splitFileName(url) {
  const filename = url ? decodeURIComponent(url.split('/').pop()) : ''
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}

test('字符串处理测试', () => {
  const str = 'README.md'
  expect(splitFileName(str)).toBe('README.md')
})

test('小于 40 字符文件名', () => {
  const str = '//localhost/all-contributorsrc'
  expect(splitFileName(str)).toBe('all-contributorsrc')
})

test('大于 40 字符文件名', () => {
  const str = '//localhost/pneumonoultramicroscopicsilicovolcanoconiosis-plan.txt'
  expect(splitFileName(str)).toBe('pneumonoultramicroscopicsilicovolcanocon...')
})

test('大于 40 字符中英文混合', () => {
  const str = '//localhost/苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'
  expect(splitFileName(str)).toBe('苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemo...')
})

test('特殊字符', () => {
  const str = '//localhost/example+1.png'
  expect(splitFileName(str)).toBe('example+1.png')
})
