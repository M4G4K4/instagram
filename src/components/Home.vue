<template>

    <div class="main">
        <v-app>
            <v-app-bar
                    app
                    color="primary"
                    dark
            >

                <router-link to="/">
                    <v-avatar :tile="true">
                        <img src="https://image.flaticon.com/icons/png/512/87/87390.png" alt="logo">
                    </v-avatar>
                </router-link>

                <v-spacer/>

                <router-link to="/">
                    <v-btn  class="ma-2" title outlined color="white" >
                        <v-icon left >mdi-home</v-icon>Home
                    </v-btn>
                </router-link>

                <router-link to="/about">
                    <v-btn class="ma-2" title outlined color="white" >
                        <v-icon left >mdi-settings</v-icon>About
                    </v-btn>
                </router-link>


                <router-link to="/lista">
                    <v-btn class="ma-2" title outlined color="white" >
                        <v-icon left >mdi-settings</v-icon>Lista 1
                    </v-btn>
                </router-link>

                <router-link to="/lista2">
                    <v-btn class="ma-2" title outlined color="white" >
                        <v-icon left >mdi-settings</v-icon>Lista 2
                    </v-btn>
                </router-link>

                <router-link to="/lista3">
                    <v-btn class="ma-2" title outlined color="white" >
                        <v-icon left >mdi-settings</v-icon>Lista 3
                    </v-btn>
                </router-link>

            </v-app-bar>




            <v-content>
                <v-container fluid fill-height>
                    <router-view/>
                </v-container>
            </v-content>
        </v-app>


    </div>

</template>

<script>


    export default {
        name: 'Home',
        components: {

        },
    };
</script>

<style>
    .container{
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>
