<script setup>
import { computed } from '@vue/reactivity';
//Recibir datos por propiedades al crear el componente
const props = defineProps({
    stats: Array
})
//Opciones del grafico
const options = {
    chart: {

    },
    xaxis: {
        categories: ['PV', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed']
    }
}
//Datos para el grafico
const series = computed(() => {
    return [{
        name: 'Stats',
        data: props.stats
    }]
})
</script>
<template>
    <div>
        <!--Componente grafico usando la libreria ApexChart-->
        <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </div>
</template>