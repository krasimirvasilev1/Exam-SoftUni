const Film = require('../models/Film');

module.exports = {
	index: (req, res) => {
        Film.find({}).then(films => res.render('film/index', {'films': films}));
	},
	createGet: (req, res) => {
        res.render('film/create');
	},
	createPost: (req, res) => {
		let film = req.body;

		if(film.genre === undefined
			|| film.director === undefined
			|| film.year === undefined
			|| film.name === undefined)
		{
			return res.redirect('/');
		}

		Film.create(film).then(films => res.redirect('/'));
	},
	editGet: (req, res) => {
        let filmId = req.params.id;

        Film.findById(filmId).then(film => {
		if(!film)
		{
			 return res.redirect('/');
        }
        res.render('film/edit',film)
        });

	},
	editPost: (req, res) => {
		let filmId = req.params.id;
		let filmArguments = req.body;

        if(filmId === undefined){
           return res.redirect('/');
        }

        Film.findByIdAndUpdate(filmId, filmArguments).then(filmId => { res.redirect('/') });
	},
	deleteGet: (req, res) => {
        let filmId = req.params.id;

        if(filmId === undefined){
        	return res.redirect('/');
		}

		Film.findById(filmId).then(film => {res.render ('film/delete',film)});
	},
	deletePost: (req, res) => {
        let filmId = req.params.id;

        if(filmId === undefined){
           return res.redirect('/');
        }

        Film.findByIdAndRemove(filmId).then(filmId => {res.redirect('/')});
	}
};