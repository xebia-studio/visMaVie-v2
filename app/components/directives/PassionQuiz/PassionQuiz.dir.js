import './PassionQuiz.less';
import {wording} from '../../../constants/passions.constants';

let PassionQuiz = {
  template: require('./PassionQuiz.tpl.html'),
  bindings: {
    content: '<'
  },
  controller: function($interval, QuizSvc){
    this.$interval = $interval;
    this.quizSvc = QuizSvc;
    
    this.currentQuizStarted = false;
    this.currentQuizEnded = false;
    this.quizState = 'Questions';
    this.answers = [];
    this.currentQuestion = 0;
    this.timer = {enabled: false, value: 3};
    this.wording = wording;

    //-----------------------------------//

    // When the test changes
    this.$onChanges = () => {
      this.resetTest();
    };

    this.resetTest = () => {
      this.currentQuizStarted = false;
      this.currentQuestion = 0;
      this.timer = this.resetTimer();
      this.answers = [];
    };

    this.resetTimer = () => {
      return {
        enabled: false,
        value: 3
      }
    };

    this.launchTimer = () => {
      var self = this;
      this.timer.enabled = true;

      var timer = this.$interval(function(){
        if(self.timer.value > 1){
          self.timer.value--;
        }else{
          stopTimer();
        }
      }, 1000);

      var stopTimer = () => {
        self.$interval.cancel(timer);
        self.goToNextQuestion()
      }
    };

    this.startQuiz = () => {
      this.currentQuizStarted = true;
    };

    this.answerQuestion = (index) => {
      if (!this.timer.enabled) {
        this.answers.push(index);
        this.launchTimer();
        return;
      }
      this.modifyQuestion(index);
    };

    this.modifyQuestion = (index) => {
      this.answers[this.currentQuestion] = index;
    };

    this.goToNextQuestion = () => {
      this.timer = this.resetTimer();
      if(this.currentQuestion < this.content.questions.length-1){
        this.currentQuestion += 1;
        return;
      }
      this.showAnswers();
    };

    this.showAnswers = () => {
      this.currentQuizEnded = true;
      this.quizState = 'Réponses';
    };

    this.downloadPdf = () => {

    };
  }
};

PassionQuiz.$inject = ['$interval', 'QuizSvc'];

export default PassionQuiz;