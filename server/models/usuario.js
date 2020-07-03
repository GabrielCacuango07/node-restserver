const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} NO ES UN ROL VALIDO'
}


let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'the name is necesary']
    },
    email:{
        type:String,
        unique:true,
        required :[true,'THE email is necesary']

    },
    password:{
        type: String,
        required: [true,'the password is necessary']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        default: 'USER_ROLE'  ,
        required: [true,'the password is necessary']   ,
        enum:rolesValidos 
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

usuarioSchema.plugin(uniqueValidator,{
    message:'{PATH} DEBE DE SER UNICO '
});
usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports=mongoose.model('Usuario',usuarioSchema);