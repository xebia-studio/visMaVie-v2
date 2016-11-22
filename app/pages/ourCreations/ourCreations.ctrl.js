import {wording, showCaseItems, projects} from '../../constants/creations.constants';


export default class CreationsCtrl {
  constructor(ContributionsSvc) {
    this.contributionsSvc = ContributionsSvc;

    this.showCaseTitle = 'Nos créations';
    this.showCaseMainDescription = 'Chacun à sa voix pour grandir et faire grandir Xebia.';
    this.wording = wording;
    this.showCaseItems = showCaseItems;
    this.projects = projects;
  }

}

CreationsCtrl.$inject = ['ContributionsSvc'];