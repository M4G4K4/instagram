<template>
    <div>
        <div v-for="post in this.posts" class="posts">
            <v-card
                    max-width="800"
                    max-height="1000"
                    class="mx-auto"
            >
                <v-list-item>
                    <v-list-item-avatar >
                        <v-img
                                :src="post.userimage"
                        />
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title style="display: flex" class="headline">{{post.username}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-img
                        class="white--text align-end"
                        max-width="800"
                        :src="post.postimage"
                >
                    <v-card-title>{{post.description}}</v-card-title>
                </v-img>
            </v-card>
        </div>


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

                <div v-if="logado">
                    <router-link to="/perfil">
                        <v-btn  class="ma-2" title outlined color="white" >
                            <v-icon left >mdi-home</v-icon>Perfil
                        </v-btn>
                    </router-link>
                </div>

                <div v-if="logado">
                    <router-link to="/dashboard">
                        <v-btn class="ma-2" title outlined color="white" >
                            <v-icon left >mdi-settings</v-icon>New Post
                        </v-btn>
                    </router-link>
                </div>

                <div v-if="logado">
                    <router-link to="/posts">
                        <v-btn class="ma-2" title outlined color="white" @click.prevent="logout()">
                            <v-icon left >mdi-settings</v-icon>Logout
                        </v-btn>
                    </router-link>
                </div>

                <div v-if="!logado">
                    <router-link to="/login">
                        <v-btn class="ma-2" title outlined color="white" >
                            <v-icon left >mdi-settings</v-icon>Login
                        </v-btn>
                    </router-link>
                </div>

                <div v-if="!logado">
                    <router-link to="/signup">
                        <v-btn class="ma-2" title outlined color="white" >
                            <v-icon left >mdi-settings</v-icon>Sign Up
                        </v-btn>
                    </router-link>
                </div>

            </v-app-bar>
        </v-app>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Posts",
        data: () => ({
            posts:[],
            logado:false
        }),
        created() {
            if (sessionStorage.getItem("IDuser") === null) {
                console.log("No login");
            }else{
                console.log("Login feito")
                this.logado = true;
            }
        },
        mounted: function () {
            this.getPosts()
        },
        methods:{
            async getPosts(){

                const url = "http://localhost:3000/api/getAllPosts"
                await axios.get(url)
                    .then(response=>{
                        this.posts = response.data.results;

                        // Se user não tem imagem vai ser colocada uma default
                        var i = 0;
                        console.log("Nº posts: " + this.posts.length);
                        for (i = 0; i < this.posts.length; i++) {
                           if(this.posts.userimage === null || this.posts.userimage === "" || this.posts.userimage === undefined ){
                               this.posts[i].userimage = "https://i.imgur.com/23kxlWn.png";
                           }
                        }
                    })
                    .catch(error =>{
                        console.log("Error Posts: " + error)
                    })
            }, // END GET POSTS
            logout(){
                console.log("Logout btn pressed");
                this.logado = false;
                sessionStorage.removeItem("IDuser");
            }


        }
    }
</script>

<style scoped>
    .posts{
        padding-bottom: 750px;
    }
</style>