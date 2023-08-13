const contactModel = require("../schemas/contacts")
const userModel = require("../schemas/user")


const ContactsController = {
    contactsAdd: (req, res) => {
        if (!req.body && !req.body) {
            res.json({
                status: false,
                message: 'Could not add contact'
            })
            return
        }

        const obj = {
            user: req.body.user,
            img_src: req.body.imgSrc,
            name: req.body.name,
            number: req.body.number,
            last_msg: req.body.lastMsg,
            msgs: req.body.msgs
        }

        userModel.findOne({ _id: req.body.user })
            .then(success => {
                if (!success) {
                    res.json({
                        status: false,
                        message: 'Please login again'
                    })
                    return
                }


                contactModel.create(obj)
                    .then(success => {

                        res.json({
                            status: true,
                            data: {
                                user: success.user,
                                imgSrc: success.img_src,
                                name: success.name,
                                number: success.number,
                                lastMsg: success.last_msg,
                                msgs: success.msgs
                            }
                        })
                    })
                    .catch(error => {
                        res.json({
                            status: false,
                            message: error.message
                        })
                    })

            })
            .catch(error => {
                console.log(error.message)
                res.json({
                    status: false,
                    message: error.message
                })
            })


    },

    contactsGet: (req, res) => {
        if (!req.body && !req.body.hash) {
            res.json({
                status: false,
                message: 'Could not get contacts'
            })
            return
        }

        contactModel.find({ user: req.body.hash })
            .then(success => {

                const data = success.map(s=>{
                    return {
                        user: s.user,
                        imgSrc: s.img_src,
                        name: s.name,
                        number: s.number,
                        lastMsg: s.last_msg,
                        msgs: s.msgs
                    }
                })

                res.json({
                    status: true,
                    data
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error.message
                })
            })
    },

    contactsDelete: (req, res) => {
        if (!req.body && !req.body.number) {
            res.json({
                status: false,
                message: 'Could not delete contact'
            })
            return
        }

        contactModel.findOneAndDelete({ number: req.body.number })
            .then(success => {
                res.json({
                    status: true,
                    message: 'Deleted',
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error.message
                })
            })
    },

    contactsEdit: (req, res) => {
        if (!req.body && !req.body.data) {
            res.json({
                status: false,
                message: 'Could not add contact'
            })
            return
        }
        
        const index = req.body.data.msgs.length - 1
        const lastMsg = req.body.data.msgs[index]

        contactModel.findOneAndUpdate({ number: req.body.data.number }, { name: req.body.data.name, msgs: req.body.data.msgs, last_msg: lastMsg.txt })
            .then(success => {
                res.json({
                    status: true,
                    data: {
                        user: success.user,
                        imgSrc: success.img_src,
                        name: req.body.data.name,
                        number: success.number,
                        lastMsg: lastMsg.txt,
                        msgs: req.body.data.msgs
                    }
                })
            })
            .catch(error => {
                res.json({
                    status: false,
                    message: error.message
                })
            })
    },

}

module.exports = ContactsController