const express = require('express');
const router = express.Router();
const authController = require('../authController');


router.get('/', (req, res) => {
    console.log('user session data', JSON.stringify(req.session)); //{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"loggedIn":true,"uid":4}
    res.render('home', {session: req.session, query: req.query});
});


router.get('/dashboard', (req, res) => {
    console.log(JSON.stringify(req.session)); //{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"loggedIn":true,"uid":4}
    res.render('dashboard', {session: req.session, query: req.query});
});


// Register a new user
router.get('/register', (req, res) => {
    res.render('signup', {query: req.query});
});

router.post('/register', async (req, res) => {

    try {
        const user = await authController.registerUser(req, res);
    } catch (error) {
        res.status(400).json({ message: 'User registration failed', error: error.message });
    }
});



router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect(302, '/');
    });
});

// Login
router.get('/login', (req, res) => {
    res.render('login', {query: req.query});
});



router.post('/login', async (req, res) => {


    try {
        const user = await authController.authenticateUser(req, res);
    } catch (error) {
        res.status(400).json({ message: 'User login failed', error: error.message });
    }
});

module.exports = router;