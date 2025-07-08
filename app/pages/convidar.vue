<template>
 <section>
   <h2>Convidar Pessoa</h2>
   <form @submit.prevent="convidar">
     <div>
       <label for="email">Email:</label>
       <input type="email" id="email" v-model="email" required />
     </div>
     <button type="submit">Enviar Convite</button>
   </form>
 </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const convidar = () => {
  // Lógica para enviar convite
  if (!email.value) return;
  // Aqui você pode adicionar chamada de API ou lógica de envio
  alert(`Convite enviado para ${email.value}`);
}
</script>