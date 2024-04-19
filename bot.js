const mineflayer = require("mineflayer");
const config = require("./config.json");


const bot = mineflayer.createBot({
    host: config.server,
    port: config.port,
    username: config.botName,
    password: config.password,
    version: config.version
});

/* ========= ANTI AFK ========== */
function movementInterval(){
const movementInterval = setInterval(() => {

    const randomX = (Math.random() * 10 - 5) / 2; 
    const randomZ = (Math.random() * 10 - 5) / 2;
    const randomYaw = Math.random() * Math.PI * 2;
    const randomPitch = (Math.random() - 0.5) * Math.PI;
        
    bot.setControlState('forward', true);
    bot.setControlState('back', true);
    bot.setControlState('left', randomX < 0);
    bot.setControlState('right', randomZ > 0);
    bot.setControlState('jump', Math.random() < 0.1);
    bot.setControlState('sneak', Math.random() < 0.1);
    bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI);
}, 5000);
}

/* ============= MINEFLAYER BOT ============= */
bot.once('login', () => {
    console.clear()
    console.log("[+] El bot entro al servidor.")
});

bot.on('spawn', () => {
    console.log(`[!] Coordenadas: X:${bot.entity.position.x} Y: ${bot.entity.position.y} Z: ${bot.entity.position.z}`);
    if (config.antiafk == true){
        movementInterval();
    }
    bot.on('chat', (username, message) => {
        if (username == bot.username){
            return;
        }
        if (config.logChat == true){
            console.log(`[${username}]: ${message}`)
        }
        if (message == config.prefix + "coords"){
            bot.chat(`Mis Coordenadas: X: ${bot.entity.position.x} Y: ${bot.entity.position.y} Z: ${bot.entity.position.z}`)
        }

    });
});
/* ============= MINEFLAYER BOT ============= */
