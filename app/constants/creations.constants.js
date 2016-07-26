/*******************************************/
/*         CREATIONS CONSTANTS             */
/*******************************************/

export const wording = {
  yourContribution: {
    title: `Et vous, quelle contribution est faite pour vous ?`,
    description: `Écrire, enseigner, contruire, manager... Les contributions internes sont nombreseuses et chacun a la possibilité de participer en fonction de ses savoirs-faire et savoirs-être!`
  }
};

/* Showcase items */
export const showCaseItems = [
  {id: 0, icon: `idea.svg`, title: `100%`, description: `des idées issues des consultants`},
  {id: 1, icon: `consultants.svg`, title: ``, description: `Plusieurs consultants par idée`},
  {id: 2, icon: `pizza.svg`, title: `+6000`, description: `pizzas englouties`},
  {id: 3, icon: `ampoule.svg`, title: `+35`, description: `idées actives à ce jour`},
  {id: 4, icon: `progress.svg`, title: `100%`, description: `des consultants ont appris en contribuant`},
  {id: 5, icon: `atelier.svg`, title: ``, description: `Un atelier disponible à tous les consultants`}
];


/*
  Définition de toutes les questions
 */
export const questions = [
  {id: 0, libelle: `Il est important pour moi de transmettre mon savoir`, answeredYes: 1, answeredNo: 2},
  {id: 1, libelle: `Ecrire est pour moi le meilleur moyen`, answeredYes: 3, answeredNo: 4},
  {id: 2, libelle: `J'aimerais beaucoup que les DSI comprennent mes problématiques`, answeredYes: 5, answeredNo: 6},
  {id: 3, libelle: `Je préfère partager avec ma communauté`, projectFound: 0},
  {id: 4, libelle: `Exemple d'intitulé 4`, projectFound: 0},
  {id: 5, libelle: `Exemple d'intitulé 5`, projectFound: 0},
  {id: 6, libelle: `Exemple d'intitulé 6`, projectFound: 0}
];

export const projects = [
  {
    id: 0,
    image: 'xebia-tv-background.jpg',
    icon: 'xebiatv.svg',
    title: `Xebia TV, la web TV de Xebia.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Alexandre Dergham, consultant chez Xebia, témoigne : “Le premier souhait était de partager nos sessions de partage de connaissance avec l’extérieur. Nous considérons que nos XKE (Xebia Knowledge Exchange) sont d’une grande valeur et qu’ils peuvent intéresser beaucoup de développeurs. Le XKE de septembre 2014 était organisé en hackathon. Nous avons donc profité pour développer la première version du site XebiaTV. Puis, nous l’avons ensuite affiné pendant un mois avant sa mise en production.”
http://www.xebia.tv/`
  }
];