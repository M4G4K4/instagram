<template>
    <div>
        <h1>PERFIL</h1>
        <br>


        <v-app>
            <v-app-bar
                    app
                    color="primary"
                    dark
            >
                <router-link to="/posts">
                    <v-avatar :tile="true">
                        <img src="https://image.flaticon.com/icons/png/512/87/87390.png" alt="logo">
                    </v-avatar>
                </router-link>

                <v-spacer/>

                <div >
                    <router-link to="/dashboard">
                        <v-btn class="ma-2" title outlined color="white" >
                            <v-icon left >mdi-settings</v-icon>New Post
                        </v-btn>
                    </router-link>
                </div>

                <div >
                    <router-link to="/posts">
                        <v-btn class="ma-2" title outlined color="white" @click.prevent="logout()">
                            <v-icon left >mdi-settings</v-icon>Logout
                        </v-btn>
                    </router-link>
                </div>



            </v-app-bar>
        </v-app>


    </div>
</template>

<script>
    export default {
        name: "Perfil",
        created() {
            if (sessionStorage.getItem("IDuser") === null) {
                console.log("No login");
                this.$router.push("/posts")
            }else{
                console.log("Login feito")
            }
        },
        methods:{
            logout(){
                console.log("Logout btn pressed");
                this.logado = false;
                sessionStorage.removeItem("IDuser");
                this.$router.push("/posts");
            }
        }
    }
</script>

<style scoped>

</style>