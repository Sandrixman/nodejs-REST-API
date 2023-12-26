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

const carSchema = new Schema(
    {
        id: {
            type: Number,
            required: [true, "Set ID for the car"],
        },
        year: {
            type: Number,
            required: [true, "Set year for the car"],
        },
        make: {
            type: String,
            required: [true, "Set make for the car"],
        },
        model: {
            type: String,
            required: [true, "Set model for the car"],
        },
        type: {
            type: String,
            required: [true, "Set type for the car"],
        },
        img: {
            type: String,
            required: [true, "Set image URL for the car"],
        },
        description: {
            type: String,
            required: [true, "Set description for the car"],
        },
        fuelConsumption: {
            type: String,
            required: [true, "Set fuel consumption for the car"],
        },
        engineSize: {
            type: String,
            required: [true, "Set engine size for the car"],
        },
        accessories: {
            type: [String],
        },
        functionalities: {
            type: [String],
        },
        rentalPrice: {
            type: String,
            required: [true, "Set rental price for the car"],
        },
        rentalCompany: {
            type: String,
            required: [true, "Set rental company for the car"],
        },
        address: {
            type: String,
            required: [true, "Set address for the car"],
        },
        rentalConditions: {
            type: String,
            required: [true, "Set rental conditions for the car"],
        },
        mileage: {
            type: Number,
            required: [true, "Set mileage for the car"],
        },
    },
    { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleMongooseError)
carSchema.post("save", handleMongooseError)

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
const Car = model("car", carSchema)

module.exports = {
    Contact,
    Car,
    contactsJoiSchemas,
}
