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
    eligible: false
  },{
    name: 'Dele Alli',
    age: 26,
    position: 'Striker',
    attack: 100,
    defence: 50,
    discipline: 80,
    status: '',
    eligible: false
  },{
    name: 'Eriksen',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 80,
    status: '',
    eligible: false
  },{
    name: 'Dembele',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 0,
    discipline: 0,
    status: '',
    eligible: false
  },{
    name: 'Son',
    age: 26,
    position: 'Striker',
    attack: 50,
    defence: 50,
    discipline: 10,
    status: '',
    eligible: false
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
