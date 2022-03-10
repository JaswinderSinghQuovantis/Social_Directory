import User from '../model/user.model.js'
import helper from '../helper/global.helper.js'
import Profile from '../model/profile.model..js'
import bcrypt from 'bcrypt'
import { logger } from '../../logger/logger.js'

class Service {
    /**
     * @description: Adds data to the database
     * @param {object} userDetails
     * @param {function} Promise
     */
    register = async (userDetails) => {
            const newUser = new User();
            newUser.email = userDetails.email;
            newUser.password = userDetails.password;
            newUser.phoneNo = userDetails.phoneNo;
            try{
                const userResult = await newUser.save()
                return userResult
            }
           catch(error){
             return error
           }
    }
    /**
	 * @description Find user with emailId
     * @param loginData
	 * @method findOne will find user with specific emailId
	 */

    login = async (loginData)=>{
       const checkuserexist = await User.findOne({email:loginData.email})
       if(checkuserexist){
           try{
           const hash = await bcrypt.compare(loginData.password,checkuserexist.password)
           if(hash){
               const token = helper.userToken(checkuserexist)
               if(token){
                   return token
               }
           }else if (!hash){
               return "Invalid usercredential"
           }
        }catch(error){
            return error
        }
       }else if(!checkuserexist)
       return checkuserexist
    }

    /**
	 * @description creating profile with emailId
     * @param userCredential
	 * @method save will create profile with specific emailId
	 */
    createProfile = async (userCredential) =>{
        const userData = await profile.findOne({email:userCredential.email})
        if(userData){
            return "Profile is Already exist"
        }
        const newProfile = new Profile()
        newProfile.dob=userCredential.dob,
        newProfile.name=userCredential.name,
        newProfile.location=userCredential.location,
        newProfile.interest=userCredential.interest,
        newProfile.email=userCredential.email
        try{
            const profileResult = await newProfile.save()
            return profileResult
        }
       catch(error){
         return error
       }
    }

      /**
	 * @description creating profile with emailId
     * @param userCredential
	 * @method save will create profile with specific emailId
	 */

      searchProfile = async (searchInterest)=>{
          try {
            const searchResult = await Profile.find({
                'interest[0].Sport': {
                  $elemMatch: {
                    Sport: searchInterest.interest[0].Sport
                  },
                },
                'interest[0].Culutural':{
                    $elemMatch: {
                        Carrier:searchInterest.interest[0].Carrier
                      },
                },
                'interest[0].Carrier':{
                    $elemMatch: {
                        Carrier:searchInterest.interest[0].Carrier
                      }
                }
              })
            return searchResult
          } catch (error) {
              logger.error(error)
          }
      }

}
export default new Service()