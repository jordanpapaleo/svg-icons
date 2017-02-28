import svgService from './svgService'

export default angular.module('ccIcons', [])
  .factory('TestFactory', function () {
    return {
      getVal () {
        return 1
      }
    }
  })
  // .directive('compIcon', compIcon)
  // .factory('svgService', function() {
  //   return svgService
  // })

  /*
   ex: <comp-icon type="" value=""></comp-icon>
   types: ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
   value: any number
   */
  // compIcon.$inject = ['svgService'];
  //
  // function compIcon (svgService) {
  //   return {
  //     restrict: 'E',
  //     replace: true,
  //     scope: {
  //       type: '@',
  //       value: '@'
  //     },
  //     link (scope, el) {
  //       scope.$watch('type', update)
  //       scope.$watch('value', update)
  //
  //       function update () {
  //         var value = scope.value || ''
  //         var svgTemplate = svgService.getTemplate(scope.type, value)
  //         el.html(svgTemplate)
  //       }
  //     }
  //   }
  // }
