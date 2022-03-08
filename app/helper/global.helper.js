import jsonwebtoken from 'jsonwebtoken';

class Helper {
    UserToken =   (data) => {
        const token = {
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email
        };
        return jsonwebtoken.sign({ token }, process.env.JWT_SECRET, { expiresIn: '24H' });
      }
    
}
export default new Helper()