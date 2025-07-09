<!-- <script setup lang="ts"> -->
import { createDirectus, rest, createUser, staticToken } from '@directus/sdk';
const client = createDirectus('https://genealogia.araripina.com.br').with(rest())
    .with(staticToken(''));


const user_object = {
    "first_name": "jean marcos",
    "last_name": "Batista e Silva",
    "email": "jean.marcos0988798686@gmail.com",
    "password": "9898976765tsW",
    "language": "pt-BR"
}
console.log(user_object);

try {
    const result = await client.request(createUser(user_object));
    console.log(result);
} catch (error) {
    console.error('Erro ao criar usuário:', error);
}
<!-- </script> -->
