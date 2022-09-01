const Discord = require("discord.js")
const dotenv = require("dotenv")
const { Client, GatewayIntentBits} = require('discord.js');
const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v10');
const { SlashCommandBuilder } = require("@discordjs/builders")
dotenv.config()
const TOKEN = process.env.TOKEN

async function register (GUILD_ID){
    const rest = new REST().setToken(TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(client.user.id, GUILD_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

const commands = [
    new SlashCommandBuilder().setName("command").setDescription("command template"),
];

//________________________________________________________________\\

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.slashcommands = new Discord.Collection()


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName === "command"){
        await interaction.reply("responce")
        console.log("command replied to")
    }
});
client.on("guildCreate", guild => {
    console.log("joined server, id: "+guild.id)
    register(guild.id)
})
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.login(TOKEN);