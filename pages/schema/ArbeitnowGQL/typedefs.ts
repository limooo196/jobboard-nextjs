import { gql } from "@apollo/client";

export const typeDefs = gql`
    # type job{
    #     id: ID!
    #     title:String!
    #     tags:[tag]
    # }

    # type tag{
    #     name:String!
    # }

    # type Query {
    #     jobs:[job!]!
    # }
    type job{
        slug:String
        company_name: String
        title:String
        description:String
        location:String
    }

    type Query{
        jobs:[job]
        job(title:String!):[job]
    }


`
module.exports = {typeDefs}