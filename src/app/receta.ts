export interface Receta {
    _id:Number,
    _name:String,
    _description:String,
    _ingredientes:string[],
    _author:Number,
    _protein:Number,
    _carbohydrates:Number,
    _fat:Number,
    _kcals:Number,
    _likes:Number[],
    _imageURL?:String
}
