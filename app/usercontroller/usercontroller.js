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
    Register = async (req, res) => {
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
                    return res.status(httpcode().UNPROCESSABLENTITY).send({
                        success: false, message: validationResult.error.message
                    });
                }
                const userResult = await userservice.Register(userRegistration)
                if (userResult.name === 'MongoServerError' && userResult.code === 11000) {
                    logger.error('User with this email Id OR Phone Number is alreday exists');
                    return res.status(httpcode().CONFLICT).send(
                        { success: false, message: 'User with this email Id OR Phone No is alreday exists',error:userResult }
                    )
                  }
                else{
                    if(userResult){
                        return res.status(httpcode().CREATED).json({
                            sucess: true, message: 'User registrated is Successfully',data : userResult
                        })
                    }
                    return res.status(httpcode.responseCode.Bad_Request).json({
                        sucess: true, message: 'Some Error occured',error:error
                    })
                }       
            }
        } catch (error) {
            logger.error(error);
            return res.status(httpcode().INTERNALSERVERERROR).json({ sucess: false, message: 'Internal server error', error:error })
        }
    }

    /**
	 * @description User login API
	 * @method login is service class method
	 */

    Login = async (req,res)=>{
        try {
            const loginData ={
                email : req.body.email,
                password : req.body.password
            }
            const validationResult = validation.ValidationLogin.validate(loginData)
                if (validationResult.error) {
                    logger.error('Failed To Validated Input');
                    return res.status(httpcode().UNPROCESSABLENTITY).send({
                        success: false, message: validationResult.error.message
                    });
                }
                const userResult = await userservice.Login(loginData)
                if(userResult){
                    logger.info('User Login is Succesfully')
                    return res.status(httpcode().OK).json({
                        sucess: true, message: 'User Login is Successfully',data : userResult
                    })
                }
                else if(!userResult){
                    return res.status(httpcode().NOTFOUND).json({
                        sucess: true, message: 'Invalid Credential',error:error
                    })
                }
                return res.status(httpcode().BADREQUEST).json({
                    sucess: true, message: 'Login Falied',error:error
                }) 
        } catch (error) {
            logger.error(error);
            return res.status(httpcode.InternalServerError).json({ sucess: false, message: 'Internal server error', sucess: false })
        }
    }
}
export default new UserController;