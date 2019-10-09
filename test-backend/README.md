# TEST BACKEND

This file will contain an explanation about design decisions i took and also anything that should be taken note of.

## Design Decisions

### Use of Environment variables

Sensitive information like database strings (Mongodb in this case) etc should be stored more securely, like in environment variables on the server where the app can access it in that environment only. This also gives a lot of flexibility in the sense that we can change the value and the app still works well.

To Simulate the use of environment variables:

1) Include it as part of the command for starting the node server.
2) Use a library like dotenv

I chose the library approach because it keeps start command of the node server neater and it more closely matches how it would be handled on a server.

### Use of SQLite as a data store

I wanted a portable data store that would allow the reviewer be able to check the project with as little setup as possible.

### Use of an abstraction over database, Knex and Google geocoding 

Knex is a great library for building sql queries and fits the type of database i used in this demo perfectly. I intend for it to be able to help handle switching between any SQL type database with ease.

However, I chose to include an abstraction over it called dbhelper to help cope with a switch to NoSQL (like mongodb). This approach is similar to the adapter pattern.

I then created a factory that handles instantiation of this db helper and passing the database object to the helper. We can perform any init functions in the factory before returning the object.
