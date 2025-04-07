const express_variable = require("express");
const router_variable = express_variable.Router();
const user_get = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch_user = require("../middleware/fetch_user");

// creating tocken variable it consists of three components(Header, Payload and Signature).........
const jwt_tocken = "thisisjsonwebtocken";

//ROUTE; 1 create user using POST "/api/authentication"..........
router_variable.post(
  "/signout",
  [
    body("username", "Enter valid name").isLength({ min: 4 }),
    body("email", "Enter valid password").isEmail({ min: 10 }),
    body("password", "Enter Password Not Greater than 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // const user_data = user_get(req.body);
    //checking validation of username, email and password....
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    //checking wheather the user with this username, email and password already exits or not....
    let user = await user_get.findOne({
      username: req.body.username,
      email: req.body.email,
    });
    if (user) {
      return res
        .status(400)
        .json({
          error:
            "Sorry, The User Already exists with the provided credentials....",
        });
    }

    try {
      // creating salt for storing secure password in the database........
      const salt_variable = await bcrypt.genSalt(10);
      let secure_password = await bcrypt.hash(req.body.password, salt_variable); //Creating an hash and saving password with the generated salt....

      /*
    user = await user_get.create({
        username: req.body.username, 
        email: req.body.email, 
        // password: req.body.password
        password: secure_password        
    }).then((user)=>res.json(user)) 
    .catch((err)=>{
        res.status(500).json({error: "Internal Server Error Occurs....", message:err.message})
    });
    */
      user = await user_get.create({
        username: req.body.username,
        email: req.body.email,
        password: secure_password,
      });

      const data = { 
        user: {
          id: user.id
        } 
      };
      // Saving user's data with jsonwebtocken..........
      const authenticate_tocken = jwt.sign(data, jwt_tocken);
      // console.log(authenticate_tocken);
      res.json({user, authenticate_tocken, success:true});
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Internal Server Error Occurs....",
          message: error.message,
        });
    }
    /*
    const {email, password} = req.body; 
    try{
        let user = user.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please try correct corredentials...."});
        }
        
        const compare_password = await bcrypt.compare(password, user.password); 
        if(!compare_password){
            return res.status(400).json({error:"Please try correct corredentials...."});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authenticate_tocken1 = bcrypt.sign(data, jwt_tocken);

        res.json({authenticate_tocken1}); 

    }catch (error){
        res.status(500).send('Internal Server Error occurs....'); 
        console.log(error.message);
    }
    // res.send(req.body); 
    // const {username, email, password} = req.body; 
    // const user_data = new user_get({username, email, password});
    // await user_data.save();    
    // res.send(req.body); 
    */
  }
);

// Route 2: Get user details login request using; POST "/api/authentication/getuser"..............
router_variable.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter Valid Password").exists(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await user_get.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const password_compare = bcrypt.compare(password, user.password);
      if (!password_compare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {  
        user: {
          id: user.id
        } 
      };
      const authenticate_tocken1 = jwt.sign(data, jwt_tocken);
      res.json({ user, authenticate_tocken1, success:true});
    } catch (error) {
    //   res.status(500).send("Internal Server Error occurs....");
        res.status(500).json({ error: "Internal Server Error occurs....", message: error.message });
    }
  }
);

//ROUTE 3: Get LoggedIn user details using : POST "api/authentication/getuser". Login required....
router_variable.post("/getuser", fetch_user, async (req, res) => {
  try {
    //fetch the user by ID and exclude the password field from the response
    const user = await user_get.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    // res.status(500).send("Internal Server Error");
    res.status(500).json({ error: "Internal Server Error occurs....", message: error.message });
  }
});

module.exports = router_variable;
