/*
Drew Lesh
CIT 281 - Project 4
5.12.23
*/

const p4_Data = require('./p4-data.js');
const data = p4_Data.data;
// console.log(data);

// getQuestions: Returns an array of strings where each array element is a question.
function getQuestions() {
    const questionKey = [];
    for (const property of data) {
        //console.log(q["question"]);
        questionKey.push(property["question"]);
    }
    //console.log(questionKey);
    return questionKey;
}

// Returns an array of strings where each array element is an answer from data.
function getAnswers() {
    const answerKey = [];
    for (const property of data) { answerKey.push(property["answer"]) } 
    return answerKey;
}

// getQuestionsAnswers: Returns a copy of the original data array of objects. Avoid making a mutable copy
function getQuestionsAnswers() {
    // const key = [];
    // for (const obj of data) {
    //     const o = {};
    //     for (const property in obj) {
    //         o[property] = obj[property];
    //     }
    //     key.push(o);
    // }
    // console.log(key === data);
    // return key;
    const clonedObj = [...data];
    return clonedObj
}

// getQuestion: Returns an object with 3 properties: question, number and error
function getQuestion(number = "") {
    let newObj = {};
    if (number >= 1 && number <= 3) {
        newObj = { ...newObj, error: "", question: data[number-1]['question'], number: parseInt(data[number-1]['question'].slice(-1)) };
    } else if(number > 3){
        newObj = {error: "Question number must be less than the number of questions (3)", question: "", number: ""};
    } else if(parseInt(number) < 1) { // Note: use parseInt b/c (number="" < 1) is true
        newObj = {error: "Question number must >=1", question: "", number: ""};
    } else {
        newObj = {error: "Question number must be an integer", question: "", number: ""};
    }
    // console.log(newObj)
    return newObj;
}

// getAnswer: Returns an object with 3 properties: answer, number, error
function getAnswer(number = "") {
    let newObj = {};
    if (number >=1 && number <= 3) {
        newObj = { error: "", answer: data[number-1]['answer'], number: parseInt(data[number-1]['question'].slice(-1)) };
        // newObj.answer = data[number-1]['answer'];
        // newObj.number = parseInt(data[number-1]['question'].slice(-1));
        // newObj.error = "";
    } else if (parseInt(number) < 1) {
        newObj = {error: "Answer number must be >=1", answer: "", number: ""};
    } else if (number > 3) {
        newObj = {error: "Answer number must be less than the number of questions (3)", answer: "", number: ""};
    } else {
        newObj = {error: "Answer number must be an integer", answer: "", number: ""};
    }
    return newObj;
}
//console.log(getAnswer());

/* 
getQuestionAnswer: Returns an object with 4 properties: 
    question(string): The question from the data.
    answer (string): Answer from the data.
    number (integer): Question number, not the index array value
    error(string): Message error property for any errors while getting the question
*/
function getQuestionAnswer(number="") {
    let newObj = {};
    if (number >=1 && number <=3) {
        newObj = { ...newObj, error: "", question: data[number-1]['question'], answer: data[number-1]['answer'], number: parseInt(data[number-1]['question'].slice(-1)) };
    } else if (number > 3) {
        newObj = {error: "Question number must be less than the number of questions (3)", question: "", answer: "", number: ""};
    } else if(parseInt(number) < 1) { 
        newObj = {error: "Question number must be >=1", question: "", answer: "", number: ""};
    } else {
        newObj = {error: "Question number must be an integer", question: "", answer: "", number: ""};
    }
    return newObj;
}
//console.log(getQuestionAnswer());

// 
function addQuestionAnswer(info = {}) {
    let newObj = {};
    if (info.hasOwnProperty('answer') && info.hasOwnProperty('question')) {
        newObj = {error: "", message: "Question Added", number: parseInt(info['question'].slice(-1))};
        data.push(info);
    } else if (info.hasOwnProperty('answer')) {
        newObj = {error: "Object question property required", message: "", number: -1};
    } else if (info.hasOwnProperty('question')) {
        newObj = {error: "Object answer property required", message: "", number: -1};
    } else {
        newObj = {error: "Object question property required", message: "", number: -1};
    }
    return newObj;
}

function updateQuestionAnswer(info = {}) {
    let newObj = {};
    if (info.hasOwnProperty('answer') && info.hasOwnProperty('question') && info.hasOwnProperty('number')) {

        data[info.number-1]["question"] = info['question'];
        data[info.number-1]["answer"] = info['answer'];
        newObj = { error: "", message: "Question 1 updated", number: info.number};

    } else if (info.hasOwnProperty('number') && info.hasOwnProperty('answer')) {

        data[info.number-1]["answer"] = info['answer'];
        newObj = { error: "", message: `Question ${info.number} updated`, number: info.number};

    } else if (info.hasOwnProperty('number') && info.hasOwnProperty('question')) {

        data[info.number-1]["question"] = info['question'];
        newObj = { error: "", message: `Question ${info.number} updated`, number: info.number};

    } else if (info.number > data.length || info.number < 1) {
        newObj = { error: "Object number property must be a valid integer", message: "", number: ""};
    } else {
       newObj = { error: "Object question property or answer property required", message: "", number: ""};
    }
    return newObj;
}

function deleteQuestionAnswer(info = {}) {
    let newObj = {};
    if (info <= data.length && info >= 1) {
        data.splice(info-1, 1);
        newObj = {error: "", message: `Question ${info} deleted`, number: info};
    } else if (info <= 0) {
        newObj = {error: "Question/answer number must be >= 1", message: "", number: ""};
    } else if (info > data.length) {
        newObj = {error: `Question/answer number must be less than the number of questions (${data.length})`, message: "", number: ""};
    } else {
        newObj = {error: "Question/answer must be an integer", message: "", number: ""};
    }
    return newObj;
}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
}
  
  // Set a constant to true to test the appropriate function
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false;      // Extra credit
const testUpdate = false;   // Extra credit
const testDelete = false;   // Extra credit

// getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
// getAnswers()
if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
}
  
  // getQuestionsAnswers()
if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}
  
  // getQuestion()
if (testGetQ) {
    testing(
        "getQuestion",
        { d: "()", f: getQuestion() },      // Extra credit: +1
        { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
        { d: "(1)", f: getQuestion(1) },
        { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
}
  
  // getAnswer()
if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
}
  
  // getQuestionAnswer()
if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
}
// addQuestionAnswer()
if (testAdd) {
    testing(
      "addQuestionAnswer",
      { d: "()", f: addQuestionAnswer() },
      { d: "({})", f: addQuestionAnswer({}) },
      { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
      { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
      {
        d: '(question: "Q4", answer: "A4")',
        f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
      }
    );
}

// updateQuestionAnswer()
if (testUpdate) {
    testing(
      "updateQuestionAnswer",
      { d: "()", f: updateQuestionAnswer() },
      { d: "({})", f: updateQuestionAnswer({}) },
      { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
      { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
      {
        d: '(question: "Q1U", answer: "A1U")',
        f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
      },
      {
        d: '(number: 1, question: "Q1U", answer: "A1U")',
        f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
      }
    );
    console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(4)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}

module.exports = { getQuestions, getAnswers, getQuestionsAnswers, getQuestion, getAnswer, getQuestionAnswer, addQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer };
