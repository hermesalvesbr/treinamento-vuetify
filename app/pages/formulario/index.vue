<script setup lang="ts">
import { createDirectus, createUser, rest, staticToken } from '@directus/sdk'
import { reactive, ref } from 'vue'

const config = useRuntimeConfig()

// Cliente Directus para criar usuários
const client = createDirectus('https://genealogia.araripina.com.br').with(rest()).with(staticToken(config.public.apiToken))

// Estados mínimos para feedbacke controle
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Dasos do Usuário
const user = reactive ({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
})
// Criar o usuário e mostrar Feedback
async function onSubmit() {
    loading.value = true
    message.value = ''
    try
    {
        const result = await client.request(
            createUser({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
            }),
        )
        messageType.value = 'success'
        message.value= `conta criada com sucesso ID: ${result.data.id}`
        user.first_name = ''
        user.last_name = ''
        user.email = ''
        user.password = ''
    }
    catch (err: any)
    {
        messageType.value = 'error'
        message.value  =err?.message || 'erro ao criar conta'
    }
    finally
    {
        loading.value = false
    }
 }
 </script>

 <template>
    <!-- Container Centralizado -->
      <v-container class="d-flex justify-center mt-8 pt-8">
    <v-card max-width="400">
      <!-- Título do formulário -->
      <v-card-title>Criar Conta</v-card-title>
      <v-card-text>
        <!-- Formulário de cadastro -->
        <v-form>
          <!-- Campo: Primeiro Nome -->
          <v-text-field
            v-model="user.first_name"
            label="Primeiro Nome"
            required
          />
          <!-- Campo: Sobrenome -->
          <v-text-field
            v-model="user.last_name"
            label="Sobrenome"
            required
          />
          <!-- Campo: E-mail -->
          <v-text-field
            v-model="user.email"
            label="E-mail"
            required
          />
          <!-- Campo: Senha -->
          <!-- Campo: Senha (simplificado, sem mostrar/esconder) -->
          <v-text-field
            v-model="user.password"
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
              Criar Conta
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
   
            


