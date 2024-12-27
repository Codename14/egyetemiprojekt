const cats = require('./data.json');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/cats', (req, res) => {
	let result = [...cats];
	if (req.query.name) {
		result = result.filter((cat) => cat.name.toLocaleLowerCase() === req.query.name.toLocaleLowerCase());
	}
	if (req.query.origin) {
		result = result.filter((cat) => cat.origin.toLocaleLowerCase() === req.query.origin.toLocaleLowerCase());
	}
	res.json(result);
});

app.delete('/cats/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const index = cats.findIndex((cat) => cat.id === id);
	if (index === -1) {
		res.status(404).send();
	} else {
		const cat = cats[index];
		cats.splice(index, 1);
		res.json(cat);
	}
});

app.listen(3000, () => {
  console.log('Server started');
});
