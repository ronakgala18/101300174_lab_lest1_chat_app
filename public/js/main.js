const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users')
const socket = io()

//get username and room from url and
const {username, room} =Qs.parse(location.search,{
    ignoreQueryPrefix: true
})

// join chat room
socket.emit('joinRoom',{username, room})


//get toom and user
socket.on('roomUsers',({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})
//msg from server
socket.on('message', message =>{
    console.log(message);
    outputMessage(message)

    //scroll down 
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//message submit
chatForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    //get msg txt
    const msg = e.target.elements.msg.value
    
    // EMit meddage to server
    socket.emit('chatMessage', msg);
    
    //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

//output to dom
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add room name to dom 
function outputRoomName(room){
    roomName.innerText = room;
}

// add users to dom
function outputUsers(users){
    console.log(users)
    usersList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}