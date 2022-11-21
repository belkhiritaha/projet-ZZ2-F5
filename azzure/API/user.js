const express= require('express');

const app = express();
app.use(express.json());

// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
}
);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);
const {exec}= require("child_process"); 

const fs = require('fs');
let file = fs.readFileSync('exemple_VM.json', 'utf8');

const vmExemple = JSON.parse(file);

file = fs.readFileSync('./DataBase/vm.json', 'utf8');

// const db = JSON.parse(file);
const database = JSON.parse(file);

app.post('/api/users/create',(req, res)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        username: username,
        email: email,
        password: password
    };

    
});

