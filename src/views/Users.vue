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
        <div class="mb-4">{{formTitle}}</div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="currentUser.name"
              label="Nome"
              required
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
            v-model="currentUser.username"
            label="Username"
            required
            hide-details
          ></v-text-field>
          </v-col>
          
          <v-col cols="12" sm="6" md="3">
            <v-text-field
            v-model="currentUser.email"
            label="E-mail"
            required
            hide-details
          ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
            type="password"
            v-model="currentUser.password"
            label="Senha"
            required
            hide-details
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
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
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
        @click="enableDisable(item)"
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
  </div>
 
</template>

<script>
  export default {
    data: () => ({
      editItem: null,
      users: [],
      currentUser: {},
      idGenerate: 3,
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
        this.users = [
          {
            id: 0,
            name: 'Jão Balão',
            username: 'jaobalao',
            password: '123',
            email: 'jaobalao@email.com',
            active: true
          },
           {
            id: 1,
            name: 'Maria do Socorro',
            username: 'maryhelp',
            password: '123',
            email: 'maryhelp@email.com',
            active: true
          },
          {
            id: 2,
            name: 'Seu Zé',
            username: 'zé',
            password: '123',
            email: 'zé@email.com',
            active: true
          },
          
          
          
        ]
      },

      formOpen(){
        this.clear()
        this.showForm = true
      },

      enableDisable(user){
        user.active = !user.active
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
        copyUser.id = this.idGenerate
        this.users.push(copyUser)
        this.idGenerate++
        this.showForm = false
      },

      editSave(){
       for (let i = 0; i < this.users.length; i++) {
         
         if(this.editItem.id == this.users[i].id){
           this.users.splice(i, 1, this.editItem)
           break
         }
         
       }
       this.showForm = false
      },

      clear(){
        this.currentUser= {}
        this.editItem = null
      },
    },
  }
</script>

<style>

</style>