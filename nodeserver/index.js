//this is node sever which will handle my socket.io connections
const io = require('socket.io')(8000)

const users= {};
 
io.on('connection',socket=>{  // anyone is joining new
    socket.on('new-user-joined', name =>{
        console.log("new user",name)
        users[socket.id] = name; //whenever new person joins the event is that its name is fixed and this is done by socket.on 
         socket.broadcast.emit('user-joined', name )// the person who has joined leaving him all others re notified by the event 

    });
// new-user-joined/ user-joined/ send /receive all are custom names so we can give any name
    //while sending a message to all
    socket.on('send', message =>{// if someone sends a message its will be sent to all
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);  //this event is fired when someone is disconnected form the server
        delete users[socket.id];//this deletes the person from the server
    });
})
