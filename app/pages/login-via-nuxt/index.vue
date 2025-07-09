<template>
    <div>
        <h1>Login de conta via NUXT</h1>
    </div>
</template>
<script setup lang="ts">
import { createDirectus, authentication } from '@directus/sdk';

const email = "seu-email@exemplo.com.br";
const password = "sua-senha";

const client = createDirectus('https://genealogia.araripina.com.br').with(authentication());

const token = await client.login({ email, password });
</script>