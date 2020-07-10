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
                <option>With options</option>
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
          </b-autocomplete>
        </b-field>
        <div class="columns">
          <div class="column">
            <div class="select is-fullwidth">
              <select>
                <option>Pilih Lokasi</option>
                <option>With options</option>
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
</template>
<script>
import debounce from 'lodash/debounce'
import query from '~/apollo/queries/searchcarier'
export default {
  name: 'Banner',
  amp: 'hybrid',
  ampLayout: 'default.amp',
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      name: '',
      page: 1,
      totalPages: 1,
    }
  },
  methods: {
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
      this.$apollo
        .query({
          query,
          prefetch: ({ route }) => ({ searchText: this.name }),
          variables: {
            searchText: this.name,
          },
        })
        .then(({ data }) => {
          // do what you want with data
          data.searchCarier.forEach((item) => this.data.push(item))
        })
        .catch((error) => {
          console.log(error)
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),
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
