<template>
    <v-container fill-height >
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md8>
                <v-form>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="blue">
                            <v-toolbar-title>Login Form</v-toolbar-title>
                        </v-toolbar>
                        <v-alert
                            color="error"
                            :value="error"
                            icon="close"
                        >
                            The username or password are wrong
                        </v-alert>
                        <v-card-text>
                            <v-text-field
                                    prepend-icon="person"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    v-model="email"
                            />

                            <v-text-field
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    v-model="password"
                            />
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions>
                            <v-btn  to="/signup" dark rounded color="indigo">Sign up</v-btn>
                            <v-spacer/>
                            <v-btn  dark rounded color="primary" @click.prevent="loginUser()" >
                                Login
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        name: "Login",
        data: () => ({
            email: "",
            password: "",
            error: false
        }),
        methods:{
            loginUser(){

                this.$store.dispatch("LOGIN",{
                    email: this.email,
                    password: this.password
                })
                    .then(({status})=>{
                        console.log("Sucesso Login");
                        this.$router.push("/dashboard");
                    })
                .catch(error=>{
                    this.error = true;
                    console.log("Erro login : " + error);
                })
            }
        }
    }

</script>

<style scoped>

</style>