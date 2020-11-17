import { createStore } from "vuex";
import * as api from "../api";
import mapRowsTocards from "../helpers/mapRowsToCards";

export default createStore({
  state() {
    return {
      cards: [],
      randomIndex: 0,
    };
  },
  getters: {
    cards: (state) => state.cards,
    currentCard: (state) => state.cards[state.randomIndex],
  },
  mutations: {
    SET_CARDS: (state, cards) => {
      state.cards = cards;
    },
    SET_RANDOM_INDEX: (state) => {
      const max = state.cards.length;
      state.randomIndex = Math.floor(Math.random() * max);
    },
  },
  actions: {
    fetchCards(context) {
      api.fetchCards().then((rows) => {
        const cards = mapRowsTocards(rows);
        context.commit("SET_CARDS", cards);
        context.commit("SET_RANDOM_INDEX");
      });
    },
    changeRandomIndex(context) {
      context.commit("SET_RANDOM_INDEX");
    },
  },
});
