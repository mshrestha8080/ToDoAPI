//Contains GET, POST, DELETE and PATCH methods for ToDoAPI

//uuidv4 module imported for unique id key
const { v4: uuidv4 } = require('uuid');

//Mock database
let activities = []

//Reads all the activities
const readActivities = (req, res) => {
    console.log(activities);
    res.send(activities);
}

//Read a specific activity
const readActivity = (req, res) => {
    const { id } = req.params;
    const foundActivity = activities.find((activity) => activity.id === id);
    res.send(foundActivity);
}

//Submits an activity
const addActivity = (req, res) => {
    const activity = req.body;
    activities.push({ ...activity, id: uuidv4() });
    res.send(`Activity with title "${activity.title}" added to the activities list`);
}

//Deletes an activity
const deleteActivity = (req, res) => {
    const { id } = req.params;
    activities = activities.filter((activity) => activity.id !== id);
    res.send(`Activity with id "${id}" deleted from the activities list`);
}

//Update an activity
const updateActivity = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const activityToUpdate = activities.find((activity) => activity.id === id);
    
    if(title) activityToUpdate.title = title;
    if(description) activityToUpdate.description = description;
    
    res.send(`Activity with id "${id}" updated from the activities list`);
}

//Exporting all functions
module.exports = {readActivities, readActivity, addActivity, deleteActivity, updateActivity}; 