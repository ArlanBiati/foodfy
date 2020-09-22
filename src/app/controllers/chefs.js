const Chef = require('../../models/Chef')
const { date } = require('../../lib/utils')

// Rotas Administrativas

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
        return res.send('Receita não encontrada')
      }

      chef.created_at = date(chef.created_at).format

      return res.render('page-admin/chefs/detail', { chef })
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
