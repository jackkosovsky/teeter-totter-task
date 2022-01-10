<template>
  <nav class=" navbar navbar-expand-lg navbar-light bg-info">
    <div class="logo d-flex" href="#">Teeter Totter</div>
    <button @click="openMobileMenu"
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
    >
      <span class="hamburger">
        <i class="fas fa-bars text-white"></i>
      </span>
    </button>
    <div class="collapse navbar-collapse"
         :class="{ show: showVisual }"
         id="navbarSupportedContent"
    >
      <ul class="navbar-nav mr-auto">
        <router-link to="/">
          <MDBBtn color="light">Game</MDBBtn>
        </router-link>
        <router-link to="/about">
          <MDBBtn color="light">About</MDBBtn>
        </router-link>
      </ul>
    </div>
  </nav>
  <div class="container mt-3">
    <router-view/>
  </div>
</template>

<script>
import { MDBBtn } from 'mdb-vue-ui-kit'

export default {
  name: 'App',
  components: {
    MDBBtn
  },
  data () {
    return {
      showVisual: false
    }
  },
  methods: {
    openMobileMenu () {
      this.showVisual = !this.showVisual
    }
  }
}
</script>
