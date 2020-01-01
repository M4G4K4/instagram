<template>
    <div>
        <v-btn :color="Color" @click="new Increment()" >{{Text}}</v-btn>


        <div v-html="PrintCounter" ></div>


    </div>
</template>

<script>
    export default {
        name: "Button",
        props:{
            Color: String,
            Text: String,
            Limit: Number,
            Start: Number
        },
        data: ()=>({
           Counter: 0
        }),
        mounted(){
            this.Counter = this.Start;
        },
        computed:{
            PrintCounter(){
                if(this.Counter < this.Limit){
                    return `<h3 style="color:red" > ${this.Counter}</h3>`
                }else{
                    return `<h3 style="color: green" > ${this.Counter}</h3>`
                }

            }
        },
        methods:{
            Increment(){
                this.Counter = this.Counter + 1;

            }
        }







    }




</script>
