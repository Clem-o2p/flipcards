import marked from "marked";

const mapRowsToCards = (rows) => {
  return rows.map(({ category, A, B }) => {
    return {
      category,
      A: marked(A),
      B: marked(B),
    };
  });
};

export default mapRowsToCards;
