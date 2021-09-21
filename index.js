const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const botToken = require("./token.json");

const client = new Discord.Client();

const TOKEN = botToken.TOKEN;

console.log(TOKEN);

const prefixo = "$";

const ytdlOptions = { filter: 'audioonly' }

const servidores = {
    "server": {
        connection: null,
        dispatcher: null
    }
}

client.on("ready", () => {
    console.log("Estou online!");
});

client.on("message", async (msg) => {

    if (!msg.guild) return;

    if (msg.content === "@GoogleNoia") {
        msg.reply("O @GoogleNoia é um gordo memo!");
    }

    if (msg.content === "@Furavelon") {
        msg.reply("O @Furavelon é cachorrinho de Madame.");
    }

    if (!msg.content.startsWith(prefixo)) return;

    if (!msg.member.voice.channel) {
        msg.channel.send("Você precisa estar no canal de voz!");
        return;
    }

    async function join() {
        servidores.server.connection = await msg.member.voice.channel.join();
    }

    if (msg.content === prefixo + "join") {
        try {
            join();
        } catch (erro) {
            console.log("Erro ao entrar num canal de voz!");
            console.log(erro);
        }
    }

    if (msg.content === prefixo + "leave") {
        msg.member.voice.channel.leave();
        servidores.server.connection = null;
        servidores.server.dispatcher = null;
    }

    if (msg.content.startsWith(prefixo + "play")) {

        if (client.voice.connections.size === 0) {
            try {
                join();
            } catch (erro) {
                console.log("Erro ao entrar num canal de voz!");
                console.log(erro);
            }
        }

        setTimeout(function () {

            let musicLink = msg.content.slice(6);

            if (ytdl.validateURL(musicLink)) {
                servidores.server.dispatcher = servidores.server.connection.play(ytdl(musicLink, ytdlOptions));
            } else {
                msg.channel.send("Link inválido.");
            }

        }, 1000);
    }

    if (msg.content === prefixo + 'pause') {
        servidores.server.dispatcher.pause();
    }

    if (msg.content === prefixo + 'resume') {
        servidores.server.dispatcher.resume();
    }

});

client.login(TOKEN);