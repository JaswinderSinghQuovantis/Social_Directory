import mongoose from 'mongoose'
const profileSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    dob: {
        type: String,
        required: true,
        minlength: 2
    },
    email : { type: mongoose.Schema.Types.String, ref: 'User' },
    interest: [
        {
         Sport:{
            type: String,
            required: true,
            minlength: 2
         },
         Cultural : {
             type : String,
             required:true,
             minlength:2
         },
         Carrier:{
             type : String,
             required :true,
             minlength:2
         }
        
    }
    ],
    location: {
        type: String,
        required: true,
        minlength: 2
    }
},
    {
        timestamps: true
    }
)

const Profile = mongoose.model("profile", profileSchema)

export default Profile;