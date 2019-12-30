<template>
  <v-app>
    <Home/>
  </v-app>


</template>

<script>
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import Home from "@/components/Home";
import Posts  from "@/components/Posts";



export default {
  name: 'App',
  components: {Signup, Login,Home,Posts},
  computed:{
    isLoggedIn: function () { // True or false
      return this.$store.getters.isLoggedIn
    }
  },
  methods:{
    logout:function () {
      this.$store.dispatch('logout')
      .then(()=>{
        this.$router.push("/");
      })

    }
  }
}
</script>

<style>
  .container{
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
