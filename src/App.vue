<template>
  <nav class="navbar navbar-expand-lg dark-themed" style="margin-bottom: 10%;">
      <router-link class="navbar-brand" to="/">
          <img src="res/images/profile2.png" width="30" height="30" class="d-inline-block align-top" alt="">
          Vampire Studios
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                  <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/about">About The Team</router-link>
              </li>
              <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Our Projects
                  </a>
                  <div class="dropdown-menu dark-themed" aria-labelledby="navbarDropdown">
                      <h6 class="dropdown-header" style="align-content: center;">Minecraft Mods</h6>
                      <div class="dropdown-divider"></div>
                      <router-link class="dropdown-item" to="/project/raa">Randomly Adding Anything</router-link>
                      <router-link class="dropdown-item" to="/project/hg">Hidden Gems</router-link>
                      <router-link class="dropdown-item" to="/project/bv">Beyond Vanilla</router-link>
                      <router-link class="dropdown-item" to="/project/sc">StoryCraft</router-link>
                      <router-link class="dropdown-item" to="/project/mc">Molecularcraft</router-link>
                      <div class="dropdown-divider"></div>
                      <h6 class="dropdown-header">Libraries</h6>
                      <div class="dropdown-divider"></div>
                      <router-link class="dropdown-item" to="/project/vampirelib">VampireLib</router-link>
                      <router-link class="dropdown-item" to="/project/cab">Customized Astral Body</router-link>
                      <router-link class="dropdown-item" to="/project/sb">Spontaneous Bucketing</router-link>
                      <router-link class="dropdown-item" to="/project/obsidian">Obsidian</router-link>
                      <div class="dropdown-divider"></div>
                      <h6 class="dropdown-header">Games</h6>
                      <div class="dropdown-divider"></div>
                      <router-link class="dropdown-item" to="/project/mw">Maewil</router-link>
                      <router-link class="dropdown-item" to="/project/uncg">Unnamed Cube Game</router-link>
                      <router-link class="dropdown-item" to="/project/unug">Unnamed Unity Game</router-link>
                  </div>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/translate">Translate</router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/contact">Contact Us</router-link>
              </li>
          </ul>    
      </div>
  </nav>
  <router-view/>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
