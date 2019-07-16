// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dad-jokes.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
<<<<<<< HEAD
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
=======
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL,
      // user:     'username',
      // password: 'password'
    },
>>>>>>> 86941bc14bebae9b1b8d98f41a1166e30c351837
    migrations: {
      directory: './data/migrations'
    }, 
    useNullAsDefault: true
  }

};
