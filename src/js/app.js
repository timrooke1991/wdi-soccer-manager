$(() => {
  const $matchTime = $('.changing-minutes');
  const $commentaryBox = $('#commentaryBox');
  const $primaryButton = $('.primary-button');
  const $homeScore = $('.home-team .score');
  const $awayScore = $('.away-team .score');
  // const $homeTeam = $('.home-team');
  // const $awayTeam = $('.away-team');


  let matchTime = 0;
  let run = false;
  let width = 50;
  let homeTeam = null;
  let awayTeam = null;


  // MATCH LOGIC
  const timerID = setInterval(function() {
    if (run) {

      const eventValue = genRandomValue(100) + 1;
      console.log(`${matchTime}: ${eventValue}`);

      // Creativity SumCreativity vs. SumCreativity
      const [attackingTeam, teamString, defendingTeam] = selectTeam();

      // const chosenPlayer = selectPlayer(teamObject);
      // console.log(chosenPlayer);
      // Who has the event?
      if (eventValue % 18 === 0) {
        // Random (Striker, Midfielder) vs. Goalkeeper > RandTheirAttack vs. RandGoalkeeper
        goalChance(attackingTeam, teamString, defendingTeam);
      }

      if (eventValue % 80 === 0) {
        // Striker vs. Goalkeeper > RandTheirAttack vs. RandGoalkeeperPenalty
        handlePenalty(attackingTeam, teamString, defendingTeam);
      }
      //
      if (eventValue % 90 === 0) {
        // Random Player => Discipline > random
        straightRed(defendingTeam, teamString);
      }
      //
      if (eventValue % 22 === 0) {
        // Striker vs. Goalkeeper > RandTheirFreekick vs. RandGoalkeeperPenalty
        handleFreekick(attackingTeam, teamString, defendingTeam);
      }

      if (eventValue % 14 === 0) {
        // RandomPlayer => discipline + matchtime rand vs. random
        handleDiscipline(attackingTeam, teamString, defendingTeam);
      }

      if (eventValue % 60 === 0) {
        handleInjury(attackingTeam, teamString);
      }

      // Reduce Fitness
      move();
      timeControl();
    }
  },200);

  // Event Listeners -------------------------------------------------------------
  // Team selection
  $('.team-input').on('click', (e) => {
    const userTeam = e.target.innerHTML;
    if (homeTeam === null) {
      configTeam(homeTeam, userTeam);
      console.log('homeTeam now selected!');
      $('.title-message').text('Home team chosen. Now chose your opponent.');
      // e.addClass('selected');
    } else {
      configTeam(awayTeam, userTeam);
      console.log('awayTeam now selected!');
      $('#match-setup, .info-message').hide();
      $('#match-engine, .away-team, .home-team, .timer').show();
    }
  });

  // Starting Line Up
  $('#revealTeam').on('click', () => {
    $('.team-display').html('');
    const formation = ['1'].concat(homeTeam.formation.split('-'));
    const positions = ['goalkeeper', 'defender', 'midfielder', 'striker'];
    let playerNumber = 0;
    let positionNumber = 0;

    try {
      formation.map((arrayItem) => {
        const iterations = parseFloat(arrayItem);
        let i = 0;
        while (i < iterations) {
          if (homeTeam.players[playerNumber].playing) {
            $('.team-display').append(`<p>${positions[positionNumber]}: ${homeTeam.players[playerNumber].name}</p>`);
            homeTeam.players[playerNumber].chosenPosition = positions[positionNumber];
            i++;
          }
          console.log(playerNumber);
          playerNumber++;
        }
        $('.team-display').append('<hr>');
        positionNumber++;
      });
    } catch(err) {
      alert('Select 11 players!');
    }
  });

  $('.player-selection-box button').on('click', () => {
    $('.team-panel').html('');

    const positions = ['goalkeeper', 'defender', 'midfielder', 'striker'];
    homeTeam.players.sort(function(a,b){
      return positions.indexOf(a.position) < positions.indexOf(b.position) ? -1 : 1;
    });

    for (let i = 0; i < homeTeam.players.length; i++) {
      const player = homeTeam.players[i];
      const startingEleven = player.playing ? '&#10004;' : '&#10007;';

      $('.team-panel').append(
        `<p class="player-line" id='${player.name}'>
          <span class="starting" id="${i}">${startingEleven}</span>
          <span class="player-name">${player.position} ${player.name}</span>
          <span class="player-stat">${player.attack}</span>
          <span class="player-stat">${player.defence}</span>
        </p>`
      );
    }
  });






  // Toggle yes/no playing
  $('.team-panel').on('click', (e) => {
    const selectedPlayer = e.target.id;
    homeTeam.players[selectedPlayer].playing = !homeTeam.players[selectedPlayer].playing;
    console.log(homeTeam.players[selectedPlayer].playing);
    homeTeam.players[selectedPlayer].playing ? $(`#${selectedPlayer}`).html('&#10004;') : $(`#${selectedPlayer}`).html('&#10007;');

  });

  $primaryButton.on('click', () => {
    run = !run;
    run ? $primaryButton.text('Pause') : $primaryButton.text('Play');
  });

  $('.select-btn').on('click', () => {
    $('.match-setup').hide();
    $('.team-setup').show();
  });

  // Functions -------------------------------------------------------------

  function timeControl() {

    if(matchTime === 44) {
      $commentaryBox.text(`That's half-time!`);
      run = !run;
      $primaryButton.text('Play');
    }

    if(matchTime === 90) {
      $commentaryBox.text(`That's full-time!`);
      clearInterval(timerID);
      $primaryButton.text('Finish');
    } else {
      matchTime++;
      $matchTime.text(matchTime);
    }

  }

  function genRandomValue(value) {
    return (Math.floor(Math.random() * value));
  }

  function move() {
    const elem = document.getElementById('homeBar');
    width = homeTeam.averagePlayerValues('attack') + genRandomValue(10);
    elem.style.width = width + '%';
  }

  function selectTeam() {
    const homeRandom =  genRandomValue(homeTeam.averagePlayerValues('creativity'));
    const awayRandom =  genRandomValue(awayTeam.averagePlayerValues('creativity'));

    if (homeRandom >= awayRandom) {
      $commentaryBox.css('background-color', homeTeam.colors[0]);
      $commentaryBox.css('color', homeTeam.colors[1]);
      $commentaryBox.text('The home team launch an attack');
      return [homeTeam, 'home', awayTeam];
    } else {
      $commentaryBox.css('background-color', awayTeam.colors[0]);
      $commentaryBox.css('color', awayTeam.colors[1]);
      $commentaryBox.text('The away are attacking');
      return [awayTeam, 'away', homeTeam];
    }
  }

  function selectPlayer(team) {
    const genRandomIndex = Math.floor(Math.random() * team.players.length);
    return team.players[genRandomIndex];
  }

  function goalChance(attackingTeam, teamString, defendingTeam) {
    // Refactor this
    let score = null;
    let getScore = null;
    const attackingPlayer = attackingTeam.randomPlayer();
    const defendingPlayer = defendingTeam.randomPlayerByPosition('defender');

    if (genRandomValue(attackingPlayer.attack) > genRandomValue(defendingPlayer.defence)) {
      if (teamString === 'home') {
        getScore = $homeScore.text();
        score = parseFloat(getScore) + 1;
        $homeScore.text(score);
      } else {
        getScore = $awayScore.text();
        score = parseFloat(getScore) + 1;
        $awayScore.text(score);
      }
      //$commentaryBox.text(`Goal!`);
      generateCommentary('goal', attackingPlayer);

      $(`#${teamString}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scored<br/>`);
    }
  }

  function handleDiscipline(attackingTeam, teamString, defendingTeam) {
    console.log('YELLOW');
    const defendingPlayer = defendingTeam.randomPlayer();
    const team = teamString === 'home' ? 'away' : 'home';
    if ((genRandomValue(defendingPlayer.discipline) + (100-matchTime)) < 90) {
      // Already booked? Send him off!
      if (defendingPlayer.status === 'Yellow') {
        $commentaryBox.css('background-color', '#FF0000');
        $commentaryBox.css('color', '#FFFFFF');
        // Store mesages and details in an game Object
        // $commentaryBox.text(`${defendingPlayer.name} gets a red!`);
        generateCommentary('secondYellow', defendingPlayer)
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);

        defendingPlayer.status = 'Ejected';
        defendingPlayer.playing = false;

      } else {
        $commentaryBox.css('background-color', 'yellow');
        $commentaryBox.css('color', '#000000');
        // $commentaryBox.text(`${defendingPlayer.name} gets a yellow!`);
        generateCommentary('yellow', defendingPlayer)

        // Store mesages and details in an game Object
        $(`#${team}Events`).append(`
          <i class='fa fa-square event-item' style='font-size: 24px; color: yellow; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} booked<br/>`);

        defendingPlayer.status = 'Yellow';
      }
    }
  }

  function handleInjury(attackingTeam, teamString) {
    const attackingPlayer = attackingTeam.randomPlayer();
    // THERE COULD BE AN INJURY
    if (genRandomValue(101) % 8 === 0) {
      // $commentaryBox.text(`${attackingPlayer.name} gets taken off on a stretcher!`);
      generateCommentary('injury', attackingPlayer);
      $(`#${teamString}Events`).append(`<i class='fa fa-plus' style='font-size: 26px; color: green; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} injured<br/>`);
      attackingPlayer.playing = false;
    } else {
      $commentaryBox.text(`${attackingPlayer.name}'s limping, but he'll be okay`);
    }

  }

  function handleFreekick(attackingTeam, teamString, defendingTeam) {
    const attackingPlayer = attackingTeam.randomPlayerByPosition('midfielder');
    const defendingValue = (defendingTeam.randomPlayerByPosition('goalkeeper').defence + defendingTeam.averagePlayerValues('defender'));

    if (attackingPlayer.attack > defendingValue) {
      // Refactor this
      let score = null;
      let getScore = null;
      if (teamString === 'home') {
        getScore = $homeScore.text();
        score = parseFloat(getScore) + 1;
        $homeScore.text(score);
      } else {
        getScore = $awayScore.text();
        score = parseFloat(getScore) + 1;
        $awayScore.text(score);
      }

      //$commentaryBox.text(`It's a wonder goal! Goal!`);
      generateCommentary('freekick', attackingPlayer);
      $(`#${teamString}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scored<br/>`);

    } else {
      generateCommentary('wastedFreekick', attackingPlayer);
    }
  }
  function handlePenalty(attackingTeam, teamString, defendingTeam) {

    const attackingPlayer = attackingTeam.randomPlayerByPosition('striker');
    const defendingPlayer = defendingTeam.randomPlayerByPosition('goalkeeper');
    const bookedPlayer = defendingTeam.randomPlayerByPosition('defender');
    const team = teamString === 'home' ? 'away' : 'home';
    // Book the player?
    if (genRandomValue(100) > 25) {
      // console.log('here');
      bookedPlayer.status = 'Yellow';
      $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: yellow; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${bookedPlayer.name} booked<br/>`);
    }

    if ((genRandomValue(attackingPlayer.attack)*2) > genRandomValue(defendingPlayer.defence)) {

      let score = null;
      let getScore = null;
      if (teamString === 'home') {
        getScore = $homeScore.text();
        score = parseFloat(getScore) + 1;
        $homeScore.text(score);
      } else {
        getScore = $awayScore.text();
        score = parseFloat(getScore) + 1;
        $awayScore.text(score);
      }

      // $commentaryBox.text(`${attackingPlayer.name}'s clinical from the spot! Goal!`);
      generateCommentary('penalty', attackingPlayer);
      $(`#${teamString}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scores penalty<br/>`);

    } else {
      $commentaryBox.text(`He's missed it! The pressure has got to him`);
      $(`#${teamString}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} missed penalty<br/>`);

    }
  }

  function straightRed(defendingTeam, teamString) {
    const defendingPlayer = defendingTeam.randomPlayer();
    if (genRandomValue(defendingPlayer.discipline) > 75) {
      defendingPlayer.playing = false;
      const team = teamString === 'home' ? 'away' : 'home';
      // $commentaryBox.text('The referee gives him a straight red!');
      generateCommentary('straightRed', defendingPlayer);
      $(`#${team}Events`).append(`<i class='fa fa-square' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);
    }
  }

  function configTeam(team, selector) {
    if (homeTeam === null) {
      $('.home-team  .team-name').text(selector);
      switch (selector) {
        case 'Tottenham':
          homeTeam = spurs;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Man United':
          homeTeam = manUnited;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Liverpool':
          homeTeam = liverpool;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Man City':
          homeTeam = manCity;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Everton':
          homeTeam = everton;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Chelsea':
          homeTeam = chelsea;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Leicester':
          homeTeam = leicester;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
        case 'Arsenal':
          homeTeam = arsenal;
          $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
          $('.home-team').css('color', homeTeam.colors[1]);
          break;
      }
      console.log(homeTeam);
    } else {

      $('.away-team .team-name').text(selector);

      switch (selector) {
        case 'Tottenham':
          awayTeam = spurs;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Man United':
          awayTeam = manUnited;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Liverpool':
          awayTeam = liverpool;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Man City':
          awayTeam = manCity;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Everton':
          awayTeam = everton;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Chelsea':
          awayTeam = chelsea;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Leicester':
          awayTeam = leicester;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
        case 'Arsenal':
          awayTeam = arsenal;
          $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
          $('.away-team').css('color', awayTeam.colors[1]);
          break;
      }
      console.log(awayTeam);
    }

    console.log(selector);
    // Pass in the object values to homeTeam
  }

  function generateCommentary(scenario, player) {
    const commentary = {
      goal: ['Goal!', 'He\'s scored!', `That's a great finish!`, `What a goal by ${player.name}`, `${player.name} finishes off the move!`],
      freekick: [`It's a freekick`, `${player.name} to take the freekick`, `He lines up the freekick`, `This is a chance to get a cross in`],
      wastedFreekick: [`${player.name} loses possession`, `That's ended up in row Z`, `The attack amounts to nothing`, `${player.name} has wasted that opportunity`, `${player.name}'s effort goes over the bar`, `He hands back possession to the other team`],
      yellow: [`He's going in the book`, `Ouch! ${player.name}'ll a yellow for that`, `That's a booking`, `It's a yellow!`, `The ref is taking his name`],
      secondYellow: [`He's already been booked...`, `That's a second yellow`, `${player.name} is shown a red!`, `${player.name} is off`],
      straightRed: [`${player.name} is shown a straight red!`, `${player.name} is off`, `The ref has given him straight red!`],
      penalty: [`The referee points to the spot`, `That's a penalty`, `${player.name} is fouled in the area`, `The ref blows his whistle. Penalty.`],
      injury: [`${player.name}'s is going off`,`${player.name} is injured`,`${player.name} can't continue`]
    };
    const randomeIndex = genRandomValue(commentary[scenario].length);
    const message = commentary[scenario][randomeIndex];
    $commentaryBox.text(`${message}`);

  }

});
