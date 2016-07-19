import choixMissionsTemplateUrl from '!!file!./answersTemplates/choixMissions.tpl.html';
import dureeMissionsTemplateUrl from '!!file!./answersTemplates/dureeMission.tpl.html';
import missionsClientTemplateUrl from '!!file!./answersTemplates/missionsClient.tpl.html';

export default class YourDebutCtrl {
  constructor() {
    this.showCaseTitle = 'Votre intégration';
    this.showCaseMainDescription = 'Les indispensables pour une intégration réussie';
    this.showCaseSubDescription = '';

    this.faqItems = [
        {
            question:`Quelle possibilité d'évolution ?`,
            headerPicture:`/assets/images/integration/mini-mission-xebia-consultant.jpg`,
            answersTemplates: [
                dureeMissionsTemplateUrl,
                missionsClientTemplateUrl,
                choixMissionsTemplateUrl
            ]
        },
        {
            question:`Comment se passent les missions ?`,
            answersTemplates: [
            ]
        }
    ]
  }

}

YourDebutCtrl.$inject = [];