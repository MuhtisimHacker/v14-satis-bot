const { Collection, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb");
const { readdirSync } = require("fs");
// Lourity - discord.gg/altyapilar
module.exports = async (client, interaction) => {

  if (interaction.isChatInputCommand()) {

    if (!interaction.guildId) return;

    readdirSync('./commands').forEach(f => {

      const cmd = require(`../commands/${f}`);

      if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
// Lourity - discord.gg/altyapilar
        return cmd.run(client, interaction, louritydb);
      }
    });
  }
};
