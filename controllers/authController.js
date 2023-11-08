const User = require('../models/User');

const authController = {
    login: (req, res) => {
        res.render('login');
    },
    signup: (req, res) => {
        res.render('signup');
    },
    authenticateUser: async (req, res) =>
    {
        const { email, password } = req.body;

        try {

            const dbUserData = await User.findOne({
                where: {
                  email: email,
                },
              });

              if (!dbUserData)
              {
                    return res.redirect(302, '/login?memo=Login failed...');
              }

              const validPassword = await dbUserData.checkPassword(req.body.password);

              if (!validPassword)
              {
                    return res.redirect(302, '/login?memo=Login failed...');
              }

            req.session.save(() => {

              req.session.loggedIn = true;
              req.session.uid = dbUserData.id;
        
              res.redirect(302, '/dashboard');
            });

          } catch (err) {
            res.redirect(302, '/login?memo=Login failed...');
          }
          
    }, 
    registerUser: async (req, res) =>
    {
        const { email, name, password } = req.body;

        try {
            const dbUserData = await User.create({
              name: Date.now().toString(),
              email: email,
              password: password,
            });
        
            req.session.save(() => {

              req.session.loggedIn = true;
              req.session.uid = dbUserData.id;
        
              res.redirect(302, '/');
            });
          } catch (err) {
            res.redirect(302, '/register?memo=Error. Please try again..');
          }
    },
};

module.exports = authController;