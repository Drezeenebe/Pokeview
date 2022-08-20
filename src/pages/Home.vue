<script setup>
//Para realizar calculo
import { computed } from "@vue/reactivity";
//Para crear variables state y para referenciar
import { reactive, toRefs } from "vue";

//Variables en estado
const state = reactive({
    pokemons: [],
    name: '',
    filterPokemon: computed(() => searchPokemon())
})

/**
 * Buscar pokemons en el array de pokemon segun su nombre con funcion filter de array
 */
function searchPokemon() {
    return state.pokemons.filter((pokemon) => pokemon.name.includes(state.name.toLowerCase()))
}

//Constantes para referenciar en variables al state
const { name, filterPokemon } = toRefs(state)

//Consulta a la API para obtener a los pokemon con limite de 151
fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        data.results.forEach((element, index) => {
            const pokemon = {
                ...element,
                index: index + 1
            }
            state.pokemons.push(pokemon)
        })
    })


</script>
<template >
    <div>
        <div class="grid grid-cols-6 grap-1">
            <div class="col-span-1">
                <!--Input para filtrar pokemon-->
                <input type="text" class="mb-3 p-2 border-black-500 border-2 w-100" placeholder="Nombre del pokemon"
                    v-model="name">

                <ul class="overflow-y-auto max-h-96">
                    <!--Iteracion de Pokemons-->
                    <li v-for="pokemon in filterPokemon" :key="pokemon.index"
                        class="p-2 rounded hover:text-red-400 hover:bg-red-100">
                        <span class="text-sm font-normal text-gray mr-3 "> # {{ pokemon.index }}</span>
                        <!--Link hacia el componente 'Details' usando Route-->
                        <router-link :to="`/details/${pokemon.index}`">{{ pokemon.name }}</router-link>
                    </li>
                </ul>
                <!-- <router-link to="/details">Details</router-link> -->
            </div>
            <div class="col-span-5">
                <!--Vista que muestra el componente Children 'Details' de la ruta Home usando Route-->
                <router-view></router-view>
            </div>
        </div>

    </div>
</template>


