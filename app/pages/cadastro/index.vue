<template>
  <div>
    <h1>Cadastro de Usuário</h1>
    <p>Verifique o console para ver o resultado da criação do usuário.</p>
  </div>
</template>
<script setup lang="ts">
import { createDirectus, rest, createUser, staticToken } from '@directus/sdk';

const config = useRuntimeConfig()
const client = createDirectus('https://genealogia.araripina.com.br').with(rest())
    .with(staticToken(config.public.apiToken));


const user_object = {
    "first_name": "Emanuel",
    "last_name": "Paulo",
    "email": "emanuelp73@hotmail.com",
    "password": "Softagon@2025",
    "language": "pt-BR"
}
console.log(user_object);


try {
    const result = await client.request(createUser(user_object));
    console.log(result);
} catch (error) {
    console.error('Erro ao criar usuário:', error);
}
</script>