<template>
  <header>
    <div class="logo">
      <nuxt-link to="/">
        <p>yorannap</p>
      </nuxt-link>
    </div>
    <div @click="changeColorMode()" class="color-mode-switch icon-container">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><defs><style>.cls-1{fill:#222;}</style></defs><path class="cls-1" d="M81.0094,131.5369a56.4279,56.4279,0,0,0,43.917-20.9346,2.6517,2.6517,0,0,0-2.5534-4.2734A44.29,44.29,0,0,1,92.169,24.3178a2.6522,2.6522,0,0,0-.8295-4.9095,56.54,56.54,0,1,0-10.33,112.1286Z"/></svg>
    </div>
    <div class="about">
      <nuxt-link to="/about">
        <div class="icon-container">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><defs><style>.cls-1{fill:#222;}</style></defs><path class="cls-1" d="M136.4605,102.9163a33.5428,33.5428,0,0,1-33.5163,33.5162v-8.379a25.1751,25.1751,0,0,0,25.1372-25.1372ZM13.5675,47.0558A33.5428,33.5428,0,0,1,47.0837,13.54v8.3791A25.1751,25.1751,0,0,0,21.9465,47.0558ZM52.7256,32.0852,27.03,57.781A46.0957,46.0957,0,0,0,92.219,122.97l39.4933-39.4934A6.9914,6.9914,0,0,0,121.825,73.59l-24.69,24.69-3.9661-3.966L129.7013,57.781a6.9914,6.9914,0,1,0-9.8873-9.8873L87.2474,80.46l-3.9661-3.9661,38.4879-38.4879a6.9914,6.9914,0,0,0-9.8873-9.8873L73.394,66.607l-3.8544-3.91,30.6116-30.6115a6.9914,6.9914,0,0,0-9.8873-9.8873L47.6982,64.7636a22.3584,22.3584,0,0,1-1.8434,29.4943l-3.9661-3.9661a16.7562,16.7562,0,0,0,0-23.6848l-1.9551-1.9551L62.6688,41.9166a6.9789,6.9789,0,0,0,0-9.8873A7.098,7.098,0,0,0,52.7256,32.0852Z"/></svg>
        </div>
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
.icon-container {
  max-width: 45px;
  cursor: pointer;
}

.icon-container svg {
  height: 100%;
  width: 100%;
}

.icon-container svg path {
  fill: var(--color-primary);
  transition: var(--transition);
}

header {
  /* mix-blend-mode: difference; */
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
  top: calc(100% - 75px);
  left: 40px;
  position: fixed;
}
</style>