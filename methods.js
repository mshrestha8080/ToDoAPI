//Contains GET, POST, DELETE and PATCH methods for ToDoAPI

//uuidv4 module imported for unique id key
const { v4: uuidv4 } = require('uuid');

//Importing file system module to CRUD on .JSON file
const fs = require('fs');
const filePath = './data/database.json';

//Opening file in reading mode
var data = fs.readFileSync(filePath, (err) => {
    if (err)    throw err;
});

//Assigning file contents to array object
var activities = JSON.parse(data);

//Function to write on file
const writeOnFile = () => {
    fs.writeFile(filePath, JSON.stringify(activities), (err) => {
    if(err)     throw err;
    });
}

//Reads all the activities
const readActivities = (req, res) => {
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
    writeOnFile();
    res.send(`Activity with title "${activity.title}" added to the activities list`);
}

//Deletes an activity
const deleteActivity = (req, res) => {
    const { id } = req.params;
    
    let updatedActivities = activities.filter((activity) => activity.id !== id);
    if (updatedActivities.length === activities.length)
        res.send('No activity found with provided ID');
    else {
        activities = updatedActivities;
        writeOnFile();
        res.send(`Activity with id "${id}" deleted from the activities list`);
    }
}

//Update an activity
const updateActivity = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const activityToUpdate = activities.find((activity) => activity.id === id);
    if (activityToUpdate !== undefined) {
        if(title) activityToUpdate.title = title;
        if(description) activityToUpdate.description = description;
        writeOnFile();
        res.send(`Activity with id "${id}" updated from the activities list`);
    }
    else    res.send('No activity found with provided ID');
}

//Exporting all functions
module.exports = {readActivities, readActivity, addActivity, deleteActivity, updateActivity}; 