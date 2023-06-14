import { Injectable } from '@angular/core';
import { IPlatform } from '../interfaces/platform.interface';
import { IGame } from '../interfaces/game.interface';
import { EPlatform, EPlatformLogo } from '../enums/platform.enums';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly _games: IGame[] = [
    {
      "id": 123,
      "name": "dear esther landmark edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/520720/header.jpg?t=1644592241",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Team Fortress 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/440/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Counter-Strike: Global Offensive",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Grand Theft Auto IV: The Complete Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/12210/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Don't Starve Together",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/322330/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Alien: Isolation",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/214490/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SMITE",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/386360/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F.E.A.R. 3",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/21100/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Witcher 2: Assassins of Kings Enhanced Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/20920/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Far Cry® 3",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/220240/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Dota 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Thief",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/239160/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Battlefield: Bad Company™ 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/24960/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Don't Starve",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/219740/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/220/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Portal 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Homefront: The Revolution",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/223100/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Synergy",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/17520/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "DOOM",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/379720/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Duty: Modern Warfare 3",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/42680/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Resident Evil 6",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/221040/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Duty: Modern Warfare 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/10180/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Outlast",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/238320/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Outlast 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/414700/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Black Mesa",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/362890/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands: The Pre-Sequel",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/261640/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Resident Evil 5",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/21690/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Ryse: Son of Rome",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/302510/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F.E.A.R. 2: Project Origin",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/16450/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Portal",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/400/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Haydee",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/530890/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Duty: Modern Warfare 2 - Multiplayer",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/10190/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SNOW",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/244930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Darkness II",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/67370/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Sanctum 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/210770/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Serious Sam 3: BFE",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/41070/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F.E.A.R.",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/21090/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Sven Co-op",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/225840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Cube Destroyer",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/440760/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Dirty Bomb",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/333930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Splatter - Zombiecalypse Now",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/281920/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Episode Two",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/420/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Episode One",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/380/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Three Heroes",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/380020/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "PlanetSide 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/218230/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Shadow Warrior",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/233130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Lust from Beyond: Prologue",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1170820/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "See No Evil",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/313830/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Red Lake",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/357290/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Sniper Elite 4",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/312660/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Alien Swarm",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Homefront",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/55100/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "God Game : The Odyssey",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/416080/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "PUBG: BATTLEGROUNDS",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "DRAGON: A Game About a Dragon",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/351150/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Path of Exile",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/238960/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Transmissions: Element 120",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/365300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Tiny Bridge: Ratventure",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/360380/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Squirbs",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/429700/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Defiance",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/224600/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Monster Girl Island: Prologue",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/943700/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Sixtieth Kilometer",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/448780/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "House of Caravan",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/353550/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Plazma Being",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/346630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SUCCUBUS: Prologue",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1344350/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Airscape: The Fall of Gravity",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/317250/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Rolling Sun",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/371670/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Clones",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/72400/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Agony UNRATED",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/879420/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Lord of the Rings Online™",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/212500/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Zombie Driver HD",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/220820/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Rise of the Ancients",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/485950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "TOXIKK",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/324810/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Portal Stories: Mel",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/317400/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Spec Ops: The Line",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/50300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Insurgency",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/222880/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Dead or Alive 5 Last Round",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/311730/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Blackwake",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/420290/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "TERA",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/389300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "E.Y.E: Divine Cybermancy",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/91700/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "FarmD",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1814630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "HITMAN™ 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/863550/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Stanley Parable",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/221910/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Antenna",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/443580/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Update",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/290930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Need for Speed: Hot Pursuit",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/47870/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Neverwinter",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/109600/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "POSTAL 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/223470/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Bureau: XCOM Declassified",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/65930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Hacknet",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/365450/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "PAYDAY 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/218620/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: DownFall",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/587650/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Uncertain: Last Quiet Day",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/406970/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Estranged: Act I",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/261820/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2 RU",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/217490/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Year Long Alarm",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/747250/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Duty: Modern Warfare 3 - Multiplayer",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/42690/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "ABZÛ",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/384190/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Tom Clancy's Ghost Recon Phantoms - EU",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/272350/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Warhammer 40,000: Space Marine - Anniversary Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/55150/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Resident Evil Revelations",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/222480/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Walking Simulator 2020",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1214280/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life Deathmatch: Source",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/360/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Orbt XL",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/615610/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Counter-Strike: Condition Zero",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/80/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Door Kickers",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/248610/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Warframe",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/230410/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Pool Nation FX",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/314000/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Red Faction: Armageddon",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/55110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Murderous Pursuits",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/638070/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Evolve Stage 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/273350/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Fractured Space",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/310380/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "GASP",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/412400/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Cortex Command",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/209670/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Outland",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/305050/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The SKIES",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/337950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Aliens vs. Predator",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/10680/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "ORION: Prelude",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/104900/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "War Trigger 3",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/298240/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Turing Test",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/499520/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Red Solstice",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/265590/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "HAWKEN",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/271290/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/70/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "RIFT",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/39120/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SOS",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/619080/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Simply Chess",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/312280/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SOS: Classic",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/802240/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "C9",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/212390/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Escape Dead Island",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/226560/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "LEGO® The Lord of the Rings™",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/214510/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "iVRy Driver for SteamVR",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/992490/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Exogen VR Experience",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1057130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Lost Coast",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/340/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "CAYNE",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/532840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "TOME: Immortal Arena",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/293560/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Counter-Strike",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/10/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Tiny Bang Story",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/96000/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life - The Freeman Chronicles",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/642920/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Unmetaverse",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1834340/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Deathmatch",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/320/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Passing Pineview Forest",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/331120/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Age of Wonders III",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/226840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Agony",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/487720/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Alien Swarm: Reactive Drop",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/563560/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Amnesia: A Machine for Pigs",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/239200/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Amnesia: The Dark Descent",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/57300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "AppGameKit Classic",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/325180/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Arcade Moonlander",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/727020/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Ashes of the Singularity: Escalation",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/507490/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "A Story About My Uncle",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/278360/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Autobahn Police Simulator",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/348510/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Between Two Castles - Digital Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1158500/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Black Desert",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Black Desert (Retired)",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/836620/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Blameless",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/530330/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Blast Zone! Tournament",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/649190/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/49520/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2: Headhunter 1: Bloody Harvest",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/245890/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2: Headhunter 2: Wattle Gobbler",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/245910/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2: Headhunter 3: Mercenary Day",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/245930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2: Headhunter 4: Wedding Day Massacre",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/245950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Borderlands 2: Headhunter 5: Son of Crawmerax",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/245970/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "BRAIN / OUT",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/578310/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Braveland",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/285800/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Breeders of the Nephelym: Alpha",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1161770/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "BROKE PROTOCOL: Online City RPG",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/696370/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Burning Daylight",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1052070/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Duty: Modern Warfare 3",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/115300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Call of Juarez Gunslinger",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/204450/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Company of Heroes 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/231430/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Counter-Strike: Condition Zero Deleted Scenes",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/100/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Counter-Strike: Source",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/240/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "DashBored",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/490860/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Deiland",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/760620/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Deponia: The Complete Journey",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/292910/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Destiny 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "DiRT Rally",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/310560/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "DISTRAINT: Deluxe Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/395170/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Divide by Sheep",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/252130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Don't Starve: Shipwrecked",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/393010/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Dota 2 Test",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/205790/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Dr. Langeskov, The Tiger, and The Terribly Cursed Emerald: A Whirlwind Heist",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/409160/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Draw Slasher",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/418270/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "ENDLESS™ Space - Definitive Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/208140/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Estranged: The Departure",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/582890/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Evolvation",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/510840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F.E.A.R.: Extraction Point",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/21110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F.E.A.R.: Perseus Mandate",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/21120/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F1 2015",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/286570/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "F1 2018",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/737800/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Fallout Shelter",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/588430/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Fearless Fantasy",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/282100/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Firefall",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/227700/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Fistful of Frags",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/265630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "For Honor",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/304390/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "For Honor - Public Test",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/654310/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Galactic Civilizations II: Ultimate Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/202200/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Gamecraft",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1078000/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "GameGuru",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/266310/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Geneshift",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/308600/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Go! Go! Nippon! ~My First Trip to Japan~",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/251870/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Gravity Wars",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/877150/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Green Hell",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/815370/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "GRID 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/44350/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Guacamelee! Super Turbo Championship Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/275390/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Guns of Icarus Alliance",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/608800/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Guns of Icarus Online",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/209080/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Hacknet Official Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/408710/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life - The Freeman Chronicles: BTS",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/678350/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life - The Freeman Chronicles: Episode 2 Part 1",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/646171/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2 Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/323140/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Episode One Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/323150/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life 2: Episode Two Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/323160/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life: Blue Shift",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life: Opposing Force",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/50/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Half-Life Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/323130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Haunted House Escape: A VR Experience ",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1806670/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Headsnatchers",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/797410/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "HELLION",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/588210/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Hyperdrive Massacre",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/402390/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Infestation: The New Z",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/555570/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Interkosmos",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/579110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "I’m not a Monster",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/826600/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Kabounce",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/431930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Kathy Rain",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/370910/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Killer is Dead",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/261110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Kingdom: Classic",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/368230/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Knights of Pen and Paper +1",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/231740/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Lara Croft and the Temple of Osiris",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/289690/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "LawBreakers",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/350280/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Layers of Fear",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/391720/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "LEGO® The Hobbit™",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/285160/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Life is Strange™",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/319630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Little Nightmares",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/424840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Lust from Beyond: Scarlet",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1401680/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Magrunner: Dark Pulse",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/209630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Manual Samuel - Anniversary Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/504130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Medusa's Labyrinth",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/436110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Merry Snowballs",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/567730/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Metro 2033",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/43110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Middle-earth™: Shadow of Mordor™",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/241930/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Minds Eyes",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/519140/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Nephise Begins",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/628950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "One Drop Bot",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1060320/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Orwell",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/491950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Outlast: Whistleblower DLC",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/273300/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "PlanetSide 2 - Test",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1083500/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Polyball",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/368180/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Polygoneer",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/684680/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Portal Stories: Mel Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/322420/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "POSTAL",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/232770/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Princess Remedy In A Heap of Trouble",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/522040/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Princess Remedy in a World of Hurt",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/407900/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Quake Champions",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/611500/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Satellite Reign",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/268870/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Serial Cleaner",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/522210/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Serious Sam Fusion 2017 (beta)",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/564310/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Shadowrun Returns",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/234650/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Showdown Bandit",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1076280/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Sins of a Solar Empire: Rebellion",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/204880/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Slingshot people",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/542340/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SMITE - Public Test",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/858460/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "SUCCUBUS",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/985830/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Survarium",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/355840/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Survived By",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/606140/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Team Fortress 2 Beta",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/520/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Team Fortress Classic",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/20/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Council",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/287630/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "THE GREAT GEOMETRIC MULTIVERSE TOUR",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/887400/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The LEGO® NINJAGO® Movie Video Game",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/640590/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Witcher 3: Wild Hunt - Expansion Pass",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/355880/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Witcher 3: Wild Hunt - New Finisher Animations",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/378646/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Witcher: Enhanced Edition",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/20900/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Tomb Raider",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/203160/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Tom Clancy's The Division - Beta",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/414460/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Totally Accurate Battlegrounds",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/823130/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Total War: SHOGUN 2",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/34330/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Transpose",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/835950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Viscera Cleanup Detail: Shadow Warrior",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/255520/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Warhammer 40,000: Eternal Crusade",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/375230/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Warhammer 40,000: Space Marine Soundtrack",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1759110/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "When the Darkness comes",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/1021950/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "WildStar",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/376570/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Will Glow the Wisp",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/640890/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Ведьмак 3: Дикая Охота",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Холат - перевал Дятлова",
      "logo": "https://cdn.cloudflare.steamstatic.com/steam/apps/343710/capsule_184x69.jpg",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Relicta",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Shadow of the Tomb Raider: Definitive Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Prey",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Vampyr",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Second Extinction™",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Vanishing of Ethan Carter",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Dead by Daylight",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Never Alone (Kisima Ingitchuna)",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "DARQ: Complete Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Nioh: The Complete Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Spectrum Retreat",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Control",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Frostpunk",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The First Tree",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Fall",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Sunless Sea",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Rage 2",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "STAR WARS™ Battlefront™ II: Celebration Editio...",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Solitairica",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Night in the Woods",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Long Dark",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Oddworld: New 'n' Tasty",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Cities: Skylines",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Ghostbusters: The Video Game Remastered",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Blair Witch",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Layers of Fear 2",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Railway Empire",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Commander Lilith DLC",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "HITMAN",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "God's Trigger",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Alto Collection",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Remnant: From the Ashes",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "A Total War Saga: TROY",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Torchlight II",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Escapists 2",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Lifeless Planet: Premier Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Killing Floor 2",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Hue",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "AER Memories of Old",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "ARK: Survival Evolved",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Borderlands: The Handsome Collection",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Sludge Life",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Sid Meier's Civilization VI",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Death Coming",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Crashlands",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Amnesia: The Dark Descent",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "For The King",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Just Cause 4",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Sherlock Holmes Crimes and Punishments",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Close to the Sun",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Gone Home",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Hob",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Totally Reliable Delivery Service",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Tormentor X Punisher",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Figment",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "World War Z",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Stanley Parable",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Watch Dogs Standard Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Mutazione",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "A Short Hike",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Anodyne 2: Return To Dust",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "GoNNER",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Offworld Trading Company",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "InnerSpace",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Assassins Creed Syndicate Standard Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Faeria",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Aztez",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Kingdom Come: Deliverance",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Ticket to Ride",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Carcassonne",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Farming Simulator 19",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Bridge",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Sundered Eldritch Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Steep",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Darksiders II Deathinitive Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Darksiders Warmastered Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Yooka-Laylee and the Impossible Lair",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Hello Neighbor",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Talos Principle",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Shadow Tactics: Blades of the Shogun",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Faster Than Light",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Totally Accurate Battle Simulator",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Ape Out",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Little Inferno",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "SUPERHOT",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Towerfall Ascension",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Into The Breach",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Escapists",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Wolf Among Us",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Jotun Valhalla Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Rayman Legends",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Bad North Jotunn Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Messenger",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "RUINER",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Nuclear Throne",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "SOMA",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Costume Quest",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Layers of Fear",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Q.U.B.E. 2",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "observer_",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Alan Wake's American Nightmare",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Surviving Mars - Space Race",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Surviving Mars - Mysteries Resupply Pack",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Surviving Mars",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Minit",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Everything",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Metro: 2033 Redux",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Batman Arkham - Trilogy",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Conarium",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "ABZU",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The End is Nigh",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Celeste",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Inside",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Fez",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Hyper Light Drifter",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Mutant Year Zero",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "GNOG",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "For Honor Standard Edition",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Alan Wake",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "This War of Mine",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Moonlighter",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Limbo",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Torchlight",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Overcooked",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Last Day of June",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Rebel Galaxy",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Enter the Gungeon",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Kingdom New Lands",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "City of Brass",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "RiME",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Stories Untold",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "World of Goo",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Transistor",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "The Witness",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Oxenfree General Audience",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Slime Rancher",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Thimbleweed Park",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Axiom Verge",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Jackbox Party Pack 1",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "What Remains of Edith Finch",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Super Meat Boy",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Subnautica",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },

    {
      "id": 123,
      "name": "ANNO 1602",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "Assassin's Creed 2",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "Assassin's Creed IV Black Flag",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "Assassin's Creed Unity",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "assassin's creed chronicles",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "assassin's creed syndicate",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "child of light",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "FarCry 3",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "FarCry 5",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "For Honor",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "Might & Magic: Chess Royale",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "rabbids coding",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "STEEP",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "splinter cell conviction",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "splinter cell blacklist",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "tom clancy's the division",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "tom clancy's the division 2",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "trials rising",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "watch dogs",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "watch dogs 2",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
    {
      "id": 123,
      "name": "rayman legends",
      "logo": "",
      "platforms": [EPlatform.UBISOFT]
    },
       {
      "id": 123,
      "name": "Death Stranding",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "F.I.S.T.: Forged In Shadow Torch",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Rise of the Tomb Raider: 20 Year Celebration",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Worms Revolution Gold Edition",
      "logo": "",
      "platforms": [EPlatform.GOG]
    },
    {
      "id": 123,
      "name": "Severed Steel",
      "logo": "",
      "platforms": [EPlatform.EPIC]
    },
    {
      "id": 123,
      "name": "Daymare: 1998",
      "logo": "",
      "platforms": [EPlatform.GOG]
    },
    {
      "id": 123,
      "name": "Summer of '58",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Yuppie Psycho",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Five Nights at Freddy's: Security Breach",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Forest",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "Lust for Darkness",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
    {
      "id": 123,
      "name": "The Uncertain : Light at The End",
      "logo": "",
      "platforms": [EPlatform.STEAM]
    },
  ];

  private readonly _platforms: IPlatform[] = [
    {
      "id": 1,
      "name": "Steam",
      "logo": EPlatformLogo.STEAM,
    },
    {
      "id": 2,
      "name": "Epic Games",
      "logo": EPlatformLogo.EPIC,

    },
    {
      "id": 3,
      "name": "Ubisoft",
      "logo": EPlatformLogo.UBISOFT,

    },
    {
      "id": 4,
      "name": "GOG Galaxy",
      "logo": EPlatformLogo.GOG,

    },
    {
      "id": 5,
      "name": "Rockstar Games",
      "logo": EPlatformLogo.ROCKSTAR,

    },
    {
      "id": 6,
      "name": "Battle.net",
      "logo": EPlatformLogo.BATTLE,

    },
    {
      "id": 7,
      "name": "Arc",
      "logo": EPlatformLogo.ARC,

    },
    {
      "id": 8,
      "name": "Origin",
      "logo": EPlatformLogo.ORIGIN,

    },
    {
      "id": 9,
      "name": "Bethesda.net",
      "logo": EPlatformLogo.BETHESDA,

    }
  ];
  
  public get games(): IGame[] {
    return JSON.parse(JSON.stringify(this._games)) as IGame[];
  }
  
  public get platforms(): IPlatform[] {
    return JSON.parse(JSON.stringify(this._platforms)) as IPlatform[];
  }
  
  public get mockGame(): IGame {
    return {
      'id': -1,
      'name': 'Что то пошло не так \\(О-О)/',
      'logo': '/assets/omg.jpg',
      'platforms': [EPlatform.STEAM]
    };
  }
}
