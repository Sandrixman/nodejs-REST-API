const { Schema, model } = require("mongoose")
const Joi = require("joi")
const { handleMongooseError } = require("../helpers")

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleMongooseError)

const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})

const favoriteContactSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const contactsJoiSchemas = {
    addContactSchema,
    updateContactSchema,
    favoriteContactSchema,
}

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    contactsJoiSchemas,
}
