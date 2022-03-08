import user from '../model/model.js'
import helper from '../helper/global.helper.js'
import bcrypt from 'bcrypt'
class Service {
    /**
     * @description: Adds data to the database
     * @param {object} userDetails
     * @param {function} Promise
     */
    Register = async (userDetails) => {
            const newUser = new user();
            newUser.email = userDetails.email;
            newUser.password = userDetails.password;
            newUser.phoneNo = userDetails.phoneNo;
            try{
                const userResult = await newUser.save()
                return userResult
            }
           catch(error){
               console.log("333",error);
             return error
           }
    }
    /**
	 * @description Find user with emailId
     * @param loginData
	 * @method findOne will find user with specific emailId
	 */

    Login = async (loginData)=>{
       const checkuserexist = await user.findOne({email:loginData.email})
       if(checkuserexist){
           try{
           const hash = await bcrypt.compare(loginData.password,checkuserexist.password)
           if(hash){
               const token = helper.UserToken(loginData)
               if(token){
                   return token
               }
           }else if (!hash){
               return "Invalid Credential"
           }
        }catch(error){
            return error
        }
       }else if(!checkuserexist)
       return checkuserexist
    }
}
export default new Service()