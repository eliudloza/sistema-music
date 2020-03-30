'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GeneroSchema extends Schema {
  up () {
    this.create('generos', (table) => {
      table.increments()
      table.string('nombre').notNullable()
      table.string('descripcion').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('generos')
  }
}

module.exports = GeneroSchema
