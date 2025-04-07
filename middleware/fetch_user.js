const jwt = require("jsonwebtoken");//importing json web token library....
const jwt_tocken = "thisisjsonwebtocken"; 

const fetch_user = (req, res, next)=>{
    // get the user from the jwt tocken and add it to req object........
    const token = req.header("auth-token");
    if(!token){
        return res.status(401).send({error:"Please Authenticate using a valid tocken"})
    }
    try{
        const data = jwt.verify(token, jwt_tocken);//verifying the token using jwt.verify method....
        req.user = data.user;//assigning the data.user to req.user after auth-token varifications..... 
        next();
    }catch (error){
        return res.status(401).send({error:"Please Authenticate using a valid tocken"})
    }
}

// export default fetch_user;//to use this method add "type":"module" in package.json....
module.exports = fetch_user;