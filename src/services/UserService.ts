export interface User {
  id: string,
  guid: string,
  isActive: boolean,
  picture: string,
  age: number,
  gender: string,
  company: string,
  email: string,
  phone: string,
  address: string,
  name: string,
  about: string,
  tags: Array<string>,
}

const usersData: User[] = [
  {
    "id": "60e1c68c6957ef7af5930734",
    "guid": "e3911598-e2a9-48f0-abbe-098d37d24f98",
    "isActive": false,
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "name": "Lester Parks",
    "gender": "male",
    "company": "WARETEL",
    "email": "lesterparks@waretel.com",
    "phone": "+1 (902) 474-2578",
    "address": "456 Kensington Street, Stockwell, Hawaii, 756",
    "about": "Amet pariatur aliqua do nostrud consectetur fugiat duis qui veniam. Labore laboris deserunt laboris elit dolor ut occaecat occaecat nisi ut eu tempor voluptate sunt. Proident do ea adipisicing ea Lorem est laborum dolor adipisicing adipisicing non. Ad velit amet pariatur incididunt quis aute consectetur velit nisi elit non consectetur. Commodo sint id fugiat sit eiusmod sit qui anim cupidatat reprehenderit commodo velit. Ad est ullamco ut do occaecat.\r\n",
    "tags": [
      "dolore",
      "in",
      "dolore",
      "incididunt",
      "sit",
      "fugiat",
      "dolor"
    ],
  },
  {
    "id": "60e1c68cdace095c757817fe",
    "guid": "d5aa0784-d0c9-40e0-a1b9-9157dbfdea66",
    "isActive": false,
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "name": "Ross Levine",
    "gender": "male",
    "company": "HINWAY",
    "email": "rosslevine@hinway.com",
    "phone": "+1 (934) 470-3674",
    "address": "264 Wythe Avenue, Sanford, Oklahoma, 3682",
    "about": "Et Lorem esse elit deserunt voluptate consequat laboris in deserunt occaecat. Sit consequat nostrud dolor anim amet in sunt qui voluptate elit eiusmod ipsum. Lorem anim voluptate enim do anim dolore ex culpa est excepteur et proident laborum quis. Deserunt magna nulla dolor aliquip velit sint irure aute. Dolore proident do proident magna. Veniam est dolor esse do eiusmod aliquip mollit deserunt non deserunt eiusmod. Labore cillum aliqua exercitation amet culpa officia.\r\n",
    "tags": [
      "amet",
      "laboris",
      "pariatur",
      "incididunt",
      "laboris",
      "quis",
      "quis"
    ],
  },
  {
    "id": "60e1c68cc964add9422e2022",
    "guid": "4cc58762-bf9a-4435-a096-f6e1aec6fc2e",
    "isActive": false,
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "name": "Helen Justice",
    "gender": "female",
    "company": "LETPRO",
    "email": "helenjustice@letpro.com",
    "phone": "+1 (924) 491-2596",
    "address": "153 Martense Street, Gardiner, Illinois, 6237",
    "about": "Velit adipisicing amet cupidatat laboris amet aliquip. Pariatur eiusmod excepteur cillum velit id eiusmod sit reprehenderit do ut est Lorem enim. Cillum ea quis elit tempor elit ipsum elit aliquip aliquip nisi. Ut id Lorem ea Lorem. Quis magna voluptate est Lorem amet proident.\r\n",
    "tags": [
      "Lorem",
      "proident",
      "est",
      "enim",
      "sit",
      "nostrud",
      "minim"
    ],
  },
  {
    "id": "60e1c68c1aa27f75e2ca5904",
    "guid": "b5b6ae11-b4a8-413e-9964-1da97b16f76e",
    "isActive": true,
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "name": "Gilliam Bridges",
    "gender": "male",
    "company": "KLUGGER",
    "email": "gilliambridges@klugger.com",
    "phone": "+1 (995) 433-3825",
    "address": "856 Amersfort Place, Rosburg, Colorado, 3057",
    "about": "Elit tempor cupidatat aute adipisicing proident voluptate cupidatat occaecat. Nostrud cupidatat voluptate sunt reprehenderit excepteur. Magna irure exercitation sunt do. Non et proident occaecat in elit id. Culpa consectetur laboris irure exercitation consequat. Voluptate irure dolor ex dolore ea laboris amet qui reprehenderit duis eu ea qui. Pariatur pariatur reprehenderit tempor qui magna incididunt.\r\n",
    "tags": [
      "officia",
      "proident",
      "excepteur",
      "aliquip",
      "quis",
      "laboris",
      "fugiat"
    ],
  },
  {
    "id": "60e1c68c723f5de2a4ef7e9b",
    "guid": "043afc1c-a128-4612-a36f-dd448426caf5",
    "isActive": false,
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "name": "Hooper Holcomb",
    "gender": "male",
    "company": "ROCKABYE",
    "email": "hooperholcomb@rockabye.com",
    "phone": "+1 (923) 468-3409",
    "address": "711 Main Street, Wheaton, Idaho, 4556",
    "about": "Ad nisi consectetur consequat veniam sit est labore. Nulla id sunt aute excepteur dolore pariatur nisi consectetur adipisicing fugiat aliqua et. Deserunt sit exercitation eu id aute excepteur reprehenderit aute sunt et consequat ut.\r\n",
    "tags": [
      "pariatur",
      "do",
      "aliqua",
      "sit",
      "laborum",
      "ipsum",
      "laborum"
    ],
  },
  {
    "id": "60e1c68cee3e0e4d9a317c14",
    "guid": "3df48b1f-e347-4739-a11e-2bbd58f02616",
    "isActive": true,
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "name": "May Parks",
    "gender": "male",
    "company": "TROPOLIS",
    "email": "maypena@tropolis.com",
    "phone": "+1 (979) 509-3249",
    "address": "810 Lester Court, Muir, New Mexico, 4974",
    "about": "Deserunt ex in proident laboris nisi elit. Reprehenderit sint exercitation laborum sint qui et proident ex tempor Lorem. Laborum aute adipisicing eiusmod reprehenderit velit. Dolore consequat quis exercitation duis laborum esse minim sunt sunt. Dolor cillum cillum ullamco commodo non nostrud adipisicing fugiat reprehenderit qui labore officia ea. Aliqua in adipisicing pariatur occaecat eiusmod id Lorem ea officia.\r\n",
    "tags": [
      "dolore",
      "minim",
      "minim",
      "quis",
      "laboris",
      "aliqua",
      "proident"
    ],
  }
]

export function listUsers(): Promise<User[]> {
  return new Promise(resolve => setTimeout(() =>
    resolve(usersData), 1500));
}

export function getUser(userId: String): Promise<User> {
  return new Promise<User>(resolve => setTimeout(() =>
    resolve(usersData.filter(user => user.id === userId)[0]), 1500));
}
