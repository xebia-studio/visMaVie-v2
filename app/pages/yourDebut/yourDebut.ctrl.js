import missionTemplateUrl from '!!file!./answersTemplates/mission.tpl.html';

export default class YourDebutCtrl {
  constructor() {
    this.showCaseTitle = 'Votre intégration';
    this.showCaseMainDescription = 'Les indispensables pour une intégration réussie.';
    this.showCaseSubDescription = '';

    this.faqItems = [
        {
            question:`Comment se passent les missions ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplate: missionTemplateUrl,
            isOpen: true
        },
        {
            question:`Quelle possibilité d'évolution ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplates: missionTemplateUrl,
            isOpen: false
        },
        {
            question:`Quelle est la politique de management ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplates: missionTemplateUrl,
            isOpen: false
        },
    ]
  }

}

YourDebutCtrl.$inject = [];