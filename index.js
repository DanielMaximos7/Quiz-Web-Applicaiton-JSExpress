const { request, response } = require('express');
const express = require('express');

let productList = require('./questions.json');

const app = express();

app.use(express.static('static'));

app.use(express.json());

//displays all of the questions of the quiz
app.get('/questions', (request,response) => {

    let content = '[';
    //list responsible for holding questions in string format 
    let newList = JSON.parse(JSON.stringify(productList));
    //for every delete the answer
    for (p of newList)
    {
        delete p.answerIndex;
    }
    //returns the list without the answers
    response.send(newList);


});
//responsible for comparing answers of JSON to user radio choice returns number of right questions
app.post('/check-answers', (request, response) => {
    //store the answers 
    let answers = request.body.answers;
    //count correct answers
    var count = 0;
    //for every answer check if it is the same answer in the JSON
    for (var i = 0; i < request.body.length; i++) {
        if (productList[i].options.indexOf(request.body[i]) === productList[i].answerIndex) count++;
    }

    response.send(
        {count}
    );
});

app.listen(3000);


