module.exports = (mongoose) => {
  const Locacao = mongoose.model(
    "locacao",
    mongoose.Schema(
      {
        movieId: String,
        clienteId: String,
        atendenteId: String,
        stardDate: String,
        endDate: String,
      },
      { timestamps: true }
    )
  );
  return Locacao;
};
