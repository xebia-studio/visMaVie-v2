import {testSections} from '../../constants/passions.constants';

export default class QuizSvc{
  constructor(){
    this.testSections = testSections;
    this.currentQuiz = this.testSections[0];
  }

  chooseQuiz(index) {
    this.currentQuiz = this.testSections[index];
  }
}
