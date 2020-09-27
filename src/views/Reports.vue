<template>
<div>
  <v-container>
    <v-card color="#4c5d67">
      <v-card-title>Balanço do ano</v-card-title>
    </v-card>
    <v-card
    class="mx-4 my-4"
     color="#0b1f34"
      elevation="12"
  >
    
      <v-sparkline
        :labels="labels"
        :value="value"
        color="#4c5d67"
        line-width="1"
        padding="20"
      ></v-sparkline>
    </v-card>
    <v-card color="green" class="mx-4 my-4" >
      <v-card-title>Total Receitas: R$ {{ incomeTotal }}</v-card-title>
    </v-card>
    <v-card color="red" class="mx-4 my-4">
      <v-card-title >Total Despesas R$ {{ expenseTotal }}</v-card-title>
    </v-card>
  </v-container>
  
   
</div> 
</template>


<script>
  import Bill from '../util/BillRequest'
  export default {
    data: () => ({
      eT:0,
      iT:0,
      expenseTotal: 0,
      incomeTotal: 0,
      labels: [],
      value: [],
      bills: [],
      monthAbb:[
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
      ]

    }),

    created(){
      this.listAllBills()
    },

    methods:{
      initialize(){
       
       

        let today = new Date().toISOString().slice(0,10)
        let year = today.slice(0,4)
        let month = today.slice(5,7)
        
        
        this.labels = this.monthAbb.slice(0,parseInt(month))
        this.value = new Array(parseInt(month)).fill(0)
        
        this.bills.forEach((bill)=>{
           if(year === bill.date.slice(0,4)){
             let billMonth = bill.date.slice(5,7)
              if(bill.types=== "Receita")
                this.value[parseInt(billMonth - 1)] += bill.value
             else
                this.value[parseInt(billMonth - 1)] += (bill.value * -1)
           }
           if(bill.types=== "Receita"){
             this.iT+= bill.value
             this.incomeTotal = this.iT.toFixed(2) 

           }
           else{
             this.eT += bill.value
            this.expenseTotal = this.eT.toFixed(2)
           }

        })
        
      },

      listAllBills(){
         
        Bill.index().then(bills =>{
          this.bills = bills
          this.initialize()
        })
      }
    }
  }
</script>

<style>

</style>