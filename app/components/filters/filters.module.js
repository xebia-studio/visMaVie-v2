// This module includes all the app filters
import ExampleFilter from './Example/example.ftr';

export default angular
  .module('visMaVieAppFilters', [])
  .filter('ExampleFilter', ExampleFilter)
  .name;