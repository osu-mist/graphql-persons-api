const oracledb = require('oracledb')
const config = require('./config.json')

const dbConfig = {
  user: config.dbUser,
  password: config.dbPassword,
  connectString: config.dbConnectionString
}

module.exports = {
  getPerson(id, callback) {
    oracledb.getConnection(
      dbConfig, (err, connection) => {
        if (err) {
          console.error(err)
          return
        }
        connection.execute(
          `SELECT
             GYBONID_OSU_ID AS OSU_ID,
             GYBONID_FIRST_NAME AS FIRST_NAME,
             GYBONID_LAST_NAME AS LAST_NAME,
             GYBONID_BIRTH_DATE AS BIRTH_DATE,
             GYBONID_PRIMARY_EMAIL_ADDRESS AS EMAIL_ADDRESS,
             GYBONID_LOGIN_NAME AS USERNAME
           FROM GYBONID
           WHERE GYBONID_OSU_ID = ${id}`,
          (err, result) => {
            if (err) {
              console.error(err)
              doRelease(connection)
              return
            }
            doRelease(connection)
            return callback(result.rows)
          })
      })

    function doRelease(connection) {
      connection.close(
        (err) => {
          if (err) {
            console.error(err.message)
          }
        })
    }
  }
}
