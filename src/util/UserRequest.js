import axios from 'axios';

const apiURL = "http://localhost:3000/users"


export default{
    async index(){
       return axios.get(apiURL).then(res => res.data)
    },

    async create(user){
        return axios.post(apiURL, user).then(res => res.data)
     },

     async update(user){
        return axios.put(apiURL, user).then(res => res.data)
     }
}