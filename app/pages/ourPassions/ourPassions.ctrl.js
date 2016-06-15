export default class OurPassionsCtrl {
  constructor(QuizSvc) {
    this.quizSvc = QuizSvc;

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