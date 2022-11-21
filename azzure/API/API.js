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
const { resolve } = require('path');

let file = fs.readFileSync('exemple_VM.json', 'utf8');
const vmExemple = JSON.parse(file);

file = fs.readFileSync('./DataBase/vm.json', 'utf8');
const database = JSON.parse(file);

file = fs.readFileSync('./DataBase/user.json', 'utf8');
const userDatabase = JSON.parse(file); 

app.get('/api/vm/list/:id',(req, res)=> {
    const id = req.params.id;    
    console.log(" Requesting list VM of user ", id); 
    console.log(req.query); 
    console.log(userDatabase.list.find(idReseach=>idReseach.idUser==id));
    if (!userDatabase.list.find((idReseach=>idReseach.idUser==id))) return res.status(404).send("User not found");
    // send the list of the VMs with the right idUser
    let listVm = []; 
    listVm = database.list.filter(vm=>vm.idUser==id);
    console.log("serving: ", listVm);
    // res.send(listVm); is the right thing to do
    res.send(listVm); 
});

async function createVm(body){
    console.log("ok2");
    return new Promise((resolve)=>{
    exec("./script.sh", (error, stdout, stderr) => {
        if (error) {
                console.log(`error: ${error.message}`);
                resolve("-1");
            }
        if (stderr) {
                console.log(`stderr: ${stderr}`);
            resolve("-1");
            }
            console.log(stdout)
            let VMid=stdout;
            console.log("vm id : " + VMid);
            resolve(VMid);
        })
    });
};

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

function successCallback(résultat) {
    console.log("L'opération a réussi avec le message : " + résultat);
  };

function failureCallback(erreur) {
    console.error("L'opération a échoué avec le message : " + erreur); 
  };


app.post('/api/vm/create',async (req, res) => {
    console.log("Requesting VM create");
    const body = req.body;
    console.log(body);
    let createSuccess;
    createSuccess= await createVm(body).then(x=>{body.VMid=JSON.parse(x)});

    if (body.VMid!="-1"){
        // Il manque le test de l'user deja dans la base de donnée. 
        if (database.list.find((vm=>vm.VMid==body.VMid))){
            console.log("existe deja")
            res.send ("Already exist")
        ;}
        else {
            console.log(body.VMid);
            console.log("ok 3");
            res.send("success");
            database.list.push(body);
            fs.writeFileSync('./DataBase/vm.json', JSON.stringify(database))
        };
    }
    else{
        res.send("failled");
    };
}); 

app.post('/api/delete/:idVm',(req, res) => {
    console.log("Resquesting delete VM");

    let deleteSuccess=stopVm(req.body); 

    res.send(deleteSuccess);
});

app.post('/api/stop/:idVm',(req,res)=> {
    console.log("Requesting Stop VM");

})