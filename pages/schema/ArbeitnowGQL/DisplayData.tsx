import React from 'react'
import {useQuery,gql,useLazyQuery} from '@apollo/client'
import { useState } from 'react'
var parse = require('html-react-parser');

const QueryAllJob = gql`
    query Query {
        jobs {
            title
            slug
        }
}
`
const Get_Job_By_Name =gql`
  query GetJobByName($title: String!){
    job(title:$title){
      title
      slug
      company_name
      location
      description
    }

  }
`
function DisplayData() {
    const [query, setQuery] = useState("")
    const [fetchData, {data:queryData}] = useLazyQuery(Get_Job_By_Name)
    const {data,loading,error} = useQuery(QueryAllJob)
    if(error)
    {
      console.log(error)
    }
    if (loading)
    {
      console.log(loading)
    }

    if(data){
      const temp = Object.keys(data).map(key => {
         return data.jobs
      })
      const job = temp[0].map(k=>{
        return k
      })
      return(
        <div>
          <h1>DiData</h1>    
          {/* {job.map(x=>{return(<h5>{x.title}</h5>)
          })} */}
          <div>
            <input type="text" placeholder="Enter Job Query..." onChange={(event)=>{setQuery(event.target.value)}}/>
            <button onClick={()=> fetchData({variables:{title:query}})}>Fetch Data</button>
            <div><h2>JOB SEARCH</h2>
              {queryData && (
                <h2>
                  {queryData.job.map(x=>{
                    return(
                    <div>
                      <h4 >Job title:{x.title}</h4>
                      <p > Job Description{ parse(x.description)}</p>
                    </div>)
                  })
                  }
                </h2>
              )}
            </div>
          </div> 
        </div>
      )
    }
    


    
}

export default DisplayData