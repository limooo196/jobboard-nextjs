
import React from 'react'
import {useQuery,gql,useLazyQuery} from '@apollo/client'
import { useState,useRef ,useEffect} from 'react'
import { xor } from 'lodash'
// import Card from '../../components/Card'
import FullCard from '../../components/FullCard'
import Image from 'next/image'
import header_bg from '../../../public/icons/header_bg.jpg'
import { render } from "react-dom";
import logo from '../../../public/icons/LetsSearchJobs-logos/LetsSearchJobs-logos_white.png'
import InfiniteScroll from 'react-infinite-scroll-component';

import {
    slice, concat, 
  } from 'lodash';
  
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
            url
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
            url
        }
    }
`
var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

function DisplayData1() {

    const{data,error,loading,fetchMore,networkStatus} = useQuery(QUERY_ALL_JOB,{
        notifyOnNetworkStatusChange: true,
      })
    const [getFilteredJob,{data:filteredJob}] = useLazyQuery(QUERY_FILTERED_JOB)
    
    const [query, setQuery] = useState()
    const [isFiltered, setisFiltered] = useState(false)
    const [hasMore, sethasMore] = useState(true)
    const [index, setindex] = useState(0)
    const [indexFiltered, setindexFiltered] = useState(0)

    const items = Array()
    const [listItems, setListItems] = useState([])
    const [listItemsFiltered, setListItemsFiltered] = useState([])

    const [scrollPosition, setScrollPosition] = useState(0);

    if(data){
        const data10 = data.jobs.slice(0,40)
        var a = data.jobs;
        console.log(listItems.length)

        for(var i=0;i<data.jobs.length;i++){
             items[i]=a.slice(i,i+10);
             listItems[i] = items[i]
          }

          const setFilteredJob = async () =>  {
            await(filteredJob)
            for(let i=0; i<filteredJob.job.length; i++){
              listItemsFiltered[i] = filteredJob.job.slice(i,i+10)
              return 1
           }
          }

        return (
            <div className=''>
              

<div className=' header-bg w-50 '>
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

                            <button id='submitButton' onClick={()=>{
                            getFilteredJob({variables:{title:query}});
                            setisFiltered(true)}} 
                            type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>
                        </div>
                    </form>
                    <br /><br />
                    </div>
                <div>

                  {filteredJob && setFilteredJob() && listItemsFiltered[indexFiltered]&&(
                    <div>
                     <ul className='my-9'>
                  {listItemsFiltered[indexFiltered].map(x=>{console.log(x)
                    return(
                      <div>
                      <li> <Card 
                            title={x.title} 
                            companyName = {x.company_name} 
                            logo={x.company_logo}
                            tags={x.tags.slice(0,6)}
                            description={x.description}
                            link={x.url}
                            location={x.candidate_required_location} className="m-8"/> 
                    </li></div>
                    )
                  })}

                  </ul>
                  <h2 className='m-auto flex justify-center font-bold '>Page: {index+1} </h2>
                  <div className='m-auto flex justify-center items-center bottom-3/4 '>
                    <a href="#" onClick={() => { if(indexFiltered > 0) {setindexFiltered(index - 1)}} } class="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg aria-hidden="true" class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                      Previousss
                    </a>
                    <a href="#" onClick={()=> {setindexFiltered(index+1)}} class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      Next
                      <svg aria-hidden="true" class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    </div>
                  </div>
                  

              )}
                </div>
                </div>
                <br />

                <div >
                <ul className='' id='card'>
                  { isFiltered === false && 
                                        listItems[index].map(x=>{
                        return(<li > <Card 
                             title={x.title} 
                            companyName = {x.company_name} 
                            logo={x.company_logo}
                            tags={x.tags.slice(0,6)}
                            description={x.description}
                            link={x.url}
                            location={x.candidate_required_location} className="m-8"/>
                             </li>)
                    }) 
                  } 
                  {isFiltered === false && (                        
                  <div>
                                  <h2 className='m-auto flex justify-center font-bold '>Page: {index+1} </h2>
                                  <div className='m-auto flex justify-center items-center bottom-3/4 '>
                                    <a href="#" onClick={() => { if(index > 0) {setindex(index - 1)}} } class="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg aria-hidden="true" class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                                      Previous
                                    </a>
                                    <a href="#" onClick={()=> {setindex(index+1)}} class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                      Next
                                      <svg aria-hidden="true" class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </a>
                                  </div>
                                  </div>)}
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