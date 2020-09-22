const data = require('../../../data.json')
const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')

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

  Recipe.find(req.params.id, function (recipe) {
    if (!recipe) {
      return res.send('Receita não encontrada')
    }

    recipe.ingredients = recipe.ingredients.toString().split(',')
    recipe.preparations = recipe.preparations.toString().split(',')
    recipe.created_at = date(recipe.created_at).format

    return res.render('page-client/recipe', { recipe })
  })


}