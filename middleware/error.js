const { CustomAPIError } = require('../errors/customErrors')
const errorHandler = (err,req,res,next) =>{
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message:err.messge})
    }
    console.log(err)
    return res.status(500).json({msg:'something went wrong'})
}

module.exports = errorHandler;