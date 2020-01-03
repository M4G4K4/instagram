<template>

    <div class="main" >
        <h1>New Post</h1>
        <br>
        <br>
        <div class="upload">
            <input style="display: none" type="file" @change="onFileSelected" ref="fileInput" >
            <v-btn color="success" @click="$refs.fileInput.click()">Pick a File</v-btn>
            <p>{{this.imageName}}</p>

            <v-btn color="success" v-if="imageSelected" @click="onUpload" >Upload       {{this.percentage}}</v-btn>
            <br>
            <br>
            <div v-if="showAnimation" id="app" style="display: flex;padding-left: 35px">
                <half-circle-spinner
                        :animation-duration="1000"
                        :size="60"
                        :color="'#ff1d5e'"
                />
            </div>

        </div>

        <div class="description" v-if="this.showDescription">
            <v-text-field
                    prepend-icon="mdi-account"
                    name="description"
                    label="Description"
                    type="text"
                    v-model="description"
            >
            </v-text-field>

            <div class="post">
                <v-btn color="success" @click="newPost()" >Post</v-btn>
            </div>
        </div>

        <v-app>
            <v-app-bar
                    app
                    color="white"
                    dark
            >
                <router-link to="/posts">
                    <v-avatar :tile="true">
                        <img src="https://image.flaticon.com/icons/png/512/87/87390.png" alt="logo">
                    </v-avatar>
                </router-link>

                <v-spacer/>

                <router-link to="/perfil">
                    <v-btn class="ma-2" title outlined color="black" >
                        <v-icon left >mdi-account</v-icon>Perfil
                    </v-btn>
                </router-link>

                <router-link to="/posts">
                    <v-btn class="ma-2" title outlined color="black" @click.prevent="logout()">
                        <v-icon left >mdi-logout</v-icon>Logout
                    </v-btn>
                </router-link>


            </v-app-bar>
        </v-app>
    </div>
</template>

<script>
import axios from 'axios'
import {HalfCircleSpinner} from 'epic-spinners'

    export default {
        components: {
            HalfCircleSpinner
        },
        name: "Dashboard",
        data(){
            return {
                selectedFile: null,
                imageName:"",
                description:"",
                imageLink:"",
                percentage:"",
                imageSelected:false,
                showDescription:false,
                showAnimation: false,
                postClicked: false,
            }
        },
        created() {
            if (sessionStorage.getItem("IDuser") === null) {

                this.$router.push("/posts")
            }else{

            }
        },
        methods:{
            post(){
                this.postClicked = true;
            },
            onFileSelected(event){
                this.selectedFile = event.target.files[0];
                this.imageName = this.selectedFile.name;
                this.imageSelected = true;
            },
            async onUpload(){
                const fd = new FormData();
                fd.append('image',this.selectedFile, this.selectedFile.name);

                const url = "https://api.imgur.com/3/image";
                const ClientID = "11a345230020f89";

                await   axios.post(url,fd,{ headers: { Authorization: `Client-ID ${ClientID}`} ,onUploadProgress: uploadEvent =>{
                    this.showAnimation = true;

                    this.percentage = Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%";
                    }})
                .then(res =>{
                    this.showAnimation = false;

                    this.showDescription = true;

                    this.imageLink = res.data.data.link;

                })
                .catch(err =>{
                    console.log(err);
                })
            },
            newPost(){

                const url = "http://localhost:3000/api/inserePostWithUser";
                var dados = {
                    postimage : this.imageLink,
                    description: this.description,
                    IDuser: sessionStorage.getItem("IDuser")
                };
                axios.post(url,dados
                ).then(response=>{

                    this.$router.push("/posts");
                }).catch(error=>{
                    console.log("Erro insirir BD: " + error);
                })
            },
            logout(){
                sessionStorage.removeItem("IDuser");
                this.$router.push("/posts");
            }
        }
    }
</script>

<style scoped>

    a {  text-decoration: none;}
</style>