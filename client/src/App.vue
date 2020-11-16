<template>
  <Card :currentCard="currentCard" v-if="cards.length" />
  <p v-else>Loading...</p>
  <button @click="changeRandomIndex">
    Chose another
  </button>
</template>

<script>
import marked from "marked";
import { GoogleSpreadsheet } from "google-spreadsheet";
import settings from "./settings/spec";
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      cards: [],
      randomIndex: 0
    }
  },
  computed: {
    currentCard() {
      return this.cards[this.randomIndex]
    }
  },
  methods: {
    changeRandomIndex() {
      const max = this.cards.length;
      this.randomIndex = Math.floor(Math.random() * max);
    }
  },
  created() {
    const doc = new GoogleSpreadsheet(settings.spreadsheetAPI.sheetId);

    doc.useApiKey(settings.spreadsheetAPI.apiKey);


    doc.loadInfo().then(() => {
      const sheet = doc.sheetsByIndex[0];
      sheet.getRows().then(rows => {
        this.cards = rows.map(({ category, A, B }) => {
          return {
            category,
            A: marked(A),
            B: marked(B)
          }
        })
      })
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

pre {
  background-color: #ddd;
  padding: 1rem;
  text-align: left;
}
</style>
