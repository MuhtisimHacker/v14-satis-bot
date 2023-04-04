const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
const wait = require('node:timers/promises').setTimeout;
// Lourity
module.exports = {
  name: "çalış",
  description: "Çalışarak para kazanırsın.",
  type: 1,
  options: [],

  run: async (client, interaction) => {

    let calisma_sure = louritydb2.get(`calisma_sure_${interaction.user.id}`)

    if (calisma_sure === true) {

      const sure = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`Dostum çok çalışmışsın bir süre sonra tekrar çalışabilirsin.`)

      interaction.reply({ embeds: [sure], ephemeral: true })

      setTimeout(() => {
        louritydb2.delete(`calisma_sure_${interaction.user.id}`)
      }, 3600)
      return;
    }

    let miktarsonuç = Math.floor(Math.random() * 99) + 1
    var sebep = ["tadilatçı olarak çalıştı", "emlakçı olarak çalıştı", "aşçı olarak çalıştı", "enginar satıcısı olarak çalıştı", "dilenci olarak çalıştı", "enginar olarak çalıştı", "Enes batur olarak çalıştı", "jigolo olarak çalıştı", "su satıcısı olarak çalıştı", "boş boş durdu"]
    var sebepsonuç = sebep[Math.floor(Math.random() * sebep.length)];

    const calis_embed = new EmbedBuilder()
      .setColor("Green")
      .setDescription(`<@${interaction.user.id}>, ${sebepsonuç} ve **${miktarsonuç}** TL kazandı!`)

    louritydb2.set(`calisma_sure_${interaction.user.id}`, true)
    louritydb.add(`kredi_${interaction.user.id}`, miktarsonuç)
    return interaction.reply({ embeds: [calis_embed] })
  }
};