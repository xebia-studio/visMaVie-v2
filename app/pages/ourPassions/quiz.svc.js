import {testSections} from '../../constants/passions.constants';

export default class QuizSvc{
  constructor($interval){
    this.$interval = $interval;

    this.testSections = testSections;
    this.currentQuiz = this.testSections[0];
    this.currentQuizStarted = false;
    this.currentQuizEnded = false;
    this.quizState = 'Questions';
    this.answers = [];
    this.currentQuestion = 0;
    this.timer = this.resetTimer();
  }

  resetTimer() {
    return {
      enabled: false,
      value: 3
    }
  }

  launchTimer() {
    var self = this;
    this.timer.enabled = true;

    var timer = this.$interval(function(){
      if(self.timer.value > 0){
        self.timer.value--;
      }else{
        stopTimer();
      }
    }, 1000);

    var stopTimer = function(){
      self.$interval.cancel(timer);
      self.goToNextQuestion()
    }
  }

  startQuiz(){
    this.currentQuizStarted = true;
  }

  resetTest() {
    this.currentQuizStarted = false;
    this.currentQuestion = 0;
    this.timer = this.resetTimer();
    this.answers = [];
  }

  chooseQuiz(index) {
    this.currentQuiz = this.testSections[index];
    this.resetTest();
  }

  answerQuestion(index) {
    if (!this.timer.enabled) {
      this.answers.push(index);
      this.launchTimer();
      return;
    }
    this.modifyQuestion(index);
  }

  modifyQuestion(index) {
    this.answers[this.currentQuestion] = index;
  }

  goToNextQuestion() {
    this.timer = this.resetTimer();
    if(this.currentQuestion < this.currentQuiz.questions.length-1){
      this.currentQuestion += 1;
      return;
    }
    this.showAnswers();
  }
  
  showAnswers(){
    this.currentQuizEnded = true;
    this.quizState = 'Réponses';
  }
}

QuizSvc.$inject = ['$interval'];