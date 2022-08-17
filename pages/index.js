import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { relayStylePagination } from "@apollo/client/utilities";

import { ApolloClient,InMemoryCache,ApolloProvider,useQuery } from '@apollo/client'
import DisplayData2 from './schema/RemotiveGQL/DisplayData2'

export default function Home() {

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            jobs: relayStylePagination(),
          },
        },
      },}),
    uri:"http://localhost:4000/api/graphql",

  })

  return (
    <div className={styles.container}>
      <ApolloProvider client ={client}>

        <DisplayData2/>

    </ApolloProvider>
    </div>
  )
}
