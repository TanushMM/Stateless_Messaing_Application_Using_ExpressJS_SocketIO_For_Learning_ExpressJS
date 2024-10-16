const express = require("express");
const cors = require("cors");
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors())
app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var messages = [
    { name: "User 1", message: 'hello from User 1' },
    { name: "User 2", message: 'hello from User 2' },
]


app.get('/message', (req, res) => {
    res.json(messages).status(200)
})

app.post('/message', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body)
    res.sendStatus(200)
})


const port = process.env.PORT || 5000;
var server = http.listen(port, () => {
    console.log(`Server running on port ${server.address().port} 🔥`);
});


io.on("connection", () => {
    console.log("New user is connected");

})