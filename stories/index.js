import {storiesOf} from '@storybook/vue'
import Basic from './basic.vue'
import Multiple from './multiple.vue'
import Size from './size.vue'
import Max from './max.vue'
import SlotExample from './slot-example.vue'
import ImgPreview from './img-preview.vue'
import OnClick from './on-click.vue'
import NoModel from './no-model.vue'
import SlotDefault from './slot-default.vue'
import Drag from './drag.vue'
import DragMultiple from './drag-multiple.vue'
import Accept from './accept.vue'
import Tip from './tip.vue'
import SlotScope from './slot-scope.vue'

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
  .add('slot-default', () => ({
    components: {SlotDefault},
    template: `<slot-default/>`
  }))
  .add('drag', () => ({
    components: {Drag},
    template: `<Drag/>`
  }))
  .add('drag-multiple', () => ({
    components: {DragMultiple},
    template: `<DragMultiple/>`
  }))
  .add('accept', () => ({
    components: {Accept},
    template: `<Accept/>`
  }))
  .add('tip', () => ({
    components: {Tip},
    template: `<Tip/>`
  }))
  .add('slot-scope', () => ({
    components: {SlotScope},
    template: '<SlotScope/>'
  }))
