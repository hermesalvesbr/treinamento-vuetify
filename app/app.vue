<template>
  <v-app>
        <!-- cabeçalho -->
    <v-app-bar color="secondary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Árvore Genealógica de Araripina</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white" class="me-4" prepend-icon="mdi-account-plus" @click="inviteUser">
        Convidar Pessoa
      </v-btn>
      <nav>   ...links   </nav>
      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>

        <v-btn icon="mdi-filter" variant="text"></v-btn>
      </template>

      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item>
          <NuxtLink to="/" style="text-decoration:none; color: inherit;">Início</NuxtLink>
        </v-list-item>
        <v-list-item>
          <NuxtLink to="/sobre" style="text-decoration:none; color: inherit;">Saiba mais</NuxtLink>
        </v-list-item>
        <v-list-item>
          <NuxtLink to="/pessoas" style="text-decoration:none; color: inherit;">Pessoas</NuxtLink>
        </v-list-item>
        <v-list-item>
          <NuxtLink to="/familias" style="text-decoration:none; color: inherit;">Familias</NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo principal -->
    <v-main class="pa-4">
      <NuxtPage />
    </v-main>
    <!-- rodapé -->
    <v-footer class="pa-0.1" color="secondary" dark>
      <span> &copy; 2025 cidade de Araripina</span>
    </v-footer>
  </v-app>
</template>
<script setup>
import { ref, watch } from 'vue'

const inviteUser = () => {
  const email = window.prompt("Informe o E-mail do parente que deseja convidar")
  if (!email) {
    alert("E-mail não informado")
    return
  }
  // Validação simples de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("E-mail inválido")
    return
  }
  alert(`Convite enviado para ${email}`)
}

const items = [
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>
