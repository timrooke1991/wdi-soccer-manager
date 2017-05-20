const spurs = {
  id: 0,
  name: 'spurs',
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
