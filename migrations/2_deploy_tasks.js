//we require the contract created in the previous migration
const TasksContract = artifacts.require("TasksContract");

module.exports = function (deployer) {
  deployer.deploy(TasksContract);
};