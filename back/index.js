const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())
const port = 3005

// const findTask = function () {}

//моя база данных. ее менять
let taskList = [
    {
        id: 'f450ac0e-8ae9-488d-9dc7-fa43cc6d238c',
        text: "go out!",
        check: true,
        dateOfCreation: "2020-10-09"
    }, 
    {
        id: 'fe0ec95d-5670-4a86-8b50-6ab038e951be',
        text: "get pizza",
        check: true,
        dateOfCreation: "2020-10-10"
    }, 
    {
        id: 'ef1334d6-1acd-4ffc-b146-4ee107c56ec',
        text: "go skating",
        check: true,
        dateOfCreation: "2020-10-11"
    }, 
    {
        id: '30a5c6c3-32a0-4e17-aff3-a337e4b21f3',
        text: "do homework",
        check: true,
        dateOfCreation: "2020-10-12"
    }, 
    {
        id: 'd4c0762b-58e2-409e-a4d2-9f1338f1acb1',
        text: "sleep",
        check: true,
        dateOfCreation: "2020-10-13"
    }, 
]


// app.get('/', (req, res) => {
//   res.send('Hello World! ' + uuidv4())
// })
// app.get('/mynameis/:name/:lastname', (req, res) => {
//     res.send('My name is ' + req.params.name + ' ' + req.params.lastname)
// })

  

// Gets all tasks
app.get('/tasks', (req, res) => {
    res.send(taskList)
})


 // Get task with given id 
 //returns certain task
app.get('/tasks/:taskId', (req, res) => {
    let task = {};
    for (let i = 0; i < taskList.length; i ++){
        if (req.params.taskId === taskList[i].id){
            task = taskList[i]
        }
    }
    res.send(task)
})



// Updates task with given id
//returns updaed task
app.put('/tasks/:taskId', (req, res) => {
    // 1. Find a tsask with id == taskId in taskList 
    // 2. Save an id in a variable
    // 3. Delete task
    // 4. Add a new task with providen parametesr and id saved in variable
    // 5. Return resulted task 
    let task = {};
    let id = parseInt(req.params.taskId);
    for (let i = 0; i < taskList.length; i ++){
        if (id === taskList[i].id){
            taskList[i] = req.body;
        }
    }
    res.send(task)
})


// Creates new task
// returns taskList
app.post('/tasks', (req, res) => {
    // 1. add to taskList a given object
    //2. return updated tasklist
    let incomingBody = req.body;
    let check = false;
    for (let i = 0; i < taskList.length; i++){
      
        if (incomingBody.id = taskList[i].id){
            taskList[i].text = incomingBody.text;
            check = true;
            break;
        };
    };
    if (!check){
        incomingBody.id = uuidv4();
        taskList.push(incomingBody);
    };


    res.send(taskList)
})



// Deletes task with given id
// returns ok or not ok 
app.delete('/tasks/:taskId', (req, res) => {
    // 1. find task with given id
    //2.delete task w given id
    //3.return updated  list of tasks
    let task = {};
    let id = req.params.taskId;
    for (let i = 0; i < taskList.length; i ++){
        if (id === taskList[i].id){
            taskList.splice(i, 1)
        }
    }
    res.send(taskList)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


  