const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")

// Lourity
module.exports = {
  name: "çal",
  description: "Birinin parasını çalarsın.",
  type: 1,
  options: [],

  run: async (client, interaction) => {

    let calisma_sure = louritydb2.get(`calma_sure_${interaction.user.id}`)

    if (calisma_sure === true) {

      const sure = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Dostum çok çalmışsın fazla haram iyi degil.`)

      interaction.reply({ embeds: [sure], ephemeral: true })

      setTimeout(() => {
        louritydb2.delete(`calma_sure_${interaction.user.id}`)
      }, 10000)
      return;
    }

    let miktarsonuç = Math.floor(Math.random() * 99) + 1
    var sebep = ["enes baturu soydu", "doldur"] //doldurun
    var sebepsonuç = sebep[Math.floor(Math.random() * sebep.length)];

    const calis_embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`<@${interaction.user.id}>, ${sebepsonuç} ve **${miktarsonuç}** TL kazandı!`)

    louritydb2.set(`calma_sure_${interaction.user.id}`, true)
    louritydb.add(`kredi_${interaction.user.id}`, miktarsonuç)
    return interaction.reply({ embeds: [calis_embed] })
  }
}
