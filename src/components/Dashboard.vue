<template>

    <div class="main" >
        <h1>New Post</h1>

        <br>
        <br>

        <div class="upload">
            <input style="display: none" type="file" @change="onFileSelected" ref="fileInput" >
            <v-btn @click="$refs.fileInput.click()">Pick a File</v-btn>
            <p>{{this.imageName}}</p>


            <v-btn v-if="imageSelected" @click="onUpload" >Upload</v-btn>
            <br>
            <br>
            <div v-if="showAnimation" id="app" style="display: flex">
                <half-circle-spinner
                        :animation-duration="1000"
                        :size="60"
                        :color="'#ff1d5e'"
                />
            </div>

        </div>

        <div class="description" v-if="this.showDescription">

            <v-text-field
                    prepend-icon="person"
                    name="description"
                    label="Description"
                    type="text"
                    v-model="description"
            >

            </v-text-field>

            <div class="post">
                <v-btn @click="newPost()" >Post</v-btn>
            </div>

        </div>


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
                imageSelected:false,
                showDescription:false,
                showAnimation: false,
                postClicked: false
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
                    console.log("Upload progress: " +  Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%" );

                    }})
                .then(res =>{
                    this.showAnimation = false;
                    console.log(res);
                    console.log("Link foto: " + res.data.data.link);
                    this.showDescription = true;

                    this.imageLink = res.data.data.link;

                })
                .catch(err =>{
                    console.log(err);
                })
            },
            newPost(){
                console.log("Description: " + this.description);
                console.log("image link: " +  this.imageLink);
                const url = "http://localhost:3000/api/inserePost";
                var dados = {
                    postimage : this.imageLink,
                    description: this.description
                }
                axios.post(url,dados
                ).then(response=>{
                    console.log("Post insirido BD");
                    console.log(response);
                    this.$router.push("/home");
                }).catch(error=>{
                    console.log("Erro insirir BD: " + error);
                })
            }
        }
    }
</script>

<style scoped>

</style>