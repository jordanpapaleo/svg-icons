import angular from 'angular'
import ccIcons from './ccIcons'

angular.module('app', [ccIcons])
  .controller('AppController', function () {
    this.testText = 'HI'
  })
