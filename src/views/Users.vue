<template>

  <div>
    <v-card class="my-9 mx-auto" v-if="showForm" color="#4c5d67">
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
      <v-container style="background-color: #4c5d67">
        <div class="mb-4">{{formTitle}}</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="currentUser.name"
              label="Nome"
              required
              hide-details
              color="#ed7947"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
            v-model="currentUser.username"
            label="Username"
            required
            hide-details
            color="#ed7947"
          ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-text-field
            v-model="currentUser.email"
            label="E-mail"
            required
            hide-details
            color="#ed7947"
          ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
            type="password"
            v-model="currentUser.password"
            label="Senha"
            required
            hide-details
            color="#ed7947"
          ></v-text-field>
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
    :items="users"
    class="elevation-1"
    style="background-color: #4c5d67"
  >
    <template v-slot:top>
      <v-toolbar flat color="#4c5d67">
        <v-toolbar-title>Usuários cadastrados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
       <v-btn color="#ed7947" @click="formOpen" v-if="!showForm" small>Novo usuário</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="edit(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="changeStatus(item)"
      >
  
        {{item.active ? "mdi-block-helper" : "mdi-check-bold"}} 
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-row justify="center">      
        <v-subheader>Nenhuma usuário cadastrado</v-subheader>
      </v-row>
    </template>
  </v-data-table>

  <v-dialog
      v-model="changeConfirmation"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Tem certeza que deseja excluir essa conta?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="clear"
          >
            Não
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            @click="enabledDisabled"
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
  </div>
 
</template>

<script>
  import User from '../util/UserRequest'

  export default {
    data: () => ({
      editItem: null,
      userStatus: null,
      changeConfirmation: false,
      users: [],
      currentUser: {},
      showForm: false,
      headers:[
        {
          text: "Nome",
          value: "name"
        },
        {
          text: "Username",
          value: "username"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Ações",
          value: "actions"
        },
      ]
    }),

    computed: {
      formTitle () {
        return this.editItem == null ? 'Novo usuário' : 'Editar usuário'
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
          User.index().then(users => {
            this.users = users
          })

       
      },

      formOpen(){
        this.clear()
        this.showForm = true
      },

      changeStatus(user){
        this.changeConfirmation = true
        this.userStatus = user
      },


      enabledDisabled(){
        this.userStatus.active = !this.userStatus.active
          User.update(this.userStatus).then(res =>{
          if(res.status == 200){
            this.initialize()
            this.clear()
          }
          else
            alert("Erro ao atualizar o status do usuário")
        })
      },

      save(){
        if(this.editItem == null){
          this.add()
        }else{
          this.editSave()
        }

        this.clear();
      },

      edit(user){
        let copyUser = {}
        Object.assign(copyUser, user)
        this.editItem = copyUser
        this.currentUser = copyUser
        this.showForm = true
      },

      add(){
        let copyUser = {}
        Object.assign(copyUser, this.currentUser)
        copyUser.active = true
      
        User.create(copyUser).then(res =>{
          if(res.status == 201){
            alert("Usuário cadastrado com sucesso")
            this.initialize();
          }
          else 
            alert("Erro ao cadastrar o usuário")
        })
      },

      editSave(){
         User.update(this.editItem).then(res =>{
          if(res.status == 200){
            alert("Usuário atualizado com sucesso")
            this.initialize()
          }
            
          else
            alert("Erro aos atualizar o usuário")
        })
      },

      clear(){
        this.currentUser= {}
        this.editItem = null
        this.showForm = false
        this.changeConfirmation = false
      },

      
    },
  }
</script>

<style>

</style>