import {websitePages} from '../../app.constants';

export default class HomeController {
  constructor($uibModal, ExampleSvc){
    this._$uibModal = $uibModal;
    this.pageName = "Vis-ma-vie";
    this.names = ExampleSvc.getNames();
    this.websitePages = websitePages;

    this.buttonDisabled = true;
  }

  openModal(){
    var modalInstance = this._$uibModal.open({
      animation: true,
      template: '<div class="modal-header">Titre Modale</div>' +
                '<div class="modal-body">Contenu modale</div>',
      size: 'md'
    });

    modalInstance.result
      .then(function(){
        // after modal closed
      });
  }
}

HomeController.$inject = ['$uibModal', 'ExampleSvc'];