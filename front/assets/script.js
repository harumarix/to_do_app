let counter = 5;
let deleteButtons = document.querySelectorAll(".list_delete");
let inputs = document.querySelectorAll(".list_task-text");
const newTaskFieldHTML = 
    `<div class="list_task">
        <div class="list_task-number">
            TASK ${counter}
        </div>
        <input class="list_task-text" type="text" name="name">
        <div class="list_check-field">
            <input type="checkbox">
        </div>
        <div class="list_delete">
            x
        </div>
    </div>`


let observer = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); // console.log(изменения)
    for (let i = 0; i < deleteButtons.length; i ++){
        deleteButtons = document.querySelectorAll(".list_delete");
        deleteButtons[i].addEventListener("click", () => {
            if (deleteButtons[i]){
                deleteButtons[i].closest(".list_task").remove() 
            }
        })
    };   
    for (let i = 0; i < inputs.length; i++){
        inputs = document.querySelectorAll(".list_task-text");
        inputs[i].addEventListener('focusout', (event) => {
            let newTaskText = event.target.value; 
            let date = new Date();
            let data = { 
                id: inputs[i].id ? inputs[i].id : "0", 
                text: newTaskText, 
                dateOfCreation:  JSON.stringify(date).substring(1,11),
            };
            fetch('http://localhost:3005/tasks', {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    };  
});
  
observer.observe(app, {
childList: true, // наблюдать за непосредственными детьми
subtree: true, // и более глубокими потомками
characterDataOldValue: true // передавать старое значение в колбэк
});


fetch('http://localhost:3005/tasks')
.then(response => response.json())
.then(data =>  {
    for (let i = 0; i < inputs.length; i++){
        inputs[i].value = data[i].text;
        inputs[i].id = data[i].id;
    }   
});


document.querySelector("#create_new").addEventListener("click", ()=>{
    let d1 = document.getElementById('list_container');
    d1.insertAdjacentHTML('beforeend', newTaskFieldHTML);

})

for (let i = 0; i < deleteButtons.length; i ++){
    deleteButtons[i].addEventListener("click", () => {
        deleteButtons[i].closest(".list_task").remove() 
    })
}
  
 

// for (let i = 0; i < inputs.length; i++){
//     inputs[i].addEventListener('focusout', (event) => {
//         console.log(event.target.value);
//     });
// };  


