const express = require('express');
const bodyParser = require('body-parser');
const TaskModel = require('./models/task.model');
const TaskDto = require('./dtos/task.dto');
const ExceptionDto = require('./dtos/exception.dto');

const app = express();
const port = 3000;
const cache = new Map();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    let list = [];

    for (key in cache) {
        const model = cache[key];
        list.push(new TaskDto(model.getId(), model.getTitle()));
    }

    const payload = {
        "tasks": list
    };

    res.send(payload);
});

app.post('/create', (req, res) => {
    if (!req.body.title) {
        res.status(400);
        res.send(new ExceptionDto("Required title property not found!"));
    }

    try {
        let task = new TaskModel(req.body.title);
        cache.set(String(task.getId()), task);
    } catch (err) {
        res.status(400);
        res.send(new ExceptionDto("Title property with invalid type. Expected String!"));
    }

    res.status(200);
    res.send();
});

app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});