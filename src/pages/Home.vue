<template >
    <div>
        <h1>Home</h1>
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.index">
                <router-link :to="`/details/${pokemon.index}`">{{pokemon.name}}</router-link> 
            </li>
        </ul>
        <router-link to="/details">Details</router-link>
    </div>
</template>
<script setup>
    import { reactive, toRefs } from "vue";
    const state = reactive({
        pokemons:[]
    })

    const {pokemons} = toRefs(state)


    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        data.results.forEach((element,index)=>{
            const pokemon={
                ...element,
                index:index+1
            }
            state.pokemons.push(pokemon)
        })
    })


</script>
<style lang="">
    
</style>
