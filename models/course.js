const { Schema, model } = require("mongoose")
const { handleMongooseError } = require("../helpers")

const courseSchema = new Schema(
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

courseSchema.post("save", handleMongooseError)
productSchema.post("save", handleMongooseError)

const Course = model("course", courseSchema)
const Product = model("product", productSchema)

module.exports = { Course, Product }
