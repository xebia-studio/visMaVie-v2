import {softSkillsCards} from '../../constants/career.constants';

export default class BoostYourCareerCtrl {
  constructor(){
    this.softSkillsCards = softSkillsCards;

    this.showCaseTitle = 'Accélérez votre carrière';
    this.showCaseMainDescription = "Choisissez votre route, tout est possible, rien n'est écrit.";
    this.showCaseSubDescription = '';
  }
}

BoostYourCareerCtrl.$inject = [];
