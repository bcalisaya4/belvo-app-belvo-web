<template lang="">
    <div class="login_container_page">
        <div class="login_container_form">
            <div class="login_form">

                <el-form :model="formState" class="demo-form-inline">
                    <h1 style="display: flex; justify-content: center">
                        Login
                    </h1>
                    <el-form-item>
                        <el-input v-model="formState.email" placeholder="Correo Electronico"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input  type="password"  v-model="formState.password" placeholder="Contraseña"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="onSubmit" style="width:100%; color: #FFF; background-color: #409EFF; border-color: #409EFF">Ingresar</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="signup" style="width:100%; color: #FFF; background-color: #409EFF; border-color: #409EFF">Registrate</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>
<script>

import { signin } from '~/common/constants';

export default {
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
        signup(){
            this.$router.push('/signup')
        },
        async onSubmit() {

            try {
                this.loading = true,
                await this.$auth.login({ data: this.formState })
                    .then((response) => {
                        console.log("saludos mensaje")
                        console.log(response)
                        this.$message.success('Bienvenido', 3)
                    })
                    .catch((e) => {
                        if (!e.response) {
                            console.log("e.response")
                            console.log(e.response)
                            this.$message.error('Error: Network Error');
                        } else {
                            console.log("saludos mensaje")
                            this.$message.error(`${e.response.data}`);
                            this.clear();
                        }
                    })
            } finally {
                this.loading = false
            }
            this.clear();
            this.$router.push('/')
        },
    clear(){
      this.form = signin.form;
    }

    }
}
</script>
<style>
</style>