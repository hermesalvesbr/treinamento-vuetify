<script setup lang="ts">
import { createDirectus, createUser, staticToken, rest } from '@directus/sdk'
import { reactive, ref } from 'vue'

// Cliente Directus para criar usuários
const client = createDirectus('https://genealogia.araripina.com.br').with(rest())
    .with(staticToken(''));

// Estados mínimos para feedbeack e controle
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Dados do usuário
const user = reactive({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
})

// Cria o usuário e mostra o feedback
async function onSubmit() {
    loading.value = true
    message.value = ''
    try {
        const result = await client.request(
            createUser({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
            }),
        )
        messageType.value = 'success'
        message.value = `Conta criada com sucesso! ID: ${result.data.id}`
        user.first_name = ''
        user.last_name = ''
        user.email = ''
        user.password = ''
    }
    catch (err: any) {
        messageType.value = 'error'
        message.value = err?.message || 'Erro ao criar conta'
    }
    finally {
        loading.value = false
    }
}

</script>

<template>
    <!-- Container centralizado-->
    <v-container class="d-flex justify-left">
        <v-card min-width="400">
            <!-- Título do formulário -->
            <v-card-title>Criar Conta</v-card-title>
            <v-card-text>
                <!-- Formulário de cadastro  -->
                <v-form>
                    <!-- Campo: Primeiro nome -->
                    <v-text-field v-model="user.first_name" label="Primeiro Nome" required />
                    <!-- Campo: Sobrenome -->
                    <v-text-field v-model="user.last_name" label="Sobrenome" required />
                    <!-- Campo: Email -->
                    <v-text-field v-model="user.email" label="Email" required />
                    <!-- Campo: Senha -->
                    <!-- Campo: Senha (simplificado, sem mostrar/esconder)-->
                    <v-text-field v-model="user.password" label="Senha" type="password" required />
                    <!-- Botão de envio -->
                    <v-card-actions class="justify-end">
                        <v-btn color="primary" :disabled="loading" @click="onSubmit">
                            Criar Conta
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
            <!-- Alerta de feedback-->
            <v-alert v-if="message" :type="messageType" class="mx-4 mb-4" dense>
                {{ message }}
            </v-alert>
        </v-card>
    </v-container>
</template>