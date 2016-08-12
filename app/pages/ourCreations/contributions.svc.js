import {questions, projects} from '../../constants/creations.constants';
let _ = require('lodash');

export default class ContributionsSvc {
  constructor() {
    this.resetQuestions();
  }

  resetQuestions(){
    _.forEach(questions, (question) => {
      _.assign(question, {buttonYesColor: 'cyan', buttonNoColor: 'cyan'});
      delete question.answer;
    });
    this.questionnaire = [questions[0]];
    this.projectFound = null;
  }

  answerQuestion(index, value) {
    this.questionnaire[index].answer = value;

    // Update buttons color according the answer
    if(value === 'yes'){
      this.questionnaire[index] = _.assign(this.questionnaire[index], {buttonYesColor: 'purple', buttonNoColor: 'grey'});
    }else{
      this.questionnaire[index] = _.assign(this.questionnaire[index], {buttonYesColor: 'grey', buttonNoColor: 'purple'});
    }

    // Next question
    const nextIndex = value === 'yes' ? this.questionnaire[index].answeredYes : this.questionnaire[index].answeredNo;
    this.getNextQuestion(nextIndex);
  }

  getNextQuestion(index) {
    const nextQuestion = _.find(questions, {id: index});

    // Check if project found
    if(nextQuestion.hasOwnProperty('projectFound')){
      this.showProjectFound(nextQuestion.projectFound);
      return;
    }

    this.questionnaire.push(nextQuestion);
  }

  showProjectFound(index){
    this.projectFound = _.find(projects, {id: index});
  }
}
