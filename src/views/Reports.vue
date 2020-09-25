<template>
<div>
    
    <v-card
    class="mt-4 mx-auto"
     color="#0b1f34"
      elevation="12"
      max-width="calc(100% - 32px)"
  >
    <v-container
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="#ed7947"
        line-width="1"
        padding="16"
      ></v-sparkline>
    </v-container>
  </v-card>
</div> 
</template>


<script>
  export default {
    data: () => ({
      labels: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
        200,
        675,
        410,
        390,
      ],
    }),
  }
</script>

<style>

</style>