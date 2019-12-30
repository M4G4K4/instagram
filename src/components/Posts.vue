<template>
    <div>
        <div v-for="post in this.posts" class="posts">
            <v-card
                    max-width="700"
                    max-height="700"
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
                        max-width="700"
                        :src="post.postimage"
                >
                    <v-card-title>{{post.description}}</v-card-title>
                </v-img>
            </v-card>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Posts",
        data: () => ({
            posts:[]
        }),
        methods:{
            async getPosts(){
                console.log("getPosts() got called")
                //this.$store.dispatch("getPosts")
                const url = "http://localhost:3000/api/getAllPosts"
                await axios.get(url)
                    .then(response=>{
                        this.posts = response.data.results;
                        console.log("Before: ");
                        console.log(this.posts);
                        // Se user não tem imagem vai ser colocada uma default
                        var i = 0;
                        for (i = 0; i < this.posts.length; i++) {
                           if(this.posts.userimage === null || this.posts.userimage === "" || this.posts.userimage === undefined ){
                               console.log("IF acontece");
                               this.posts[i].userimage = "https://i.imgur.com/23kxlWn.png";
                           }
                        }
                        console.log("After: ");
                        console.log(this.posts);

                    })
                    .catch(error =>{
                        console.log("Error Posts: " + error)
                    })
            }
        },
        mounted: function () {
            this.getPosts()
        }
    }
</script>

<style scoped>
    .posts{
        padding-bottom: 750px;
    }
</style>