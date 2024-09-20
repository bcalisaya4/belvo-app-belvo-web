<template>
    <div>
      <el-header class="header">
        <div style="display:flex; width:100%">
          <div style="display:flex; width:50%; justify-content: start; align-items: center;"><h2>Belvo-app</h2></div>
          <div style="display:flex; width:50%; justify-content: end; align-items: center; cursor: pointer;"  @click="logout">Cerrar Sesión</div>
        </div>
      </el-header>
      <div class="institutions_table_title">
        <el-page-header @back="goBack" content="Transacciones">
        </el-page-header>
      </div>
      <div class="institutions_container_table">
        <div class="institutions_table">
          <el-table v-loading="loading" :data="transactions" stripe style="width: 100%">
            <el-table-column prop="agency" label="Agencia">
            </el-table-column>
            <el-table-column prop="category" label="Categoria" width="180">
            </el-table-column>
            <el-table-column prop="currency" label="Moneda">
            </el-table-column>
            <el-table-column prop="name" label="Nombre" width="180">
            </el-table-column>
            <el-table-column prop="number" label="Numero">
            </el-table-column>
            <el-table-column prop="type" label="Tipo" width="150">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {mapState,mapActions,mapMutations} from 'vuex';
  export default {
    name: 'IndexPage',
      data() {
      return {
        tableData: [this.transactions],
        loading : true
      }
    },
      computed:{
          ...mapState('transaction',['transactions'])
      },
      async mounted () {
          this.init()
      },
      methods:{
          ...mapActions('transaction',['getTransactionsForAccount']),
        async init(){
          await this.getTransactionsForAccount(this.$route.params.slug)
          this.loading = false
        },
        goBack() {
          this.$router.go(-1)
        },
        async logout() {
          // Lógica de cierre de sesión
          await this.$auth.logout()
          localStorage.removeItem('authToken'); // Eliminar el token de autenticación
          this.$router.push('/login'); // Redirigir a la página de inicio de sesión
        }
      }
  }
  </script>
  <style scoped></style>