import { arbeitnow1 } from "../../../src/Db/arbeitnow1"
import _ from 'lodash'

export const resolvers = {
    Query:{
        jobs: () =>{
            return arbeitnow1
        },
        job:(parent,args)=>{
            const title = args.title
           // const job = _.filter(arbeitnow1, {title})
           const job = _.filter(arbeitnow1,i =>{           
            // if(i.title.includes(title) == true){
            //     return i.title
            // }
            return i.title.includes(title)
           })
           return job
        },

    }
}