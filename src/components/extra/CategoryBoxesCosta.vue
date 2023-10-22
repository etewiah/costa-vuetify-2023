<template>
  <div>
    <v-layout class="cat-boxes-layout" wrap row>
      <v-flex class="pt-0" xs12>
        <span class="headline mt-0">
          {{ $ft('client_shared.labels.lookingFor') }}
        </span>
      </v-flex>
      <v-flex class="xs12 sm6 md6 lg8 xl8 marbella-links">
        <v-card
          :to="searchLinkMarbella"
          height="250"
          class="category-gradient"
          gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
        >
          <v-img
            class="white--text category-img"
            gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
            height="250px"
            src="https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1565894748/category-developments_gpdrr9.jpg"
          >
            <v-layout align-center justify-center row fill-height>
              <span class="headline"> Marbella</span>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex class="xs12 sm6 md6 lg4 xl4 fuengirola-links">
        <v-card
          :to="searchLinkFuengirola"
          height="250"
          class="category-gradient"
        >
          <v-img
            class="white--text category-img"
            gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
            height="250px"
            src="https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1565894455/category_up_to300k.jpg"
          >
            <v-layout align-center justify-center row fill-height>
              <span class="headline">Fuengirola</span>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex class="xs12 sm6 md6 lg4 xl4 puertobanus-links">
        <v-card
          :to="searchLinkPuertoBanus"
          height="250"
          class="category-gradient"
        >
          <v-img
            class="white--text category-img"
            gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
            height="250px"
            src="https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1565894455/category_up_to300k.jpg"
          >
            <v-layout align-center justify-center row fill-height>
              <span class="headline">Puerto Banus</span>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex class="xs12 sm6 md6 lg4 xl4 nuevaandalucia-links">
        <v-card
          :to="searchLinkNuevaAndalucia"
          height="250"
          class="category-gradient"
        >
          <v-img
            class="white--text category-img"
            gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
            height="250px"
            src="https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1565894455/category_up_to300k.jpg"
          >
            <v-layout align-center justify-center row fill-height>
              <span class="headline">Nueva Andalucia</span>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
      <v-flex class="xs12 sm6 md6 lg4 xl4 sanpedroalcantara-links">
        <v-card
          :to="searchLinkSanPedroAlcantara"
          height="250"
          class="category-gradient"
        >
          <v-img
            class="white--text category-img"
            gradient="to top right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.35)"
            height="250px"
            src="https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1565894455/category_up_to300k.jpg"
          >
            <v-layout align-center justify-center row fill-height>
              <span class="headline">San Pedro Alcantara</span>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  computed: {
    searchLinkFuengirola() {
      return {
        name: 'resalesSearch',
        query: {
          city:
            'Fuengirola',
        },
        params: {
          locale: this.$store.state.coreStore.currentLocale,
          preamble: this.$store.getters.listingPreamble,
        },
      }
    },
    searchLinkMarbella() {
      return {
        name: 'resalesSearch',
        query: {
          city:
            'San Pedro de Alcantara,Puerto Banus,Nueva Andalucia,La Campana,Aloha,Las Brisas,Marbella,The Golden Mile,Sierra Blanca,Nagueles,Torre Real,Rio Real,Bahia de Marbella,Santa Clara,Los Monteros,Altos de los Monteros,Las Chapas,Hacienda Las Chapas,El Rosario,Costabella,La Mairena,Reserva de Marbella,Elviria,Marbesa,Carib Playa,Artola,Cabopino,Puerto de Cabopino,Cortijo Blanco',
        },
        params: {
          locale: this.$store.state.coreStore.currentLocale,
          preamble: this.$store.getters.listingPreamble,
        },
      }
    },
    searchLinkPuertoBanus() {
      return {
        name: 'resalesSearch',
        query: {
          city:
            'Puerto Banus',
        },
        params: {
          locale: this.$store.state.coreStore.currentLocale,
          // preamble: this.promotionsPreamble
          preamble: this.$store.getters.listingPreamble,
        },
      }
    },
    searchLinkNuevaAndalucia() {
      return {
        name: 'resalesSearch',
        query: {
          city:
            'Nueva Andalucia',
        },
        params: {
          locale: this.$store.state.coreStore.currentLocale,
          preamble: this.$store.getters.listingPreamble,
        },
      }
    },
    searchLinkSanPedroAlcantara() {
      return {
        name: 'resalesSearch',
        query: {
          city:
            'San Pedro de Alcantara',
        },
        params: {
          locale: this.$store.state.coreStore.currentLocale,
          preamble: this.$store.getters.listingPreamble,
        },
      }
    },
    // promotionsPreamble() {
    //   if (this.$store.state.coreStore.currentLocale === 'en') {
    //     return 'promotions'
    //   } else {
    //     return 'promociones'
    //   }
    // },
  },
  data: () => ({}),
}
</script>
<style>
.category-gradient .headline {
  text-shadow: 2px 2px 5px black;
}

/*  Category Boxes  */

.category-gradient {
  background-image: linear-gradient(
    to top right,
    rgba(0, 0, 0, 0.01),
    rgb(51, 97, 128)
  );
}

.category-gradient .headline {
  text-shadow: 2px 2px 5px black;
}
</style>