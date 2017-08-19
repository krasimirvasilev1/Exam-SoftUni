const Task = require('../models/Task');


module.exports = {
	index: (req, res) => {
		let taskPromises = [
            Task.find({status:"Open"}),
            Task.find({status:"In Progress"}),
            Task.find({status:"Finished"})];
		Promise.all(taskPromises).then(taskResults => {
            res.render
            ('task/index',
                {
                    'openTasks': taskResults[0],
                    'inProgressTasks': taskResults[1],
                    'finishedTasks': taskResults[2]
                });
        });
	},
	createGet: (req, res) => {
		res.render('task/create');
	},
	createPost: (req, res) => {
		let taskArgs = req.body;
		if(taskArgs.title === undefined){
			return res.redirect('/');
		}

		Task.create(taskArgs).then(task => res.redirect('/'));
	},
	editGet: (req, res) => {
		let taskId = req.params.id;
		Task.findById(taskId).then(task =>
		{
			if (task){
				return res.render('task/edit',task)
			}
			else{
                return res.render('task/index',task)
			}
		}).catch(err => res.redirect('/'));
	},
	editPost: (req, res) => {
		let taskId = req.params.id;
		let task = req.body;

		Task.findByIdAndUpdate(taskId,task,{runValidators:true}).then(tasks => {
			res.redirect("/");
		}).catch(err => {
			task.id = taskId;
			task.error = "Cannot edit task.";
			return res.render('task/edit',task)
		})
}
};