const express = require("express")
const contactsRouter = express.Router()
const { contactsCtrl } = require("../../controllers")
const { contactsJoiSchemas } = require("../../models")
const { validateBody, isValidId, authenticate } = require("../../middlewares")

contactsRouter.get("/", authenticate, contactsCtrl.сontactsList)

contactsRouter.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById)

contactsRouter.post(
    "/",
    authenticate,
    validateBody(contactsJoiSchemas.addContactSchema),
    contactsCtrl.addContact
)

contactsRouter.patch(
    "/:contactId",
    authenticate,
    isValidId,
    validateBody(contactsJoiSchemas.updateContactSchema),
    contactsCtrl.updateContact
)

contactsRouter.delete("/:contactId", authenticate, isValidId, contactsCtrl.removeContact)

module.exports = contactsRouter
