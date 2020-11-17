import Vuex from "vuex";
import Vue from "vue";

import marked from "marked";
import { GoogleSpreadsheet } from "google-spreadsheet";

import settings from "../settings/spec";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    randomIndex: 0
  },
  getters: {
    currentCard: state => state.cards[state.randomIndex]
  },
  mutations: {
    SET_CARDS: (state, cards) => {
      state.cards = cards
    },
    SET_RANDOM_INDEX: state => {
      const max = state.cards.length;
      state.randomIndex = Math.floor(Math.random() * max);
    }
  },
  actions: {
    fetchCards(context) {
      const doc = new GoogleSpreadsheet(settings.spreadsheetAPI.sheetId);

      doc.useApiKey(settings.spreadsheetAPI.apiKey);


      doc.loadInfo().then(() => {
        const sheet = doc.sheetsByIndex[0];
        sheet.getRows().then(rows => {
          const cards = rows.map(({ category, A, B }) => {
            return {
              category,
              A: marked(A),
              B: marked(B)
            }
          });
          context.commit("SET_CARDS", cards);
          context.commit("SET_RANDOM_INDEX");
        })
      });
    }
  },
  changeRandomIndex(context) {
    context.commit("SET_RANDOM_INDEX");
  }
})