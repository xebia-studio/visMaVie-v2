import {wording, showCaseItems, run} from '../../constants/creations.constants';


export default class CreationsCtrl {
  constructor(ContributionsSvc) {
    this.contributionsSvc = ContributionsSvc;

    this.showCaseTitle = 'Nos contributions';
    this.showCaseMainDescription = 'Chacun sa voix pour faire grandir Xebia';
    this.wording = wording;
    this.showCaseItems = showCaseItems;
    this.run = run;
  }

}

CreationsCtrl.$inject = ['ContributionsSvc'];