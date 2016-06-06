import {testSections} from '../../constants/passions.constants';

export default class OurPassionsCtrl {
  constructor() {
    this.showCaseTitle = 'Nos passions';
    this.showCaseMainDescription = 'Pratiquer les technologies de demain';

    this.testSections = testSections;
    console.log(this.testSections);
    this.currentQuizz = this.testSections[0];
    this.answers = [];
    this.currentQuestion = 0;
    this.timer = this.resetTimer();
  }

  resetTimer(){
    return {
      enabled: false,
      value: 3
    }
  }

  resetTest(){
    this.currentQuestion = 0;
    this.timer = this.resetTimer();
    this.answers = [];
  }

  chooseTest(index) {
    this.currentQuizz = this.testSections[index];
    this.resetTest();
  }

  answerQuestion(index) {
    if(!this.timer.enabled) {
      this.answers.push(index);
      // TODO is not started, start timer then call goToNextQuestion. Else, just wait
      return;
    }
    this.modifyQuestion(index);
  }

  modifyQuestion(index){
    this.answers[this.currentQuestion] = index;
  }

  goToNextQuestion(){
    this.timer = this.resetTimer();
    this.currentQuestion += 1;
  }

}

OurPassionsCtrl.$inject = [];