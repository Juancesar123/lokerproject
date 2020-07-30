<template>
  <no-ssr>
    <div>
      <Navbar />
      <br />
      <section class="section">
        <div v-for="item in listloker" :key="item._id" class="card">
          <div class="card-content">
            <div class="content">
              <div class="media">
                <div class="media-left">
                  <figure class="image">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">
                    <nuxt-link :to="'/cari-loker/' + item.name_organization">
                      {{ item.name_organization }}
                    </nuxt-link>
                  </p>
                  <p class="subtitle">
                    <strong>{{ item.location }}</strong>
                  </p>
                  <p class="subtitle is-6">{{ item.position }}</p>
                  <br />
                  <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </no-ssr>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
// import queryCarier from '~/apollo/queries/allcarier'
export default {
  amp: 'hybrid',
  ampLayout: 'default.amp',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      data: [],
    }
  },
  computed: {
    listloker() {
      return this.$store.state.list
    },
  },
}
</script>
