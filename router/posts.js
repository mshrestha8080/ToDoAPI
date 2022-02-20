//Importing all required modules

const express = require('express');
const router = express.Router();
const {readActivities, readActivity, addActivity, deleteActivity, updateActivity} = require('../methods');

//Reads all the activities
router.get('/', readActivities);

//Read a specific activity
router.get('/:id', readActivity);

//Submits an activity
router.post('/', addActivity);

//Deletes an activity
router.delete('/:id', deleteActivity);

//Update an activity
router.patch('/:id', updateActivity);

//Exporting router
module.exports = router;