const express= require('express');

const app = express();
app.use(express.json());

app.listen(8000, () => {
    console.log('Listening on port 8000');
}
);

app.get('/', (req, res) => {
    res.send('Hello World');
}
);

const fs = require('fs');
let file = fs.readFileSync('exemple_VM.json', 'utf8');

const vmExemple = JSON.parse(file);

file = fs.readFileSync('./DataBase/vm.db', 'utf8');

const db = JSON.parse(file);

app.get('/api/vm/list/',(req, res)=> {
    const id = 0;//req.params.idUser;
    console.log(" Requesting list VM of user ", id); 
    console.log(req.query); 
    // send the list of the VMs with the right idUser
    let listVm = []; 
    listVm = db.list.find(vm=>db.list[db.list.indexOf(vm)].idUser=id);
    res.send(listVm); 
});


function createVm(body){
    //insertion du programme de creation de VM
    //insertion de la VM si tout se passe bien.
    // fs.writeFileSync('db.JSON', JSON.stringify(body)); 
    // en body.VMname
    // return bool; if la machine tourne return true
}

function startVm(idVm){
    //insertion of the stating code of the VM
    // change the status of the vm in the db 
    // return ssh adress and mdp
}

function stopVm(idVm){
    //insertion of the vm stop code
    // change the status of the vm in the db
    return (stopSucces);
}

function modifiedVm(body,idVm){
    

}

app.post('/api/vm/create/:idVm',(req, res) => {
    console.log("Requesting VM create");
    const body = req.body;
    console.log(body);
    
    const createSuccess= createVm(body); 
    // return a booleen 
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

