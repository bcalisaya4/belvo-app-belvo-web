<template>
  <div>

    <el-header class="header">
      <div style="display:flex; width:100%">
        <div style="display:flex; width:50%; justify-content: start; align-items: center;"><h2>Belvo-app</h2></div>
        <div style="display:flex; width:50%; justify-content: end; align-items: center; cursor: pointer;" @click="logout">Cerrar Sesión</div>
      </div>
    </el-header>

    <div class="institutions_table_title">
      <h1>Bancos</h1>
    </div>
    <div class="institutions_container_table">
      <div class="institutions_table">
        <el-table v-loading="loading" :data="institutions" stripe style="width: 100%" @cell-click="account">
          <el-table-column prop="id" label="ID">
          </el-table-column>
          <el-table-column prop="name" label="Nombre" width="180">
          </el-table-column>
          <el-table-column prop="status" label="Estado">
          </el-table-column>
          <el-table-column prop="country_codes" label="País">
          </el-table-column>
          <el-table-column prop="integration_type" label="Integracion" width="180">
          </el-table-column>
          <el-table-column prop="type" label="Tipo">
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
      tableData: [this.institutions],
      loading : true
    }
  },
    computed:{
        ...mapState('institution',['institutions'])
    },
    async mounted () {
        await this.init()
        this.loading = false
    },
    methods:{
        ...mapActions('institution',['getInstitutions']),
      async init(){
        await this.getInstitutions()
        //this.loading = true
      },
      async account(row, column, cell, even){
        //console.log(row.id)
        //console.log(row.name)
        this.$router.push({ path: `/account/${row.name}`})
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