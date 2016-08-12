/*******************************************/
/*         CREATIONS CONSTANTS             */
/*******************************************/

export const wording = {
  yourContribution: {
    title: `Comment partager sa connaissance chez Xebia ?`,
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
  {id: 0, libelle: `Aimez-vous écrire ?`, answeredYes: 1, answeredNo: 2},
  {id: 1, libelle: `Avez-vous déjà écrit pour un blog technique ?`, answeredYes: 5, answeredNo: 4},
  {id: 2, libelle: `Préferez-vous coder ?`, answeredYes: 7, answeredNo: 6},
  {id: 4, projectFound: 4},
  {id: 5, projectFound: 5},
  {id: 6, projectFound: 6},
  {id: 7, libelle: `Pensez-vous être un bon orateur ?`, answeredYes: 8, answeredNo: 9},
  {id: 8, projectFound: 8},
  {id: 9, projectFound: 9}
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
    icon: 'icon-pen-vert.svg',
    title: `Devenez un auteur d'articles de blog.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Sur notre blog, vous retrouvez quotidiennement des articles écrits par les Xebians sur les technologies de demain. Avec plus de 500 000 lecteurs en 2015, notre blog est une véritable vitrine de l'expertise technique de Xebia. Chaque consultant Xebia peut publier sur des sujets qui le passionnent : retours d'expérience, articles techniques ou encore revues de presse hebdomadaires sur des sujets d'actualité. Tous les thèmes et formats sont acceptés pour partager avec les internautes.`
  },
  {
    id: 5,
    image: 'xebia-tv-background.jpg',
    icon: 'techtrends.svg',
    title: `Devenez un auteur de TechTrends.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Les Xebians partagent leurs savoirs faire et leurs expertises en écrivant des Livres Blancs qui permettent de guider, éclairer, identifier et palier des problèmes rencontrés au sein des DSI.
 	Pablo Lopez, CTO témoigne : “Le monde des nouvelles technologies évolue de plus en plus vite et apporte chaque année son lot d’usages nouveaux et d’innovations, tous plus prometteurs les uns que les autres. Cependant, cette foison de nouveaux concepts technologiques et méthodologiques s’accompagne d’un dilemme. Il s’agira de choisir entre expérimenter, adopter (ou non) en différenciant le mainstream de l’effet de mode.`
  },
  {
    id: 6,
    image: 'xebia-tv-background.jpg',
    icon: 'xskillz.svg',
    title: `Développez des idées innovantes.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Proposez des idées d'application pour augmenter la visibilité de Xebia ou encore aider le marketing dans le développement d'applications natives pour leurs prochains gros événements. Seul ou avec des pairs, nous encourageons ces prises d'initiatives.`
  },
  {
    id: 8,
    image: 'xebia-tv-background.jpg',
    icon: 'devoxx.svg',
    title: `Devenez conférencier.`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Nous donnons l'opportunité à nos consultants de présenter des CFPs pour des conférences comme Devoxx.`
  },
  {
    id: 9,
    image: 'xebia-tv-background.jpg',
    icon: 'xke.svg',
    title: `Devenez speaker au XKE`,
    contributors: ['Nom contributeur 1', 'Nom contributeur 2'],
    description: `Nous avons à coeur de faire monter en compétence les soft skills de nos consultants. En plus de formations distribuées dans l'année, nous permettons aux consultants de proposer des conférences une fois par mois lors de nos XKE (la journée de partage de la connaissance).`
  }
];