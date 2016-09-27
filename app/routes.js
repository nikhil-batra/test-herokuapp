var TodoArray = require('./models/todo');

function getTodos(res) {
     res.json(TodoArray);    
};

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = function (app) {
    
    app.get('/api/todos', function (req, res) {    
        getTodos(res);
    });
    
    app.post('/api/todos', function (req, res) {        
        TodoArray.push({"text":req.body.text, "_id":randomIntInc(3, 10000)});
        getTodos(res);
    });
    
    app.delete('/api/todos/:todo_id', function (req, res) {
        var index = -1;
        for (var i = 0; i < TodoArray.length; i++) {
            if (TodoArray[i]._id == req.params.todo_id) {
                index = i;
                break;
            }
        }       
        if (index != -1) {
           TodoArray.splice(index, 1); 
        }
        getTodos(res);       
    });
    
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};