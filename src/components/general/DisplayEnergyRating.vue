<template>
  <span>
    <span v-if="showRating" :class="classToDisplay">{{value.EnergyRated}}</span>
    <span v-else>{{ unknown }}</span>
  </span>
</template>
<script>
export default {
  props: ["value"],
  computed: {
    unknown() {
      if (this.$store.state.coreStore.currentLocale === "en") {
        return "Unknown"
      } else {
        return "N/A"
      }
    },
    showRating() {
      if (this.value) {
        // don't show if value not present
        return this.value.EnergyRated !== ""
        // return !!this.value.EnergyRated
      } else {
        return false
      }
    },
    classToDisplay() {
      return "energy energy-" + this.value.EnergyRated.toLowerCase()
    }
  }
}
</script>
<style>
/** Property Details Energy Certificate **/

.energy {
  padding: 5px 10px;
  color: white;
}

.energy-a {
  background-color: #00855A;
}

.energy-b {
  background-color: #18B059;
}

.energy-c {
  background-color: #8DC643;
}

.energy-d {
  background-color: #FFCC01;
}

.energy-e {
  background-color: #F6AC63;
}

.energy-f {
  background-color: #F78522;
}

.energy-g {
  background-color: #EF1D3A;
}
</style>