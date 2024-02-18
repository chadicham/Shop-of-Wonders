const asyncHandler = require('express-async-handler')
const Articles = require('../models/articlesModel')
const {join} = require("path");


// @desc Get all Articles
// @route Get /api/articles/all
// Access public
const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await Articles.find()
    res.status(200).json(articles)
})

// @desc Get specific Articles
// @route Get /api/articles/article
// Access public
const getArticle = asyncHandler(async (req, res) => {

    const id = req.params.id

    const article = await Articles.findById(id)

    if(!article) {
        res.status(400).json({message: "Article introuvable."})
        return
    }

    res.status(200).json(article)
})

// @desc Set Articles
// @route Post /api/articles
// Access public
const createArticles = asyncHandler(async (req, res) => {
    const { title, price, category, description } = req.body;
    console.log(req.files)

    const image = req.files && req.files.image;

    let path

    if (!image)
    {
        res.status(400).json({ message: "Veuillez saisir une image" });
        return;
    }

    if (image)
    {
        path = image.name.replace(/\s/g, "")

        const uploadPath = join(__dirname, "..", "..", "frontend", "public", "uploads", path);

        await image.mv(uploadPath, (err) => {
            if (err) {
                res.status(400).json({message: "Erreur lors de la création du fichier"});
            }
        });
    }


    if (!title || !price || !category || !description || !image) {
        res.status(400).json({ message: "Veuillez remplir tous les champs" });
        return;
    }

    const article = await Articles.create({
        productName: title,
        productPrice: price,
        productCategory: category,
        productDescription: description,
        productImage: path
    })
    if (article) {
        res.status(200).json(article)
    } else {
        res.status(400)
        throw new Error("Erreur lors de la création de l'article, veuillez réessayer.")
    }
})

// @desc Update Articles
// @route Put /api/articles:id
// Access public
const updateArticle = asyncHandler(async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if (!article) {
        res.status(400)
        throw new Error("Article non trouvé.")
    }

    console.log(req.body)

    const updatesArticle = await Articles.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatesArticle)
})

// @desc Delete Articles
// @route DELETE /api/articles:id
// Access public
const deleteArticle = asyncHandler( async (req, res) => {
    const article = await Articles.findById(req.params.id)

    if (!article) {
        res.status(400)
        throw new Error("Article non trouvé.")
    }

    await Articles.findByIdAndRemove(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAllArticles,
    createArticles,
    updateArticle,
    deleteArticle,
    getArticle
}