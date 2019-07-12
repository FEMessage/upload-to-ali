import Vue from 'vue'
import UploadItem from '@/components/upload-item.vue'

describe('upload-item.vue', () => {
  let Constructor
  beforeEach(() => {
    Constructor = Vue.extend(UploadItem)
  })

  test('字符串处理测试', () => {
    const vm = new Constructor({
      propsData: {url: 'README.md'}
    })
    expect(vm.fileName).toBe('README.md')
  })

  test('小于 40 字符文件名', () => {
    const vm = new Constructor({
      propsData: {url: '//localhost/all-contributorsrc'}
    })
    expect(vm.fileName).toBe('all-contributorsrc')
  })

  test('大于 40 字符文件名', () => {
    const vm = new Constructor({
      propsData: {url: '//localhost/pneumonoultramicroscopicsilicovolcanoconiosis-plan.txt'}
    })
    expect(vm.fileName).toBe('pneumonoultramicroscopicsilicovolcanocon...')
  })

  test('大于 40 字符中英文混合', () => {
    const vm = new Constructor({
      propsData: {url: '//localhost/苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemon.md'}
    })
    expect(vm.fileName).toBe('苹果apple香蕉banana西瓜watermelon桃子peach柠檬lemo...')
  })
})
