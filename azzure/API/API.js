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

app.get('/api/vm/list/:id',(req, res)=> {
    const id = req.params.id;    
    console.log(" Requesting list VM of user ", id); 
    console.log(req.query); 
    // send the list of the VMs with the right idUser
    let listVm = []; 
    listVm = database.list.filter(vm=>vm.idUser==id);
    console.log("serving: ", listVm);
    // res.send(listVm); is the right thing to do
    res.send(listVm); 
});


function createVm(body){
    body= {
        "idUser": 0,
        "VMid": 4,
        "VMname": "nikmok",
        "VMdesc": "!",
        "VMram": "",
        "VMcpu": "",
        "VMdisk": "",
        "VMimage": "",
        "VMservices": {
            "db": {
                "influxdb": false,
                "mongodb": false,
                "mysql": false,
                "postgresql": false,
                "redis": false,
                "mariadb": false,
                "sqlite": false,
                "oracle": false
            },
            "web": {
                "grafana": false,
                "nodered": false,
                "apache": false,
                "nginx": false,
                "tomcat": false
            },
            "other": {
                "mqtt": false,
                "ssh": false,
                "http": false,
                "https": false,
                "ftp": false
            }
        }
    }
    exec("./script.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return 0;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return 0;
        }
        console.log(`stdout: ${stdout}`);
        console.log( " body : ",body); 
        console.log(stdout);
        body.VMid=parseInt(stdout);
        database.list.push(body);
        fs.writeFileSync('./DataBase/vm.json', JSON.stringify(database)); 
        return 1; 
    });
    //insertion de la VM si tout se passe bien.
    // fs.writeFileSync('db.JSON', JSON.stringify(body)); 
    // en body.VMname
    // return bool
}

function startVm(idVm){
    //insertion of the stating code of the VM
    // change the status of the vm in the db 
    // return ssh adress and mdp
}

function stopVm(idVm){
    //insertion of the vm stop code
    //change the status of the vm in the db
    return (stopSuccess);
}

function modifiedVm(body,idVm){
    
    return (modifiedSuccess )
}

app.get('/api/vm/create/',(req, res) => {
    console.log("Requesting VM create");
    const body = req.body;
    console.log(body);
    
    const createSuccess= createVm(body); 
    res.send(createSuccess); 
}); 

app.post('/api/delete/:idVm',(req, res) => {
    console.log("Resquesting delete VM"); 
    const idVm=req.idVm; 
    const deleteSuccess =False; 

    deleteSuccess=stopVm(idVm); 
    //return a boolen.
    res.send(deleteSuccess);
});

app.post('/api/stop/:idVm',(req,res)=> {
    console.log("Requesting Stop VM");

})