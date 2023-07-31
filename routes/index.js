const express = require('express')
const router = express.Router();
const {getAllItems,updateTask,deleteTask,getTask,createTask} = require('../contoller/tasks')


router.route('/').get(getAllItems).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
module.exports = router;