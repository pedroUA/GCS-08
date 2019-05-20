export interface Usuario {
    _id:Number,
    _username:String,
    _password?:String,
    _name?:String,
    _sex?:String,
    _years?:Number,
    _address?:String,
    _email?:String,
    _followers:Number[],
    _following:Number[],
    //Guardar las imagenes en /images/usuarios/[USERNAME].ext (/images/usuarios/francisco.png)
    _imageURL?:String,
}
