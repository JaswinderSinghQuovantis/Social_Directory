/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : controller.js
* @author : Jaswinder Singh<jaswinder.singh@quovantis.com>
* @version : 1.0
*
**************************************************************************/
import { logger } from '../../logger/logger.js'
import validation from '../validation/validation.js'
import userservice from '../userservice/userservice.js'
import httpcode from '../utilities/httpcode.js'
class UserController {
    /**
     * @description Registering new users
     * @method register is a service class method
     * @method validate validates inputs using Joi
     */
    register = async (req, res) => {
        try {
            if (req) {
                const userRegistration = {
                    email: req.body.email,
                    password: req.body.password,
                    phoneNo: req.body.phoneNo
                }
                const validationResult = validation.ValidationRegister.validate(userRegistration)
                if (validationResult.error) {
                    logger.error('Failed To Validated Input');
                    return res.status(httpcode.responseCode.Unprocessable_Entity).send({
                        success: false, message: validationResult.error.message
                    });
                }
                const userResult = await userservice.register(userRegistration)
                if(userResult){
                    return res.status(httpcode.responseCode.Created).json({
                        sucess: true, message: 'User registrated is Successfully',data : userResult
                    })
                }   
                else{
                    console.log("e",error.name)
                    if (error.name === 'MongoServerError' && error.code === 11000) {
                        logger.error('User with this email Id is alreday exists');
                        return res.status(httpcode.responseCode.conflit).send(
                            { success: false, message: 'User with this email Id is alreday exists',error:error }
                        )
                      }
                    return res.status(httpcode.responseCode.Bad_Request).json({
                        sucess: true, message: 'Error while fetching',error:error
                    })
                }       
            }
        } catch (error) {
            logger.error("error", error);
            return res.status(httpcode.responseCode.InternalServerError).json({ sucess: false, message: 'Internal server error', sucess: false })
        }
    }
}
export default new UserController;