<template lang="">
    <div class="login_container_page">
        <div class="login_container_form">
            <div class="login_form">

                <el-form :model="formState" class="demo-form-inline">
                    <h1 style="display: flex; justify-content: center">
                        Resgitrate
                    </h1>
                    <el-form-item>
                        <el-input v-model="formState.email" placeholder="Correo Electronico"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formState.password" placeholder="Contraseña"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" style="width:100%; color: #FFF; background-color: #409EFF; border-color: #409EFF">Registrarse</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="backToLogin" style="width:100%; color: #FFF; background-color: #409EFF; border-color: #409EFF">Regresar</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>
<script>

import { signin } from '~/common/constants';

export default {
    auth: false,
    data() {
        return {
            loading: false,
            //formState: {
            //    email: "prueba@gmail.com",
            //    password: "prueba"
            //},
            formState: {
                email: "",
                password: ""
            },
            form: { ...signin.form },
            error: ''
        }

    },
    methods: {
        backToLogin() {
            this.$router.push('/login')
        },
        async onSubmit() {

            try {
                this.loading = true;
                this.form.companyname = this.form.institute
                await this.$axios.post('users', this.formState).then(res => {
                    this.$message.success("Usuario creado con exito", 4)
                    this.clear();
                    this.$router.push('/');
                }).catch(error => {
                    this.$message.error(error.response.data, 3)
                })
            } finally {
                this.loading = false;
            }
            this.clear();
            this.$router.push('login')
        },
        clear() {
            this.form = signin.form;
        }

    }
}
</script>
<style>
</style>