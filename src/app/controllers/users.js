const data = require('../../../data.json')

// Rotas Usuário

exports.home = function (req, res) {
  return res.render('page-client/home', { recipes: data.recipes })
}

exports.about = function (req, res) {
  return res.render('page-client/about')
}

exports.chefs = function (req, res) {
  return res.render('page-client/chefs', { chefs: data.chefs })
}

exports.recipes = function (req, res) {

  const { id } = req.params

  const foundRecipe = data.recipes.find((recipe) => {
    return recipe.id == id
  })

  if (!foundRecipe) {
    return res.send("Receita não encontrada")
  }

  const recipe = {
    ...foundRecipe,
    ingredients: foundRecipe.ingredients.toString().split(','),
    preparations: foundRecipe.preparations.toString().split(',')
  }

  return res.render('page-client/recipe', { recipe })
}