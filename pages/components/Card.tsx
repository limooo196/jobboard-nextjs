import React,{useState} from 'react'
import star from '../../public/icons/star.png'
import pin from '../../public/icons/pin.png'
import work from '../../public/icons/work.png'
import Image from 'next/image'


import FullCard from './FullCard'


function Card(props) {
    const [isShown, setIsShown] = useState(false)

    const toggleFullCard = () => {
        setIsShown(current => !current)
    }

  return (
    <div className=''>
        <div className=' text-black my-3 md:w-4/6 m-auto rounded-lg border-2 w-10/12'>
        <div className='absolute -ml-10 mt-4'>
        <Image src={props.logo} width={30} height={30} className="bg-gray m-10" /> 
        </div>
        
        <div className='bg-white flex justify-between  p-1'>
            
            <ul className='flex flex-col items-start justify-start text-sm px-2  mr-5 '>
            
                <li className='font-semibold'><Image src={star} width={10} height={10} /> {props.title}</li>
                <li> <Image src={work} width={10} height={10} /> {props.companyName}</li>
                <li><Image src={pin} width={10} height={10} /> {props.location}</li>
            </ul>
            <ul className='flex items-center flex-wrap '>
                {props.tags.map(x => {
                    return (<div className='bg-orange-200 flex-wrap text-xs  m-1 md:-my-4 px-1 rounded-l'> {x}          </div>)
                })}
            </ul>
            <div className='flex justify-center items-center '>
               
                
                <button onClick={toggleFullCard} className=' bg-gray-500 flex text-white items-center justify-center p-1 h-6 w-12 rounded-lg mr-3 hover:text-gray-500 hover:bg-gray-300'>View</button>
                <a href={props.link}>
                <button onClick={toggleFullCard} className=' bg-orange-200 flex text-black items-center justify-center p-1 h-6 w-12 rounded-lg mr-3 hover:text-gray-500 hover:bg-gray-300'>Apply</button>
                </a>
            </div>
        </div>
        <div className='flex'>
        <ul >

            </ul>

        </div>
    </div>
    <div>
        {isShown && <FullCard description = {props.description} />}



    </div>



    </div>

  )
}

export default Card