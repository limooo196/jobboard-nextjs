import {remotive} from '../../db/remotive'

import _ from 'lodash'

export const resolvers = {
    Query:{
        jobs: async (_,{limit}) => {
            return remotive.slice(0,limit);
        },
        job:(parent,args)=>{
            const title = args.title.toLowerCase()
            const job = _.filter(remotive,i =>{
                return i.title.toLowerCase().includes(title)
            })

        return job
        }
    }
}