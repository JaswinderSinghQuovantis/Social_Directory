/**
 * @module       routes
 * @file         routes.js
 * @description  API Routing
 * @author       Jaswinder Singh
 */
import usercontroller from '../usercontroller/usercontroller.js'


export default app => {
    // api for registration
    app.post('/register', usercontroller.register);
}