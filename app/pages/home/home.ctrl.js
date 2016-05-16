import {homeXebians} from '../../app.constants';

export default class HomeController {
  constructor(){
    this.xebians = homeXebians;

    this.showCaseTitle = 'Vis ma vie de consultant chez Xebia';
    this.showCaseMainDescription = 'Explorez notre univers et nos expertises technologiques';
    this.showCaseSubDescription = '#BeBrave #BeaXebian';
  }
}

HomeController.$inject = [];