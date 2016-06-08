/*******************************************/
/*          PASSIONS CONSTANTS             */
/*******************************************/


const testScalability = {
  categoryName: 'Scalabilité et résilience',
  title: 'Concevoir et mettre en oeuvre une architecture scalable et résiliente capable de traiter les fortes charges.',
  description: '<b>MSH</b> est une application Ingenico permettant aux banques, aux enseignes et aux commerçants ' +
  'de provisionner des terminaux bancaires et de constituer un ensemble de reporting sur leur utilisation.' +
  'L\'architecture sous-jacente hébergée sur AWS a été conçue <b>microservice</b> (Akka, Docker), distribuée et ' +
  'scalable (Mesos, Marathon), réactive (Play) et résiliente (Kafka).',
  questions: [
    {
      libelle: 'Comment s\'appelle <b>l\'unité d\'exécution de tâches</b> dans Akka ?',
      choices: ['Un Worker', 'Un Actor', 'Un Stream'],
      indexAnswer: 1
    },
    {
      libelle: 'Dans Akka, comment  <b>communiquent les unités d\'exécution</b> entre elles ?',
      choices: ['Par IPC', 'Par messages et mailbox', 'Par fichiers'],
      indexAnswer: 0
    },
    {
      libelle: 'Quel service AWS permet de créer des <b>instances de serveurs</b> ?',
      choices: ['EC2', 'S3', 'Lambda'],
      indexAnswer: 0
    },
    {
      libelle: 'Quelle technologie propose un système de messaging distribué, persistant et capable de reprise sur erreur ?',
      choices: ['ZeroMQ', 'Kafka', 'RabbitMQ'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel framework front-end, proposé initialement par Facebook, permet de réaliser des interfaces utilisateurs ?',
      choices: ['VueJS', 'AngularJS', 'React'],
      indexAnswer: 2
    },
    {
      libelle: 'Quelle architecture est conseillée pour créer des applications web en se basant sur les composants React ?',
      choices: ['Stream', 'Flux', 'Backbone'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel manager de cluster de la fondation Apache permet de déployer des services en s\'abstrayant ' +
      'des ressources systèmes ?',
      choices: ['Zookeeper', 'Kubernetes', 'Mesos'],
      indexAnswer: 2
    },
    {
      libelle: 'Quel est le rôle de Marathon au sein d\'un cluster Mesos ?',
      choices: ['Lancer et maintenir des tâches de langue durée', 'Orchestrer des tâches unitaires à exécuter à des intervalles définis', 'Surveiller le bon fonctionnement des noeuds du cluster'],
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
  title: 'Construire des logiciels de très haute qualité reposant sur une base de code facilement évolutive.',
  description: '',
  questions: [
    {
      libelle: 'Votre équipe maintient une bibliothèque utilisée par d’autres. L’une d’entre elles vous remonte une anomalie qu’elle rencontre car elle a configuré la bibliothèque d’une manière que vous n’aviez pas prévu ni même testé. Quelle réponse apportez-vous à l’équipe qui vous soumet l’anomalie ?',
      choices: ['Vous n’utilisez pas la bibliothèque de manière appropriée. Nous allons organiser une réunion d’information pour que tout le monde soit au courant de la manière dont il faut configurer la bibliothèque pour éviter un bug.', 'Vous n’utilisez pas la bibliothèque de manière appropriée. Nous allons faire en sorte que la configuration provoquant le bug soit impossible à mettre en place afin de vous prémunir de ces désagréments.', 'Nous n’avions pas envisagé la manière dont vous utilisez la librairie mais ce cas d’usage reflète un réel besoin. Nous allons prioriser cette évolution dans notre backlog et vous tiendront informé de l’avancement de ce sujet afin que cela soit compatible avec vos engagements.'],
      indexAnswer: 2
    },
    {
      libelle: 'Vous devez implémenter au plus tôt une nouvelle fonctionnalité qui n’a pas d’équivalent sur le marché. Cependant, cette fonctionnalité a une dépendance extrèmement forte vers un partenaire qui ne pourra pas faire d’évolutions sur sa plateforme. Or cette dernière est orienté vers un domaine parallèle au vôtre et donc peu compatible. Comment gérer cette situation ?',
      choices: ['En tant que craftsman, votre devoir est d’apporter le bon niveau d’information technique aux décisionnaires. Ainsi après avoir identifé les incompatibilités entre votre logiciel et celui du partenaire, vous organisez une réunion avec votre PO et le partenaire afin de rapporter les faits et demander un arbitrage.', 'En tant que craftsman, votre devoir est de répondre aux besoins de votre PO. Si il a décidé de prioriser la fonctionnalité novatrice, il faut que vous adaptiez votre application existante au nouveau domaine imposé par le partenaire et trouver des compromis pragmatiques aux incompatibilités.', 'En tant que craftsman, votre devoir est parfois de savoir dire non à une demande insensée qui dénaturerai complètement l’application existante. Vous proposez à votre PO de traiter cette nouvelle fonctionnalité comme une nouvelle application découplée de la vôtre.'],
      indexAnswer: 0
    },
    {
      libelle: 'Quel service AWS permet de créer des <b>instances de serveurs</b> ?',
      choices: ['EC2', 'S3', 'Lambda'],
      indexAnswer: 0
    },
    {
      libelle: 'Quelle technologie propose un système de messaging distribué, persistant et capable de reprise sur erreur ?',
      choices: ['ZeroMQ', 'Kafka', 'RabbitMQ'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel framework front-end, proposé initialement par Facebook, permet de réaliser des interfaces utilisateurs ?',
      choices: ['VueJS', 'AngularJS', 'React'],
      indexAnswer: 2
    },
    {
      libelle: 'Quelle architecture est conseillée pour créer des applications web en se basant sur les composants React ?',
      choices: ['Stream', 'Flux', 'Backbone'],
      indexAnswer: 1
    },
    {
      libelle: 'Quel manager de cluster de la fondation Apache permet de déployer des services en s\'abstrayant ' +
      'des ressources systèmes ?',
      choices: ['Zookeeper', 'Kubernetes', 'Mesos'],
      indexAnswer: 2
    },
    {
      libelle: 'Quel est le rôle de Marathon au sein d\'un cluster Mesos ?',
      choices: ['Lancer et maintenir des tâches de langue durée', 'Orchestrer des tâches unitaires à exécuter à des intervalles définis', 'Surveiller le bon fonctionnement des noeuds du cluster'],
      indexAnswer: 0
    }
  ],
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

