<template>
    <div class="main">
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

</style>
