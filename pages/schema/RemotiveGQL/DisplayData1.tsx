
import React from 'react'
import {useQuery,gql,useLazyQuery} from '@apollo/client'
import { useState } from 'react'
import { xor } from 'lodash'
// import Card from '../../components/Card'
import FullCard from '../../components/FullCard'
import Image from 'next/image'
import header_bg from '../../../public/icons/header_bg.jpg'
import { render } from "react-dom";
import logo from '../../../public/icons/LetsSearchJobs-logos/LetsSearchJobs-logos_white.png'
import InfiniteScroll from 'react-infinite-scroll-component';

const Card = React.lazy(() => import('../../components/Card'))

const QUERY_ALL_JOB = gql`
    query Query {
        jobs{
            title
            company_name
            company_logo
            candidate_required_location
            tags
            description
        }
    }
`

const QUERY_FILTERED_JOB = gql`
    query queryFilteredJob($title:String!){
        job(title:$title){
            title
            company_name
            company_logo
            candidate_required_location
            tags
            description
        }
    }
`

var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

function DisplayData1() {
    const limit = 10;
    const{data,error,loading,fetchMore,networkStatus} = useQuery(QUERY_ALL_JOB,{
       pollInterval:3000,
        notifyOnNetworkStatusChange: true,
      })
    const [getFilteredJob,{data:filteredJob}] = useLazyQuery(QUERY_FILTERED_JOB)


    

    
    const [query, setQuery] = useState()
    const [isFiltered, setisFiltered] = useState(false)
    const [hasMore, sethasMore] = useState(true)

    
    if(data){
        const data10 = data.jobs
        console.log(data10[0])
        //console.log(data.jobs.slice(0,10))
        const fetchMoreData = async () => {
            console.log("MEK1")
            if (data10.length >= 20) {
                sethasMore(false)
            }
            // a fake async api call like which sends
            // 20 more records in .5 secs
              setTimeout(()=>{
                data10 : data10.concat(Array.from({ length: 20 }))
                console.log("MEK")
              }),1000
              
            }
        return (
            <div className=''>

<div className=' header-bg w-screen '>
                    <div>
                        <div className='m-auto border-white -m-2 flex justify-center border- '>
                            <a href="/">
                            <Image src={logo} width={200}  height={200}/>
                            </a>
                           
                           <br/>

                        </div>
                        <h1 className='text-white text-xl flex justify-center -mt-5 mb-10'>
                            Work with best jobs you can find here
                           </h1>
                        
                    <form onSubmit={(e) => e.preventDefault()}>   
                        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                        <div class="relative w-6/12 m-auto">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input  type="text" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-100 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter job query...' onChange={(event)=>{setQuery(event.target.value)}} />

                            <button onClick={()=>{
                            getFilteredJob({variables:{title:query}});
                            setisFiltered(true)}} 
                            type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>
                    </form>
                    <br /><br />
                    </div>
                <div>

                        {filteredJob &&  (
                     <ul className='my-9'>
                  {filteredJob.job.map(x=>{
                    console.log(x)
                    return(
                      <li> <Card 
                            title={x.title} 
                            companyName = {x.company_name} 
                            logo={x.company_logo}
                            tags={x.tags.slice(0,6)}
                            description={x.description}
                            location={x.candidate_required_location} className="m-8"/> 
                    </li>
                    )
                  })}
                  </ul>

              )}
                </div>
                </div>
                <br />

                <div>
                <ul className=''>
                  { isFiltered === false && 
                                        data10.map(x=>{
                        return(<li> <Card 
                             title={x.title} 
                            companyName = {x.company_name} 
                            logo={x.company_logo}
                            tags={x.tags.slice(0,6)}
                            description={x.description}
                            location={x.candidate_required_location} className="m-8"/> </li>)
                    })
                  }
                </ul>
                </div>

            </div>
          )
    }
    if(error) {
        console.log(error)
        return(<h2> Data not found <br /> SAD :((</h2>)}

}

export default DisplayData1