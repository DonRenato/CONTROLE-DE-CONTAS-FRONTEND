<template>
<div>
     <v-card class="my-9 mx-auto" v-if="showForm" >
        <v-btn    @click="showForm = false"
                    color="#ed7947"
                    dark
                    small
                    absolute
                    top
                    right
                    fab
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
        <v-container>
            <div class="mb-4">Nova conta</div>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field
                    v-model="currentBill.description"
                    label="Descrição"
                    required
                    hide-details
                    ></v-text-field>
                </v-col>

                 <v-col cols="12" sm="4">
                     <v-select
                        v-model="currentBill.types"
                        :items="types"
                        label="Tipos"
                        hide-details
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-text-field
                    type="number"
                    v-model="currentBill.value"
                    label="Valor"
                    required
                    hide-details
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                     <v-textarea
                        filled
                        v-model="currentBill.observations"
                        label="Observações"
                        hide-details
                    ></v-textarea>
                </v-col>
                <v-row justify="center">
                    <v-btn  color="success" class="mr-4" @click="save">Salvar</v-btn>
                    <v-btn color="warning" @click="clear">Cancelar</v-btn>
                </v-row>
            </v-row>
        </v-container>
     </v-card>
     <v-data-table
    :headers="headers"
    :items="bills"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Contas cadastrados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       <v-btn color="#ed7947" @click="formOpen" v-if="!showForm" small>Novo conta</v-btn>
      </v-toolbar>
    </template>

    <template v-slot:body.append>
      <v-toolbar flat color="white">
        <v-toolbar-title>Balanço</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-card flat :class="generalBalance >= 0 ? 'green--text' : 'red--text'">
            R$ {{generalBalance.toFixed(2)}}
        </v-card>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="details(item)"
      >
        mdi-magnify
      </v-icon>


      <v-icon
        small
        @click="remove(item)"
      >
        mdi-delete
      </v-icon>
    </template>

     <template v-slot:item.value="{ item }">
         <v-card flat :class="item.types === 'Receita' ? 'green--text'  : 'red--text'">
                R$ {{item.value.toFixed(2)}}
         </v-card>
    </template>

    <template v-slot:no-data>
        <v-row justify="center">      
            <v-subheader>Nenhuma conta cadastrada</v-subheader>
        </v-row>
    </template>
  </v-data-table>

     <!-- Janela de confirmar exclusão -->
   <v-dialog
      v-model="deleteConfirmation"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja excluir essa conta?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="close"
          >
            Não
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="confirmRemove"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Janela de detalhes -->
    <v-dialog
      v-model="detailsBill"
      max-width="800"
      
    >
      <v-card>
        <v-card-title class="headline">Detalhes da conta</v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field
                    :value="currentBillDetail.description"
                    label="Descrição"
                    required
                    hide-details
                    readonly
                    ></v-text-field>
                </v-col>

                 <v-col cols="12" sm="4">
                     <v-select
                        :value="currentBillDetail.types"
                        :items="types"
                        label="Tipos"
                        hide-details
                        readonly
                    ></v-select>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-text-field
                    type="number"
                    :value="currentBillDetail.value"
                    label="Valor"
                    required
                    hide-details
                    readonly
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                     <v-textarea
                        filled
                        :value="currentBillDetail.observations"
                        label="Observações"
                        hide-details
                        readonly
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="detailsBill = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  
</div>
</template>

<script>
export default {
    data: () => ({
      showForm: false,
      deleteConfirmation : false,
      detailsBill: false,
      billRemove: null,
      currentBillDetail: {},
      currentBill: {},
      types: [
          "Receita",
          "Despesa"
      ],
      generalBalance: 0,
      description: "",
      idGenerate: 2,
      observations: "",
      bills: [],

      headers:[
        {
          text: "Descrição",
          value: "description"
        },
        {
          text: "Tipo",
          value: "types"
        },
        {
          text: "Valor",
          value: "value"
        },
        {
          text: "Ações",
          value: "actions",
          sortable: false
        },
      ]

     
    }),
       
       created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.bills = [
            {
                description:  "Luz",
                types: "Despesa",
                value: 200
            },
            {
                description:  "CCXP",
                types: "Despesa",
                value: 500
            }
            
        ],

        this.balanceCalculation();
      },

    
      formOpen(){
        this.showForm = true
      },

      save(){
        let newBill = {}
        Object.assign(newBill, this.currentBill)
        newBill.id = this.idGenerate
        newBill.value = parseFloat(newBill.value)
        this.bills.push(newBill)
        this.balanceCalculation()
        this.idGenerate++
        this.clean();
      },

      clean(){
          this.showForm = false
          this.currentBill= {}
          this.billRemove = null;

      },

      remove(bill){
          this.deleteConfirmation = true
          this.billRemove = bill
      },

      details(bill){
         this.detailsBill = true
         this.currentBillDetail = bill
      },

      balanceCalculation(){
          this.generalBalance = 0
          this.bills.forEach(bill => {
              if(bill.types==="Receita")
              this.generalBalance += bill.value
              else
              this.generalBalance -= bill.value
          });  
      },

      close(){
          this.deleteConfirmation = false
          this.clean();
      },

      confirmRemove(){
          this.bills.forEach((bill, index) =>{
              if(bill.id == this.billRemove.id)
                this.bills.splice(index, 1)
          })
          this.balanceCalculation();
          this.close()
      }
    },          
    }
</script>

<style>

</style>