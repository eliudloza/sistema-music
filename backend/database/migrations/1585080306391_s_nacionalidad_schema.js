'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NacionalidadSchema extends Schema {
  up () {
    this.create('nacionalidads', (table) => {
      table.increments()
      table.string('nombre').notNullable()
      table.string('abreviacion').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('nacionalidads')
  }
}

module.exports = NacionalidadSchema
