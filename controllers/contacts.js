const { Contact } = require("../models")
const { HttpError, ctrlWrapper } = require("../helpers")

const сontactsList = async (req, res) => {
    try {
        const { _id: owner } = req.user
        const { page = 1, limit = 20, favorite } = req.query
        const skip = (page - 1) * limit
        const query = { owner }
        if (favorite) {
            query.favorite = favorite === "true"
        }

        const result = await Contact.find(query, "-createdAt -updatedAt", {
            skip,
            limit,
        }).populate("owner", "email subscription")
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "listContacts: Internal Server Error",
        })
    }
}

const getContactById = async (req, res) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findById(contactId)
        if (!result) {
            throw HttpError(404, "Contact not found")
        }
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "getContactById: Internal Server Error",
        })
    }
}

const addContact = async (req, res) => {
    try {
        const { _id: owner } = req.user
        console.log(req.body)

        const result = await Contact.create({ ...req.body, owner })
        res.status(201).json(result)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "addContact: Internal Server Error",
        })
    }
}

const updateContact = async (req, res) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        })
        if (!result) {
            throw HttpError(404, "Contact not found")
        }
        res.json(result)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "updateContact: Internal Server Error",
        })
    }
}

const removeContact = async (req, res) => {
    try {
        const { contactId } = req.params
        const result = await Contact.findByIdAndRemove(contactId)
        if (!result) {
            throw HttpError(404, "Contact not found")
        }
        res.json({ message: "contact deleted" })
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message || "removeContact: Internal Server Error",
        })
    }
}

module.exports = {
    сontactsList: ctrlWrapper(сontactsList),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
}
