const transaction = {
    store: {
        transaction: null,
        transactions: [],
    },
    actions: {
        async getTransactions({ commit }, ) {
            try {
                const {data} = await this.$axios.get('transactions');
                await commit("setTransactions", data.data);
            } catch (error) {
                console.log(error)
                this.$message.error(`${error.response.data}`);
            }
        },
        async getTransactionsForAccount({ commit },account_id ) {
            try {
                const {data} = await this.$axios.get(`transactions?account_id=${account_id}`);
                console.log("data")
                console.log(data)
                await commit("setTransactions", data.data);
            } catch (error) {
                console.log(error)
                this.$message.error(`${error.response.data}`);
            }
        },
    },
    mutations:{
        setTransactions: (state, payload) => (state.transactions = payload),
    }
};

export const state =() => ({
    ...transaction.store
});

export const actions = {
    ...transaction.actions
};
export const mutations = {
    ...transaction.mutations
};

