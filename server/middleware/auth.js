import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {    
      //custom token  
      decodedData = jwt.verify(token, secret);
      
      //populating the request
      req.userId = decodedData?.id;
    } else {
      //google token  
      decodedData = jwt.decode(token);

       //populating the request
      req.userId = decodedData?.sub;
    }    

    next(); 
  } catch (error) {
    console.log(error);
  }
};

export default auth;
