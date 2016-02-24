// This module includes all the app services
import ExampleSvc from './Example/example.svc';

export default angular
  .module('visMaVieAppServices', [])
  .service('ExampleSvc', ExampleSvc)
  .name;