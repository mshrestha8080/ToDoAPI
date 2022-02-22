//Contains GET, POST, DELETE and PATCH methods for ToDoAPI

//uuidv4 module imported for unique id key
const { v4: uuidv4 } = require('uuid');

//Importing file system module to CRUD on .JSON file
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/database.json');

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
    if (req.body && activity.title && activity.description) {
        activities.push({ ...activity, id: uuidv4() });
        writeOnFile();
        var message = `Activity with title ${activity.title} added to the activities list`;
        res.send([{ message }]);
    }
   else {
        var message = 'Either title or description missing!';
        res.send([{ message }]);
   }
}

//Deletes an activity
const deleteActivity = (req, res) => {
    const { id } = req.params;
    
    let updatedActivities = activities.filter((activity) => activity.id !== id);
    if (updatedActivities.length === activities.length) {
        var message = 'No activity found with provided ID!';
        res.send([{ message }]);
    }
    else {
        activities = updatedActivities;
        writeOnFile();
        var message = `Activity with id "${id}" deleted from the activities list`;
        res.send([{ message }]);
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
        var message = `Activity with id "${id}" updated from the activities list`;
        res.send([{ message }]);
    }
    else    {
        var message = 'No activity found with provided ID!';
        res.send([{ message }]);
    }
}

//Exporting all functions
module.exports = {readActivities, readActivity, addActivity, deleteActivity, updateActivity}; 