import express from 'express'

const app = express()

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome', message: 'Hello!', people: ['Alice', 'Bob', 'Charlie'] });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});