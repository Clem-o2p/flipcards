import Shepherd from "shepherd.js";
import bus from "./bus";

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: "shadow-md bg-purple-dark",
    scrollTo: true,
  },
});

tour.addStep({
  id: "card-step",
  text: "Au tap ou clic sur la carte, révélez la deuxième face.",
  attachTo: {
    element: ".card-step",
    on: "bottom",
  },
  when: {
    show: function() {
      setTimeout(() => {
        bus.emit("flip-card");
      }, 1500);
    },
    hide: function() {
      bus.emit("flip-card");
    },
  },
  buttons: [
    {
      text: "Ok",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "button-step",
  text: "Piochez une nouvelle carte en cliquant ici.",
  attachTo: {
    element: ".button-step",
    on: "top",
  },
  when: {
    show: function() {
      setTimeout(() => {
        bus.emit("select-another");
      }, 1500);
    },
    hide: function() {
      bus.emit("open-categories");
    },
  },
  buttons: [
    {
      text: "Ok",
      action: tour.next,
    },
  ],
});

tour.addStep({
  id: "header-step",
  text: "Visualisez toutes les catégories ici.",
  attachTo: {
    element: ".header-step",
    on: "bottom",
  },
  buttons: [
    {
      text: "Ok",
      action: tour.complete,
    },
  ],
});

export default tour;
