export default class HomeController {
  constructor($uibModal){
    this._$uibModal = $uibModal;
    this.pageName = "Vis-ma-vie";
    this.aVariable = "Initial value";
  }

  openModal(){
    this.aVariable = 'New value';

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

HomeController.$inject = ['$uibModal'];