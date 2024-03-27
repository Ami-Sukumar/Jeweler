const express = require('express');
const path = require('path');
const jsonData = require('./data.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('a.home'))
app.use(express.static('b.product'))
app.use(express.static('c.about'))
app.use(express.static('d.contact'))

// Route 1: Home page
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'a.home', 'Index.html'));
});

// Route 2: contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'd.contact', 'contact.html'));
});

// Route 2: contact page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'c.about', 'about.html'));
});

// Route 3: Dynamic route for product pages
app.get('/product', (req, res) => {
    const productName = req.query.prod.toLowerCase();
    if (productName === 'slack' || productName === 'discord' || productName === 'steam') {
        res.sendFile(path.join(__dirname, 'b.product', `${productName}.html`));
    } else {
        res.sendFile(path.join(__dirname, 'b.product', 'workinprogress.html'));
    }
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'a.home', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


console.log(jsonData.title)
app.get('/data', (req,res) => {

    res.send(`The product name is ${jsonData.title}`);
});

