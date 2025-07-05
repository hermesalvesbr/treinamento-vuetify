<template>
    <div>
        <v-container>
            <header>
                <v-row>
                    <v-col cols="12">
                        <v-btn variant="text" prepend-icon="mdi-arrow-left" @click="$router.back()">
                            Voltar
                        </v-btn>
                    </v-col>
                </v-row>
            </header>
 
            <main>
                <v-row v-if="loading" justify="center">
                    <v-col cols="12" class="text-center">
                        <v-progress-circular indeterminate size="64" />
                    </v-col>
                </v-row>

                <v-row v-else-if="person">
                    <v-col cols="12" md="4">
                        <aside>
                            <v-card>
                                <v-card-text class="text-center">
                                    <v-avatar size="120" class="mb-4">
                                        <v-img v-if="person.photo" :src="person.photo"
                                            :alt="`Foto de ${person.name}`" />
                                        <v-icon v-else size="80">mdi-account</v-icon>
                                    </v-avatar>
                                    <h1 class="text-h4 mb-2">{{ person.name }}</h1>
                                    <p class="text-subtitle1 text-medium-emphasis">
                                        {{ person.birthDate }} - {{ person.deathDate || 'Presente' }}
                                    </p>
                                </v-card-text>
                            </v-card>
                        </aside>
                    </v-col>

                    <v-col cols="12" md="8">
                        <section>
                            <v-card>
                                <v-card-title>
                                    <h2>Informações Pessoais</h2>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="Nome Completo" :model-value="person.fullName" readonly
                                                variant="outlined" />
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="Data de Nascimento" :model-value="person.birthDate"
                                                readonly variant="outlined" />
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="Local de Nascimento" :model-value="person.birthPlace"
                                                readonly variant="outlined" />
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-text-field label="Profissão" :model-value="person.profession" readonly
                                                variant="outlined" />
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </section>

                        <section class="mt-4">
                            <v-card>
                                <v-card-title>
                                    <h2>Família</h2>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <h3 class="text-h6 mb-3">Pais</h3>
                                            <v-list>
                                                <v-list-item v-for="parent in person.parents" :key="parent.id"
                                                    :to="`/pessoas/${parent.id}`">
                                                    <template #prepend>
                                                        <v-icon>mdi-account-supervisor</v-icon>
                                                    </template>
                                                    <v-list-item-title>{{ parent.name }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <h3 class="text-h6 mb-3">Filhos</h3>
                                            <v-list>
                                                <v-list-item v-for="child in person.children" :key="child.id"
                                                    :to="`/pessoas/${child.id}`">
                                                    <template #prepend>
                                                        <v-icon>mdi-account-child</v-icon>
                                                    </template>
                                                    <v-list-item-title>{{ child.name }}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </section>
                    </v-col>
                </v-row>

                <v-row v-else>
                    <v-col cols="12" class="text-center">
                        <v-alert type="error" variant="outlined">
                            Pessoa não encontrada
                        </v-alert>
                    </v-col>
                </v-row>
            </main>
        </v-container>
    </div>
</template>

<script setup lang="ts">
// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ApiPerson {
  id: string
  nome: string
  apelido?: string
  nascimento?: string
  falecimento?: string
  falecido: boolean
  status: string
  pai?: {
    id: string
    nome: string
  }
  mae?: {
    id: string
    nome: string
  }
}

interface ApiChild {
  id: string
  nome: string
  apelido?: string
}

interface Parent {
  id: string
  name: string
}

interface Child {
  id: string
  name: string
}

interface Person {
  id: string
  name: string
  fullName: string
  birthDate: string
  deathDate: string | null
  birthPlace: string
  profession: string
  photo: string | null
  parents: Parent[]
  children: Child[]
}

// ============================================================================
// CONSTANTS
// ============================================================================

const PERSON_FIELDS = [
  'pai.nome', 
  'pai.id', 
  'mae.id',
  'mae.nome', 
  'falecimento', 
  'apelido', 
  'falecido', 
  'nome', 
  'id', 
  'status',
  'nascimento'
] as const

const CHILDREN_FIELDS = [
  'id', 
  'nome', 
  'apelido'
] as const

const DEFAULT_VALUES = {
  name: 'Nome não informado',
  fullName: 'Nome completo não informado',
  birthDate: 'Data não informada',
  birthPlace: 'Local não informado',
  profession: 'Profissão não informada'
} as const

// ============================================================================
// COMPOSABLES & STATE
// ============================================================================

const config = useRuntimeConfig()
const route = useRoute()
const loading = ref(true)
const person = ref<Person | null>(null)

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('pt-BR')
  } catch {
    return DEFAULT_VALUES.birthDate
  }
}

const getPersonName = (apiPerson: ApiPerson): string => {
  return apiPerson.nome || apiPerson.apelido || DEFAULT_VALUES.name
}

const getChildName = (apiChild: ApiChild): string => {
  return apiChild.nome || apiChild.apelido || DEFAULT_VALUES.name
}

// ============================================================================
// API SERVICES
// ============================================================================

const fetchPersonById = async (personId: string): Promise<ApiPerson | null> => {
  try {
    const { data } = await $fetch(`${config.public.apiBase}/items/people/${personId}`, {
      params: { 
        fields: PERSON_FIELDS
      } 
    })
    return data
  } catch (error) {
    console.error('Erro ao carregar pessoa:', error)
    return null
  }
}

const fetchChildrenByParentId = async (parentId: string): Promise<ApiChild[]> => {
  try {
    const { data } = await $fetch(`${config.public.apiBase}/items/people`, {
      params: { 
        filter: {
          _or: [
            { pai: { _eq: parentId } },
            { mae: { _eq: parentId } }
          ]
        },
        fields: CHILDREN_FIELDS
      } 
    })
    return data || []
  } catch (error) {
    console.error('Erro ao carregar filhos:', error)
    return []
  }
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

const mapParents = (apiPerson: ApiPerson): Parent[] => {
  const parents: Parent[] = []
  
  if (apiPerson.pai) {
    parents.push({
      id: apiPerson.pai.id,
      name: apiPerson.pai.nome
    })
  }
  
  if (apiPerson.mae) {
    parents.push({
      id: apiPerson.mae.id,
      name: apiPerson.mae.nome
    })
  }
  
  return parents
}

const mapChildren = (apiChildren: ApiChild[]): Child[] => {
  return apiChildren.map(child => ({
    id: child.id,
    name: getChildName(child)
  }))
}

const mapPersonFromApi = (apiPerson: ApiPerson, apiChildren: ApiChild[] = []): Person => {
  return {
    id: apiPerson.id,
    name: getPersonName(apiPerson),
    fullName: apiPerson.nome || DEFAULT_VALUES.fullName,
    birthDate: apiPerson.nascimento ? formatDate(apiPerson.nascimento) : DEFAULT_VALUES.birthDate,
    deathDate: apiPerson.falecido && apiPerson.falecimento ? formatDate(apiPerson.falecimento) : null,
    birthPlace: DEFAULT_VALUES.birthPlace,
    profession: DEFAULT_VALUES.profession,
    photo: null,
    parents: mapParents(apiPerson),
    children: mapChildren(apiChildren)
  }
}

// ============================================================================
// BUSINESS LOGIC
// ============================================================================

const loadPersonData = async (): Promise<void> => {
  try {
    loading.value = true
    const personId = route.params.id as string
    
    const [apiPerson, apiChildren] = await Promise.all([
      fetchPersonById(personId),
      fetchChildrenByParentId(personId)
    ])
    
    if (!apiPerson) {
      person.value = null
      return
    }
    
    person.value = mapPersonFromApi(apiPerson, apiChildren)
    
  } catch (error) {
    console.error('Erro ao carregar dados da pessoa:', error)
    person.value = null
  } finally {
    loading.value = false
  }
}

// ============================================================================
// LIFECYCLE
// ============================================================================

onMounted(loadPersonData)
</script>