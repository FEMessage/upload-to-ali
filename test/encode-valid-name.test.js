import encodeValidName from '../src/utils/encode-valid-name'

test('transform0', () => {
  const filename = 'example+1.png'
  expect(encodeValidName(filename)).toBe('example%2B1.png')
})

test('transform1', () => {
  const filename = 'apple/banana/water-melon/example+1.jpg'
  expect(encodeValidName(filename)).toBe('apple/banana/water-melon/example%2B1.jpg')
})
