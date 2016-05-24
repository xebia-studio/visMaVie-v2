import {homeXebians} from '../../app.constants';

export default class HomeController {
  constructor(){
    this.xebians = homeXebians;

    this.showCaseTitle = 'Vis ma vie de consultant chez Xebia';
    this.showCaseMainDescription = 'Explorez notre univers et nos expertises technologiques';
    this.showCaseSubDescription = '#BeBrave #BeaXebian';

    this.numbersCards = [
      {
        icon: 'assets/icons/icon-brain-white.svg',
        background: 'assets/images/home/xebia-xke-vismavie-background.jpg',
        title: '5%',
        content: 'du CA dédié aux XKE'
      },
      {
        icon: 'assets/icons/icon-people-white.svg',
        background: 'assets/images/home/xebia-consultants-vismavie-background.jpg',
        title: '125',
        content: 'Consultants en France'
      },
      {
        icon: 'assets/icons/icon-pen-white.svg',
        background: 'assets/images/home/xebia-blog-background.jpg',
        title: '1800',
        content: 'Articles de blog'
      },
      {
        icon: 'assets/icons/icon-world-white.svg',
        background: 'assets/images/home/xebia-haussmann-background.jpg',
        title: '15',
        content: 'Ans'
      },
      {
        icon: 'assets/icons/icon-birthday-cake-white.svg',
        background: 'assets/images/home/xebia-birthday-background.jpg',
        title: '45',
        content: 'Millions de CA'
      },
      {
        icon: 'assets/icons/icon-evolution-white.svg',
        background: 'assets/images/home/xebia-ca-background.jpg',
        title: '3',
        content: 'Pays'
      }
    ];
  }
}

HomeController.$inject = [];