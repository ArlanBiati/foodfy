const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')
const { date } = require('../../lib/utils')

// Rotas Usuário

exports.home = function (req, res) {

  Recipe.all(function (recipes) {
    return res.render('page-client/home', { recipes })
  })

}

exports.about = function (req, res) {
  return res.render('page-client/about')
}

exports.chefs = function (req, res) {

  Chef.all(function (chefs) {
    return res.render('page-client/chefs', { chefs })
  })
}

exports.recipes = function (req, res) {

  Recipe.all(function (recipes) {
    return res.render('page-client/recipes', { recipes })
  })
}

exports.recipe = function (req, res) {

  Recipe.find(req.params.id, function (recipe) {
    if (!recipe) {
      return res.send('Receita não encontrada')
    }

    recipe.created_at = date(recipe.created_at).format

    return res.render('page-client/recipe', { recipe })
  })
}