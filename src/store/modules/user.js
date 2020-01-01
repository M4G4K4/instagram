import axios from 'axios';
import passwordHash from "password-hash";

export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        LOGIN: ({commit},payload) =>{
            return new Promise((resolve,reject) =>{

                axios.post('verifyUser',payload)
                    .then(({data,status}) =>{
                        if(status === 200){
                            if(passwordHash.verify(payload.password,data.response[0].password)){
                                console.log("Login sucess");
                                console.log(data.response[0].IDuser);
                                resolve(true,data.response[0].IDuser);
                            }else{
                                resolve(false);
                            }
                        }
                        else{
                            console.log("Login Erro");
                            resolve(false);
                        }
                    })
                    .catch(error =>{
                        reject(error);
                    })


            })
        },
        REGISTER: ({commit},{username,nome,email,password}) =>{
            return new Promise((resolve,reject) =>{
                console.log("Email: " + email);
                console.log("Password: " + password);
                console.log("Nome: " + nome);
                console.log("Username: " + username);

                axios.post('registerUser',{username,nome,email,password})
                    .then(({data,status}) =>{
                        if(status === 201){
                            //console.log("Sucess");
                            resolve(true);
                        }
                        else{
                            //console.log("Erro");
                            resolve(false);
                        }
                    })
                    .catch(error =>{
                        reject(error);
                    })


            })
        }


}

}