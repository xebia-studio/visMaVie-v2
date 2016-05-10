import {websitePages} from '../../app.constants';

export default class HomeController {
  constructor($uibModal, ExampleSvc){
    // TODO for example, must be removed
    this._$uibModal = $uibModal;
    this.pageName = "Vis-ma-vie";
    this.names = ExampleSvc.getNames();
    this.websitePages = websitePages;
    this.buttonDisabled = true;
    // end removal

    this.showCaseTitle = 'Vis ma vie de consultant chez Xebia';
    this.showCaseDescription = 'Explorez notre univers et nos expertises technologiques \n #BeBrave #BeaXebian';
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