import { gql} from "@apollo/client";

export const typeDefs = gql`

type Query{
    jobs(limit:Int):[job]
    job(title:String!):[job]
}

type job{
    id:ID!
    url:String!
    title:String!

    company_name:String
    company_logo:String

    category:String
    tags:[String]

    job_type:String
    publication_date:String
    candidate_required_location:String

    salary:Int
    description:String
}




`

