let counter = 5;
let deleteButtons = document.querySelectorAll(".list-top_delete");
let inputs = document.querySelectorAll(".list-top_task-text");
const getRequest = async function (url){
    let response = await fetch(url, {
        method: 'GET', 
        headers: {
        'Content-Type': 'application/json',
        }
    });
    let responseJSON = await response.json();
    let data = await responseJSON;
    return data;
};
const postRequest = function (url, body){
    fetch(url, {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(response => response.json())
    .then(data =>  {console.log(data)})            
    .catch((error) => {
        console.error('Error:', error);
    });
};

const newTaskFieldHTML = 
    `<div class="list-top_task">
        <div class="list-top_task-number">
            TASK ${counter}
        </div>
        <input class="list-top_task-text" type="text" name="name">
        <div class="list-top_check-field">
            <input type="checkbox">
        </div>
        <div class="list-top_delete">
            x
        </div>
    </div>`


let observer = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); // console.log(изменения)
    for (let i = 0; i < deleteButtons.length; i ++){
        deleteButtons = document.querySelectorAll(".list-top_delete");
        deleteButtons[i].addEventListener("click", () => {
            if (deleteButtons[i]){
                deleteButtons[i].closest(".list-top_task").remove() 
            }
        })
    };   
    for (let i = 0; i < inputs.length; i++){
        inputs = document.querySelectorAll(".list-top_task-text");
        inputs[i].addEventListener('focusout', (event) => {
            let newTaskText = event.target.value; 
            let date = new Date();
            let data = { 
                id: inputs[i].id ? inputs[i].id : "0", 
                text: newTaskText, 
                dateOfCreation:  JSON.stringify(date).substring(1,11),
            };
            console.log('Success:', postRequest('http://localhost:3005/tasks', data));
        });
    };  
});
  
observer.observe(app, {
childList: true, // наблюдать за непосредственными детьми
subtree: true, // и более глубокими потомками
characterDataOldValue: true // передавать старое значение в колбэк
});

async function displayAlltasks() {
    let myData =  await getRequest('http://localhost:3005/tasks');
    for (let i = 0; i < myData.length; i++){
        console.log(inputs[i]);
        inputs[i].value = myData[i].text;
        inputs[i].id = myData[i].id;
    }   
}
displayAlltasks();


document.querySelector("#create_new").addEventListener("click", ()=>{
    let d1 = document.getElementById('list-top_container');
    d1.insertAdjacentHTML('beforeend', newTaskFieldHTML);

})

// for (let i = 0; i < deleteButtons.length; i ++){
//     deleteButtons[i].addEventListener("click", () => {
//         deleteButtons[i].closest(".list-top_task").remove() 
//     })
// }
  
 

// for (let i = 0; i < inputs.length; i++){
//     inputs[i].addEventListener('focusout', (event) => {
//         console.log(event.target.value);
//     });
// };  


