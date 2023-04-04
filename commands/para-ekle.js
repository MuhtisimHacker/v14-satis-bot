const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const louritydb = require("croxydb")
const config = require("../config.json")

// Lourity
module.exports = {
    name: "para-ekle",
    description: "İstediğin kullanıcıya para eklersin.",
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Kime para eklemek istersin?",
            type: 6,
            required: true
        },
        {
            name: "miktar",
            description: "Ne kadar eklemek istersin?",
            type: 3,
            required: true
        },
    ],

    run: async (client, interaction) => {

        const user = interaction.options.getMember('kullanıcı')
        const miktar = interaction.options.getString('miktar')
        const owner = config.OWNERS

        if (!owner.includes(interaction.user.id)) return interaction.reply({content: "Dostum bunu kullanmak için yetkin yok", ephemeral: true})

        if (isNaN(miktar)) return interaction.reply({ content: "Girdiğin bir sayı olmalı!", ephemeral: true })

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`Başarıyla ${user} kullanıcısına ${miktar} para eklendi!`)

        louritydb.add(`kredi_${user.id}`, miktar)
        return interaction.reply({ embeds: [embed] })
    }
}