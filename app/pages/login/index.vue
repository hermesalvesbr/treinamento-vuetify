<template>
    <v-container class="d-flex justify-center mt-8 pt-8">
    <v-card max-width="400">
      
      <v-card-title>Login</v-card-title>
      <v-card-text>
        
        <v-form>
          
        
          <v-text-field
            v-model="data.email"
            label="E-mail"
            required
          />
          
          <v-text-field
            v-model="data.password"
            type="password"
            label="Senha"
            required
          />
          <!-- Botão de envio -->
          <v-card-actions class="justify-end">
            <v-btn color="primary" :disabled="loading" @click="onSubmit">
              <v-progress-circular
                v-if="loading"
                indeterminate
                size="20"
                width="2"
                class="mr-2"
              />
              Entrar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
      <!-- Alerta de feedback -->
      <v-alert
        v-if="message"
        :type="messageType"
        class="mx-4 mb-4"
        dense
      >
        {{ message }}
      </v-alert>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { createDirectus, authentication } from '@directus/sdk';

const directus = createDirectus('https://genealogia.araripina.com.br').with(authentication());
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')


const data = ref<{email: string; password: string}>({
   email:'',
    password:'',
})

async function onSubmit() {
    loading.value = true
    message.value = ''
    try {
        const result =  directus.login({ email: data.value.email, password: data.value.password })

        messageType.value = 'success'
      return console.log('result:', result)

      
    } catch (err: any)
    {
        messageType.value = 'error'
        message.value  =err?.message || 'erro ao logar'
    } finally
    {
        loading.value = false
    }
 }

</script>