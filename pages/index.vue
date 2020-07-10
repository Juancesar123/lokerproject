<template>
  <no-ssr>
    <div>
      <Navbar />
      <Banner />
      <section class="section">
        <div class="columns">
          <div class="column">
            <div class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content has-text-centered">
                    <h3><strong>Pencari Kerja</strong></h3>
                    <p>
                      Buat resume gratis, untuk peroleh peluang kerja lebih baik
                      sesuai dengan keahlian dan lokasi
                    </p>
                  </div>
                </div>
              </article>
              <br />
              <div class="has-text-centered">
                <button class="button is-link" @click="foo()">
                  Resume Online
                </button>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <article class="media">
                <div class="media-content">
                  <div class="content has-text-centered">
                    <h3><strong>Perusahaan</strong></h3>
                    <p>
                      Perusahaan Pasang iklan lowongan agar terhubung dengan
                      pencari kerja yang paling potensial.
                    </p>
                  </div>
                </div>
              </article>
              <br />
              <div class="has-text-centered">
                <button class="button is-link">Pasang Iklan lowongan</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section is-light">
        <p class="title"><strong>Lowongan Kerja Premium</strong></p>
        <div class="columns">
          <div v-for="item in data" :key="item._id" class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{ item.name_organization }}</p>
                    <p class="subtitle is-6">{{ item.position }}</p>
                  </div>
                </div>

                <div class="content">
                  <p>{{ item.description }}</p>
                  <a href="#">klik disini untuk selengkapnya</a>
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
import Banner from '~/components/Banner.vue'
import Footer from '~/components/Footer.vue'
import query from '~/apollo/queries/allcarier'
export default {
  amp: 'hybrid',
  ampLayout: 'default.amp',
  components: {
    Navbar,
    Footer,
    Banner,
  },
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.foo()
  },
  methods: {
    foo() {
      // but you could also call queries like this:
      this.$apollo.query({ query }).then(({ data }) => {
        // do what you want with data
        this.data = data.cariers
      })
    },
  },
}
</script>
