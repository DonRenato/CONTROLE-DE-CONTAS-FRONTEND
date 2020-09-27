import axios from 'axios';

const apiURL = "http://localhost:3000/bills"


export default{
    async index(){
       return axios.get(apiURL).then(res => res.data)
    },

    async create(bill){
        return axios.post(apiURL, bill).then(res => res.data)
     },

     async delete(bill){
        return axios.delete(apiURL, bill).then(res => res.data)
     }
}