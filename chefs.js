const fs = require('fs')
const data = require('./data.json')

// Rotas Administrativas

exports.index = function (req, res) {
  return res.render('page-admin/chefs/listing', { chefs: data.chefs })
}

exports.create = function (req, res) {
  return res.render('page-admin/chefs/create', { chefs: data.chefs.values })
}

exports.show = function (req, res) {
  const { id } = req.params

  const foundChef = data.chefs.find((chef) => {
    return chef.id == id
  })
  if (!foundChef) {
    return res.send('Receita não encontrada')
  }

  const chef = {
    ...foundChef
  }

  return res.render('page-admin/chefs/detail', { chef })
}

exports.edit = function (req, res) {
  const { id } = req.params

  const foundChef = data.chefs.find((chef) => {
    return chef.id == id
  })
  if (!foundChef) {
    return res.send('Receita não encontrada')
  }

  const chef = {
    ...foundChef
  }

  return res.render("page-admin/chefs/edit", { chef })
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Por favor, preencha todos os campos.')
    }
  }

  let { name, avatar_url } = req.body

  const id = Number(data.chefs.length + 1)

  data.chefs.push({
    id,
    name,
    avatar_url
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send('Erro de escrita do arquivo')
    }
    return res.redirect('/admin/chefs')
  })
}

exports.put = function (req, res) {

  const { id } = req.body

  let index = 0

  const foundChef = data.chefs.find((chef, foundIndex) => {
    if (id == chef.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundChef) {
    return res.send("Receita não encontrada")
  }

  const chef = {
    ...foundChef,
    ...req.body,
    id: Number(id)
  }

  data.chefs[index] = chef

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }

    return res.redirect(`/admin/chefs/${id}`)
  })
}

exports.delete = function (req, res) {
  const { id } = req.body

  const filteredChefs = data.chefs.filter(function (chef) {
    return chef.id != id
  })

  data.chefs = filteredChefs

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write file error")
    }

    return res.redirect('/admin/chefs')
  })
}
