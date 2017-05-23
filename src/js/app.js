$(() => {
  const $matchTime = $('.changing-minutes');
  const $commentaryBox = $('#commentaryBox');
  const $primaryButton = $('.primary-button');
  const $homeScore = $('.home-team .score');
  const $awayScore = $('.away-team .score');
  // const $homeTeam = $('.home-team');
  // const $awayTeam = $('.away-team');
  let teamTactics = null;

  let matchTime = 0;
  let run = false;
  let width = 50;
  let homeTeam = null;
  let awayTeam = null;
  let gameStarted = false;
  const positions = ['goalkeeper', 'defender', 'midfielder', 'striker'];

  // MATCH LOGIC
  const timerID = setInterval(function() {
    if (run ) {

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

      if (eventValue % 10 === 0) {
        handleInjury(attackingTeam, teamString);
      }

      if(true) {
        if (eventValue % 10 === 0 && awayTeam.subs < 6 && matchTime > 50) {
          const randomIndex = genRandomValue(positions.length) + 1;
          const randomPosition = positions[randomIndex];
          console.log(randomIndex);
          console.log(randomPosition);
          if (positions[randomIndex]) {
            const removePlayer = awayTeam.randomPlayerByPosition(randomPosition);
            substitute(awayTeam, removePlayer);
            const addPlayer = awayTeam.randomSubstitute(randomPosition);
            substitute(awayTeam, addPlayer);
          }
        }
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
      $('.title-message').text('Opponent selected. Now edit tactics or proceed to match.');
    }
  });

  // Starting Line Up
  $('#revealTeam').on('click', () => {
    revealTeam(teamTactics);
  });

  // Toggle yes/no playing
  $('.team-panel').on('click', (e) => {
    const selectedPlayer = e.target.id;
    choosePlayers(teamTactics, selectedPlayer);
  });

  $primaryButton.on('click', () => {
    run = !run;
    $('#match-setup, .info-message, .team-setup').hide();
    $('#match-engine, .away-team, .home-team, .timer').show();
    if (run) {
      $primaryButton.text('Pause');
      gameStarted = true;
    } else {
      $primaryButton.text('Play');
    }

  });

  $('#homeTeam').on('click', () => {
    if (run) {
      run = !run;
    }
    $primaryButton.text('Play');
    $('.match-setup, .match-engine').hide();
    $('.team-setup').show();
    setupTactics(homeTeam);
    teamTactics = homeTeam;
    revealTeam(teamTactics);

  });

  $('#awayTeam').on('click', () => {
    if (run) {
      run = !run;
    }
    $primaryButton.text('Play');
    $('.match-setup, .match-engine').hide();
    $('.team-setup').show();
    setupTactics(awayTeam);
    teamTactics = awayTeam;
    revealTeam(teamTactics);
  });

  $('.go-back').on('click', () => {
    $('.team-setup').hide();
    $('.match-setup').show();
  });

  $('.formation').on('change', (e) => {
    const newFormation = e.target.value;
    teamTactics.formation = newFormation;
    revealTeam(teamTactics);
  });

  function setupTactics(teamObject) {
    $('.team-panel').html('');
    $('.formation').val(teamObject.formation);

    teamObject.players.sort(function(a,b){
      return positions.indexOf(a.position) < positions.indexOf(b.position) ? -1 : 1;
    });

    for (let i = 0; i < teamObject.players.length; i++) {
      const player = teamObject.players[i];
      const startingEleven = player.playing ? '&#10004;' : '&#10007;';

      $('.team-panel').append(
        `<p class="player-line ${player.position}" id='${player.name}'>
        <span class="starting" id="${i}">${startingEleven}</span>
        <span class="player-position ">${player.position}</span>
        <span class="player-name">${player.name}</span>
        <span class="player-stat">${player.attack}</span>
        <span class="player-stat">${player.defence}</span>
        <span class="player-stat">${player.creativity}</span>
        <span class="player-stat">${player.defence}</span>
        </p>`
      );
    }
  }
  function pausePlay() {
    if (run) {
      run = !run;
    }

    $primaryButton.text('Play');
    $('.match-setup, .match-engine').hide();
    setupTactics(homeTeam);
    teamTactics = homeTeam;
    revealTeam(teamTactics);
    $('.team-setup').show();

  }

  function revealTeam(teamObject) {
    $('.team-display').html('');
    const formation = ['1'].concat(teamObject.formation.split('-'));

    let playerNumber = 0;
    let positionNumber = 0;

    try {
      formation.map((arrayItem) => {
        const iterations = parseFloat(arrayItem);
        let i = 0;
        while (i < iterations) {
          if (teamObject.players[playerNumber].playing) {
            const warningMessage = positions[positionNumber] !== teamObject.players[playerNumber].position ? 'warning' : '';
            $('.team-display').append(
              `<span class='player-block ${warningMessage} ${(teamObject.players[playerNumber].status)}'>${teamObject.players[playerNumber].name}</span>`
            );
            teamObject.players[playerNumber].chosenPosition = positions[positionNumber];
            i++;
          }
          console.log(playerNumber);
          playerNumber++;
        }
        $('.team-display').append('<div class="seperate-players">');
        positionNumber++;
      });
    } catch(err) {
      $('.team-display').append(`<p class='team-selection-warning seperate-players'>Less than 11 players selected!</p>`);
    }
  }

  function choosePlayers(teamObject, selectedPlayer) {
    teamObject.players[selectedPlayer].playing = !teamObject.players[selectedPlayer].playing;
    //console.log(teamObject.players[selectedPlayer].playing);
    revealTeam(teamTactics);
    if (teamObject.players[selectedPlayer].playing) {
      $(`#${selectedPlayer}`).html('&#10004;');
      if (gameStarted) {
        console.log('clicked');
        $(`#${selectedPlayer}`).parent().css({'background': 'green'});
        const playerOn = teamObject.players[selectedPlayer];
        substitute(teamObject, playerOn);
      }
    } else {
      $(`#${selectedPlayer}`).html('&#10007;');
      if (gameStarted) {
        $(`#${selectedPlayer}`).parent().css({'pointer-events': 'none', 'background': 'red'});
        const playerOff = teamObject.players[selectedPlayer];
        substitute(teamObject, playerOff);

      }
    }

  }

  // Functions -------------------------------------------------------------

  function substitute(teamObject, player) {
    if (teamObject.subs < 6) {
      if (player.playing) {
        $(`#${teamObject.place}Events`).append(`<i class='fa fa-arrow-right' style='font-size: 22px; color:red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} substituted<br/>`);
        teamObject.subs += 1;
        player.playing = false;
        player.status = 'ejected';
      } else {
        $(`#${teamObject.place}Events`).append(`<i class='fa fa-arrow-right' style='font-size: 22px; color:green; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} substituted<br/>`);
        teamObject.subs += 1;

        player.playing = true;
      }
    } else {
      alert('You have had 3 subs!');
    }
  }

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

    // Need to sort this
    const elem = document.getElementById('homeBar');

    width = (homeTeam.averagePlayerValues('creativity') / (homeTeam.averagePlayerValues('creativity') + awayTeam.averagePlayerValues('creativity')) * 100) + (Math.random() < 0.5 ? -genRandomValue(6) : genRandomValue(6));
    console.log(homeTeam.averagePlayerValues('creativity'));
    console.log(awayTeam.averagePlayerValues('creativity'));
    elem.style.width = width + '%';
  }

  function selectTeam() {
    const homeRandom =  genRandomValue(homeTeam.averagePlayerValues('creativity'));
    const awayRandom =  genRandomValue(awayTeam.averagePlayerValues('creativity'));

    if (homeRandom >= awayRandom) {
      $commentaryBox.css('background-color', homeTeam.colors[0]);
      $commentaryBox.css('color', homeTeam.colors[1]);
      if (genRandomValue(20) % 4 === 0) $commentaryBox.text(generateCommentary('chance',''));
      return [homeTeam, 'home', awayTeam];
    } else {
      $commentaryBox.css('background-color', awayTeam.colors[0]);
      $commentaryBox.css('color', awayTeam.colors[1]);
      if (genRandomValue(20) % 4 === 0) $commentaryBox.text(generateCommentary('chance',''));
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
      if (defendingPlayer.status === 'yellow') {
        $commentaryBox.css('background-color', '#FF0000');
        $commentaryBox.css('color', '#FFFFFF');

        generateCommentary('secondYellow', defendingPlayer);
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);
        defendingPlayer.status = 'injured';
        // defendingPlayer.status = 'ejected';
        // defendingPlayer.playing = false;
        if (defendingTeam.place === 'home') pausePlay();

      } else {
        $commentaryBox.css('background-color', 'yellow');
        $commentaryBox.css('color', '#000000');
        // $commentaryBox.text(`${defendingPlayer.name} gets a yellow!`);
        generateCommentary('yellow', defendingPlayer);

        // Store mesages and details in an game Object
        $(`#${team}Events`).append(`
          <i class='fa fa-square event-item' style='font-size: 24px; color: yellow; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} booked<br/>`);
        defendingPlayer.status = 'yellow';
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
      if (attackingTeam.place === 'away') {
        substitute(awayTeam, attackingPlayer);
        const addPlayer = awayTeam.randomSubstitute(attackingPlayer.position);
        substitute(awayTeam, addPlayer);
      } else if (attackingTeam.place === 'home') {
        attackingPlayer.status = 'ejected';
        attackingPlayer.playing = false;
        pausePlay();
      }
      // attackingPlayer.playing = false;

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
      bookedPlayer.status = 'yellow';
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
      generateCommentary('missedPenalty', attackingPlayer);
      $(`#${teamString}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} missed penalty<br/>`);

    }
  }

  function straightRed(defendingTeam, teamString) {
    const defendingPlayer = defendingTeam.randomPlayer();
    if (genRandomValue(defendingPlayer.discipline) < 25) {
      defendingPlayer.playing = false;
      const team = teamString === 'home' ? 'away' : 'home';
      // $commentaryBox.text('The referee gives him a straight red!');
      generateCommentary('straightRed', defendingPlayer);
      $(`#${team}Events`).append(`<i class='fa fa-square' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);
      if (defendingTeam.place === 'home') pausePlay();
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
      homeTeam.place = 'home';
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
      awayTeam.place = 'away';
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
      yellow: [`He's going in the book`, `Ouch! ${player.name} will get a yellow for that`, `That's a booking`, `It's a yellow!`, `The ref is taking his name`],
      secondYellow: [`He's already been booked...`, `That's a second yellow`, `${player.name} is shown a red!`, `${player.name} is off`],
      straightRed: [`${player.name} is shown a straight red!`, `${player.name} is off`, `The ref has given him straight red!`],
      penalty: [`The referee points to the spot`, `That's a penalty`, `${player.name} is fouled in the area`, `The ref blows his whistle. Penalty.`],
      missedPenalty: [`Saved!`, `It's over the bar`, `${player.name} has missed it!`, `Oh dear! ${player.name}'s put it wide'`],
      injury: [`${player.name}'s is going off`,`${player.name} is injured`,`${player.name} can't continue`],
      chance: [`The ball is wasted`, `Possession is sloppily given away`, `That is wasted`, `The referee pulls back play`, `The ball goes out for a throw`, `Good interception!`, `He's robbed him of possesion`]
    };
    const randomIndex = genRandomValue(commentary[scenario].length);
    const message = commentary[scenario][randomIndex];
    $commentaryBox.text(`${message}`);

  }

});
