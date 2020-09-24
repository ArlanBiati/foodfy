const Recipe = require('../../models/Recipe')
const Chef = require('../../models/Chef')
const { date } = require('../../lib/utils')

// Rotas Usuário
module.exports = {

  home(req, res) {

    Recipe.all(function (recipes) {
      return res.render('page-client/home', { recipes })
    })
  },

  about(req, res) {
    return res.render('page-client/about')
  },

  chefs(req, res) {

    Chef.all(function (chefs) {
      return res.render('page-client/chefs', { chefs })
    })
  },

  recipes(req, res) {

    Recipe.all(function (recipes) {
      return res.render('page-client/recipes', { recipes })
    })
  },

  search(req, res) {

    const { filter } = req.query

    if (filter) {

      Recipe.findBy(filter, function (recipes) {
        return res.render('page-client/search', { recipes, filter })
      })

    } else {

      Recipe.all(function (recipes) {
        return res.render('page-client/search', { recipes })
      })
    }
  },

  recipe(req, res) {

    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) {
        return res.send('Receita não encontrada')
      }

      recipe.created_at = date(recipe.created_at).format

      return res.render('page-client/recipe', { recipe })
    })
  }
}
