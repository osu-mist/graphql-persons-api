const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const db = require('./db')

process.on('SIGINT', () => {
  process.exit()
})

// Person class
class Person {
    constructor(osuID, { name, birthDate, email, loginName }) {
        this.osuID = osuID
        this.name = name
        this.birthDate = birthDate
        this.email = email
        this.loginName = loginName
    }
}

// scehma
var schema = buildSchema(`
    type Person {
        osuID: ID!
        name: String
        birthDate: String
        email: String
        loginName: String
    }

    type Query {
        getPerson(osuID: ID!): Person
    }
`)

// resolver function
var root = {
    getPerson: ({osuID}) => {
      return new Promise((resolve, reject) => {
        db.getPerson(osuID, (person) => {
          resolve(new Person(osuID, {
            'name': person[0][1] + person[0][2],
            'birthDate': person[0][3],
            'email': person[0][4],
            'loginName': person[0][5]
          }))
        })
      })
    }
}

// run GraphQL API server
var app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
