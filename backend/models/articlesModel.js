const mongoose = require('mongoose')

const articlesSchema = mongoose.Schema({
    productName:{
        type: String,
        required: [true, "Merci d'entrer un nom de produit"],
        trim: true,
    },
    productPrice: {
        type: String,
        required: [true, "Merci d'entrer le prix du produit"],
        trim: true,
    },
    productCategory: {
        type: String,
        required: [true, "Merci d'entrer une catégorie"],
        trim: true,
    },
    productImage: {
        type: String,
        required: [true, "Merci d'entrer une image du produit"],
        trim: true,
    },
    productDescription: {
        type: String,
        required: [true, "Merci d'entrer une description"],
    }
}, {timestamps: true})

module.exports = mongoose.model('Articles', articlesSchema)