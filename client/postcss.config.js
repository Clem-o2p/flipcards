module.exports = {
  plugins: {
    tailwindcss: {},
    "vue-cli-plugin-tailwind/purgecss": {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /^img$/,
        /^code$/,
        /^pre$/,
        /^shepherd/,
      ],
    },
    autoprefixer: {},
  },
};
