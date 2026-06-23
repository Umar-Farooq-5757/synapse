import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('home page');
});
app.get('/about', (req, res) => {
    res.send('about page');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});