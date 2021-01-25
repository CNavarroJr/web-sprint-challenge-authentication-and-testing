const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("./auth-model");
const restricted = require("../middleware/restricted");

const router = express.Router();

router.get("/users", restricted, async (req, res, next) => {
  try {
    res.json(await Auth.findUsers());
  } catch (err) {
    next(err);
  }
})


router.post('/register', (req, res) => {
  
  try {
    const { username, password } = req.body;

    if (password == null) {
      res.status(400).json({
        Message: "Password is mandatory to register",
      })
    }

    const newUser = await Auth.addUser({
      username,
      password: await bcrypt.hash(password, 10),
    })
    res.status(201).json(newUser);

  } catch (err) {
    next(err);
  }
});

router.post('/login', (req, res) => {
  res.end('implement login, please!');
  try {
    const { username, password } = req.body;

    // verifying username:
    const [user] = await Auth.findByUsername(username)
    console.log(user);
    if (!user) {
      return res.status(401).json({
        Message: "User does not exsist"
      })
    }

    // verifying password:
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        Message: "Invalid password",
      })
    }

    // creating token:
    const token = jwt.sign({
      userId: user.id,
      username: user.username,
    }, "secret code")
    res.json({
      Message: `Welcome ${user.username}`,
      token: token
    })
  } catch (err) {
    next(err);
  }
});


router.get("/logout", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.status(204).end();
        // res.json({
        //   Message: "You are successfully logout"
        // })
      }
    })
  } catch (err) {
    next(err);
  }
})
module.exports = router;
