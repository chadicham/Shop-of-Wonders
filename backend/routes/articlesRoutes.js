const express = require('express')
const router = express.Router()
const {getAllArticles, updateArticle, deleteArticle, createArticles, getArticle} = require("../controllers/articlesController");


router.get("/all", getAllArticles)
router.get("/article/:id", getArticle)
router.post("/add", createArticles)
router.put("/:id", updateArticle)
router.delete("/:id", deleteArticle)


module.exports = router

