import missionTemplateUrl from '!!file!./answersTemplates/mission.tpl.html';
import evolutionTemplateUrl from '!!file!./answersTemplates/evolution.tpl.html';
import managementTemplateUrl from '!!file!./answersTemplates/management.tpl.html';

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
            question:`Quelles sont les possibilités d’évolution ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplates: evolutionTemplateUrl,
            isOpen: true
        },
        {
            question:`Quelle est la politique de management ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplates: missionTemplateUrl,
            isOpen: false
        }
    ]
  }

}

YourDebutCtrl.$inject = [];