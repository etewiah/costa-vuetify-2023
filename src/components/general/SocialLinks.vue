<template>
  <div>
<!--     <social-sharing class="text-xs-center" inline-template>
      <div class="social-icons icon-circle">
        <network network="facebook">
          <a>
            <img src="https://img.icons8.com/color/48/000000/facebook-circled.png">
          </a>
        </network>
        <network network="linkedin">
          <a>
            <img src="https://img.icons8.com/color/48/000000/linkedin.png">
          </a>
        </network>
        <network network="twitter">
          <a>
            <img src="https://img.icons8.com/color/48/000000/twitter.png">
          </a>
        </network>
      </div>
    </social-sharing> -->
  </div>
</template>
<script>
// July 2019 -  importing it here seems to result in vue dist
// being included in final bundle again
// import SocialSharing from "vue-social-sharing"
export default {
  // props: ["mapQueryName"],
  data: function() {
    return {}
  },
  components: {
    // SocialSharing
  }
}
</script>
<style>
</style>