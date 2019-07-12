function fileName(url) {
  const filename = url ? url.split('/').pop() : ''
  return filename.length > 40 ? `${filename.slice(0, 40)}...` : filename
}

test('字符串处理测试', () => {
  expect(fileName('README.md')).toBe('README.md')
  expect(fileName('//localhost/all-contributorsrc')).toBe('all-contributorsrc')
  expect(
    fileName(
      '//localhost/pneumonoultramicroscopicsilicovolcanoconiosis-plan.txt'
    )
  ).toBe('pneumonoultramicroscopicsilicovolcanocon...')
  expect(
    fileName(
      '//localhost/苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'
    )
  ).toBe('苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemo...')
})
