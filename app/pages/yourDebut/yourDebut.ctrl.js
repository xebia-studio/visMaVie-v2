import choixMissionsTemplateUrl from '!!file!./answersTemplates/choixMissions.tpl.html';
import dureeMissionsTemplateUrl from '!!file!./answersTemplates/dureeMission.tpl.html';
import missionsClientTemplateUrl from '!!file!./answersTemplates/missionsClient.tpl.html';

export default class YourDebutCtrl {
  constructor() {
    this.faqItems = [
        {
            question:`Quelle possibilité d'évolution ?`,
            answersTemplates: [
                choixMissionsTemplateUrl,
                dureeMissionsTemplateUrl,
                missionsClientTemplateUrl
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