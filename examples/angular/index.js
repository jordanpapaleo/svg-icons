import angular from 'angular'
import ccIcons from './ccIcons'
import svgService from '../svgService'

angular.module('app', ['ccIcons'])
  .controller('AppController', function () {
    this.testText = 'Angular Example'
  })
