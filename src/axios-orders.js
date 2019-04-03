import axios from 'axios';
const instance  =axios.create({
     baseURL: 'https://burger-appliation.firebaseio.com/'
});


export default instance;