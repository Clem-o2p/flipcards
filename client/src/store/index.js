import { createStore } from "vuex";
import * as api from "../api";
import mapRowsTocards from "../helpers/mapRowsToCards";

export default createStore({
  state() {
    return {
      cards: [],
      selectedCategories: [],
      randomIndex: 0,
    };
  },
  getters: {
    cards: (state) => state.cards,
    currentCard: (state) => state.cards[state.randomIndex],
    selectedCategories: (state) => state.selectedCategories,
  },
  mutations: {
    SET_CARDS: (state, cards) => {
      state.cards = cards;
    },
    SET_RANDOM_INDEX: (state) => {
      const max = state.cards.length;
      state.randomIndex = Math.floor(Math.random() * max);
    },
    SET_SELECTED_CATEGORY: (state, category) => {
      state.selectedCategories.push(category);
    },
    UNSET_SELECTED_CATEGORY: (state, categoryToRemove) => {
      state.selectedCategories = state.selectedCategories.filter(
        (category) => category !== categoryToRemove
      );
    },
  },
  actions: {
    fetchCards(context) {
      api.fetchCards().then((rows) => {
        const cards = mapRowsTocards(rows);
        context.commit("SET_CARDS", cards);
        context.commit("SET_RANDOM_INDEX");

        cards.forEach((card) => {
          const cardCategories = card.category.split(",");
          for (const cardCategory of cardCategories) {
            if (!context.state.selectedCategories.includes(cardCategory)) {
              context.commit("SET_SELECTED_CATEGORY", cardCategory);
            }
          }
        });
      });
    },
    changeRandomIndex(context) {
      context.commit("SET_RANDOM_INDEX");
    },
  },
});
