const spurs = {
  id: 0,
  name: 'spurs',
  colors: ['#FFFFFF', '#122B57'],
  formation: '4-4-2',
  players: [{
    name: 'Kane',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Dele Alli',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Eriksen',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Dembele',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Son',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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

const arsenal = {
  id: 1,
  name: 'arsenal',
  colors: ['#D90104','#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Giroud',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ozil',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Sanchez',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ramsey',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Walcott',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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

const manCity = {
  id: 2,
  name: 'manchester-city',
  colors: ['#98C5E9', '#00285E'],
  formation: '4-5-1',
  players: [{
    name: 'Sane',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Aguero',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Yaya Toure',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Silva',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'De Bruyne',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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

const manUnited = {
  id: 3,
  name: 'manchester-united',
  colors: ['#DD1E2A', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Rooney',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ibrahimovic',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Herrera',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Rashford',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Young',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Barkley',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mirallas',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Baines',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Coleman',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mahrez',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Drinkwater',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Ulloa',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Morgan',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Lallana',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Firmino',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Mane',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Henderson',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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

const chelsea = {
  id: 7,
  name: 'chelsea',
  colors: ['#304189', '#FFFFFF'],
  formation: '4-5-1',
  players: [{
    name: 'Costa',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Willian',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Matic',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    playing: true
  },{
    name: 'Hazard',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    playing: true
  },{
    name: 'Moses',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
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
