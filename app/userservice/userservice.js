import user from '../model/model.js'
class Service {
    /**
     * @description: Adds data to the database
     * @param {object} userDetails
     * @param {function} Promise
     */
    register = async (userDetails) => {
            const newUser = new user();
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
}
export default new Service()