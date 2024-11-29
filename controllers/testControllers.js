const testUserController = (req, res)=>{

    try{    
        res.status(200).send('<h2> test API</h2>')
    }catch(err){
        console.log('error in test API', err)
    }
}


module.exports = {
    testUserController
}