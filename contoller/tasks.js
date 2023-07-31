const express = require('express');
const Task = require('../modules/taskSchema')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/customErrors')

//getting all items
const getAllItems = asyncWrapper(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json({ task, amount: task.length })
})

//creating task
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body, {
        runValidators: true
    })
    res.status(201).json({ task })
})

//getting task by id
const getTask = asyncWrapper(async (req, res,next) => {
    const { id } = req.params
    const task = await Task.findById(id);
    if (!task) {
        return next(createCustomError(`No task with id the above id provided`,404))
    }
    return res.status(200).json({ task })
})
//delete task
const deleteTask = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'user does not exist in the database' })
    return res.status(200).json({ message: `user deleted sucessfully` })
})
//update task
const updateTask = asyncWrapper(async (req, res) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body, {
        new: true, runValidators: true
    });
    if (!task) return next(createCustomError(`No task with id the above id provided`, 404))
    
    return res.status(201).json({ message: `user updated sucessfully` })
})

module.exports = {
    getAllItems,
    createTask,
    updateTask,
    deleteTask,
    getTask,
}