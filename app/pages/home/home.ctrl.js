import {homeXebians} from '../../app.constants';

export default class HomeController {
  constructor(){
    this.xebians = homeXebians;

    this.showCaseTitle = 'Vis ma vie de consultant chez Xebia';
    this.showCaseMainDescription = 'Explorez notre univers et nos expertises technologiques';
    this.showCaseSubDescription = '#BeBrave #BeaXebian';

    this.numbersCards = [
      {
        icon: 'assets/icons/icon-brain-vert.svg',
        background: '',
        title: '5%',
        content: 'du CA dédié aux XKE'
      },
      {
        icon: 'assets/icons/icon-people-vert.svg',
        background: '',
        title: '125',
        content: 'Consultants en France'
      },
      {
        icon: 'assets/icons/icon-pen-vert.svg',
        background: '',
        title: '1800',
        content: 'Articles de blog'
      },
      {
        icon: 'assets/icons/icon-world-vert.svg',
        background: '',
        title: '15',
        content: 'Ans'
      },
      {
        icon: 'assets/icons/icon-birthday-cake-vert.svg',
        background: '',
        title: '45',
        content: 'Millions de CA'
      },
      {
        icon: 'assets/icons/icon-evolution-vert.svg',
        background: '',
        title: '3',
        content: 'Pays'
      }
    ];
  }
}

HomeController.$inject = [];