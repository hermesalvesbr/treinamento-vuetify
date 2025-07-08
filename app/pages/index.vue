<template>
  <section>
    <h1 style="margin-top: 4rem;">Árvore Genealógica de Araripina</h1>
    <p>Bem-vindo ao sistema público de genealogia da cidade de Araripina. Aqui você pode pesquisar pessoas e famílias e descobrir graus de parentesco.</p>
    <div>
    <v-text-field v-model="searchTerm" @keydown.enter="navigateTo('/pessoas?q=' + searchTerm)" id="search" type="text" placeholder="Nome ou sobrenome"></v-text-field>
    </div>
  </section>
</template>