import { Injectable } from '@angular/core';
import { IPlatform } from '../interfaces/platform.interface';
import { IGame } from '../interfaces/game.interface';
import { EPlatform, EPlatformLogo } from '../enums/platform.enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    private readonly keyLocalStorage = 'games';
    
    private readonly _games: IGame[] = [
        {
            id: "498b674f-32c7-42f0-a4ff-9c9763a086e7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'dear esther landmark edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/520720/header.jpg?t=1644592241',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "45b15997-9966-4001-8704-27df142d2072",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Team Fortress 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/440/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "14bef244-6a82-40a8-9ebe-0c107567ea57",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Counter-Strike: Global Offensive',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "763f4ccd-c487-41c5-adb6-48198b458ad8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Grand Theft Auto IV: The Complete Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/12210/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "86fe9b15-323c-4558-a6f3-dfb348fc74a2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Don\'t Starve Together',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/322330/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b422ee51-f7fe-4b9d-a2f8-14d6e3cf714e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Alien: Isolation',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/214490/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "eabef6df-0b52-4150-8e97-831317169ad8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SMITE',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/386360/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5f098cd9-a3af-4ff1-90e3-ae1d9f3ffd92",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.E.A.R. 3',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/21100/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8fde8422-3ac7-4477-b59e-4894aa9fe403",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Witcher 2: Assassins of Kings Enhanced Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/20920/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1daa7ffc-f4da-413e-b9c0-82a32bce9cda",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Far Cry® 3',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220240/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b10f7194-43b5-4991-90ed-6eef1140d05c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dota 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "fadca37b-8149-41a3-8c86-9da568178286",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Thief',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/239160/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5d15aa6e-8aeb-4bb0-b8b2-1a4c6ae303bd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Battlefield: Bad Company™ 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/24960/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f5c4449e-a871-4fa7-a16b-3512ed4d2b62",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Don\'t Starve',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/219740/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c62bb4c0-3423-460b-9d2f-137f337a217f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "43b49768-79ce-44a2-bd61-e5349301c35f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Portal 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "53782cde-0577-4de4-8f72-255ca8acb7eb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Homefront: The Revolution',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/223100/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "69ac5540-93fc-4529-880a-01a5bfe6297a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Synergy',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/17520/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "41a4d7e1-70e5-4215-ad27-6a912db0f4bb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DOOM',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/379720/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "871695c3-5d2a-4b88-b082-dacea56aea1e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Duty: Modern Warfare 3',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/42680/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "418329e9-7e0d-45bc-997c-e730a5cdd481",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Resident Evil 6',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/221040/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1e0e6989-125a-43ed-8993-0d8e953a8504",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Duty: Modern Warfare 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/10180/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "84dbf9e8-da12-48c6-94ae-5a4507b6b9ed",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Outlast',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238320/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "90fe3a4b-996b-49e9-aab6-595df5f5fae6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Outlast 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/414700/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "69dff1fe-b523-4093-abf2-b5642f256c4e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Black Mesa',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/362890/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1aafadfa-9dd7-4fc5-aa22-74cc63dad785",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands: The Pre-Sequel',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/261640/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a2a6f5ed-a174-4d42-957d-3f5d5367e253",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Resident Evil 5',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/21690/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "85b662a1-0a40-4671-be05-994c24349e68",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ryse: Son of Rome',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/302510/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "499d1e28-090b-41ca-b62b-e1cd2be7fb3b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.E.A.R. 2: Project Origin',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/16450/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "523544af-d25c-47d9-b692-d24235955fc7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Portal',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/400/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0b45192c-905b-4be6-a268-c45e8524763a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Haydee',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/530890/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0996e4e6-92cd-4480-b018-577c89c91b17",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Duty: Modern Warfare 2 - Multiplayer',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/10190/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "9bcafdfa-1cbd-434c-a4c8-658db566fc06",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SNOW',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/244930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "020e8e01-eecb-49d6-94d5-83d4fa9423f2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Darkness II',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/67370/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0cd79488-e3d2-476c-b63a-bc58a4d7ef50",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sanctum 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/210770/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d34d0471-9e9d-4f94-a711-4e5f73dfc5bd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Serious Sam 3: BFE',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/41070/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "47c370c6-f62a-464d-a081-e932baeb6e74",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.E.A.R.',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/21090/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "90b928ec-530c-4323-979c-36892dcf974c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sven Co-op',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/225840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8c60405c-471e-42b8-b503-845cc25b2f63",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Cube Destroyer',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/440760/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7614fab6-4285-4b21-89eb-ca492c37e80b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dirty Bomb',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/333930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a3f5c56b-586c-4bdb-8879-e11244e132a2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Splatter - Zombiecalypse Now',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/281920/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "58a11b57-fba6-499a-be54-11107aa6d172",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Episode Two',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/420/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "36dff27c-0c64-4cc0-9972-7d83db95bdb7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Episode One',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/380/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "706bb0bf-5e7e-4592-bd37-de9435f96b46",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Three Heroes',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/380020/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0552daf8-995b-43f9-be8d-0c52d5a3986f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'PlanetSide 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/218230/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0804999c-0020-4c8e-b3de-72660e52e50b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Shadow Warrior',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/233130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1cbee7f4-c4d8-4f8f-b4b4-50cc00f107d7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Lust from Beyond: Prologue',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1170820/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "514fca6d-28ae-4936-b2aa-a3294885e093",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'See No Evil',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/313830/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3556e855-a6ba-4a78-83cf-0fda2d7a232f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Red Lake',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/357290/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "13b6277b-421a-4196-942d-a19bc88695ed",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sniper Elite 4',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/312660/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c4c2638c-441f-4882-89a4-351b2fdcbaa3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Alien Swarm',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "eadbe6fd-bf17-4c38-9fc4-8057188c7d87",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Homefront',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/55100/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "75d5fd10-3cf2-4ab7-b080-ec5c359f2e91",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'God Game : The Odyssey',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/416080/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b660d319-6a6b-4a10-a3aa-9b3b1a3756b1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'PUBG: BATTLEGROUNDS',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578080/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6645730c-77d8-4c10-8e92-2fa41ab39270",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DRAGON: A Game About a Dragon',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/351150/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "884b7046-a7c1-4074-a473-1dcd80ab3712",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Path of Exile',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/238960/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0a7a5ba5-cbef-46f6-a43c-a81826d937ee",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Transmissions: Element 120',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/365300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3762da21-6bc3-4f9b-8dfa-45b1e07fe29a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Tiny Bridge: Ratventure',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/360380/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "40bbc24f-a81f-40b4-b779-16b9e961952e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Squirbs',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/429700/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "14363bb2-93bb-4293-afaf-3523d08f4d29",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Defiance',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/224600/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "95f58955-0ad0-4692-bf55-3aae1ab3f1e5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Monster Girl Island: Prologue',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/943700/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6819de8a-3091-4f81-8b1e-45b1a4135092",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sixtieth Kilometer',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/448780/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "afeab2b4-7b4f-45a7-bd60-82452edf1f8a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'House of Caravan',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/353550/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "232e80a2-e700-4ac7-ab79-7fb27b5e53ff",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Plazma Being',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/346630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5598a619-1484-46a5-b218-31b30c92a3c2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SUCCUBUS: Prologue',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1344350/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "4176de09-f048-4f82-8fd5-4b18a7279ba7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Airscape: The Fall of Gravity',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/317250/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "14b48f10-24ce-4e18-ad94-1d4ba9f890a1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rolling Sun',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/371670/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e76c326e-0286-4e10-bc9e-c4fe26511ec4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Clones',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/72400/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "198d1c9d-e831-400b-9f81-0805816804be",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Agony UNRATED',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/879420/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7e784bca-0544-442e-ae9b-44ccd915b48c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Lord of the Rings Online™',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/212500/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "dbe79386-a002-44c9-bf0d-1d0853e88748",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Zombie Driver HD',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220820/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "009c34bb-2dc5-4efe-bca4-d7845494eaf1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rise of the Ancients',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/485950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b636e88a-d4de-4df7-acb7-3bc162cb4df3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'TOXIKK',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/324810/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "80488e93-9bf0-4d1b-883e-312bb7c14c08",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Portal Stories: Mel',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/317400/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3337daac-8593-4865-bde6-53a897d586f1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Spec Ops: The Line',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/50300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d4a4ff37-5980-444d-8362-9032cb97f8dd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Insurgency',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/222880/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e7e06210-aa0b-42f6-a990-b942aa9a1a5e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dead or Alive 5 Last Round',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/311730/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "466b1dbe-caec-4c78-8e5d-a5361987eb72",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Blackwake',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/420290/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "43282f86-c1f8-42cb-b38a-8f2a6fc4b3f3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'TERA',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/389300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a85558f1-0232-4ea4-9501-5276e800313e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'E.Y.E: Divine Cybermancy',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/91700/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ba2e48df-848a-4185-94a9-34b23c86da18",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'FarmD',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1814630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "32105b93-100d-420f-8f7d-ecc2726f4a25",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'HITMAN™ 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/863550/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "06c0f168-4fc6-47e8-971f-55a283df01c6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Stanley Parable',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/221910/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f21b7f41-a07a-4234-bfc6-8418eb2bad8e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Antenna',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/443580/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7dbe0245-92e4-4be8-8ad4-2de65348371f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Update',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/290930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "114cd872-f584-4d21-87c8-2bcd0619ab2d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Need for Speed: Hot Pursuit',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/47870/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c9ddb75b-49d6-4136-b611-66824c7c4be0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Neverwinter',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/109600/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3ce72136-37d3-448d-a763-055da5019739",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'POSTAL 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/223470/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8d4f5bd4-d946-4068-9780-05023750dc96",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Bureau: XCOM Declassified',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/65930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1b4dae54-dc06-4f9d-a206-53db95ba7c08",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hacknet',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/365450/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c2956309-8c08-46e0-be30-8cb19a85af3b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'PAYDAY 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/218620/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d374bd82-5327-491f-8b0f-6d4c1c538bad",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: DownFall',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/587650/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1d842266-bbf7-4194-b495-4548354f2a29",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Uncertain: Last Quiet Day',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/406970/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "aa8c5a4b-e77d-4387-b25e-5c9b26ddf408",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Estranged: Act I',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/261820/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d30c98fb-d74c-49f8-9300-4331c6b3b124",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2 RU',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/217490/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c33fa2ef-0218-4fdc-b442-347a35a66361",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Year Long Alarm',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/747250/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "75f2fe88-4d7e-4dcf-9ffb-fb88d1661584",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Duty: Modern Warfare 3 - Multiplayer',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/42690/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "09b69fd0-918a-409c-a294-e45effec4460",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ABZÛ',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/384190/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "52083f43-f194-475f-983c-e91e71a8d400",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Tom Clancy\'s Ghost Recon Phantoms - EU',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/272350/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d91fb7e1-7d1b-473d-80a9-ff4dc5378db2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Warhammer 40,000: Space Marine - Anniversary Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/55150/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "235241e0-facf-4892-a17f-82f4b4170e81",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Resident Evil Revelations',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/222480/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "dcb20d95-500b-4249-ab54-9afbc15f5217",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Walking Simulator 2020',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1214280/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0e7f5aad-f8e1-44cb-968b-a2ad502057a1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life Deathmatch: Source',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/360/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a1f8faa2-8e96-427c-9d05-131cb0e8837a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Orbt XL',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/615610/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "61be2695-154b-4819-a2f4-7f9347615544",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Counter-Strike: Condition Zero',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/80/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "caeb1121-e72c-4d00-ac42-2978ab16dac6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Door Kickers',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/248610/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "96e1db09-8da4-4e77-9318-e2f3bfb9fb2b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Warframe',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/230410/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e716ffea-d644-4373-8d6d-80b485aa1632",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Pool Nation FX',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/314000/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "341e4af6-12ec-4d3a-9cde-22d5bd123b81",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Red Faction: Armageddon',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/55110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b4c07e2b-6649-4edb-b555-9d39beafb1e2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Murderous Pursuits',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/638070/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7a2d74ce-9ad1-40c8-9134-2d10c1752774",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Evolve Stage 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/273350/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "78eafa71-da08-47ec-8215-9205cecff2a6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Fractured Space',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/310380/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ca05837c-0687-43ed-819f-43d572ba5acb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'GASP',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/412400/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "332429e8-b54b-4446-9056-b050bbc4e54a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Cortex Command',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/209670/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a9cbe402-9e06-4244-8b87-748ca79862ad",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Outland',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/305050/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "54edfd78-464a-4a9a-a251-3526138da345",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The SKIES',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/337950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8fc3bf33-5ac5-4170-aeae-ff564007c2ac",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Aliens vs. Predator',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/10680/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "4cf76e50-1b78-44cd-9936-3a3010f9867d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ORION: Prelude',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/104900/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1ba22710-ef4a-4bd1-aa8e-6c56c7f5515a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'War Trigger 3',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/298240/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b2ffebb0-b18d-4cd8-9816-a57581f212f3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Turing Test',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/499520/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1b7edb6b-a44d-42ca-b388-cec4306bfd63",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Red Solstice',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/265590/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "711405d1-9a88-4fef-bd50-c51a7d5feeaa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'HAWKEN',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271290/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3d8fad64-efa6-49fa-8cb9-436205952b0d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/70/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e8bd7ecd-f027-407a-bdbd-c6ac5b7a64e8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'RIFT',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/39120/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "59547bf1-5f8b-4843-8e7d-f77eed86cb49",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SOS',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/619080/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "dcd7869f-2740-4078-a6c1-9c85aba05a3b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Simply Chess',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/312280/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c6c83537-9ddd-44b4-a2c0-189182611242",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SOS: Classic',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/802240/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f81c556d-f31d-47b2-904d-05627e4a8388",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'C9',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/212390/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e48bc718-12ce-4a91-893f-3f6aab5c6e0d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Escape Dead Island',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/226560/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "46ef2765-618e-4bc7-a3fc-2dfdfd4f4724",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'LEGO® The Lord of the Rings™',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/214510/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d7188c21-53b8-4171-b5e5-a700bbba28e2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'iVRy Driver for SteamVR',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/992490/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d2cd669a-ce50-4505-8b3a-ac2a710ee8cc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Exogen VR Experience',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1057130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c38b0031-0047-4901-b87d-96da816199b1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Lost Coast',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/340/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f20be115-80bb-4c60-ab51-1ba62a9d6bc5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'CAYNE',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/532840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "aa0e082f-16d7-4231-8b5f-910159d625ed",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'TOME: Immortal Arena',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/293560/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "58919028-8bbf-45ae-9406-2729bb2463b9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Counter-Strike',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/10/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "4ac2e31c-6387-4623-87c4-3e5f343495ee",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Tiny Bang Story',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/96000/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5e0fb637-b00c-42c2-b5b6-4c499a4f5124",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life - The Freeman Chronicles',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/642920/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ecf6ea05-06d7-4b12-92d5-a019b5e9087b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Unmetaverse',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1834340/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3e470211-a7e9-41a8-866d-40f384d316d8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Deathmatch',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/320/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "52ab57de-17af-4069-8d6d-72a2290fcd6d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Passing Pineview Forest',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/331120/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0fdc9c23-f4d9-4a3f-a7e2-04734db32801",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Age of Wonders III',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/226840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "cc2bcc35-5fc2-4453-84e9-fb3599989522",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Agony',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/487720/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "fb7e58dd-8c7a-4201-b0e6-06be24597b7b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Alien Swarm: Reactive Drop',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/563560/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "675fa2ad-548b-4981-8b2f-628f944094aa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Amnesia: A Machine for Pigs',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/239200/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0a5e2060-282c-4c6e-ba3f-16ce8a3b8700",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Amnesia: The Dark Descent',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/57300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "fb2e3e23-df10-4c9d-acf1-fdfaf72d2bbe",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'AppGameKit Classic',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/325180/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a9c1e861-5c90-4b85-934b-967d10e2342a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Arcade Moonlander',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/727020/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e9517eaf-71f1-47d1-9f99-fa85a4f9b638",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ashes of the Singularity: Escalation',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/507490/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0ad22521-2704-466f-af49-72657472b61f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'A Story About My Uncle',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/278360/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1bde0e68-c54b-46ec-b6f2-fe750c2d8a8c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Autobahn Police Simulator',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/348510/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3cd716ff-bace-4c66-a2b8-04822df2cf36",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Between Two Castles - Digital Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1158500/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "387b3ede-7c84-4183-9bb6-12997b1909f4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Black Desert',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582660/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8b9cea97-fb4d-48e5-a35b-4094a7c37a76",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Black Desert (Retired)',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/836620/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1be5c2ac-1b5f-427c-8ce3-8cbc65bdc352",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Blameless',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/530330/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "92052dbc-8d39-49ad-a8cf-6bbc69c3fb14",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Blast Zone! Tournament',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/649190/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f0ab2ebf-480c-4cbe-97c0-aa862b786a27",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/49520/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "229786c0-3e74-43fe-bce2-cef48a8cd5e3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2: Headhunter 1: Bloody Harvest',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/245890/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "4305ca31-6928-44e7-8486-b314c29e5d27",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2: Headhunter 2: Wattle Gobbler',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/245910/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6789eedf-a9af-4763-a337-6f6f0418d8b7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2: Headhunter 3: Mercenary Day',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/245930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f8e3e616-1455-4040-acba-93ddbe67e06e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2: Headhunter 4: Wedding Day Massacre',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/245950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ecd2b91a-f93e-4441-a0c7-32e6b08c228a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands 2: Headhunter 5: Son of Crawmerax',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/245970/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6bef27e5-ab5e-4814-bb49-eaba56871be5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'BRAIN / OUT',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/578310/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "815c8d70-ea7a-410c-83fc-9f061a626f00",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Braveland',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/285800/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "07f55554-e016-4123-8ab4-5ca44672d61c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Breeders of the Nephelym: Alpha',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1161770/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5354c8ed-4fee-4ec8-acf9-55998ee3e10c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'BROKE PROTOCOL: Online City RPG',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/696370/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f1d227d3-11a5-4e83-a9c5-5734f478049c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Burning Daylight',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1052070/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "fa63b2c3-8c61-437d-a444-3db818d27980",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Duty: Modern Warfare 3',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/115300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "41c452bd-0215-426e-ac28-0698783e27cf",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Call of Juarez Gunslinger',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/204450/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "823da892-9211-4948-8c40-c3f3e53338b4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Company of Heroes 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/231430/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e313a483-592a-4975-9dff-7b5edf8edb22",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Counter-Strike: Condition Zero Deleted Scenes',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/100/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3dd532bc-6c48-46f5-ba25-2f801245acb3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Counter-Strike: Source',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/240/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "094d2c00-e083-40b4-b7b0-85accee44db7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DashBored',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/490860/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "af143a41-24c9-4dc7-b08e-35c015370be4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Deiland',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/760620/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "431e71f6-f65c-4039-9681-09af4569eec2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Deponia: The Complete Journey',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292910/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6062d68d-d095-4175-88f1-34e2c5a52a12",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Destiny 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1085660/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "88fd19b3-5edd-408d-8ff0-1b016734bead",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DiRT Rally',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/310560/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "67a9758d-217a-45d0-82a7-7c6a2e86efaa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DISTRAINT: Deluxe Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/395170/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "240c65c6-9331-4d01-9f19-250c65e145a3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Divide by Sheep',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "65ddb5e9-917d-46ed-ba4b-13ce4bb69134",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Don\'t Starve: Shipwrecked',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/393010/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8a1469cf-9408-42b6-8d3a-50d6f3d32ea3",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dota 2 Test',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/205790/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f524a52b-da5c-4deb-8da7-e01c48f4e85b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dr. Langeskov, The Tiger, and The Terribly Cursed Emerald: A Whirlwind Heist',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/409160/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "99aeaabb-e9c6-4368-8962-e1c9f1b2de31",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Draw Slasher',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/418270/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b7dbe665-2f33-456e-843e-b61213acfb0f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ENDLESS™ Space - Definitive Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/208140/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "59002087-e952-4842-b989-4383d8da3512",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Estranged: The Departure',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/582890/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "06214ab8-54c9-41d9-8d4b-291e621a8385",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Evolvation',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/510840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "379659fb-2502-49e0-a5d9-9f5ef8330fbf",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.E.A.R.: Extraction Point',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/21110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "cc0465bf-1278-49cc-8f66-d9d33477a55c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.E.A.R.: Perseus Mandate',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/21120/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "eb96a0b7-74a9-41f2-9250-33cfeab309ad",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F1 2015',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/286570/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e29cf4e4-8b3b-4655-a9d1-4c466bdcb7bb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F1 2018',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/737800/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "806bb36e-1a32-4416-8209-0e658a9234de",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Fallout Shelter',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588430/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5ea7cd32-b00d-40dd-a5ea-63ecdc501da7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Fearless Fantasy',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/282100/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "054a6648-faae-4041-a58d-2ae92b493646",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Firefall',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/227700/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a60ca796-5c6d-4d7b-8338-4d1b86d77fcf",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Fistful of Frags',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/265630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3f62d72c-878e-43df-9d4f-bc28da4f0b5f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'For Honor',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/304390/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "23a9dcbd-7e0a-4da8-8de5-8af601626153",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'For Honor - Public Test',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/654310/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "dc724872-07e7-4d8a-ac1c-1debef9a5cfd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Galactic Civilizations II: Ultimate Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/202200/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0c6cbbdb-fc54-4bba-9625-dfe71ef10373",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Gamecraft',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1078000/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e6e3abc5-a94f-4a35-b66a-2eac9e7d4f96",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'GameGuru',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/266310/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "109925bc-f203-456b-8e8d-8fecfc1cf1ae",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Geneshift',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/308600/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "de7407f3-e58a-4a82-aaae-7a62db8d991d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Go! Go! Nippon! ~My First Trip to Japan~',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/251870/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ade584f6-b577-4b16-bd9d-9dc39f2c09bd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Gravity Wars',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/877150/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e45c98ee-7118-403f-a256-1df1463b25ef",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Green Hell',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/815370/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "834773b9-66e5-4f50-97a0-91331f961b5b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'GRID 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/44350/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ed435a0c-a518-4806-8b89-d28e98dee11f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Guacamelee! Super Turbo Championship Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/275390/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "9c8b01be-0e55-4547-9adf-e028f76dda35",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Guns of Icarus Alliance',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/608800/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8280bc16-f130-4fa4-b22b-273dfe300eb5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Guns of Icarus Online',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/209080/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1f61d2ab-1dcb-404f-a307-e94753b3a492",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hacknet Official Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/408710/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7d2e0660-1c84-433b-b7be-703717f85bbe",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life - The Freeman Chronicles: BTS',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/678350/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "660a5b40-ae0c-4142-ab63-e4b16d693b47",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life - The Freeman Chronicles: Episode 2 Part 1',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/646171/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e9c75b1f-8f8a-494e-8296-0085fd88eb1d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2 Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323140/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "49b3cccf-7afc-4821-959d-e147dc0193db",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Episode One Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323150/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ad4094ca-110f-465b-a96b-86f94bf5f93c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life 2: Episode Two Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323160/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "bc686bdd-eff4-4e78-bccf-4dc8b202075b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life: Blue Shift',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "93cadd1d-53a3-4426-94f0-e3c7d8d98b4b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life: Opposing Force',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/50/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ce186389-b0a0-4be2-8893-90986e3b1434",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Half-Life Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/323130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "37457fbb-051b-419a-938a-2d4119d89e4e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Haunted House Escape: A VR Experience ',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1806670/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a031b6f6-dd38-41d5-bf62-2b1287c2a38c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Headsnatchers',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/797410/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "0250bb4b-b2aa-46c8-8daf-3dbc9e206ad7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'HELLION',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/588210/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1dc388a6-d865-4b68-b01d-f9ce24a0abdc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hyperdrive Massacre',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/402390/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1ec65f6c-32b1-4c59-b0c0-4c422c0f38ec",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Infestation: The New Z',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/555570/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7b2208e3-ae50-484c-a27f-43d3e6b0b807",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Interkosmos',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/579110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "c33720cd-1bc7-4ea5-9947-950236598297",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'I’m not a Monster',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/826600/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3ffa2975-409f-4633-b3f5-43f313a65845",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Kabounce',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/431930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d5da9998-ee08-41bd-96e6-496d99d3750b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Kathy Rain',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/370910/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3125625f-7a82-4d3a-98be-ff3fb584df9d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Killer is Dead',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/261110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7275cde2-4ddf-4fbe-9e01-008be08bba5f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Kingdom: Classic',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/368230/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d8679652-f27c-41d5-a5f2-5df42f8e2b8b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Knights of Pen and Paper +1',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/231740/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "99a4a9f4-3e91-4a23-a89d-266ad5f7361f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Lara Croft and the Temple of Osiris',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289690/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "9b70e348-40fd-49e8-9afd-01c38f3a5ea6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'LawBreakers',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/350280/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b0e9937a-081a-403f-bf04-f6af91f777f2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Layers of Fear',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/391720/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7967aa97-dabe-4417-9148-a098d463bb28",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'LEGO® The Hobbit™',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/285160/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "93be695e-b936-4663-8d0e-7894d858c1d9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Life is Strange™',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/319630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a8d673ec-f79f-4826-993b-0a45ca7d2dc9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Little Nightmares',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/424840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f237266e-743d-4f95-909c-f41ac829eb99",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Lust from Beyond: Scarlet',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1401680/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "49968db2-a8c2-4b38-984e-d4294ff6211d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Magrunner: Dark Pulse',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/209630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "93791c3e-4dcb-46dc-a772-74d678e85b21",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Manual Samuel - Anniversary Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/504130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "48a0ec46-8f54-44b1-8900-153c9d1675b0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Medusa\'s Labyrinth',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/436110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "852a40b1-0bc8-43cf-85bc-22743c0a01bd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Merry Snowballs',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/567730/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8995ee79-4a22-4069-9a9e-3b6796c66b81",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Metro 2033',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/43110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "42105e43-8dc4-4a29-b517-5dbac63b5df6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Middle-earth™: Shadow of Mordor™',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/241930/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "614fdc92-28a3-4d6d-bd69-be380d29b9e7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Minds Eyes',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/519140/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "90d2eee6-0a4a-4417-9392-a775283c7a06",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Nephise Begins',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/628950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "51f34204-b9bd-4afd-9572-ed228f6dafd9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'One Drop Bot',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1060320/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d74bad46-67d5-4e57-986c-901f4b9d72f7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Orwell',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/491950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d84286af-ea17-4486-8c6a-069facded477",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Outlast: Whistleblower DLC',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/273300/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "1c1a0331-7e30-4ffe-81ca-82b17b113637",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'PlanetSide 2 - Test',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1083500/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "239f911b-a82e-46bd-9271-6a45a6cf89af",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Polyball',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/368180/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "70e85168-9b0a-4cd3-853a-715a765a2ad9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Polygoneer',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/684680/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "4c01af1f-dad7-4de6-9b49-1be016764443",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Portal Stories: Mel Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/322420/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5eb2096a-c6ed-4b6e-8cd3-c7498f192c23",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'POSTAL',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/232770/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "584ae46b-4e40-4a12-9138-86a88c406dce",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Princess Remedy In A Heap of Trouble',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/522040/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "07068ff8-bacf-42f6-9e2a-cb6bb592373f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Princess Remedy in a World of Hurt',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/407900/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "d0b93bd1-0e71-43e1-87a5-5f9a43b2a0f8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Quake Champions',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/611500/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3c72d5f3-2b8c-4bbb-8c4e-02814fa8eb55",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Satellite Reign',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/268870/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ec2c4058-21c9-4609-9a40-03e812617044",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Serial Cleaner',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/522210/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "34d71646-fd6d-4fa3-b162-c3e58ca2c39c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Serious Sam Fusion 2017 (beta)',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/564310/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "949f6e1e-b59e-477b-97af-ed2fd094ea47",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Shadowrun Returns',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/234650/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "2e78790b-9cd5-42c9-a3e0-6afc41c524d1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Showdown Bandit',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1076280/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "8d4da2a8-b4c0-402e-91f4-ab76cb2d45bb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sins of a Solar Empire: Rebellion',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/204880/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7b7f7332-d977-4cc2-9bd0-4fec0c7794e0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Slingshot people',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/542340/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "77ea1065-7c16-414d-933a-e703ea4571b9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SMITE - Public Test',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/858460/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5e515a3e-ed4f-4e9b-b468-565ca0619e71",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SUCCUBUS',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/985830/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "da494ef2-bba4-4f57-b6bf-44b8019ecaca",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Survarium',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/355840/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "e1cc740a-e7e4-4c88-83b6-30f8b130dfbc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Survived By',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/606140/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "190f11ab-5bd9-4e32-b1ee-91e37267cbf7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Team Fortress 2 Beta',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/520/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "15e0a1bd-3b4f-41d4-9ed8-93cfc31d70cf",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Team Fortress Classic',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/20/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "2f78f709-b4a7-418f-a66b-fe1797f703be",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Council',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/287630/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "19ebb815-7de8-43c1-a3b7-0e2dcfcf3643",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'THE GREAT GEOMETRIC MULTIVERSE TOUR',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/887400/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "7099beb0-38be-4dc1-80b4-8d64c11123d4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The LEGO® NINJAGO® Movie Video Game',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/640590/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b282d2d7-c503-425c-82a7-00b2d4695d56",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Witcher 3: Wild Hunt - Expansion Pass',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/355880/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "bb561fdb-ceb9-4bd0-b412-9a3919c99706",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Witcher 3: Wild Hunt - New Finisher Animations',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/378646/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "5e4298f3-09cb-426b-89a5-cb6df33bbc13",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Witcher: Enhanced Edition',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/20900/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "28dd560d-f394-41ef-a45a-ff223b32b6bc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Tomb Raider',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/203160/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f670a6b5-584b-469c-9186-80e9c251b57e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Tom Clancy\'s The Division - Beta',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/414460/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "b727a022-9c05-4b07-b77a-34180a9d80cc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Totally Accurate Battlegrounds',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/823130/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "79e89604-8a9e-4912-828a-4a83c512937a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Total War: SHOGUN 2',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/34330/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "501b7730-3752-43fb-9d8a-f450068f77f2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Transpose',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/835950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "cd59f647-1972-4658-81b7-82d6114c91ee",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Viscera Cleanup Detail: Shadow Warrior',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/255520/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "da974295-032a-47b7-a536-b5836a572c53",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Warhammer 40,000: Eternal Crusade',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/375230/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3f41c56a-6362-4bc3-8b20-2162324c29b7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Warhammer 40,000: Space Marine Soundtrack',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1759110/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "ca98402b-2fd4-4b28-8bc5-cc0cd06b59d9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'When the Darkness comes',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1021950/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "f9a3360d-5afd-462d-bd43-0db1a6987749",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'WildStar',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/376570/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "6456f42c-1a59-43f2-a189-80e43f362eaa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Will Glow the Wisp',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/640890/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "3d1a3d35-9f75-4b09-b41c-5a2115f4c763",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ведьмак 3: Дикая Охота',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "35cfbdad-0e1b-4cbe-a39b-f76f58119d7e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Холат - перевал Дятлова',
            logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/343710/capsule_184x69.jpg',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "953028b2-78b7-4a03-bc91-a14c659e71dd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Relicta',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "2ab0781f-fce6-4813-8d46-c0fcbac28c92",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Shadow of the Tomb Raider: Definitive Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "18a0ae8e-482c-4c46-9b59-6d08cf35933e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Prey',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "58e716a5-d3a2-4ba3-8eb6-3f733865e062",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Vampyr',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "b0cda1e6-99e4-48a9-b258-be83672e06c6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Second Extinction™',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "783f44cf-6e89-49f3-b981-df09a590d81b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Vanishing of Ethan Carter',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "07d609fe-3ab5-4b69-8e30-d47da6910007",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Dead by Daylight',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "bfea33b0-ebdb-40c3-9c5c-6cc9be049d7d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Never Alone (Kisima Ingitchuna)',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "d68c3c47-c222-4d3f-8b53-d3b88eb18c76",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'DARQ: Complete Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "30bedba1-6bf2-4591-ac8f-d57667251464",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Nioh: The Complete Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "33434adf-8dd1-4ea5-b51f-ea65d21c1149",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Spectrum Retreat',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "905355dd-b243-417a-8680-6c261eadbe4c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Control',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "acb352b5-da1e-40f1-8803-17dc9aaf2ab7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Frostpunk',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "536fe611-38e0-4217-b98b-89e79cf4a3e9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The First Tree',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "ffcc6dea-1b76-4612-90d1-028623c4c6f9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Fall',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "13683699-5280-4526-b9e3-254229d20417",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sunless Sea',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e0c1674b-6390-46b6-b221-c32c2f2a57f1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rage 2',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "18ea2c10-e145-4e63-9df3-ff3408b5a788",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'STAR WARS™ Battlefront™ II: Celebration Editio...',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "928a6749-1279-4dd1-ab8a-2c55b1505f97",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Solitairica',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "30a2853f-b244-47f6-b1f8-47761aa8273f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Night in the Woods',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e853b303-09d7-43cb-9b68-79a7dbdb3672",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Long Dark',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "9e3b26a6-d2ee-4c55-abe5-022bbdcc7209",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Oddworld: New \'n\' Tasty',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "0597d2f1-5a10-4537-a979-99016d262030",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Cities: Skylines',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "4927cb3f-3a78-493b-8e37-bb0fb897da30",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ghostbusters: The Video Game Remastered',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "246e4572-7e1a-40bf-bafb-3f788dede8b0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Blair Witch',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "d5b871b2-7085-40d3-8eb5-8ae6517a175c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Layers of Fear 2',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "98e743d5-e044-4e6b-9bdb-65a0501a3d1f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Railway Empire',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "3b287c48-8083-47ee-863a-14db61d88308",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Commander Lilith DLC',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "f143a259-eb6d-4d2f-aa31-bac252faabc6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'HITMAN',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "800db0bb-66bf-4dc7-b052-19dea6db8d64",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'God\'s Trigger',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "ca23b2ca-b83d-4b3b-87fe-2612724f5f5d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Alto Collection',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "50be3a36-5862-49d0-8646-9974eb4ec3b1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Remnant: From the Ashes',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "34539b53-4df6-4231-a8e3-37e1fed795b4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'A Total War Saga: TROY',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5e89df5c-28b9-4ff2-acdc-3d6a7ccc3a0e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Torchlight II',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "bc761550-2115-4d9b-b801-d94d15acfef6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Escapists 2',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "752e1f0f-8da1-48e5-85ff-fae4c024034d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Lifeless Planet: Premier Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "6d8e6584-94e5-4fb0-b9a9-82d8c6489416",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Killing Floor 2',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "907eefbf-3596-4f1f-b176-8c0196e5ceab",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hue',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a4f41e22-6b43-4c5e-9223-344d9483efd7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'AER Memories of Old',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "43381ac1-50a1-4f77-a8a0-cf878d1293de",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ARK: Survival Evolved',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "b8c2a23b-b351-4a6d-907e-5ae96cb9f95e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Borderlands: The Handsome Collection',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a818fb82-e609-4dc4-848c-691d742a3afa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sludge Life',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "c560bb0c-a640-4c72-a530-3ec6af58fdeb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sid Meier\'s Civilization VI',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "ee30c0b7-4fa6-4548-a19d-c9c6a589281e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Death Coming',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a4068b85-a66c-4c82-9a47-e64817b55b50",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Crashlands',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "023b7ae2-973d-4d4c-9161-24b738562292",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Amnesia: The Dark Descent',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5de49c8d-48cc-46c8-912d-1913b30a4e3d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'For The King',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "859328e7-775e-4484-80a9-d8ff1b2e7392",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Just Cause 4',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "826080be-ceff-4284-b39d-4f4a45abded7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sherlock Holmes Crimes and Punishments',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "17dc76b8-84a1-4594-8d7c-68a0e4bbf588",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Close to the Sun',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "cb06f33a-513a-4acf-9ccd-68bfc6b5c2e4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Gone Home',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "6a524e1f-f6a9-4a75-932e-737471c011ad",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hob',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "93ef8b66-8b46-45ed-8dee-08a582cb96e8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Totally Reliable Delivery Service',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "856cf8e1-f808-4695-a807-2c1457e95592",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Tormentor X Punisher',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e41578f5-52a0-42c3-8406-7044a53f9d95",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Figment',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "12c0284e-a175-4bb5-b59a-4cf6eaff2e94",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'World War Z',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "098725bc-cc55-4e96-aa5f-f74d7cdf93ee",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Stanley Parable',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "2b4196bc-6837-4a8a-82f2-ab17ee56125e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Watch Dogs Standard Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "3498fe22-3d7c-405c-9e4c-7c62777a8094",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Mutazione',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "b3091bd5-0942-44eb-a66e-0c8b4fd180f6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'A Short Hike',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "939b3c97-329b-42a9-8a36-e07f03351224",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Anodyne 2: Return To Dust',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a35184ba-b214-4959-a6a9-0ab88bf69653",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'GoNNER',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a3eab88f-211a-46a9-836a-9ac94abc336d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Offworld Trading Company',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "9bb06ea5-8c9a-417b-8e96-bfaab834661d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'InnerSpace',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "6ac79dfa-46cf-4193-9c1e-349f75136fa6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Assassins Creed Syndicate Standard Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "f843801a-c554-447b-a4e7-ae5435d1e469",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Faeria',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "249eb173-be6e-43f0-a72c-6b049c8991e9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Aztez',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "858efa92-910b-4e07-9b8f-2709322821e2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Kingdom Come: Deliverance',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "cca6d00f-02df-474e-8948-76ce12e811f6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ticket to Ride',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "297be6be-f1ed-4422-8c79-a49d6497c001",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Carcassonne',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "250b6851-4f30-4007-9ae8-fbd44e8a6f70",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Farming Simulator 19',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "f7b36608-c18a-4b93-a4cc-5b77ed04493e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Bridge',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "21fb5a03-5b5b-4357-b096-5a729e01b473",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Sundered Eldritch Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a3fe9995-bc0e-46ae-905a-c0907ca6d725",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Steep',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "dac50d23-233a-456d-a933-554d1cb9ae90",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Darksiders II Deathinitive Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "1a4af09c-4cb4-4e8f-9706-1cf80800d0b9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Darksiders Warmastered Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "59f06fd8-210f-48d4-963c-21580fca589a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Yooka-Laylee and the Impossible Lair',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "9234aaac-5695-42f7-9854-0c367568273d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hello Neighbor',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "d979b8f5-5388-4597-a710-5c21eaff94f2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Talos Principle',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "f35af50e-9d19-45e7-8f64-df587a2c3943",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Shadow Tactics: Blades of the Shogun',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5844587b-9e86-447a-92f9-6d7e6e496659",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Faster Than Light',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "38a8a45c-2041-4fbd-a8c3-bed0d182062f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Totally Accurate Battle Simulator',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "7478353b-1bd4-46cb-ac2a-99e97350dd27",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Ape Out',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "9d4f1546-f400-4af2-9c73-0896420ec7c5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Little Inferno',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "14900fda-f590-477c-8832-62caefa063c7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SUPERHOT',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "12bc3d42-857e-429b-a293-76a986383fdf",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Towerfall Ascension',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "844009b8-fcab-4662-a2dc-96ccaa689d04",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Into The Breach',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "b66534e9-bf66-4cea-916e-c378e351c1c6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Escapists',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "883e6be2-2513-4e8a-8627-66358744b708",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Wolf Among Us',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5e6892b3-6945-4877-be0c-fdc72f6cc5ab",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Jotun Valhalla Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "2851d330-289d-4889-9667-f682c4650b5e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rayman Legends',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "7371ae01-53e9-45b5-b554-4a8d7e7ab74d",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Bad North Jotunn Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e3c8752f-701a-4ee0-ac65-e78cb5ae0dd9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Messenger',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5511abf5-e47a-43a9-92a3-d92b010376fd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'RUINER',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e1298031-5be2-48c9-bb89-088f39dc8499",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Nuclear Throne',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e4567949-19b3-4b4e-9fdc-60be469832f6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'SOMA',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "16ec11ad-61be-49ba-9705-34cecf5ae8ef",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Costume Quest',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "7fb77cef-587b-4da2-a814-ef79ba428f4c",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Layers of Fear',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a207e587-af70-49c5-80cf-2bd1b321b7ba",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Q.U.B.E. 2',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "19110ba3-e406-4e52-9629-241442a08c27",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'observer_',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "48e0159b-18ca-4d98-8d9a-685ded1df71e",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Alan Wake\'s American Nightmare',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "c9a7f571-ec79-4879-be58-fa8c8b6ecbe8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Surviving Mars - Space Race',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e73dbf8a-5baa-489c-b52c-ea7db615b776",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Surviving Mars - Mysteries Resupply Pack',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "d93b1d40-2eba-4ee6-81c2-52fa59fee354",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Surviving Mars',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5f87ad55-764e-49ba-a986-40d96f14b478",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Minit',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "cfb6b2bf-07c8-409b-92a6-ee19933c0c77",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Everything',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5501fe94-d711-4801-8ef9-6f2f4a1adb17",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Metro: 2033 Redux',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "833730cf-9d93-477c-8f6d-776345c35513",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Batman Arkham - Trilogy',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "aa7afdb5-0ff2-4305-b487-745ea8a39d08",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Conarium',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "545baa3c-1f8c-41cc-b4c0-03872d0c6b1b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ABZU',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "91278408-bc1e-4bed-af3c-528d7bb64092",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The End is Nigh',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a1baa8f7-a47f-4607-ab1a-a36be8b18426",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Celeste',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "bbddfb2f-2609-4f97-91c8-52537a00d001",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Inside',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "094322fd-10bd-4d3d-b35d-41cb6f7bcb63",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Fez',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "cf1f1840-b699-4527-8b9f-d487bfffb6c5",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Hyper Light Drifter',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "8fb91fa8-005c-483f-971a-2aa3dbc0e8b2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Mutant Year Zero',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "45db1626-4f73-44ed-a132-c21d85882037",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'GNOG',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "dbc6262d-f80d-427b-8fb1-0ccfb0c98a24",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'For Honor Standard Edition',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "120e20ba-678e-49e3-85ae-735ee6ebc872",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Alan Wake',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "51c2c6a3-96d5-420e-acb4-0053658cb938",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'This War of Mine',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "15961e86-2f1e-4e6f-a45e-89c9b9076dfa",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Moonlighter',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "35ac61e7-1d0e-468e-a9fb-910886a209a9",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Limbo',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "8aabea3f-8208-4d77-a403-7e58f376b718",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Torchlight',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "8dec16b0-c05b-47a0-aa75-c7b3057648e0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Overcooked',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e41b6926-15b6-40c1-bf4c-63bc02b6b95a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Last Day of June',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "c0c336c1-c4e6-4636-8661-1beaa9af9a2f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rebel Galaxy',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "76d70278-1dd6-487c-957f-755d54b23739",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Enter the Gungeon',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "8c6f4618-60ae-4d42-84df-fd88b747d8ed",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Kingdom New Lands',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "5e1eebd4-d93c-431c-90bc-348861548f16",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'City of Brass',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "1860d96c-2961-4db0-a0f7-de9cf7f9c6ce",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'RiME',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e4800ccf-424b-4ad2-acf1-7df354154c85",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Stories Untold',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "738fdb85-a2f0-4372-82fc-006f9bd6999f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'World of Goo',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a8a0fab7-00a7-48bd-93cb-2abb7d6c3330",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Transistor',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "e9fc8034-babe-45de-9bcb-d8044085d950",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Witness',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "9701bd5c-af95-4723-9baf-94c27a5732e2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Oxenfree General Audience',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "a63d9cc6-1ef1-457b-9b0e-d2e9e14ff35f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Slime Rancher',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "06b99917-2455-47a6-9da0-7d8c5c9443fb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Thimbleweed Park',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "34a037c7-1b7c-4e55-9da3-efd013670f08",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Axiom Verge',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "74c2d2ce-cf5b-478c-b113-7e79a2d1414f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Jackbox Party Pack 1',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "ad12713b-0433-479e-93f5-1254549ac3bd",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'What Remains of Edith Finch',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "8054adea-c01d-4873-bdd3-e548e1c4dcdb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Super Meat Boy',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "1f680ba0-26a8-4b9e-9e84-ea371b69b6c2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Subnautica',
            logo: '',
            platforms: [EPlatform.EPIC]
        },

        {
            id: "fccdc249-8547-4fba-aec2-f8cb6065ed3f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'ANNO 1602',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "4f3b2c53-3cf3-4836-a7a4-767fc1843e51",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Assassin\'s Creed 2',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "29a77cde-aae8-4521-99fa-6739a98e703a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Assassin\'s Creed IV Black Flag',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "3003ba8e-ac9a-4e9e-913f-f8df323b13be",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Assassin\'s Creed Unity',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "c4a81928-70a3-4d1f-9a90-cf48483eb8b8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'assassin\'s creed chronicles',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "b7a1be7c-a4c9-4cca-a064-6a1b54b608c6",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'assassin\'s creed syndicate',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "fff1eb6f-376a-45c6-9871-1bc355b6590f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'child of light',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "79f01bc6-22cf-46f9-9a3f-7d286bfbc7b7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'FarCry 3',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "760831f5-1b9c-495d-82b7-d16b38cb031a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'FarCry 5',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "177ba2f4-7d89-4c38-80c9-e0dd36319dcc",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'For Honor',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "1168180f-9ea7-4278-87c2-fc9bf1149b13",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Might & Magic: Chess Royale',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "b1d50036-5557-48e6-a0ea-422b681c152f",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'rabbids coding',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "8973add8-df27-425e-bbf9-26795ecdc9a2",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'STEEP',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "03c77cde-d786-46a4-bc28-13166f153ce7",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'splinter cell conviction',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "eb694e51-569b-4f1d-a592-1c8680d606d8",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'splinter cell blacklist',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "3b98a8f9-0c67-468d-add8-70c0f66b3880",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'tom clancy\'s the division',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "74bc98ab-443a-41a3-bd5f-d06d12085873",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'tom clancy\'s the division 2',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "980f368f-404a-4d2a-82ed-de7b653cef51",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'trials rising',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "5c5627b8-840e-4773-843a-535712f13651",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'watch dogs',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "e8a6075d-e8d9-45ff-9a4a-64c65da875ab",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'watch dogs 2',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
        {
            id: "e08f4394-cd27-4df2-a157-e504009b0d51",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'rayman legends',
            logo: '',
            platforms: [EPlatform.UBISOFT]
        },
            {
            id: "49ff7d53-2f50-4d82-81b1-a8b8b6524750",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Death Stranding',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "858e57b0-d977-404a-9d68-eb0ca1d9fbc0",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'F.I.S.T.: Forged In Shadow Torch',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "76b1aa38-f3b6-4090-aef7-2e415af3b554",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Rise of the Tomb Raider: 20 Year Celebration',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "c4dede37-9a00-4da8-a09f-be0c63923955",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Worms Revolution Gold Edition',
            logo: '',
            platforms: [EPlatform.GOG]
        },
        {
            id: "2b43363b-3022-417c-b4a0-95a75fc8e17a",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Severed Steel',
            logo: '',
            platforms: [EPlatform.EPIC]
        },
        {
            id: "24df3236-e5af-413f-8667-7e2b1c432497",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Daymare: 1998',
            logo: '',
            platforms: [EPlatform.GOG]
        },
        {
            id: "24f83f8f-1434-4656-a1f0-5fb8f30febfb",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Summer of \'58',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "29b5eac9-c7a9-4957-86f8-cc99601079ed",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Yuppie Psycho',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "094c2519-9986-48de-bab4-78ac4b323cd4",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Five Nights at Freddy\'s: Security Breach',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "22bcf855-79c6-4d00-ab2a-b3c59ed6fec1",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Forest',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "a752eced-69b5-4639-99d3-783bfb23a98b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'Lust for Darkness',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
        {
            id: "26ffa89c-6043-4977-95c0-36afcbb0b76b",
            dateEdit: '2023-12-12T13:42:08.914Z',
            name: 'The Uncertain : Light at The End',
            logo: '',
            platforms: [EPlatform.STEAM]
        },
    ];

    private readonly _platforms: IPlatform[] = [
        {
            id: 1,
            name: 'Steam',
            logo: EPlatformLogo.STEAM,
            type: EPlatform.STEAM,
        },
        {
            id: 2,
            name: 'Epic Games',
            logo: EPlatformLogo.EPIC,
            type: EPlatform.EPIC,
        },
        {
            id: 3,
            name: 'Ubisoft',
            logo: EPlatformLogo.UBISOFT,
            type: EPlatform.UBISOFT,
        },
        {
            id: 4,
            name: 'GOG Galaxy',
            logo: EPlatformLogo.GOG,
            type: EPlatform.GOG,
        },
        {
            id: 5,
            name: 'Rockstar Games',
            logo: EPlatformLogo.ROCKSTAR,
            type: EPlatform.ROCKSTAR,
        },
        {
            id: 6,
            name: 'Battle.net',
            logo: EPlatformLogo.BATTLE,
            type: EPlatform.BATTLE,
        },
        {
            id: 7,
            name: 'Arc',
            logo: EPlatformLogo.ARC,
            type: EPlatform.ARC,
        },
        {
            id: 8,
            name: 'Origin',
            logo: EPlatformLogo.ORIGIN,
            type: EPlatform.ORIGIN,
        },
        {
            id: 9,
            name: 'Bethesda.net',
            logo: EPlatformLogo.BETHESDA,
            type: EPlatform.BETHESDA,
        },
        {
            id: 10,
            name: 'Local',
            logo: EPlatformLogo.LOCAL,
            type: EPlatform.LOCAL,
        }
    ];
    
    public changeGames$: BehaviorSubject<IGame[]>;
    
    public platformsObject: {[key in EPlatform]?: IPlatform} = {};

    constructor() {
        const games = this.getGamesLC();
        
        this._platforms.forEach(item => {
            this.platformsObject[item.type] = item;
        });
        
        this.changeGames$ = new BehaviorSubject(games);
    }
    
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
            'platforms': [EPlatform.STEAM],
            dateEdit: '2023-12-12T13:42:08.914Z',
        };
    }
    
    public saveGame(game: IGame): void {
        if (game) {
            const games = this.getGamesLC();
            
            games.push(game);
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }
    
    public deleteGame(game: IGame): void {
        const games = this.getGamesLC();
        
        const gameIdx: number = (() => {
            let idx = -1;
            
            games.find((item, i) => {
                if (item.id === game.id) {
                    idx = i;
                    
                    return true;
                }
                
                return false;
            });
            
            return idx;
        })();
        
        if (gameIdx !== -1) {
            games.splice(gameIdx, 1);
            this.setGamesLC(games);
            this.changeGames$.next(games);
        }
    }
    
    public getGamesLC(): IGame[] {
        const games: string = localStorage.getItem(this.keyLocalStorage) as string;
        
        if (games) {
            return JSON.parse(games) as IGame[];
        } else {
            return this._games;
        }
    }
    
    public setGameLC(game: IGame): void {
        if (game) {
            const games = this.getGamesLC();
            
            games.push(game);
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
            this.changeGames$.next(games);
        }
    }
    
    public setGamesLC(games: IGame[]): void {
        if (games && games.length) {
            localStorage.setItem(this.keyLocalStorage, JSON.stringify(games));
        }
    }
    
    public editGameCL(game: IGame): void {
        const games = this.getGamesLC();
        
        const gameIdx: number = (() => {
            let idx = -1;
            
            games.find((item, i) => {
                if (item.id === game.id) {
                    idx = i;
                    
                    return true;
                }
                
                return false;
            });
            
            return idx;
        })();
        
        if (gameIdx !== -1) {
            games[gameIdx] = game;
            
            this.setGamesLC(games);
            this.changeGames$.next(games);
        }
    }
    
    public getGameById(id: IGame['id']): IGame {
        return this.getGamesLC().find(item => item.id === id) as IGame;
    }
}
