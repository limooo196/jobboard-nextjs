//import { ApolloClient, InMemoryCache ,ApolloProvider,gql} from "@apollo/client";

//import {CityQuery} from "./CityQuery";
import React from 'react'
//import { ApolloServer } from "apollo-server-micro";

import { ApolloServer } from "apollo-server";
// import {typeDefs} from '../schema/ArbeitnowGQL/typedefs'
// import { resolvers } from "../schema/ArbeitnowGQL/resolver";

import { typeDefs } from "../schema//RemotiveGQL/typedefs1";
import {resolvers} from "../schema/RemotiveGQL/resolver1";

// V.1
// const server = new ApolloServer({
//   typeDefs,
//   resolvers
// })

// V.2
const server = new ApolloServer({
  typeDefs,
  resolvers,
})


module.exports = server.listen().then(({url})=>{
  console.log(`api running : ${url}`)
  console.log("hmm")
  return 
})




