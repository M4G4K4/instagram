<template>

    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex  xs12 sm8 md8>
                <v-card class="elevation-12" >
                    <v-toolbar dark color="black">
                        <v-toolbar-title>Sign up Form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-alert
                                :value="userExists"
                                color="error"
                                icon="mdi-alert"
                            >
                                This user already exists...
                            </v-alert>


                            <v-text-field
                                    prepend-icon="mdi-account"
                                    name="username"
                                    label="Username"
                                    :rules="[rules.required]"
                                    v-model="username"
                            >

                            </v-text-field>

                            <v-text-field
                                    prepend-icon="mdi-email-outline"
                                    name="email"
                                    label="Email"
                                    :rules="[rules.required,rules.email]"
                                    v-model="email"
                            >

                            </v-text-field>


                            <v-text-field
                                    prepend-icon="mdi-account"
                                    name="name"
                                    label="Name"
                                    :rules="[rules.required]"
                                    v-model="nome"
                            >

                            </v-text-field>

                            <v-text-field
                                prepend-icon="mdi-textbox-password"
                                name="password"
                                label="Password"
                                :rules="[rules.required]"
                                type="password"
                                v-model="password"
                            >

                            </v-text-field>

                            <v-text-field
                                    prepend-icon="mdi-textbox-password"
                                    name="password"
                                    label="Confirm Password"
                                    :rules="[rules.required]"
                                    type="password"
                                    v-model="confirmPassword"
                                    :error="!valid()"
                            >

                            </v-text-field>


                        </v-form>



                        <v-card-actions>
                            <v-btn to="/login" light rounded color="white" >Login
                                <v-icon/>
                            </v-btn>
                            <v-spacer/>
                            <v-btn rounded dark @click.prevent="register()" color="black" >
                                Sign up
                                <v-icon>mdi-arrow-right</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import passwordHash from "password-hash";

    export default {
        name: "Signup",
        data: () =>({
            email:"",
            username:"",
            nome:"",
            password: "",
            confirmPassword:"",
            userExists:false,
          rules:{
              required: value => !!value || "Required",
              email: value =>{
                  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  return pattern.test(value) || 'Invalid e-mail.';
              }
          }
        }),
        methods:{
            register(){
                // Script enciptar password
                var hashedPassword = passwordHash.generate(this.password);

                if(this.valid()){
                    this.$store.dispatch('REGISTER',{
                        email:this.email,
                        username:this.username,
                        nome: this.nome,
                        password: hashedPassword
                    })
                    .then(({status})=>{

                        this.$router.push("/login");
                    })
                    .catch(error =>{
                        this.userExists = true;
                        console.log("Sign up error: " + error);
                    })
                }
            },
            valid(){
                return this.password === this.confirmPassword;
            }
        }
    }
</script>

<style scoped>

</style>