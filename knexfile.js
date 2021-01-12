// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cohorts',
      username:'manpreet',
      password:"Mehreen1991"
    },
    migrations: {
      tablename:'migrations',
      directory:'./db/migrations'
    },
    seeds:{
      directory:'./db/seeds'
    }
  },
};
  
   
