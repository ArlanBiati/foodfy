const fs = require("fs")
const data = require("./data.json")

exports.index = function(req, res) {
    return res.render("page-admin/listagem", { recipes })
}

exports.create = function(req, res) {
    return res.render("page-admin/create", { recipes })
}

exports.show = function(req, res) {
    const recipeId = req.params.id

    const recipe = recipes.find(e => e.id == recipeId )

    return res.render("page-admin/detail", { recipe }) 
}

exports.edit = function(req, res) {
    return res.render("page-admin/edit", { recipes })
}

exports.post = function(req, res) {
    
}

exports.put = function(req, res) {
    
}

exports.delete = function(req, res) {
    
}