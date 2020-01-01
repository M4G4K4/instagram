<template>
    <div class="main" >
        <h1>Upload user image</h1>

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

        <div v-if="this.imagechoosen" class="post">
            <v-btn @click="SavePhoto()" >Save</v-btn>
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
        name: "Upload Image",
        data(){
            return {
                selectedFile: null,
                imageSelected: false,
                imageName:"",
                imageLink:""
            }
        },
        methods:{
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

                        this.imageLink = res.data.data.link;
                    })
                    .catch(err =>{
                        console.log(err);
                    })
            },
            SavePhoto(){
                const url = "http://localhost:3000/api/inserePost";
                var dados = {
                    userimage : this.imageLink,
                };
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