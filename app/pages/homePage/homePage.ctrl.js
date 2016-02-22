export default class HomeController {
  constructor(){
    this.pageName = "Vis-ma-vie";
    this.aVariable = "Initial value";
  }

  changeName(){
    this.aVariable = 'New value';
  }
}