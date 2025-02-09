const { v4: uuidv4 } = require('uuid');

class TaskModel {
    constructor(title) {
        if (!title) {
            throw new Error('[TASK] Property title hasn\'t been filled')
        }

        if (typeof title !== 'string') {
            throw new Error('[TASK] Property title is not of type String')
        }

        this._id = uuidv4();
        this._title = title;
    }
    
    getId() {
        return this._id;
    }

    getTitle() {
        return this._title;
    }

    setTitle(newValue) {
        this._title = newValue;
    }
}

module.exports = TaskModel;