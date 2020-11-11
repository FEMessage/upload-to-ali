import Vue, {VueConstructor} from 'vue'

declare module '@femessage/upload-to-ali' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type UploadToAliData = {
    previewUrl: string

    uploading: boolean

    isHighlight: boolean
  }

  type UploadToAliMethods = {
    selectFiles: () => void
  }

  type UploadToAliComputed = {
    uploadList: any[]
    canUpload: boolean
    uploadRequest: (file: any) => Promise<string>
  }

  type UploadToAliProps = {
    action: string
    bucket: string
    region: string
    dir: string
    customDomain: string
    value: string | any[]
    multiple: boolean
    size: number
    accept: string
    timeout: number
    disabled: boolean
    max: number
    compressOptions: {[key: string]: any}
    uploadOptions: {[key: string]: any}
    preview: boolean
    tip: string
    onClick: (url: string, isFile: boolean) => void
    beforeUpload: (files: any[]) => Promise<any>
    onOversize: (fileOvesize: any) => void
    request: (file: any) => Promise<string>
  }

  type UploadToAli = Combined<
    UploadToAliData,
    UploadToAliMethods,
    UploadToAliComputed,
    UploadToAliProps
  >

  export interface UploadToAliType extends FemessageComponent, UploadToAli {}

  const UploadToAliConstruction: ExtendedVue<
    Vue,
    UploadToAliData,
    UploadToAliMethods,
    UploadToAliComputed,
    UploadToAliProps
  >

  export default UploadToAliConstruction
}
