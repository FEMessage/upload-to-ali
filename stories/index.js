import {storiesOf} from '@storybook/vue'
import Basic from './basic.vue'
import Multiple from './multiple.vue'
import Size from './size.vue'
import Max from './max.vue'
import SlotExample from './slot-example.vue'
import ImgPreview from './img-preview.vue'
import OnClick from './on-click.vue'
import NoModel from './no-model.vue'
import SlotFile from './slot-file.vue'

storiesOf('upload-to-ali', module)
  .add('basic usage', () => ({
    components: {Basic},
    template: `<basic/>`
  }))
  .add('multiple', () => ({
    components: {Multiple},
    template: `<multiple/>`
  }))
  .add('size', () => ({
    components: {Size},
    template: `<size/>`
  }))
  .add('max', () => ({
    components: {Max},
    template: `<max/>`
  }))
  .add('slot-example', () => ({
    components: {SlotExample},
    template: `<slot-example/>`
  }))
  .add('img-preview', () => ({
    components: {ImgPreview},
    template: `<img-preview/>`
  }))
  .add('on-click', () => ({
    components: {OnClick},
    template: `<on-click/>`
  }))
  .add('no-model', () => ({
    components: {NoModel},
    template: `<no-model/>`
  }))
  .add('slot-file', () => ({
    components: {SlotFile},
    template: `<slot-file/>`
  }))
