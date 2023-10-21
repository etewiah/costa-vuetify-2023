<template>
  <v-container pt-5 pb-5 grid-list-xl>
    <!-- Development -->
    <v-card class="inmo-card px-5 pb-5 about_text my-5">
      <v-img       src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/logo-contact-form_cdjbx1.svg"
style="display:none" contain aspect-ratio="1" width="175" class="logo-contact"></v-img>
      <v-layout row wrap>
        <v-flex md6 sm12>
          <div class="headline my-3 bold">Costa del Sol West</div>
          <v-layout row wrap>
            <v-flex v-for="link in costaSolWestLinksFull" :key="link.fullUrl" xl4 lg6 xs6>
              <a :href="link.fullUrl">
                {{link.label}}</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMalaga">Malaga</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkTorremolinos">Torremolinos</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkBenalmadena">Benalmadena</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkFuengirola">Fuengirola</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMijas">Mijas</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMijasCosta">Mijas Costa</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMijasGolf">Mijas Golf</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMijasCala">La Cala de Mijas</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkRiverSol">Rivera del Sol</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkCalahonda">Calahonda</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkCabopino">Cabopino</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMarbesa">Marbesa</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkElviria">Elviria</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkRosario">El Rosario</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMonteros">Los Monteros</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkBahiaMarbella">Bahia de Marbella</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkRioReal">Rio Real</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkMarbella">Marbella</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkPuertoBanus">Puerto Banus</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkNuevaAndalucia">Nueva Andalucia</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkGuadalmina">Guadalmina</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkBenahavis">Benahavis</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkNewGoldenMile">New Golden Mile</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkEstepona">Estepona</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkCasares">Casares</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkDuquesa">La Duquesa</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkManilva">Manilva</a>
            </v-flex>
            <v-flex xl4 lg6 xs6>
              <a :href="mapLinkSotogrande">Sotogrande</a>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md3 sm6>
          <div class="headline my-3 bold">Costa del Sol East</div>
          <v-layout row wrap>
            <v-flex v-for="link in costaSolEastLinksFull" :key="link.fullUrl" xs12>
              <a :href="link.fullUrl">
                {{link.label}}</a>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md3 sm6>
          <div class="headline my-3 bold">Inland</div>
          <v-layout row wrap>
            <v-flex v-for="link in inlandLinksFull" :key="link.fullUrl" xs12>
              <a :href="link.fullUrl">
                {{link.label}}</a>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
// import ContentHtml from `@jsroot/shared/components/ContentHtml`
// import ClientForm from `@jsroot/shared/components-forms/ClientForm`
export default {
  data() {
    return {
      // To edit the links here I might need to use something like:
      // import JsonEditor from 'vue-json-edit'
      // from
      // /Users/etewiah/dev/sites-2018/pwb-multi-tenant-host/app/javascript/shared-admin/pages/PageEditConfig.vue
      // viewable here:
      // https://www.holidays2malaga.com/es/editpage/5/edit/config
      costaSolWestLinks: [],
      costaSolEastLinks: [{
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Rincon%20de%20la%20Victoria,La%20Cala%20del%20Moral,Torre%20de%20Benagalbon,Benagalbon,Benajarafe",
        label: "Rincon de la Victoria"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Velez-Malaga,Torre%20del%20Mar,Valle-Niza,Almayate,Caleta%20de%20Velez,Algarrobo,Mezquitilla",
        label: "Torre del Mar"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Torrox,Torrox%20Costa,El%20Morche",
        label: "Torrox"
      }],
      inlandLinks: [{
        fullUrl: "",
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Alhaurin%20de%20la%20Torre",
        label: "Alhaurin de la Torre"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Alhaurin%20el%20Grande,Alhaurin%20Golf,Lauro%20Golf",
        label: "Alhaurin el Grande"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Coin",
        label: "Coin"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Monda",
        label: "Monda"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Ojen",
        label: "Ojen"
      }, {
        queryString: "type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Istan",
        label: "Istan"
      }]
    }
  },
  // props: ["currentPageParts", "currentClientForms"],
  components: {
    // ClientForm,
    // OurAgency,
    // ContentHtml,
  },
  computed: {
    costaSolWestLinksFull() {
      let costaSolWestLinksFull = []
      let that = this
      this.costaSolWestLinks.forEach(function(costaSolWestLink) {
        costaSolWestLink.fullUrl = `/${that.$store.state.coreStore.currentLocale}/s/${that.$store.getters.listingPreamble}/?${costaSolWestLink.queryString}`
        costaSolWestLinksFull.push(costaSolWestLink)
      })
      return costaSolWestLinksFull
    },
    costaSolEastLinksFull() {
      let costaSolEastLinksFull = []
      let that = this
      this.costaSolEastLinks.forEach(function(costaSolEastLink) {
        costaSolEastLink.fullUrl = `/${that.$store.state.coreStore.currentLocale}/s/${that.$store.getters.listingPreamble}/?${costaSolEastLink.queryString}`
        costaSolEastLinksFull.push(costaSolEastLink)
      })
      return costaSolEastLinksFull
    },
    inlandLinksFull() {
      let inlandLinksFull = []
      let that = this
      this.inlandLinks.forEach(function(inlandLink) {
        inlandLink.fullUrl = `/${that.$store.state.coreStore.currentLocale}/s/${that.$store.getters.listingPreamble}/?${inlandLink.queryString}`
        inlandLinksFull.push(inlandLink)
      })
      return inlandLinksFull
    },
    mapLinkMalaga() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Malaga,Carretera%20de%20Cadiz,Bailen%20Miraflores,Malaga%20Este,Malaga%20Centro`
    },
    mapLinkFuengirola() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Las%20Lagunas,Fuengirola,Los%20Boliches,Los%20Pacos,Torreblanca,Carvajal`
    },
    mapLinkMijas() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Mijas,Sierrezuela,El%20Coto,Campo%20Mijas,Valtocado`
    },
    mapLinkMijasCosta() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=El%20Chaparral,El%20Faro,Mijas%20Costa,Cerros%20del%20Aguila`
    },
    mapLinkMijasGolf() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Mijas%20Golf,La%20Cala%20Hills`
    },
    mapLinkMijasCala() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=La%20Cala%20de%20Mijas,La%20Cala,La%20Cala%20Golf`
    },
    mapLinkRiverSol() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Riviera%20del%20Sol,Miraflores,Calypso`
    },
    mapLinkCalahonda() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Calahonda`
    },
    mapLinkCabopino() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Cabopino,Artola,Puerto%20de%20Cabopino`
    },
    mapLinkMarbesa() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Marbesa,Carib%20Playa,Las%20Chapas,Hacienda%20Las%20Chapas,Reserva%20de%20Marbella`
    },
    mapLinkElviria() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Elviria,La%20Mairena`
    },
    mapLinkRosario() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=El%20Rosario,Costabella`
    },
    mapLinkMonteros() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Santa%20Clara,Los%20Monteros,Altos%20de%20los%20Monteros`
    },
    mapLinkBahiaMarbella() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Bahia%20de%20Marbella`
    },
    mapLinkRioReal() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Rio%20Real,Torre%20Real`
    },
    mapLinkPuertoBanus() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Puerto%20Banus,Cortijo%20Blanco`
    },
    mapLinkNuevaAndalucia() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=La%20Campana,Nueva%20Andalucia,Aloha,Las%20Brisas,San%20Pedro%20de%20Alcantara`
    },
    mapLinkGuadalmina() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Guadalmina%20Alta,Guadalmina%20Baja`
    },
    mapLinkNewGoldenMile() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=New%20Golden%20Mile,Benamara,El%20Padron,El%20Presidente,Bel%20Air,Costalita,El%20Paraiso,Benavista,Diana%20Park,Atalaya,Valle%20del%20Sol,Cancelada,Hacienda%20del%20Sol`
    },
    mapLinkDuquesa() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=La%20Duquesa,San%20Luis%20de%20Sabinillas`
    },
    // mapLinkCabopino() {
    //   return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Cabopino,Artola,Puerto%20de%20Cabopino`
    // },
    mapLinkBenahavis() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=La%20Quinta,Benahavis,La%20Heredia,El%20Madronal,La%20Zagaleta,Los%20Arqueros,Los%20Almendros,Los%20Flamingos`
    },
    mapLinkSotogrande() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Sotogrande,Sotogrande%20Alto,Sotogrande%20Costa,Sotogrande%20Marina,Sotogrande%20Playa,Sotogrande%20Puerto,San%20Roque,San%20Roque%20Club`
    },
    mapLinkManilva() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Manilva,Punta%20Chullera`
    },
    mapLinkCasares() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Casares,Casares%20Playa,Casares%20Pueblo,Dona%20Julia`
    },
    mapLinkEstepona() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Benamara,El%20Padron,El%20Presidente,Bel%20Air,Costalita,Estepona,Selwo,El%20Paraiso,Benavista,Diana%20Park,Atalaya,Valle%20del%20Sol,Cancelada,Hacienda%20del%20Sol`
    },
    mapLinkMarbella() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Marbella,The%20Golden%20Mile,Sierra%20Blanca,Nagueles`
    },
    mapLinkTorremolinos() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=Montemar,La%20Carihuela,El%20Pinillo,Torremolinos,Torremolinos%20Centro,Bajondillo,La%20Colina,Playamar,Los%20Alamos`
    },
    mapLinkBenalmadena() {
      return `/${this.$store.state.coreStore.currentLocale}/s/${this.$store.getters.listingPreamble}/?type=1-1,1-2,1-4,1-5,1-6,2-1,2-2,2-4,2-5&city=La%20Capellania,Torremar,Torrequebrada,Torremuelle,Benalmadena,Benalmadena%20Costa,Benalmadena%20Pueblo,Arroyo%20de%20la%20Miel,La%20Leala`
    },

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>