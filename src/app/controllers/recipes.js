const Recipe = require('../../models/Recipe')
const { date } = require('../../lib/utils')

// Rotas Administrativas

module.exports = {
  index(req, res) {
    Recipe.all(function (recipes) {
      return res.render('page-admin/recipes/listing', { recipes })
    })
  },

  create(req, res) {
    Recipe.chefsSelectOptions(function (options) {
      return res.render('page-admin/recipes/create', { chefOptions: options })
    })
  },

  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.')
      }
    }

    Recipe.create(req.body, function (recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })
  },

  show(req, res) {
    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) {
        return res.send('Receita não encontrada')
      }

      return res.render('page-admin/recipes/detail', { recipe })
    })
  },

  edit(req, res) {
    Recipe.find(req.params.id, function (recipe) {
      if (!recipe) {
        return res.send('Receita não encontrada')
      }

      Recipe.chefsSelectOptions(function (options) {
        return res.render('page-admin/recipes/edit', { recipe, chefOptions: options })
      })
    })
  },

  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos')
      }
    }

    Recipe.update(req.body, function () {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })
  },

  delete(req, res) {
    Recipe.delete(req.body.id, function () {
      return res.redirect('/admin/recipes')
    })
  }
}
