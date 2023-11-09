const User = require('../models/User');

const authController = {
  // Render the login page
  login: (req, res) => {
    res.render('login');
  },
  
  // Render the signup page
  signup: (req, res) => {
    res.render('signup');
  },
  
  // Authenticate user on login
  authenticateUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const dbUserData = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!dbUserData) {
        return res.redirect(302, '/login?memo=Username or Password are Incorrect');
      }

      const validPassword = await dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        return res.redirect(302, '/login?memo=Username or Password are Incorrect');
      }

      // If authenticated, set the session and redirect to dashboard
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.uid = dbUserData.id;
        res.redirect(302, '/dashboard');
      });
    } catch (err) {
      res.redirect(302, '/login?memo=Login failed...');
    }
  },

  // Register a new user
  registerUser: async (req, res) => {
    const { email, name, password } = req.body;

    try {
      // Check if the user already exists with the provided email
      const existingUser = await User.findOne({
        where: {
          email: email,
        },
      });
    
      if (existingUser) {
        return res.redirect(302, '/register?memo=User already exists'); // Redirect if the user already exists
      }
    
      // If the user does not exist, proceed to create a new user
      const dbUserData = await User.create({
        name: name,
        // name: Date.now().toString(), // Not sure why name is set to a timestamp
        email: email,
        password: password,
      });

      // Set the session and redirect to the homepage after successful registration
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.uid = dbUserData.id;
        res.redirect(302, '/dashboard');
      });
    } catch (err) {
      res.redirect(302, '/register?memo=Error. Please try again..');
    }
  },
};

module.exports = authController;
