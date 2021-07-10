module.exports = (mongoose) => {
  const Filme = mongoose.model(
    "filme",
    mongoose.Schema(
      {
        name: String,
        description: String,
        releaseDate: String,
        category: Number,
        director: String,
        available: Boolean,
      },
      { timestamps: true }
    )
  );
  return Filme;
};
