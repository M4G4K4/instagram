<template>
    <v-container fill-height >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-form>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="black">
                            <v-toolbar-title>Login Form</v-toolbar-title>
                        </v-toolbar>
                        <v-alert
                            color="error"
                            :value="error"
                            icon="mdi-alert"
                        >
                            The email or password are incorrect!
                        </v-alert>
                        <v-card-text>
                            <v-text-field
                                    prepend-icon="mdi-account"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    :rules="[rules.required,rules.email]"
                                    v-model="email"
                            />

                            <v-text-field
                                    prepend-icon="mdi-textbox-password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    :rules="[rules.required]"
                                    v-model="password"
                            />
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions>
                            <v-btn  to="/signup" light rounded color="white">Sign up</v-btn>
                            <v-spacer/>
                            <v-btn  dark rounded color="black" @click.prevent="loginUser()" >
                                Login
                                <v-icon>mdi-login</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from "axios";
    import passwordHash from "password-hash";

    export default {
        name: "Login",
        data: () => ({
            email: "",
            password: "",
            error: false,
            rules:{
                required: value => !!value || "Required",
                email: value =>{
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Invalid e-mail.';
                }
            }
        }),
        methods:{
            loginUser(){
                let dados = {
                    email: this.email,
                    password: this.password
                };

                axios.post('verifyUser',dados)
                    .then(({data,status}) =>{
                        if(status === 200){
                            if(passwordHash.verify(dados.password,data.response[0].password)){

                                sessionStorage.setItem("IDuser", data.response[0].IDuser);
                                this.$router.push("/posts");
                            }else{
                                console.log("Password errada");
                            }
                        }
                        else{
                            this.error = true;
                            console.log("Login Erro");
                        }
                    })
                    .catch(error =>{
                        console.log("Error: " + error);
                    })

            }
        }
    }

</script>

<style scoped>
    a {  text-decoration: none;}
</style>