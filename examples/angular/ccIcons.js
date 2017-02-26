(function() {
  const {svgService} = window

  /*
   * Has a google map dependency to create map markers
   */

  angular
      .module('cc.icons', [])
      .service('svgService', svgService)
      .directive('compIcon', compIcon)

  /*
   ex: <comp-icon type="" value=""></comp-icon>
   types: ['SALE', 'SALEAPPRAISAL', 'LISTING', 'LISTINGAPPRAISAL', 'VALUE_CONCLUSION']
   value: any number
   */
  // compIcon.$inject = ['svgService']
  // function compIcon () {
  function compIcon (svgservice) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        type: '@',
        value: '@'
      },
      link (scope, el) {
        console.log('scope', scope)
        scope.$watch('type', update)
        scope.$watch('value', update)

        function update () {
          var value = scope.value || ''
          var svgTemplate = svgService.getTemplate(scope.type, value)
          el.html(svgTemplate)
        }
      }
    }
  }
})();
