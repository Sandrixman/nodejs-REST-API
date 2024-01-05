const { Schema, model } = require("mongoose")
const { handleMongooseError } = require("../helpers")

const firstCategorySchema = new Schema(
    {
        _id: {
            type: String,
        },
        firstCategory: {
            type: String,
        },
        pages: [
            {
                tags: {
                    type: [String],
                },
                secondCategory: {
                    type: String,
                },
                alias: {
                    type: String,
                },
                title: {
                    type: String,
                },
                category: {
                    type: String,
                },
                tagsTitle: {
                    type: String,
                },
                metaTitle: {
                    type: String,
                },
                metaDescription: {
                    type: String,
                },
                advantages: {
                    type: [Object],
                },
                faq: {
                    type: [Object],
                },
                seoText: {
                    type: String,
                },
                salary: {
                    type: Object,
                },
            },
        ],
    },
    { versionKey: false }
)

const productSchema = new Schema(
    {
        _id: {
            type: String,
        },
        categories: {
            type: [String],
        },
        tags: {
            type: [String],
        },
        title: {
            type: String,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        link: {
            type: String,
        },
        price: {
            type: Number,
        },
        credit: {
            type: Number,
        },
        oldPrice: {
            type: Number,
        },
        advantages: {
            type: String,
        },
        initialRating: {
            type: Number,
        },
        html: {
            type: String,
        },
        characteristics: {
            type: [Object],
        },
        reviews: {
            type: [Object],
        },
        clicks: {
            type: Number,
        },
        reviewCount: {
            type: Number,
        },
        reviewAvg: {
            type: Number,
        },
    },
    { versionKey: false }
)

firstCategorySchema.post("save", handleMongooseError)
productSchema.post("save", handleMongooseError)

const Services = model("services", firstCategorySchema)
const Courses = model("courses", firstCategorySchema)
const Product = model("products", productSchema)

module.exports = { Services, Courses, Product }
