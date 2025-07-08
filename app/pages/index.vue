<template>
  <section>
    <h1>Árvore Genealógica de Araripina</h1>
    <NuxtLink to="/sobre" class="Acesse a página Sobre">
      <v-btn color="primary">Sobre o Projeto</v-btn>
    </NuxtLink>
    <p>Bem-vindo ao sistema público de genealogia da cidade de Araripina. Aqui você pode pesquisar pessoas e famílias e descobrir graus de parentesco.</p>
    <div>



      <label for="search">Buscar indivíduo:</label>
      <v-text-field v-model=searchTerm @keydown.enter="navigateTo('/pessoas?q='+searchTerm)" id="search" label="Nome ou sobrenome" />
    
    </div>
  </section>
</template>
<script setup lang="ts">

const searchTerm = ref('')
</script>
  