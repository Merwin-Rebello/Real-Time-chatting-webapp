const socket = io ('http://localhost:8000',
{
    transports:['websocket','polling','flashsocket'],
});
//get DOM elements in respective JS variables
const form =document.getElementById('send-container');
const messageInput = document.getElementById('messageinput')
const messagecontainer= document.querySelector('.container')
//audio when new message is arrived
var audio = new Audio('notify.mp3');


//this acts as a function which is been used every where
const append=(message ,position)=>{  
    const messageElement= document.createElement('div')
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
//this listens the event for the form when its send and the message will come on the right
 form.addEventListener('submit',(e)=>{
    e.preventDefault();             //this will send message to the server 
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value= ''
 })
//asking for the new user to enter name
const name = prompt("Enter your namee");
socket.emit('new-user-joined',name);

//informs all others in the chat that who has joned
socket.on('user-joined', name =>{
    append(name +' joined the chat', 'right');
})

//received messages on the left
socket.on('receive', data=>{
    append(`${data.name}:${data.message}`,'left');
})
//left persons on the right with message
socket.on('left', name =>{
    append(`${data.name} left the chat `,'right');
})





