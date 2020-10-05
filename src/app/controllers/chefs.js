const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
  index(req, res) {
    Chef.all(function (chefs) {
      return res.render('page-admin/chefs/listing', { chefs })
    })
  },

  create(req, res) {
    return res.render('page-admin/chefs/create')
  },

  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos.')
      }
    }

    Chef.create(req.body, function (chef) {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })
  },

  show(req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) {
        return res.send('Chef não encontrada')
      }

      Recipe.showRecipes(req.params.id, function (recipes) {
        return res.render('page-admin/chefs/detail', { chef, recipes })
      })
    })
  },

  edit(req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) {
        return res.send('Receita não encontrada')
      }

      return res.render('page-admin/chefs/edit', { chef })
    })
  },

  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos')
      }
    }

    Chef.update(req.body, function () {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })
  },

  delete(req, res) {
    Chef.delete(req.body.id, function () {
      return res.redirect('/admin/chefs')
    })
  }
}
