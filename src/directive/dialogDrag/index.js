import drag from './drag'

const install = app => {
  app.directive('drag', drag)
}

export default install
