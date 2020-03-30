'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlbumSchema extends Schema {
  up () {
    this.create('albums', (table) => {
      table.increments()
      table.string('nombre').notNullable();
      table.integer('year').notNullable();
      table.integer('n_canciones').notNullable();
      table.integer('artista_id').unsigned().references('id').inTable('artistas');
      table.integer('disquera_id').unsigned().references('id').inTable('disqueras');
      table.timestamps()
    })
  }

  down () {
    this.drop('albums')
  }
}

module.exports = AlbumSchema
