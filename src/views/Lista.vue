<template>

    <div class="lista" >
        <form ref="form" class="form">
            <v-text-field label="Numero" v-model="numero"></v-text-field>
            <v-text-field label="Nome" v-model="nome"></v-text-field>

            <v-btn color="success" @click="add()">Adicionar</v-btn>
        </form>

        <div>
            <h4 v-for="(aluno,index) in alunos" :key="aluno.index" > <!-- em vez de in alunos podemos ter in getAlunos -->
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
              return this.alunos
          }
        },
        methods: {
            add(){
                //console.log("Add");
                //console.log(this.numero, this.nome);

                //console.log(this.$ref.form.validate())

                if(!this.numero || !this.nome) {
                    console.log("Erro");
                    return
                }

                // Preenche array alunos
                this.alunos.push({
                    numero: this.numero,
                    nome: this.nome
                })


                this.$refs.form.reset(); // Limpa formulario
                this.numero  = this.nome = ""; // Limpa valores de variaveis

                console.log(this.alunos);
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

