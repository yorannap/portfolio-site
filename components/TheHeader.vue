<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">
        <p>yorannap</p>
      </nuxt-link>
    </div>
    <div @click="changeColorMode()" class="color-mode-switch dot">
    </div>
    <div class="about">
      <nuxt-link to="/about">
        <div class="dot"></div>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      themeMode: 'light'
    }
  },
  methods: {
    changeColorMode() {
      this.themeMode = this.$colorMode.preference
      if(this.themeMode === 'light') {
        this.themeMode = 'dark'
      }
      else {
        this.themeMode = 'light'
      }
      this.$colorMode.preference = this.themeMode
    }
  },

}
</script>

<style scoped>
header {
  mix-blend-mode: difference;
  top: 0;
  left: 0;
  max-width: 1400px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  pointer-events: none;
  z-index: 10;
}

header > * {
  pointer-events: auto;
}

.logo p {
  font-weight: 700;
  display: inline-block;
  color: var(--color-primary);
  transition: var(--transition);
}

.logo {
  position: absolute;
  top: 30px;
  left: 40px;
}
.about {
  position: absolute;
  top: 40px;
  right: 40px;
}

.color-mode-switch {
  top: calc(100% - 60px);
  left: 40px;
  position: fixed;
}

.dot {
  background-color: var(--color-primary);
  transition: var(--transition);
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 50%;
}
</style>