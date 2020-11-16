<template>
  <div class="card">
    <div class="card__inner">
      <div class="card__front">
        <h2 v-html="currentCard.A" />
      </div>
      <div class="card__back">
        <h2 v-html="currentCard.A" />
        <p v-html="currentCard.B" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
  data() {
    return {
      backVisible: false
    }
  },
  props: {
    currentCard: {
      type: Object
    }
  },
  methods: {
    toggleFace() {
      this.backVisible = !this.backVisible
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* The flip card container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
.card {
  background-color: transparent;
  max-width: 80vw;
  height: 80vh;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  margin: 0 auto;
}

/* This container is needed to position the front and back side */
.card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.card:hover .card__inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.card__front, .card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.card__front {
  background-color: grey;
  color: black;
}

/* Style the back side */
.card__back {
  background-color: salmon;
  color: black;
  transform: rotateY(180deg);
}
</style>
