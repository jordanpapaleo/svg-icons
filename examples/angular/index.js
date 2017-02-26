angular
  .module('iconTest', [
    'cc.icons'
  ])
  .controller('TestController', function () {
    const vm = this
    vm.text = 'Test'
    vm.rank = 3
  })
