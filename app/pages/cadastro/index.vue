<script setup lang="ts">
import { createDirectus, rest, createUser, staticToken} from '@directus/sdk';
import { reactive, ref } from 'vue';

// CLiente Directus para Criar usuários
const client = createDirectus('https://genealogia.araripina.com.br').with(rest())
    .with(staticToken('I7J3FjhaqvdjSEa8zbTJDbqaabjqcNo3'));

// Estados Mínimos para feedback e controle

const loading = ref(false)
const message = ref('')
const messageType = ref<"success" | "error">('success')

//Dados do usuário 
const user = reactive ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
})

// Crie o usuário e mostre o Feedback

async function onSubmit() {
    loading.value = true
    message.value = ''
    try {
        const result = await client.request (
            createUser ({
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
        catch (err:any) {
            messageType.value = 'error'
            message.value = err?.message || 'erro ao criar conta'
        } finally {
            loading.value = false
        }
    }
</script>

<template>
    <!-- container centralizado -->
     <v-container class="d-flex justify-center" > 
        <v-card max-width="400">
            <!-- título do formulaŕio-->
            <v-card-title> Criar Conta</v-card-title>
                <v-card-text>
                    <v-form> 
                        <v-text-field
                            v-model= "user.first_name"
                            label="primeiro nome"
                            required 
                            />

                            <v-text-field 
                            v-model="user.last_name"
                            label="sobrenome"
                            required
                            />
                            <v-text-field
                            v-model="user.email"
                            label="email"
                            required 
                            />
                            <v-text-field
                            v-model="user.password"
                            label="senha"
                            type="password"
                            required 
                            />
                            <v-card-action class="justify-end">
                                <v-btn color="primary" :disabled="loading" @click="onSubmit">
                                    <v-progress-circular
                                    v-if="loading"
                                    indeterminate
                                    size="20"
                                    width="2"
                                    class="mr-2"
                                    />
                                    criar Conta

                                </v-btn>

                            </v-card-action>
                    </v-form>
                </v-card-text>
                <v-alert
                v-if="message"
                :type="messageType"
                class="mx-4 mb-4"
                dense>
                    {{ message }}
                </v-alert>
        </v-card>
     </v-container>
</template>




