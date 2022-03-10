import jsonwebtoken from 'jsonwebtoken';
import User from '../model/user.model.js';

class Helper {
  userToken = (data) => {
    const token = {
      id: data._id,
      phoneNo: data.phoneNo,
      email: data.email
    };
    return jsonwebtoken.sign({ token }, process.env.JWT_SECRET, { expiresIn: '24H' });
  }

  authorization = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      try {
        if (token) {
          jsonwebtoken.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
              return res.status(400).send({ success: false, message: 'Invalid Token' });
            } else {
              const data = await User.findOne({ email: userCredential.email })
              if (!data) {
                return "User is not Registered yet"
              }
              req.user = decoded;
              next();
            }
          });
        } else {
          return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
        }
      } catch (error) {
        return res.status(500).send({ success: false, message: 'Something went wrong!' });
      }
    }
  }
}
export default new Helper()