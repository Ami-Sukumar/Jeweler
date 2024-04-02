const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Add this line to parse request bodies
const bcrypt = require('bcrypt'); // Add this line for password hashing
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');


// Serve static files from the 'public' directory
app.use(express.static('public'));



// PostgreSQL database configuration
const pool = new Pool({
   user: 'amisukumar',
   host: 'localhost',
   database: 'amisukumar',
   password: 'jeweler',
   port: 5432,
});

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));


// Route: Home page
app.get('/index', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: Contact page
app.get('/contact', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route: About page
app.get('/about', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route: Login page
app.get('/login', (req, res) => {
   res.render('login');
});

// Route: Register page
app.get('/signup', (req, res) => {
   res.render('signup');
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

// Route: Handle user registration (signup)
app.post('/signup', async (req, res) => {
   const { username, email, password, confirm_password } = req.body;

   try {
       // Form validation
       if (!username || !email || !password || !confirm_password) {
           throw new Error('All fields are required');
       }

       if (password !== confirm_password) {
           throw new Error('Passwords do not match');
       }

       // Check if user already exists
       const existingUser = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
       if (existingUser.rows.length > 0) {
           throw new Error('User already exists');
       }

       // Hash the password before storing it in the database
       const hashedPassword = await bcrypt.hash(password, 10);

       // Insert the user into the database
       await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
       res.send('User registered successfully');
   } catch (error) {
       console.error('Error during registration:', error.message);
       res.status(500).send(error.message);
   }
});

// Route: Handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
      // Retrieve user information from the database
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];
      // Check if the user exists and verify the password
      if (user && await bcrypt.compare(password, user.password)) {
          // Set user session or authentication token
          res.redirect(`/profile?username=${username}`); // Redirect to profile page after successful login
      } else {
          res.status(401).send('Invalid username or password');
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
  }
});


// Route: Profile page
app.get('/profile', async (req, res) => {
   try {
       const username = req.query.username;

       // Fetch user data from the database based on the provided username
       const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
       const userData = result.rows[0]; // Assuming only one row is returned

       if (!userData) {
           throw new Error('User not found');
       }

       res.render('profile', { username: userData.username, email: userData.email ,old_password:userData.password }); // Pass username and email to the template
   } catch (error) {
       console.error('Error fetching user data:', error);
       res.status(500).send('Internal server error');
   }
});


// Add route for password update
app.post('/profile/edit', async (req, res) => {
    const { username, new_password, old_password } = req.body;
    try {

        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            res.status(404).send('User not found');
            return;
        }
        const hashedNewPassword = await bcrypt.hash(new_password, 10);

        await pool.query('UPDATE users SET password = $1, new_password = $1 WHERE username = $2', [hashedNewPassword, username]);
        res.send('Password updated successfully');
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).send('Internal server error');
    }
});


// Add route for profile deletion
app.post('/profile/delete', async (req, res) => {
    const { username } = req.body;
    try {
        // Delete the user's profile
        await pool.query('DELETE FROM users WHERE username = $1', [username]);
        
        // Optionally, you can also update the password or set it to NULL
        // await pool.query('UPDATE users SET password = NULL WHERE username = $1', [username]);
        
        res.send('Profile deleted successfully');
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).send('Internal server error');
    }
});




// Route: Logout
app.get('/logout', (req, res) => {
   // Clear user session or authentication token
   // Redirect to login page or homepage
   res.redirect('/login');
});

// Route for the root URL
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});




