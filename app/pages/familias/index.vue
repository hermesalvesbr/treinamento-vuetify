<template>
  <v-main class="pa-0">
    <!-- Alerta de Em Construção -->
    <v-alert
      type="info"
      variant="outlined"
      class="ma-4"
      icon="mdi-hammer-wrench"
      closable
    >
      <v-alert-title class="font-weight-bold">
        🚧 Página em Construção
      </v-alert-title>
      Esta seção está sendo desenvolvida. Em breve você poderá explorar as famílias cadastradas em nossa genealogia com funcionalidades completas.
    </v-alert>

    <v-container>
      <header class="mb-6">
        <v-row>
          <v-col>
            <h1 class="text-h3 font-weight-bold">Famílias</h1>
            <p class="text-subtitle-1 text-medium-emphasis">
              Explore as famílias cadastradas em nossa genealogia
            </p>
          </v-col>
        </v-row>
      </header>

      <section>
        <v-row>
          <v-col>
            <v-card elevation="2">
              <v-card-title class="text-h5">
                Lista de Famílias
              </v-card-title>
              
              <v-list lines="two">
                <template v-for="(familia, index) in familias" :key="familia.sobrenome">
                  <v-list-item
                    @click="verDetalhes(familia)"
                    class="cursor-pointer"
                  >
                    <template #prepend>
                      <v-avatar color="primary">
                        <v-icon>mdi-account-group</v-icon>
                      </v-avatar>
                    </template>

                    <v-list-item-title class="text-h6">
                      {{ familia.sobrenome }}
                    </v-list-item-title>
                    
                    <v-list-item-subtitle>
                      {{ familia.membros }} {{ familia.membros === 1 ? 'membro' : 'membros' }}
                    </v-list-item-subtitle>

                    <template #append>
                      <v-btn 
                        icon="mdi-chevron-right" 
                        variant="text" 
                        size="small"
                        :aria-label="`Ver detalhes da família ${familia.sobrenome}`"
                        @click.stop="verDetalhes(familia)"
                      />
                    </template>
                  </v-list-item>

                  <v-divider 
                    v-if="index < familias.length - 1" 
                    :key="`divider-${familia.sobrenome}`"
                  />
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </section>
     
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
// Interfaces
interface Familia {
  sobrenome: string
  membros: number
}

// Dados das famílias
const config = useRuntimeConfig()

const familias: Familia[] = [
  { sobrenome: 'Silva', membros: 42 },
  { sobrenome: 'Souza', membros: 37 },
  { sobrenome: 'Lima', membros: 29 }
]

// Função para navegar para detalhes da família
const verDetalhes = (familia: Familia): void => {
  navigateTo(`/familias/${familia.sobrenome.toLowerCase()}`)
}

async function fetchFamilias() {
  try {
    const { data, error } = await useFetch(`${config.public.apiBase}/items/families`)
    if (error.value) {
      console.error('Erro ao buscar famílias:', error.value)
      return []
    }
    return { familias: data.value || [] }
  } catch (error) {
    console.error('Erro ao buscar famílias:', error)
    return { familias: [], total_count: 0 }
  }
}

const dataResponse = await fetchFamilias()
</script>