<template>
  <div v-if="$isAMP">
    <section class="section banner">
      <div class="group-field">
        <div class="field">
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="Cari Posisi atau Nama Perusahaan"
            />
          </p>
        </div>
        <div class="columns">
          <div class="column">
            <div class="select is-fullwidth">
              <select>
                <option>Pilih Lokasi</option>
                <option v-for="item in dataEducation" :key="item._id">
                  {{ item.education }}
                </option>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="select is-fullwidth">
              <select>
                <option>Pilih Posisi</option>
                <option>With options</option>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="select is-fullwidth">
              <select>
                <option>Pilih Pendidikan</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>
        <button class="button is-link is-medium">Cari</button>
      </div>
    </section>
  </div>
  <div v-else>
    <section class="section banner">
      <div class="group-field">
        <b-field>
          <b-autocomplete
            v-model="name_organization"
            :data="data"
            placeholder="ketik nama perusahaan"
            field="name_organization"
            :loading="isFetching"
            :check-infinite-scroll="true"
            @typing="getAsyncData"
            @select="(option) => (selected = option)"
            @infinite-scroll="getMoreAsyncData"
          >
            <template slot="empty">No results found</template>
            <template slot-scope="props">
              <div class="media">
                <!-- <div class="media-left">
                  <img
                    width="32"
                    :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`"
                  />
                </div> -->
                <div class="media-content">
                  {{ props.option.title }}
                  <br />
                  <small>
                    Jabatan {{ props.option.position }},
                    <b>{{ props.option.name_organization }}</b>
                  </small>
                </div>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
        <div class="columns">
          <div class="column">
            <div class="select is-fullwidth">
              <select v-model="province">
                <option value="">Pilih Provinsi</option>
                <optgroup
                  v-for="item in dataProvince"
                  :key="item._id"
                  :value="item.province"
                  :label="item.province"
                  @select="(item) => (selected = item)"
                >
                  <option
                    v-for="city in item.city"
                    :key="city._id"
                    :value="city.city"
                    @select="(city) => (selected = city)"
                    >{{ city.city }}</option
                  >
                </optgroup>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="select is-fullwidth">
              <select v-model="position">
                <option value="">Pilih Jabatan</option>
                <optgroup
                  v-for="item in dataPosition"
                  :key="item._id"
                  :value="item.position_parent"
                  :label="item.position_parent"
                  @select="(item) => (selected = item)"
                >
                  <option
                    v-for="child in item.position_child_id"
                    :key="child._id"
                    :value="child.position_parent"
                    :label="child.position_parent"
                    @select="(child) => (selected = child)"
                    >{{ child.position_child }}</option
                  >
                </optgroup>
              </select>
            </div>
          </div>
          <div class="column">
            <div class="select is-fullwidth">
              <select v-model="education">
                <option value="">Pilih Pendidikan</option>
                <option
                  v-for="item in dataEducation"
                  :key="item._id"
                  :value="item.education"
                  @select="(item) => (selected = item)"
                >
                  {{ item.education }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button class="button is-link is-medium" @click="searchCarier()">
          Cari
        </button>
      </div>
    </section>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
// this is query graphql
import queryCarier from '~/apollo/queries/searchcarier'
import queryEducation from '~/apollo/queries/alleducation'
import queryComplexSearch from '~/apollo/queries/searchComplexCarier'
import queryallposition from '~/apollo/queries/allposition'
import queryallprovince from '~/apollo/queries/allprovince'
export default {
  /*
  untuk setting dimana jika routenya /amp maka akan di tampilkan
  template amp jika tanpa /amp maka yg akan di tampilkan layout non amp
*/
  name: 'Banner',
  amp: 'hybrid',
  ampLayout: 'default.amp',
  data() {
    return {
      data: [],
      dataEducation: [],
      dataPosition: [],
      dataProvince: [],
      selected: null,
      isFetching: false,
      name_organization: '',
      position: '',
      province: '',
      education: '',
      name: '',
      page: 1,
      totalPages: 1,
    }
  },
  mounted() {
    this.getEducation()
    this.getPosition()
    this.getProvince()
  },
  methods: {
    async searchCarier() {
      await this.$apollo
        .query({
          query: queryComplexSearch,
          variables: {
            name_organization: this.name_organization,
            position: this.position,
            education: this.education,
          },
        })
        .then(({ data }) => {
          // do what you want with data
          console.log(data)
        })
    },
    async getPosition() {
      await this.$apollo.query({ query: queryallposition }).then(({ data }) => {
        // do what you want with data
        this.dataPosition = data.positions
      })
    },
    async getProvince() {
      await this.$apollo.query({ query: queryallprovince }).then(({ data }) => {
        // do what you want with data
        this.dataProvince = data.provinces
      })
    },
    async getEducation() {
      await this.$apollo.query({ query: queryEducation }).then(({ data }) => {
        // do what you want with data
        this.dataEducation = data.educations
      })
    },
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (name) {
      // String update
      if (this.name !== name) {
        this.name = name
        this.data = []
        this.page = 1
        this.totalPages = 1
      }
      // String cleared
      if (!name.length) {
        this.data = []
        this.page = 1
        this.totalPages = 1
        return
      }
      // Reached last page
      if (this.page > this.totalPages) {
        return
      }
      this.isFetching = true
      this.name = name
      /*
        Apollo vue js. get filtered data, using query graph QL
      */
      this.$apollo
        .query({
          query: queryCarier,
          variables: {
            searchText: this.name,
          },
        })
        .then(({ data }) => {
          // do what you want with data
          data.searchCarier.forEach((item) => this.data.push(item))
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),
    // fungsi di gunakan untuk infinte scroll.
    getMoreAsyncData: debounce(function () {
      this.getAsyncData(this.name)
    }, 250),
  },
}
</script>
<style>
.banner {
  background-image: url('/office.png');
  width: 100%;
  height: 100%;
}
.banner::after {
  opacity: 0.5;
}
.group-field {
  display: block;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>
