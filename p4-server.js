/*
Drew Lesh
CIT 281 - Project 4
5.12.23
*/

// import fastify and p4-module 
const fastify = require('fastify')();
const functionModule = require('./p4-module.js');

// Return all questions
fastify.get("/cit/question", (request, reply) => {
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .send({error: "", statusCode: 200, questions: functionModule.getQuestions()});
});

// Return all answers
fastify.get("/cit/answer", (request, reply) => {
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, answers: functionModule.getAnswers()});
});

// Return all questions and answers
fastify.get("/cit/questionanswer", (request, reply) => {
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, questions_answers: functionModule.getQuestionsAnswers()});
});

// Return a specific question
fastify.get("/cit/question/:number", (request, reply) => {
    const { number } = request.params;
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, question: functionModule.getQuestion(number)});
});

// Return a specific answer
fastify.get("/cit/answer/:number", (request, reply) => {
    const { number } = request.params;
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, answer: functionModule.getAnswer(number)});
});

// Return a specif question and answer
fastify.get("/cit/questionanswer/:number", (request, reply) => {
    const { number } = request.params;
    let response = functionModule.getQuestionAnswer(number);
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, question: response.question, answer: response.answer, number: response.number});
});

// Unmatched route handler
fastify.get("*", (request, reply) => {
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "Route not found", statusCode: 404});
});

// Add a new question when receiving an object with properties 'question' and 'answer'.
fastify.post("/cit/question", (request, reply) => {
    functionModule.addQuestionAnswer(request.body);
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(201)
        .send({error: "", statusCode: 201, number: request.body.question.slice(-1)});
});

// Update question with object with properties number, question, and answer
fastify.put("/cit/question", (request, reply) => {
    functionModule.updateQuestionAnswer(request.body);
    reply
        .header('Content-type', 'application/json; charset=utf-8')
        .code(200)
        .send({error: "", statusCode: 200, number: request.body.number});
});

// Delete a question with a number req-param
fastify.delete("/cit/question/:number", (request, reply) => {
    const { number } = request.params;
    functionModule.deleteQuestionAnswer(number);
    reply
        .code(200)
        .send({error: "", statusCode: 200, number: number});
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is listening on http://${listenIP}:${listenPort}/`);
    console.log(`IP: ${listenIP}, Port: ${listenPort}`);
});
