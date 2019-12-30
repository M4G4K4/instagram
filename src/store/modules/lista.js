const state = {
    data:[
        {
            numero : "1",
            nome: "Pedro"
        },
        {
            numero : "2",
            nome: "Paulo"
        }

    ]
}

const getters = {
    getLista: (state) =>{
        return state.data;
    },
    getListaLenght:(state)=>{
        return state.data.length;
    }
}

const actions = {
    add({commit},params){
        commit("push",params); // chama o push do mutations
    },
    deleteAluno({commit},params) {
        commit("delete",params);
    }

}

const mutations = {
    // Este push é chamado pelo actions/add
    push(state,params){
        state.data.push(params);
    },
    delete(state,params){
        state.data.delete(params);
    }

}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}