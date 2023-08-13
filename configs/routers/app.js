const express = require('express')
const ContactsController = require('../controllers/contacts')
const CredentialController = require('../controllers/credentials')
const router = express.Router()

router.post('/api/contacts/add', ContactsController.contactsAdd)

router.post('/api/contacts/get', ContactsController.contactsGet)

router.put('/api/contacts/edit', ContactsController.contactsEdit)

router.post('/api/contacts/delete', ContactsController.contactsDelete)


router.post('/api/credentials/login', CredentialController.login)

router.post('/api/credentials/signup', CredentialController.signup)

module.exports = router