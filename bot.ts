const nodeFetch = require('node-fetch');
const auth = require('./auth.json');
const discord = require('discord.js');
const client = new discord.Client();

client.login(auth.token);
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const prefix: string = 'cw';
let searchString: string;

client.on('message', async (msg: any) =>
{
    if (msg.content.startsWith(`${prefix}`)) {
    // inform user
    msg.channel.send('Loading games, please wait...');
    // make search string
    searchString = msg.content.replace(prefix,"").trim();
    // search for game
    let result = await IsCracked(searchString);
    msg.channel.send(result);
  }
});

async function IsCracked(searchString: string){
  // variables
  let found: boolean = false;
  let emptyList: boolean = false;
  let page: number = 0;

  // loop
  while (!found || emptyList){
    let url: string = `https://api.crackwatch.com/api/games?page=${page}&sort_by=crack_date&is_cracked=true`;
    console.log(url);

    let games = await GetCrackedGames(url);

    // check if game cracked
    if (games.length > 0){
      emptyList = false;
      for (let game of games){
        if (game.title.toLowerCase().includes(searchString.toLowerCase())){
          found = true;
          return game.title + " is Cracked!";
        }
      }
      page++;  
    }
    else{
      emptyList = true;
      return "No games found."
    }
  }
}

async function GetCrackedGames(url: string) {
  try
  {
    let response = await nodeFetch(url);
    let data = await response.json();
    return data;
  }
  catch (e){ console.log(e); }
}