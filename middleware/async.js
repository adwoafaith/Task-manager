const asyncWrapper = (fn) =>{
return async(req,res,next)=>{

    try {
       await fn(req,res,next)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ message: `Invalid task ID provided` });
        }
        next(error)
}
}
}


module.exports = asyncWrapper;