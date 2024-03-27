const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// Route: Home page
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});


// Route: Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname,'contact.html'));
});

// Route: About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'about.html'));
});

// Route: Dynamic route for product pages
app.get('/product', (req, res) => {
    const productName = req.query.prod.toLowerCase();
    if (productName === 'slack' || productName === 'discord' || productName === 'steam') {
        res.sendFile(path.join(__dirname, 'public', 'product', `${productName}.html`));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'product', 'workinprogress.html'));
    }
});

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

