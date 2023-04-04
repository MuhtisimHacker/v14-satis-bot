const { Client, EmbedBuilder } = require("discord.js");
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
const wait = require('node:timers/promises').setTimeout;
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "yazı-tura",
    description: "Ravenle cc paraları katla!",
    type: 1,
    options: [
        {
            name: "miktar",
            description: "İkiye katlamak istediğin para miktarını gir.",
            type: 4,
            required: true,
        },

    ],

    run: async (client, interaction) => {

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)


        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")


        let yaziTura = louritydb2.get(`yaziTura_${interaction.user.id}`)

        const limit = new EmbedBuilder()
            .setColor("Red")
            .setDescription("15 dakika içerisinde en fazla **15** kez para katlayabilirsin!")

        let kanal = "1018615216264708277"
        const channel = client.channels.cache.get(kanal)

        if (yaziTura === 15) {
            interaction.reply({ embeds: [limit], ephemeral: true }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
            setTimeout(() => {
                louritydb2.delete(`yaziTura_${interaction.user.id}`)
                return channel.send({ content: `:tada: <@${interaction.user.id}> **/yazı-tura** komutunu tekrar kullanabilirsin!` }).catch((e) => { })
            }, 900000)
            return;
        }


        const noMoney = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum maalesef hiç paran yok.\n**/günlük** yazarak günlük hediyeni alabilirsin!")

        if (!kredi || kredi === 0) return interaction.reply({ embeds: [noMoney], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        let money = interaction.options.getInteger('miktar')


        const gecersiz = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum girdiğin bir sayı değil.")

        if (isNaN(money)) return interaction.reply({ embeds: [gecersiz], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const azPara = new EmbedBuilder()
            .setColor("Red")
            .setDescription("0 krediyi ikiye katlamak mı?")

        if (money === 0) return interaction.reply({ embeds: [azPara], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const cokPara = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Dostum 300'den fazla para katlayamazsın.")

        if (money > 300) return interaction.reply({ embeds: [cokPara], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const noMoney2 = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Dostum maalesef o kadar paran yok.\n💰 Kredi Miktarı: **${kredi || 0} Kredi**`)

        if (kredi < money) return interaction.reply({ embeds: [noMoney2], ephemeral: true }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })


        const mapping = ["true", "false"]
        const randomMapping = mapping[Math.floor(Math.random() * mapping.length)]


        if (randomMapping === "true") {

            const kazandin = new EmbedBuilder()
                .setColor("Green")
                .setDescription(`Dostum **${money * 2} kredi** kazandın!\n💰 Kredi Miktarı: **${kredi + money * 2 || 0} Kredi**`)

            louritydb.add(`kredi_${interaction.user.id}`, money * 2)
            louritydb2.add(`yaziTura_${interaction.user.id}`, +1)
            return interaction.reply({ embeds: [kazandin] }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
        }


        if (randomMapping === "false") {

            const kaybettin = new EmbedBuilder()
                .setColor("Red")
                .setDescription(`Dostum maalesef **${money} kredi** kaybettin.\n💰 Kredi Miktarı: **${kredi - money || 0} Kredi**`)

            louritydb.add(`kredi_${interaction.user.id}`, -money)
            louritydb2.add(`yaziTura_${interaction.user.id}`, +1)
            return interaction.reply({ embeds: [kaybettin] }).catch((e) => {
                return interaction.reply({ embeds: [hata], ephemeral: true })
            })
        }

    }
};