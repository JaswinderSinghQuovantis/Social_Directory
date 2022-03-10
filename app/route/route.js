/**
 * @module       routes
 * @file         routes.js
 * @description  API Routing
 * @author       Jaswinder Singh
 */
import usercontroller from '../usercontroller/usercontroller.js'
import userAuth from '../helper/global.helper.js'


export default app => {
    // api for registration
    app.post('/register', usercontroller.register);
    // api for Login
    app.post('/login',usercontroller.login);
    // api for profile
    app.post('/profile',userAuth.authorization,usercontroller.createProfile)

    app.get('/searchProfile',userAuth.authorization,usercontroller.searchProfile)
}