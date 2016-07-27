import evolutionTemplateUrl from '!!file!./answersTemplates/evolution.tpl.html';

export default class YourDebutCtrl {
  constructor() {
    this.showCaseTitle = 'Votre intégration';
    this.showCaseMainDescription = 'Les indispensables pour une intégration réussie';
    this.showCaseSubDescription = '';

    this.faqItems = [
        {
            question:`Quelle possibilité d'évolution ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplate: evolutionTemplateUrl,
            isOpen: true
        },
        {
            question:`Comment se passent les missions ?`,
            answersTemplates: evolutionTemplateUrl,
            isOpen: true
        }
    ]
  }

}

YourDebutCtrl.$inject = [];