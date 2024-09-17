import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "User is not Authenticated" });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode);
    if (!decode) {
      return res.status(404).json({ message: "Invalid token" });
    }
    req.id = decode.userId;
    // console.log(token);
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
