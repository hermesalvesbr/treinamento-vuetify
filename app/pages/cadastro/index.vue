<template>
    <div>
        <h1>olá</h1>
    </div>
</template>
<script setup lang="ts">
import { createDirectus, rest, createUser, staticToken } from '@directus/sdk';

const client = createDirectus('https://genealogia.araripina.com.br').with(rest())
    .with(staticToken('5AqwW_ZktfDpz_k2O1M5u_0mCiap-_z1'));


const user_object = {
    "first_name": "IOOutrii Nome",
    "last_name": "Sobrenome",
    "email": "fake@softsssagon.com.br",
    "password": "Softagon@2025$$",
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