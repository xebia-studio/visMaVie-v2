/*******************************************/
/*          PASSIONS CONSTANTS             */
/*******************************************/


const testScalability = {
  categoryName: 'Scalabilité et résilience',
  title: 'Concevoir et mettre en oeuvre une architecture scalable et résiliente capable de traiter les fortes charges',
  description: '<b>MSH</b> est une application Ingenico permettant aux banques, aux enseignes et aux commerçants ' +
  'de provisionner des terminaux bancaires et de constituer un ensemble de reporting sur leur utilisation.' +
  'L\'architecture sous-jacente hébergée sur AWS a été conçue <b>microservice</b> (Akka, Docker), distribuée et ' +
  'scalable (Mesos, Marathon), réactive (Play) et résiliente (Kafka).',
  questions: [
    {
      libelle: 'Comment s\'appelle <b>l\'unité d\'exécution de tâches</b> dans Akka ?',
      choices: ['Un worker', 'Un Actor', 'Un stream'],
      indexAnswer: 1
    },
    {
      libelle: 'Dans Akka, comment  <b>communiquent les unités d\'exécution</b> entre elles ?',
      choices: ['Par messages et mailbox', 'Par messages et mailbox', 'Par messages et mailbox'],
      indexAnswer: 0
    },
    {
      libelle: 'Quel service AWS permet de créer des <b>instances de serveurs</b> ?',
      choices: ['EC2', 'EC2', 'EC2'],
      indexAnswer: 0
    },
    {
      libelle: 'Quelle technologie propose un système de messaging distribué, persistant et capable de reprise sur erreur ?',
      choices: ['Kafka', 'Kafka', 'Kafka'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel framework front-end, proposé initialement par Facebook, permet de réaliser des interfaces utilisateurs ?',
      choices: ['VueJS', 'AngularJS', 'React'],
      indexAnswer: 2
    },
    {
      libelle: 'Quelle architecture est conseillée pour créer des applications web en se basant sur les composants React ?',
      choices: ['Flux', 'Flux', 'Flux'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel manager de cluster de la fondation Apache permet de déployer des services en s\'abstrayant ' +
      'des ressources systèmes ?',
      choices: ['Mesos', 'Mesos', 'Mesos'],
      indexAnswer: 2
    },
    {
      libelle: 'Quel est le rôle de Marathon au sein d\'un cluster Mesos ?',
      choices: ['Lancer et maintenir des tâches de langue durée', 'Lancer et maintenir des tâches de langue durée', 'Lancer et maintenir des tâches de langue durée'],
      indexAnswer: 0
    }
  ],
  pdf: 'path/to/answers.pdf'
};

const testTransformation = {
  categoryName: 'Transformation à l\'échelle',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

const testTTM = {
  categoryName: 'Raccourcir le TTM',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

const testData = {
  categoryName: 'Valorisation des données',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

const testCleanCode = {
  categoryName: 'Un code propre',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

const testInterfaces = {
  categoryName: 'Interfaces adaptées',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

const testMobility = {
  categoryName: 'Application et mobilité',
  title: '',
  description: '',
  questions: [],
  pdf: 'path/to/answers.pdf'
};

export const testSections = [
  testScalability,
  testTransformation,
  testTTM,
  testData,
  testCleanCode,
  testInterfaces,
  testMobility
];

