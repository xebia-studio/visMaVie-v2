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
  {id: 0, libelle: `Il est important pour moi de transmettre mon savoir`, answeredYes: 6, answeredNo: 2},
  {id: 1, libelle: `Ecrire est pour moi le meilleur moyen`, answeredYes: 3, answeredNo: 4},
  {id: 2, libelle: `J'aimerais beaucoup que les DSI comprennent mes problématiques`, answeredYes: 5, answeredNo: 6},
  {id: 3, libelle: `Je préfère partager avec ma communauté`, answeredYes: 2, answeredNo: 5},
  {id: 4, projectFound: 0},
  {id: 5, projectFound: 0},
  {id: 6, projectFound: 0}
];

export const projects = [
  {
    id: 0,
    image: 'xebia-tv-background.jpg',
    icon: 'xebiatv.svg',
    title: `Xebia TV, la web TV de Xebia.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Alexandre Dergham, consultant chez Xebia, témoigne  “Le premier souhait était de partager nos sessions de partage de connaissance avec l’extérieur. Nous considérons que nos XKE (Xebia Knowledge Exchange) sont d’une grande valeur et qu’ils peuvent intéresser beaucoup de développeurs. Le XKE de septembre 2014 était organisé en hackathon. Nous avons donc profité pour développer la première version du site XebiaTV. Puis, nous l’avons ensuite affiné pendant un mois avant sa mise en production.”
http://www.xebia.tv/`
  },
  {
    id: 1,
    image: 'xebia-tv-background.jpg',
    icon: 'atelier.svg',
    title: `Datalake Platform.`,
    contributors: ['Mathieu Blanc', 'Julien Buret'],
    description: `Deux consultants Xebia sont partis d’un constat simple : ils sont amenés à refaire les mêmes tâches lors de leur mission Data. Ainsi, leur est venue l’idée de développer le DataLake Platform. 
Ce logiciel bientôt open source propose de simplifier et d’automatiser les tâches communes de management des données, quelles que soient leur format, leur nature ou leur origine. Cet outil permet aux développeurs de se concentrer uniquement sur les tâches à forte valeur ajoutée, sans avoir à redévelopper à chaque fois le processus d’ingestion de la donnée. 
Datalake Platform est conçu nativement sur les technologies Open Source de l’écosystème Big Data (Hadoop, Spark, Hive, Impala etc.) 
`
  },
  {
    id: 2,
    image: 'xebia-tv-background.jpg',
    icon: 'xebiatv.svg',
    title: `Xebia TV, la web TV de Xebia.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Alexandre Dergham, consultant chez Xebia, témoigne  “Le premier souhait était de partager nos sessions de partage de connaissance avec l’extérieur. Nous considérons que nos XKE (Xebia Knowledge Exchange) sont d’une grande valeur et qu’ils peuvent intéresser beaucoup de développeurs. Le XKE de septembre 2014 était organisé en hackathon. Nous avons donc profité pour développer la première version du site XebiaTV. Puis, nous l’avons ensuite affiné pendant un mois avant sa mise en production.”
http://www.xebia.tv/`
  },
  {
    id: 3,
    image: 'xebia-tv-background.jpg',
    icon: 'xebiatv.svg',
    title: `Xebia TV, la web TV de Xebia.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Alexandre Dergham, consultant chez Xebia, témoigne  “Le premier souhait était de partager nos sessions de partage de connaissance avec l’extérieur. Nous considérons que nos XKE (Xebia Knowledge Exchange) sont d’une grande valeur et qu’ils peuvent intéresser beaucoup de développeurs. Le XKE de septembre 2014 était organisé en hackathon. Nous avons donc profité pour développer la première version du site XebiaTV. Puis, nous l’avons ensuite affiné pendant un mois avant sa mise en production.”
http://www.xebia.tv/`
  },
  {
    id: 4,
    image: 'xebia-tv-background.jpg',
    icon: 'xebiatv.svg',
    title: `Xebia TV, la web TV de Xebia.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Alexandre Dergham, consultant chez Xebia, témoigne  “Le premier souhait était de partager nos sessions de partage de connaissance avec l’extérieur. Nous considérons que nos XKE (Xebia Knowledge Exchange) sont d’une grande valeur et qu’ils peuvent intéresser beaucoup de développeurs. Le XKE de septembre 2014 était organisé en hackathon. Nous avons donc profité pour développer la première version du site XebiaTV. Puis, nous l’avons ensuite affiné pendant un mois avant sa mise en production.”
http://www.xebia.tv/`
  }
];