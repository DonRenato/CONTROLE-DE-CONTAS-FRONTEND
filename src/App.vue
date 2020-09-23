<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link :to="item.route" v-for="(item, index) in routes" :key="index">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#993399"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Fábrica de Programadores</v-toolbar-title>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

    <v-footer color="#993399" app>
      <span class="white--text">NYD Tech&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      routes:[
        {
          name: "Home",
          icon: "mdi-home",
          route: "/"
        },
        {
          name: "Contas",
          icon: "mdi-account-box",
          route: "/accounts"
        },
        {
          name: "Usuários",
          icon: "mdi-account-circle",
          route: "/users"
        },
        {
          name: "Relatórios",
          icon: "mdi-receipt",
          route: "/reports"
        },
      ],
    }),
    created () {
      this.$vuetify.theme.dark = false
    },
  }
</script>