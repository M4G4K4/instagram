<template>

    <div class="lista" >


         <div>
             <h4 v-for="(aluno,index) in getAlunos" :key="aluno.index" @click="deleteAluno(index)">
                 {{aluno.numero}} - {{aluno.nome}}
             </h4>
         </div>
    </div>





</template>

<script>
    export default {
        data:()=>({
            numero :"",
            nome:"",
            alunos:[]
        }),
        computed:{
            getAlunos(){
                return this.$store.getters['lista/getLista']
            },
            deleteAluno(){
                return this.$store.dispatch['lista/deleteAluno']
            }
        }
    }
</script>

<style scoped>

    .lista {
        display: flex;
        align-items: center;
    }
    .form{
        margin-left: 100px;
    }



</style>

