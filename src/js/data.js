const spurs = {
  id: 0,
  name: 'spurs',
  place: null,
  subs: 0,
  colors: ['#FFFFFF', '#122B57'],
  formation: '4-4-2',
  players: [{
    name: 'Kane',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 85,
    defence: 21,
    discipline: 80,
    creativity: 52,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Alli',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 77,
    defence: 21,
    discipline: 65,
    creativity: 63,
    fitness: 98,
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
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Dembele',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 55,
    defence: 55,
    discipline: 60,
    creativity: 45,
    fitness: 98,
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
    fitness: 98,
    status: '',
    playing: true
  }, {
    name: 'Alderweireld',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 10,
    defence: 74,
    discipline: 50,
    creativity: 8,
    fitness: 98,
    status: '',
    playing: true
  }, {
    name: 'Vertonghen',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 16,
    defence: 70,
    discipline: 60,
    creativity: 8,
    fitness: 94,
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
    fitness: 98,
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
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Rose',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 21,
    defence: 68,
    discipline: 60,
    creativity: 10,
    fitness: 98,
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
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Wanyama',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 24,
    defence: 66,
    discipline: 50,
    creativity: 18,
    fitness: 98,
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
    fitness: 98,
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
    fitness: 98,
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
    fitness: 98,
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
    creativity: 75,
    fitness: 98,
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
    fitness: 98,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const arsenal = {
  id: 1,
  name: 'arsenal',
  place: null,
  subs: 0,
  colors: ['#D90104','#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Monreal',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 14,
    defence: 62,
    discipline: 50,
    creativity: 15,
    fitness: 97,
    status: '',
    playing: true
  },{
    name: 'Giroud',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 68,
    defence: 21,
    discipline: 95,
    creativity: 45,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Ozil',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 71,
    defence: 18,
    discipline: 90,
    creativity: 72,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Sanchez',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 80,
    defence: 20,
    discipline: 90,
    creativity: 87,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Ramsey',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 53,
    defence: 45,
    discipline: 60,
    creativity: 57,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Walcott',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 61,
    defence: 38,
    discipline: 80,
    creativity: 52,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Oxlade-Chamberlain',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 61,
    defence: 38,
    discipline: 70,
    creativity: 32,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Mustafi',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 23,
    defence: 69,
    discipline: 50,
    creativity: 18,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Koscielny',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 18,
    defence: 72,
    discipline: 50,
    creativity: 5,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Cech',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 79,
    discipline: 100,
    creativity: 0,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Belerin',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 62,
    discipline: 50,
    creativity: 27,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Wilshere',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 70,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Welbeck',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  }, {
    name: 'Xhaka',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: true
  }, {
    name: 'Mertesacker',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  }, {
    name: 'Gibbs',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  }, {
    name: 'Coquelin',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const manCity = {
  id: 2,
  name: 'manchester-city',
  place: null,
  subs: 0,
  colors: ['#98C5E9', '#00285E'],
  formation: '4-5-1',
  players: [{
    name: 'Kompany',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 14,
    defence: 72,
    discipline: 50,
    creativity: 15,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Aguero',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 83,
    defence: 15,
    discipline: 80,
    creativity: 55,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Silva',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 51,
    defence: 12,
    discipline: 80,
    creativity: 65,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'De Bruyne',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 70,
    defence: 20,
    discipline: 80,
    creativity: 67,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Yaya Toure',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 59,
    defence: 45,
    discipline: 60,
    creativity: 37,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Sane',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 68,
    defence: 18,
    discipline: 80,
    creativity: 32,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Navas',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 61,
    defence: 18,
    discipline: 70,
    creativity: 42,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Fernandinho',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 18,
    defence: 69,
    discipline: 40,
    creativity: 18,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Stones',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 18,
    defence: 72,
    discipline: 50,
    creativity: 5,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Bravo',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 73,
    discipline: 100,
    creativity: 0,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Clichy',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 60,
    discipline: 50,
    creativity: 17,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Sterling',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 60,
    defence: 20,
    discipline: 70,
    creativity: 50,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Jesus',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 80,
    creativity: 40,
    fitness: 97,
    status: '',
    playing: false
  },{
    name: 'Zabeleta',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 60,
    discipline: 50,
    creativity: 27,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Otamendi',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 65,
    discipline: 50,
    creativity: 27,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Fernando',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 40,
    defence: 50,
    discipline: 70,
    creativity: 50,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Gündoğan',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 50,
    discipline: 70,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Sagna',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 25,
    defence: 50,
    discipline: 60,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    sub = sub || false;
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const manUnited = {
  id: 3,
  name: 'manchester-united',
  colors: ['#DD1E2A', '#FFFFFF'],
  place: null,
  subs: 0,
  formation: '4-4-2',
  players: [{
    name: 'De Gea',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 81,
    discipline: 100,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Valencia',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 24,
    defence: 51,
    discipline: 61,
    creativity: 11,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Bailly',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 7,
    defence: 51,
    discipline: 58,
    creativity: 3,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Shaw',
    age: 26,
    position: 'defender',
    attack: 10,
    defence: 48,
    discipline: 63,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Rojo',
    age: 26,
    position: 'defender',
    attack: 20,
    defence: 53,
    discipline: 61,
    creativity: 17,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Jones',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 43,
    discipline: 61,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Smalling',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 53,
    discipline: 71,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Pogba',
    age: 26,
    position: 'midfielder',
    attack: 63,
    defence: 58,
    discipline: 67,
    creativity: 72,
    fitness: 99,
    status: '',
    playing: true
  },{
    name: 'Mkhitaryan',
    age: 26,
    position: 'midfielder',
    attack: 58,
    defence: 32,
    discipline: 77,
    creativity: 52,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Mata',
    age: 26,
    position: 'midfielder',
    attack: 61,
    defence: 12,
    discipline: 77,
    creativity: 59,
    fitness: 94,
    status: '',
    playing: true
  },{
    name: 'Herrera',
    age: 26,
    position: 'midfielder',
    attack: 21,
    defence: 52,
    discipline: 57,
    creativity: 42,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Fellaini',
    age: 26,
    position: 'midfielder',
    attack: 41,
    defence: 42,
    discipline: 37,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Young',
    age: 26,
    position: 'midfielder',
    attack: 49,
    defence: 23,
    discipline: 80,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Carrick',
    age: 26,
    position: 'midfielder',
    attack: 35,
    defence: 48,
    discipline: 37,
    creativity: 41,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Rooney',
    age: 26,
    position: 'striker',
    attack: 61,
    defence: 8,
    discipline: 70,
    creativity: 41,
    fitness: 86,
    status: '',
    playing: false
  },{
    name: 'Martial',
    age: 26,
    position: 'striker',
    attack: 57,
    defence: 8,
    discipline: 90,
    creativity: 61,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Rashford',
    age: 26,
    position: 'striker',
    attack: 58,
    defence: 13,
    discipline: 70,
    creativity: 49,
    fitness: 99,
    status: '',
    playing: false
  },{
    name: 'Ibrahimović',
    age: 26,
    position: 'striker',
    attack: 68,
    defence: 17,
    discipline: 80,
    creativity: 49,
    fitness: 89,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const everton = {
  id: 4,
  name: 'everton',
  colors: ['#0A2C78', '#FFFFFF'],
  place: null,
  subs: 0,
  formation: '4-4-2',
  players: [{
    name: 'Stekelenburg',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 71,
    discipline: 100,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Coleman',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 34,
    defence: 57,
    discipline: 71,
    creativity: 21,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Baines',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 24,
    defence: 59,
    discipline: 58,
    creativity: 21,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Williams',
    age: 26,
    position: 'defender',
    attack: 8,
    defence: 48,
    discipline: 63,
    creativity: 5,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Holgate',
    age: 26,
    position: 'defender',
    attack: 10,
    defence: 43,
    discipline: 71,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Funes Mori',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 47,
    discipline: 61,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Jagielka',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 55,
    discipline: 71,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Barkley',
    age: 26,
    position: 'midfielder',
    attack: 63,
    defence: 32,
    discipline: 67,
    creativity: 62,
    fitness: 99,
    status: '',
    playing: true
  },{
    name: 'Davies',
    age: 26,
    position: 'midfielder',
    attack: 52,
    defence: 22,
    discipline: 77,
    creativity: 42,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Schneiderlin',
    age: 26,
    position: 'midfielder',
    attack: 51,
    defence: 22,
    discipline: 77,
    creativity: 39,
    fitness: 94,
    status: '',
    playing: true
  },{
    name: 'Barry',
    age: 26,
    position: 'midfielder',
    attack: 21,
    defence: 46,
    discipline: 57,
    creativity: 42,
    fitness: 82,
    status: '',
    playing: false
  },{
    name: 'Gueye',
    age: 26,
    position: 'midfielder',
    attack: 41,
    defence: 22,
    discipline: 67,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Besic',
    age: 26,
    position: 'midfielder',
    attack: 49,
    defence: 23,
    discipline: 80,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Mirallas',
    age: 26,
    position: 'midfielder',
    attack: 55,
    defence: 12,
    discipline: 87,
    creativity: 31,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Enner Valencia',
    age: 26,
    position: 'striker',
    attack: 53,
    defence: 2,
    discipline: 90,
    creativity: 37,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Calvert-Lewin',
    age: 26,
    position: 'striker',
    attack: 47,
    defence: 2,
    discipline: 90,
    creativity: 31,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Lookman',
    age: 26,
    position: 'striker',
    attack: 38,
    defence: 3,
    discipline: 70,
    creativity: 19,
    fitness: 99,
    status: '',
    playing: false
  },{
    name: 'Lukaku',
    age: 26,
    position: 'striker',
    attack: 71,
    defence: 17,
    discipline: 80,
    creativity: 29,
    fitness: 99,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const leicester = {
  id: 5,
  name: 'leicester',
  colors: ['#273E8A','#FFFFFF'],
  formation: '4-4-2',
  place: null,
  subs: 0,
  players: [{
    name: 'Schmeichel',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 74,
    discipline: 150,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Morgan',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 4,
    defence: 47,
    discipline: 71,
    creativity: 2,
    fitness: 78,
    status: '',
    playing: true
  },{
    name: 'Huth',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 14,
    defence: 58,
    discipline: 58,
    creativity: 11,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Fuchs',
    age: 26,
    position: 'defender',
    attack: 3,
    defence: 46,
    discipline: 63,
    creativity: 5,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Simpson',
    age: 26,
    position: 'defender',
    attack: 10,
    defence: 43,
    discipline: 71,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: ' Amartey',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 37,
    discipline: 61,
    creativity: 8,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Wasilewski',
    age: 26,
    position: 'defender',
    attack: 5,
    defence: 35,
    discipline: 71,
    creativity: 10,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Mahrez',
    age: 26,
    position: 'midfielder',
    attack: 63,
    defence: 12,
    discipline: 97,
    creativity: 67,
    fitness: 99,
    status: '',
    playing: true
  },{
    name: 'Ndidi',
    age: 26,
    position: 'midfielder',
    attack: 42,
    defence: 22,
    discipline: 67,
    creativity: 12,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Drinkwater',
    age: 26,
    position: 'midfielder',
    attack: 51,
    defence: 22,
    discipline: 77,
    creativity: 29,
    fitness: 94,
    status: '',
    playing: true
  },{
    name: 'Albrighton',
    age: 26,
    position: 'midfielder',
    attack: 41,
    defence: 16,
    discipline: 77,
    creativity: 37,
    fitness: 92,
    status: '',
    playing: false
  },{
    name: 'Gray',
    age: 26,
    position: 'midfielder',
    attack: 31,
    defence: 22,
    discipline: 77,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'King',
    age: 26,
    position: 'midfielder',
    attack: 39,
    defence: 23,
    discipline: 80,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Barnes',
    age: 26,
    position: 'midfielder',
    attack: 25,
    defence: 22,
    discipline: 87,
    creativity: 21,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Vardy',
    age: 26,
    position: 'striker',
    attack: 53,
    defence: 12,
    discipline: 80,
    creativity: 17,
    fitness: 96,
    status: '',
    playing: true
  },{
    name: 'Slimani',
    age: 26,
    position: 'striker',
    attack: 47,
    defence: 2,
    discipline: 90,
    creativity: 31,
    fitness: 96,
    status: '',
    playing: false
  },{
    name: 'Musa',
    age: 26,
    position: 'striker',
    attack: 38,
    defence: 3,
    discipline: 70,
    creativity: 19,
    fitness: 99,
    status: '',
    playing: false
  },{
    name: 'Okazaki',
    age: 26,
    position: 'striker',
    attack: 57,
    defence: 17,
    discipline: 80,
    creativity: 39,
    fitness: 99,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },
  randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const liverpool = {
  id: 6,
  name: 'liverpool',
  colors: ['#DD1E2A', '#FFFFFF'],
  place: null,
  subs: 0,
  formation: '4-4-2',
  players: [{
    name: 'Mignolet',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 72,
    discipline: 100,
    creativity: 15,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Lovren',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 12,
    defence: 58,
    discipline: 70,
    creativity: 5,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Matip',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 42,
    discipline: 70,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Clyne',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 5,
    defence: 60,
    discipline: 80,
    creativity: 17,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Moreno',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 19,
    defence: 45,
    discipline: 70,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Gomez',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 6,
    defence: 28,
    discipline: 80,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Klaven',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 6,
    defence: 28,
    discipline: 80,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Stewart',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 10,
    defence: 28,
    discipline: 70,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Henderson',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 21,
    defence: 63,
    discipline: 50,
    creativity: 22,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Lallana',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 40,
    defence: 22,
    discipline: 70,
    creativity: 35,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Coutinho',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 70,
    defence: 13,
    discipline: 90,
    creativity: 70,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Wijnaldum',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 55,
    defence: 10,
    discipline: 80,
    creativity: 47,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Emre Can',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 40,
    discipline: 70,
    creativity: 30,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Sturridge',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 62,
    defence: 8,
    discipline: 80,
    creativity: 40,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Origi',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 41,
    defence: 6,
    discipline: 90,
    creativity: 17,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Firmino',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 61,
    defence: 5,
    discipline: 90,
    creativity: 47,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Mané',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 57,
    defence: 5,
    discipline: 80,
    creativity: 50,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Milner',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 32,
    defence: 41,
    discipline: 70,
    creativity: 22,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Lucas',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 5,
    defence: 38,
    discipline: 60,
    creativity: 12,
    fitness: 98,
    status: '',
    playing: false
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    sub = sub || false;
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};

const chelsea = {
  id: 7,
  name: 'chelsea',
  colors: ['#304189', '#FFFFFF'],
  place: null,
  subs: 0,
  formation: '4-5-1',
  players: [{
    name: 'David Luiz',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 24,
    defence: 72,
    discipline: 50,
    creativity: 25,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Costa',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 76,
    defence: 15,
    discipline: 80,
    creativity: 45,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Hazard',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 73,
    defence: 10,
    discipline: 80,
    creativity: 73,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Fabregas',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 70,
    defence: 20,
    discipline: 80,
    creativity: 67,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Matic',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 9,
    defence: 55,
    discipline: 60,
    creativity: 27,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Batshuayi',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 48,
    defence: 8,
    discipline: 80,
    creativity: 32,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Pedro',
    age: 26,
    position: 'striker',
    chosenPosition: '',
    attack: 61,
    defence: 18,
    discipline: 70,
    creativity: 42,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Kante',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 8,
    defence: 69,
    discipline: 40,
    creativity: 18,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Cahill',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 18,
    defence: 62,
    discipline: 50,
    creativity: 15,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Courtois',
    age: 26,
    position: 'goalkeeper',
    chosenPosition: '',
    attack: 0,
    defence: 83,
    discipline: 100,
    creativity: 0,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Alonso',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 50,
    discipline: 50,
    creativity: 27,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Willian',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 60,
    defence: 21,
    discipline: 70,
    creativity: 50,
    fitness: 98,
    status: '',
    playing: true
  },{
    name: 'Moses',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 50,
    defence: 20,
    discipline: 80,
    creativity: 30,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Zouma',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 39,
    discipline: 60,
    creativity: 2,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Aké',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 11,
    defence: 45,
    discipline: 50,
    creativity: 7,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Loftus-Cheek',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 25,
    defence: 15,
    discipline: 70,
    creativity: 20,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Kenedy',
    age: 26,
    position: 'midfielder',
    chosenPosition: '',
    attack: 30,
    defence: 10,
    discipline: 70,
    creativity: 15,
    fitness: 98,
    status: '',
    playing: false
  },{
    name: 'Azpilicueta',
    age: 26,
    position: 'defender',
    chosenPosition: '',
    attack: 25,
    defence: 55,
    discipline: 60,
    creativity: 30,
    fitness: 98,
    status: '',
    playing: true
  }],
  averagePlayerValues(string) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing
    );
    const totalValues = arrayOfPlayersOnField.reduce(function(total, value){
      const sum = total + value[string];
      return sum;
    }, 0);
    return (totalValues / 11);
    // Update to eleven
    // Hard coded eleven so that when players are sent off team values suffer
  },randomSubstitute(position) {
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing === false && player.status !== 'ejected' && player.status !== 'subbed-off' && player.status !== 'subbed-on'
    );
    const randomIndex = (Math.floor(Math.random() * arrayOfSuitablePlayers.length));
    return arrayOfSuitablePlayers[randomIndex];
  },
  randomPlayerByPosition(position, sub) {
    sub = sub || false;
    const arrayOfSuitablePlayers = this.players.filter((player) =>
      player.position === position && player.playing && player.status !== sub
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
  },
  increaseValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] += value;
    }
  },
  reduceValues(value, attribute, arrayOfPositions) {
    const arrayOfPlayersOnField = this.players.filter((player) =>
      player.playing && arrayOfPositions.includes(player.position)
    );
    for (var i = 0; i < arrayOfPlayersOnField.length; i++) {
      arrayOfPlayersOnField[i][attribute] -= value;
    }
  }
};
