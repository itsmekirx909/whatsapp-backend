const userModel = require("../schemas/user")
const bcrypt = require('bcrypt')


const CredentialController = {
    login: (req, res)=>{
        const {number, password} = req.body

        if(!number || !password){
            res.json({
                status: false,
                message: 'Missing fields'
            })
            return
        }

        userModel.findOne({number})
        .then(async success =>{
            if(!success){
                res.json({
                    status: false,
                    message: 'No user found'
                })
                return
            }

            const comparePassword = await bcrypt.compare(password, success.password)

            // if(comparePassword){
                res.json({
                    status: true,
                    hash: success._id
                })  

            // }else{
            //     res.json({
            //         status: false,
            //         message: 'Invalid Credentials'
            //     })  
            // }

        })
        .catch(error =>{
            res.json({
                status: false,
                message: error.message
            })
        })
        

    },

    signup: async(req, res)=>{
        const {number, password} = req.body

        if(!number || !password){
            res.json({
                status: false,
                message: 'Missing fields'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const obj = {
            number,
            password: hashedPassword
        }

        userModel.findOne({number})
        .then(async success =>{
            if(success){
                res.json({
                    status: false,
                    message: 'Already a user'
                })
                return
            }

            userModel.create(obj)
            .then(success2 =>{
                res.json({
                    status: true,
                    hash: success2._id
                })
            })
            .catch(error =>{
                res.json({
                    status: false,
                    message: error.message
                })
            })

        })
        .catch(error =>{
            res.json({
                status: false,
                message: error.message
            })
        })
        

    }
}

module.exports = CredentialController