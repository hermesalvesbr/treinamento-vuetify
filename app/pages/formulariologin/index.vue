<script setup lang="ts">
import { createDirectus, authentication } from '@directus/sdk';
import { ref } from 'vue';

const directus = createDirectus('https://genealogia.araripina.com.br')
    .with(authentication())

const email = ref('');
const password = ref('');


const onSubmit = async () => {
    try {
        const response = await directus.login({ email: email.value, password: password.value });
        alert('Login realizado com sucesso!');
        console.log('Token:', response);
        window.location.href = 'https://genealogia.araripina.com.br/admin/'
    } catch (error) {
        alert('Erro ao fazer login. Verifique suas credenciais.');
        console.error(error);
    }
};
</script>

<template>
    <v-container class="d-flex justify-left">
        <v-card min-width="400">
            <v-card-title>Acesso</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" label="Email" required />
                    <v-text-field v-model="password" label="Senha" type="password" required />
                    <v-card-actions class="justify-end">
                        <v-btn color="primary" @click="onSubmit">
                            Entrar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>