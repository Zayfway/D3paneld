
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});
const token = process.env.BOT_TOKEN;
const pending = new Map();

client.once('ready', () => {
  console.log(`🤖 Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  const id = interaction.customId.split('_')[1];
  const action = interaction.customId.split('_')[0];

  if (!pending.has(id)) return interaction.reply({ content: 'Demande introuvable.', ephemeral: true });

  const data = pending.get(id);
  if (action === 'approve') {
    data.status = 'approved';
    await interaction.reply({ content: '✅ Demande approuvée. En attente du code.', ephemeral: true });
  } else if (action === 'reject') {
    data.status = 'rejected';
    await interaction.reply({ content: '❌ Demande refusée. L'utilisateur sera redirigé.', ephemeral: true });
  }

  pending.set(id, data);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('-')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'pending') {
    const list = [...pending.entries()].map(([id, d]) => `ID: ${id} | ${d.pseudo} | ${d.status || 'en attente'}`).join('\n');
    message.channel.send("📄 **Demandes en attente :**\n" + (list || 'Aucune'));
  } else if (command === 'approve' && args[0]) {
    const data = pending.get(args[0]);
    if (data) {
      data.status = 'approved';
      pending.set(args[0], data);
      message.channel.send('✅ Demande approuvée.');
    }
  } else if (command === 'reject' && args[0]) {
    const data = pending.get(args[0]);
    if (data) {
      data.status = 'rejected';
      pending.set(args[0], data);
      message.channel.send('❌ Demande rejetée.');
    }
  } else if (command === 'clear') {
    pending.clear();
    message.channel.send('🧹 Cache vidé.');
  } else if (command === 'status') {
    message.channel.send(`📊 Le bot est actif. ${pending.size} demande(s) suivie(s).`);
  } else if (command === 'help') {
    message.channel.send(`📖 Commandes disponibles :
- approve [id]
- reject [id]
- approveall
- clear
- pending
- status`);
  }
});

client.login(token);
