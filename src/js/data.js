const spurs = {
  id: 0,
  name: 'spurs',
  colors: ['#FFFFFF', '#122B57'],
  formation: '4-4-2',
  players: [{
    name: 'Kane',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 91,
    defence: 21,
    discipline: 80,
    creativity: 42,
    status: '',
    playing: true
  },{
    name: 'Alli',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 84,
    defence: 21,
    discipline: 65,
    creativity: 63,
    status: '',
    playing: true
  },{
    name: 'Eriksen',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 67,
    defence: 20,
    discipline: 80,
    creativity: 73,
    status: '',
    playing: true
  },{
    name: 'Dembele',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 55,
    defence: 50,
    discipline: 60,
    creativity: 45,
    status: '',
    playing: true
  },{
    name: 'Son',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 74,
    defence: 25,
    discipline: 80,
    creativity: 60,
    status: '',
    playing: true
  }, {
    name: 'Alderweirald',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 10,
    defence: 84,
    discipline: 50,
    creativity: 8,
    status: '',
    playing: true
  },{
    name: 'Walker',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 22,
    defence: 65,
    discipline: 50,
    creativity: 28,
    status: '',
    playing: true
  },{
    name: 'Lloris',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 1,
    defence: 87,
    discipline: 100,
    creativity: 6,
    status: '',
    playing: true
  },{
    name: 'Rose',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 51,
    defence: 68,
    discipline: 60,
    creativity: 10,
    status: '',
    playing: true
  },{
    name: 'Dier',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 31,
    defence: 60,
    discipline: 55,
    creativity: 34,
    status: '',
    playing: true
  },{
    name: 'Wanyama',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 24,
    defence: 66,
    discipline: 50,
    creativity: 18,
    status: '',
    playing: true
  },{
    name: 'Janssen',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 61,
    defence: 13,
    discipline: 80,
    creativity: 20,
    status: '',
    playing: false
  },{
    name: 'Trippier',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 20,
    defence: 50,
    discipline: 40,
    creativity: 15,
    status: '',
    playing: false
  },{
    name: 'Winks',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    status: '',
    playing: false
  },{
    name: 'Lamela',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 62,
    defence: 10,
    discipline: 70,
    creativity: 65,
    status: '',
    playing: false
  },{
    name: 'Wimmer',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 10,
    defence: 53,
    discipline: 50,
    creativity: 10,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomPlayerByPosition(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayer() {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfPlayersOnField.length));
    return arrayOfPlayersOnField[randomIndex];
  }

};

const arsenal = {
  id: 1,
  name: 'arsenal',
  colors: ['#D90104','#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Monreal',
    age: 26,
    position: 'defender',
    attack: 14,
    defence: 62,
    discipline: 50,
    creativity: 15,
    status: '',
    playing: true
  },{
    name: 'Giroud',
    age: 26,
    position: 'striker',
    attack: 68,
    defence: 21,
    discipline: 95,
    creativity: 45,
    status: '',
    playing: true
  },{
    name: 'Ozil',
    age: 26,
    position: 'midfielder',
    attack: 71,
    defence: 18,
    discipline: 90,
    creativity: 72,
    status: '',
    playing: true
  },{
    name: 'Sanchez',
    age: 26,
    position: 'striker',
    attack: 80,
    defence: 20,
    discipline: 90,
    creativity: 87,
    status: '',
    playing: true
  },{
    name: 'Ramsey',
    age: 26,
    position: 'midfielder',
    attack: 53,
    defence: 45,
    discipline: 60,
    creativity: 57,
    status: '',
    playing: true
  },{
    name: 'Walcott',
    age: 26,
    position: 'striker',
    attack: 61,
    defence: 38,
    discipline: 80,
    creativity: 52,
    status: '',
    playing: true
  },{
    name: 'Oxlade-Chamberlain',
    age: 26,
    position: 'midfielder',
    attack: 61,
    defence: 38,
    discipline: 70,
    creativity: 32,
    status: '',
    playing: true
  },{
    name: 'Mustafi',
    age: 26,
    position: 'midfielder',
    attack: 23,
    defence: 69,
    discipline: 50,
    creativity: 18,
    status: '',
    playing: true
  },{
    name: 'Koscielny',
    age: 26,
    position: 'defender',
    attack: 18,
    defence: 72,
    discipline: 50,
    creativity: 5,
    status: '',
    playing: true
  },{
    name: 'Cech',
    age: 26,
    position: 'goalkeeper',
    attack: 0,
    defence: 81,
    discipline: 100,
    creativity: 0,
    status: '',
    playing: true
  },{
    name: 'Belerin',
    age: 26,
    position: 'defender',
    attack: 11,
    defence: 62,
    discipline: 50,
    creativity: 27,
    status: '',
    playing: true
  },{
    name: 'Wilshere',
    age: 26,
    position: 'midfielder',
    attack: 50,
    defence: 50,
    discipline: 70,
    creativity: 10,
    status: '',
    playing: false
  },{
    name: 'Welbeck',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomPlayerByPosition(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayer() {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfPlayersOnField.length));
    return arrayOfPlayersOnField[randomIndex];
  }
};

const manCity = {
  id: 2,
  name: 'manchester-city',
  colors: ['#98C5E9', '#00285E'],
  formation: '4-5-1',
  players: [{
    name: 'Kompany',
    age: 26,
    position: 'defender',
    attack: 14,
    defence: 72,
    discipline: 50,
    creativity: 15,
    status: '',
    playing: true
  },{
    name: 'Aguero',
    age: 26,
    position: 'striker',
    attack: 83,
    defence: 15,
    discipline: 80,
    creativity: 55,
    status: '',
    playing: true
  },{
    name: 'Silva',
    age: 26,
    position: 'midfielder',
    attack: 71,
    defence: 12,
    discipline: 80,
    creativity: 72,
    status: '',
    playing: true
  },{
    name: 'De Bruyne',
    age: 26,
    position: 'midfielder',
    attack: 80,
    defence: 20,
    discipline: 80,
    creativity: 87,
    status: '',
    playing: true
  },{
    name: 'Yaya Toure',
    age: 26,
    position: 'midfielder',
    attack: 59,
    defence: 45,
    discipline: 60,
    creativity: 57,
    status: '',
    playing: true
  },{
    name: 'Sane',
    age: 26,
    position: 'striker',
    attack: 68,
    defence: 18,
    discipline: 80,
    creativity: 52,
    status: '',
    playing: true
  },{
    name: 'Navas',
    age: 26,
    position: 'midfielder',
    attack: 61,
    defence: 18,
    discipline: 70,
    creativity: 42,
    status: '',
    playing: true
  },{
    name: 'Fernandinho',
    age: 26,
    position: 'midfielder',
    attack: 18,
    defence: 69,
    discipline: 40,
    creativity: 18,
    status: '',
    playing: true
  },{
    name: 'Stones',
    age: 26,
    position: 'defender',
    attack: 18,
    defence: 72,
    discipline: 50,
    creativity: 15,
    status: '',
    playing: true
  },{
    name: 'Bravo',
    age: 26,
    position: 'goalkeeper',
    attack: 0,
    defence: 73,
    discipline: 100,
    creativity: 0,
    status: '',
    playing: true
  },{
    name: 'Clichy',
    age: 26,
    position: 'defender',
    attack: 11,
    defence: 60,
    discipline: 50,
    creativity: 27,
    status: '',
    playing: true
  },{
    name: 'Sterling',
    age: 26,
    position: 'midfielder',
    attack: 70,
    defence: 20,
    discipline: 70,
    creativity: 50,
    status: '',
    playing: false
  },{
    name: 'Jesus',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomPlayerByPosition(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayer() {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfPlayersOnField.length));
    return arrayOfPlayersOnField[randomIndex];
  }
};

const manUnited = {
  id: 3,
  name: 'manchester-united',
  colors: ['#DD1E2A', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Rooney',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ibrahimovic',
    age: 26,
    position: 'striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Herrera',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Rashford',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Young',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    // this[string] = totalValues / 5;
    return (totalValues / 5);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  }
};

const everton = {
  id: 4,
  name: 'everton',
  colors: ['#0A2C78', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Lukaku',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Barkley',
    age: 26,
    position: 'striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mirallas',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Baines',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Coleman',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    // this[string] = totalValues / 5;
    return (totalValues / 5);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  }
};

const leicester = {
  id: 5,
  name: 'leicester',
  colors: ['#273E8A','#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Vardy',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mahrez',
    age: 26,
    position: 'striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Drinkwater',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ulloa',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Morgan',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    // this[string] = totalValues / 5;
    return (totalValues / 5);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  }
};

const liverpool = {
  id: 7,
  name: 'liverpool',
  colors: ['#E31B23', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Sturridge',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Lallana',
    age: 26,
    position: 'striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Firmino',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mane',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Henderson',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    // this[string] = totalValues / 5;
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  }
};

const chelsea = {
  id: 7,
  name: 'chelsea',
  colors: ['#304189', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Costa',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Willian',
    age: 26,
    position: 'striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Matic',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Hazard',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Moses',
    age: 26,
    position: 'striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const totalValues = this.players.reduce(function(total, value){
      var sum = total + value[string];
      return sum;
    }, 0);
    // this[string] = totalValues / 5;
    return (totalValues / 5);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  }
};
