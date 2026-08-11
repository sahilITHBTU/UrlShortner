import jwt from "jsonwebtoken";
const secret = "Sahil@2#"
function setUser(user) {
  return jwt.sign({
    _id :user._id,
    email : user.email,
    role : user.role,
  },secret);
}

function getUser(token) {
    if(!token) return null;
    //  console.log(token);
  try {
    console.log(jwt.verify(token, secret));
    return jwt.verify(token, secret);
  } catch (error) {
    return null;   
  }
}

export { setUser, getUser };
