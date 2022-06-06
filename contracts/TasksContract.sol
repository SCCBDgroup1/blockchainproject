// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {

    uint public taskCounter = 0;

    constructor(){
        createTask("entrada J1-FCB-Espanyol", "Puerta 16-Fila 3-Asiento 5");
    }

    //create event to taskCreated
    event TaskCreated(
        uint id,
        string name,
        string description,
        bool done,
        uint createdAt
    );

    //create event to taskDone
    event TaskToggleDone(uint id, bool done);

    //new type of data structure
    //this part not call to the contract
    struct Task{
        uint256 id;
        string name;
        string description;
        bool done;
        uint256 createdAt;
    }

    //create typical CRUD methods

    //key, value, each task contains a unique id
    //CRUD getTaskById
    mapping(uint256 => Task) public tasks;

    //example of a task
    // tasks[
    //     0: {
    //         id: 0,
    //         name: "Task 1",
    //         description: "This is the first task",
    //         done: false,
    //         createdAt: 0
    //     },
    //     }
    // ]

    //CRUD createTask
    function createTask(string memory _name, string memory _description) public {
        tasks[taskCounter] = Task(taskCounter, _name, _description, false, block.timestamp);
        taskCounter++;
        //create a event
        emit TaskCreated(taskCounter-1, _name, _description, false, block.timestamp);
    }

    //CRUD updateTask
    function toogleDone(uint256 _id) public {
        //type of data, memory and variable
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggleDone(_id, _task.done);
    }
}