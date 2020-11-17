<template>
  <div
    class="card p-6 bg-white rounded-lg shadow-xl flex-1 h-full"
    @click="toggleFace"
    ref="card"
  >
    <div class="card__inner">
      <div class="card__front" v-show="!backVisible">
        <h2 v-html="currentCard.A" class="text-center text-xl font-bold" />
      </div>
      <div class="card__back" v-show="backVisible">
        <h2 class="text-center text-xl font-bold mb-2" v-html="currentCard.A" />
        <p v-html="currentCard.B" />
      </div>
      <div class="pt-6 pb-6">
        <span
          v-for="category in categories"
          :key="category"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >{{ category }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  data() {
    return {
      backVisible: false,
    };
  },
  props: {
    currentCard: {
      type: Object,
    },
  },
  computed: {
    categories() {
      return this.currentCard.category
        ? this.currentCard.category.split(",")
        : [];
    },
  },
  methods: {
    toggleFace() {
      this.backVisible = !this.backVisible;
    },
  },
  mounted() {
    const links = this.$refs.card.querySelectorAll("a");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noreferrer noopener");
    });
  },
};
</script>
