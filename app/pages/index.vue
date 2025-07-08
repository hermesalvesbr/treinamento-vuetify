<template>
  <section>
    <h1>Árvore Genealógica de Araripina</h1>
    <div class="mt-4">
      <p>Bem-vindo ao sistema público de genealogia da cidade de Araripina. Aqui você pode pesquisar sobre pessoas e famílias descobrindo graus de parentesco.</p>
      <div>
        <label for="search"></label>
        <v-text-field v-model="searchTerm" @keydown.enter="navigateTo('/pessoas?q=' + searchTerm)" id="search" label="Nome ou sobrenome">
        </v-text-field> 
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchTerm = ref('')
</script>
