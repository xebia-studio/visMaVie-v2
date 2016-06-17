import {wording} from '../../constants/passions.constants';

export default class OurPassionsCtrl {
  constructor(QuizSvc) {
    this.quizSvc = QuizSvc;
    this.wording = wording;
    this.showCaseTitle = 'Nos passions';
    this.showCaseMainDescription = 'Pratiquer les technologies de demain';
  }

  chooseQuiz(index){
    this.quizSvc.chooseQuiz(index);
  }

  startQuiz(){
    this.quizSvc.startQuiz();
  }
}

OurPassionsCtrl.$inject = ['QuizSvc'];