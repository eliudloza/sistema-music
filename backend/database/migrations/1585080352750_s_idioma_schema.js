'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IdiomaSchema extends Schema {
  up () {
    this.create('idiomas', (table) => {
      table.increments()
      table.string('nombre').notNullable().unique()
      table.string('descripcion').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('idiomas')
  }
}

module.exports = IdiomaSchema
