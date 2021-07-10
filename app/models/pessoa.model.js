module.exports = (mongoose) => {
  const Pessoa = mongoose.model(
    "pessoa",
    mongoose.Schema(
      {
        name: String,
        sex: Number,
        birthDate: String,
        phone: String,
        adress: String,
        isAtendente: Boolean,
      },
      { timestamps: true }
    )
  );
  return Pessoa;
};
