<script setup>
import { reactive, toRefs, computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
//Importacion de componentes que tienen los Graficos
import BarChart from '../components/BarChart.vue';
import RadarChart from '../components/RadarChart.vue';

//Variables state
const state = reactive({
    pokemon: null,
    stats: computed(() => filterStats()),
    types: computed(() => filterTypes())
})

/**
 * Funcion para devolver las estadisticas base del pokemon en un array
 */
function filterStats() {
    if (state.pokemon) {
        return state.pokemon.stats.map((stat) => stat.base_stat)
    }
}

/**
 * Funcion para devolver los tipos del pokemon en un array
 */
function filterTypes() {
    if (state.pokemon) {
        return state.pokemon.types.map((type) => type.type.name)
    }
}

const route = useRoute()
const { pokemon, stats, types } = toRefs(state)
/**
 * Funcion asincronica para devolver los datos del pokemon segun su ID
 */
const getData = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
        .then((res) => res.json())
        .then((data) => {
            state.pokemon = data
        });
};

/**
 * Funcion que observa la ruta y que cuando cambia llama a la funcion getData()
 */
watch(route,()=>{
    getData()
})

/**
 * Funcion que se ejectua cuando el componente esta montado y llama a la funcion getData()
 */
onMounted(() => {
    getData()
})

//Cambio de grafica
const isBarChart = ref(true)
/**
 * Funcion para revertir el estado de la barra a true o false
 */
const changeChart = () => {
    isBarChart.value = !isBarChart.value
}

</script>
<template>
    <div>
        <div v-if="pokemon">
            <div class="w-4/6 mx-auto rounded-xl p-10 shadow-lg">

                <div class="flex flex-wrap">
                    <div class="flex-1 grid place-items-center">
                        <h1 class="font-black md:text-3xl text-xl text-red-900 mb-2">{{ pokemon.name }}</h1>
                        <div>
                            <!--Iteracion de los tipos del pokemon-->
                            <span v-for="type in types" :key="type"
                                class="py-1 px-2 shadow rounded-full bg-red-500 text-white fon-semibold mr-2 mt-3">
                                {{ type }}
                            </span>
                        </div>
                        <img class="w-48 h-48" :src="pokemon.sprites.front_default" :alt="`Imagen de ${pokemon.name}`">
                    </div>
                    <div class="flex-1">
                        <!--Boton para cambiar el tipo de grafico-->
                        <button @click="changeChart()">Tipo de grafico: {{ isBarChart ? 'Barra' : 'Radar' }}</button>
                        <!--Componente dinamico-->
                        <component :is="isBarChart ? BarChart : RadarChart" :stats="stats" />
                        <!-- <bar-chart :stats="stats" /> -->

                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>No hay datos disponibles</p>
        </div>
        <!-- <router-link to="/">Home</router-link> -->
    </div>
</template>