//we must require our contract
const TasksContract = artifacts.require("TasksContract");

//first testing
contract("TasksContract", () =>{
    
    //first command in the truffle console
    before(async ()=>{
        //we deploy the contract
        this.tasksContract = await TasksContract.deployed();
    })

    //describe some different testings

    //if contract is deployed, 1st testing
    it('contract is deployed', async () => {
        //we get the contract address
        const address = await this.tasksContract.address;

        //we check if the address is correct
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    //look if we create the first ticket with constructor
    it('get task successfully', async () => {
        //taskCounter = take number+1 of the actual num of this task
        const taskCounter = await this.tasksContract.taskCounter();
        //we put into a task
        const task = await this.tasksContract.tasks(taskCounter-1);

        //check the values
        assert.equal(task.id, taskCounter-1);
        assert.equal(task.name, "entrada J1-FCB-Espanyol");
        assert.equal(task.description, "Puerta 16-Fila 3-Asiento 5");
        assert.equal(task.done, false);
        assert.equal(taskCounter, 1);
    })

    it('create task successfully', async () => {
        //create a new task
        const result = await this.tasksContract.createTask("entrada J1-FCB-Espanyol", "Puerta 31-Fila 3-Asiento 9");
        const taskEvent = result.logs[0].args;
        const taskCounter = await this.tasksContract.taskCounter();

        //check the values
        //remember numTask=1, and numCounter=2
        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 1);
        assert.equal(taskEvent.name, "entrada J1-FCB-Espanyol");
        assert.equal(taskEvent.description, "Puerta 31-Fila 3-Asiento 9");
        assert.equal(taskEvent.done, false);
    })

})