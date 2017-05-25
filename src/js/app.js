$(() => {
  const $matchTime = $('.changing-minutes');
  const $commentaryBox = $('#commentaryBox');
  const $primaryButton = $('.primary-button');
  const $homeScore = $('.home-team .score');
  const $awayScore = $('.away-team .score');

  let teamTactics = null;
  let matchTime = 0;
  let run = false;
  let width = 50;
  let homeTeam = null;
  let awayTeam = null;
  let gameStarted = false;
  let cpuMode = true;
  const positions = ['goalkeeper', 'defender', 'midfielder', 'striker'];

  // MATCH LOGIC

  const timerID = setInterval(function() {
    if (run) {
      const eventValue = genRandomValue(100) + 1;
      console.log(`${matchTime}: ${eventValue}`);

      // Random(Average Team Creativity) + Fitness => Higher score determines the attacking team
      const [attackingTeam, defendingTeam] = selectTeam();

      // Style commentaryBox in attacking team colors, increase players attacking and creativity values
      setupEvent(attackingTeam);

      if (eventValue % 17 === 0) {
        // Random (Striker, Midfielder) vs. Goalkeeper > RandTheirAttack vs. RandGoalkeeper
        goalChance(attackingTeam, defendingTeam);
        attackingTeam.increaseValues(genRandomValue(5),'attack',['midfielder', 'striker']);
        attackingTeam.increaseValues(genRandomValue(5),'creativity',['midfielder', 'striker']);
        defendingTeam.reduceValues(genRandomValue(5),'defence',['midfielder', 'defender', 'goalkeeper']);
      }

      if (eventValue % (genRandomValue(30) + 90) === 0) {
        // Striker vs. Goalkeeper > RandTheirAttack vs. RandGoalkeeperPenalty
        handlePenalty(attackingTeam, defendingTeam);
        defendingTeam.reduceValues(genRandomValue(10),'defence',['midfielder', 'defender', 'goalkeeper']);
      }

      if (eventValue % 90 === 0) {
        // Random Player => Discipline > random
        straightRed(defendingTeam);
        defendingTeam.reduceValues(25,'defence',['striker','midfielder', 'defender', 'goalkeeper']);
        defendingTeam.reduceValues(25,'attack',['striker','midfielder', 'defender', 'goalkeeper']);
        defendingTeam.reduceValues(25,'creativity',['striker','midfielder', 'defender', 'goalkeeper']);
      }
      //
      if (eventValue % 22 === 0) {
        // Striker vs. Goalkeeper > RandTheirFreekick vs. RandGoalkeeperPenalty
        handleFreekick(attackingTeam, defendingTeam);
        attackingTeam.increaseValues(5,'attack',['midfielder', 'striker']);
        attackingTeam.increaseValues(5,'creativity',['midfielder', 'striker']);
      }

      if (eventValue % 18 === 0) {
        // RandomPlayer => discipline + matchtime rand vs. random
        handleDiscipline(attackingTeam, defendingTeam);
      }

      if (eventValue % 25 === 0) {
        handleInjury(attackingTeam);
        defendingTeam.reduceValues(3,'creativity',['striker','midfielder', 'defender', 'goalkeeper']);
      }

      // If playing CPU mode, auto generate substituitons
      if(cpuMode) {
        if (eventValue % 10 === 0 && awayTeam.subs < 6 && matchTime > 50) {
          const [chosenPosition] = randomPosition();
          const removePlayer = awayTeam.randomPlayerByPosition(chosenPosition, 'subbed-on');
          const addPlayer = awayTeam.randomSubstitute(chosenPosition);

          // Checked that there is a player in that position available to come on. If not, don't run the substitution
          if (removePlayer && addPlayer) {
            removePlayer.playing = !removePlayer.playing;
            substitute(awayTeam, removePlayer);
            addPlayer.playing = !addPlayer.playing;
            substitute(awayTeam, addPlayer);
          }
        }
      }

      // Reduce fitness of players in a random position
      randomPosition();
      defendingTeam.reduceValues(genRandomValue(10),'fitness',[randomPosition]);

      // Move the possession bar
      move();

      // Update the timer
      timeControl();
    }
  },50);

  // Event Listeners -------------------------------------------------------------

  // Team selection
  $('.team-input').on('click', (e) => {
    // REFACTOR: make selectors in $variables, turn click into named function
    const userTeam = e.target.innerHTML;
    if (homeTeam === null) {
      configTeam(homeTeam, userTeam);
      $('.title-message').text('Home team selected. Chose your opponent.');
      $(e.target).attr('disabled', true);
      $('#homeTeam').attr('disabled', false);
    } else {
      configTeam(awayTeam, userTeam);
      $('.title-message').text('Opponent selected. Edit tactics or proceed.');
      $('.primary-button, #awayTeam').attr('disabled', false);
    }
  });

  // Toggle computer mode (playing against the computer)
  $('#playerMode').on('click', () => {
    cpuMode = !cpuMode;
  });


  // Toggle yes/no playing
  $('.team-panel').on('click', (e) => {
    const selectedPlayer = e.target.id;
    choosePlayers(teamTactics, selectedPlayer);
  });

  $primaryButton.on('click', () => {
    run = !run;
    $('#match-setup, .info-message, .team-setup, .game-logo').hide();
    $('#match-engine, .away-team, .home-team, .timer, .button-bar').show();
    if (run) {
      $primaryButton.text('Pause');
      gameStarted = true;
    } else {
      $primaryButton.text('Play');
    }

  });

  $('#homeTeam').on('click', () => {
    showTacticsPage(homeTeam);
  });

  $('#awayTeam').on('click', () => {
    showTacticsPage(awayTeam);
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

  function showTacticsPage(teamObject) {
    if (run) {
      run = !run;
    }

    $primaryButton.text('Play');
    $('.match-setup, .match-engine').hide();
    $('.team-setup').show();
    setupTactics(teamObject);
    teamTactics = teamObject;
    revealTeam(teamTactics);
  }

  function setupTactics(teamObject) {
    $('.team-panel').html('');
    $('.formation').val(teamObject.formation);

    // Sorts players in order of position [GK, Def, Mid, Att]
    teamObject.players.sort(function(a,b){
      return positions.indexOf(a.position) < positions.indexOf(b.position) ? -1 : 1;
    });

    for (let i = 0; i < teamObject.players.length; i++) {
      const player = teamObject.players[i];

      // If start give an HTML tick, else give an HTML cross
      const startingEleven = player.playing ? '&#10004;' : '&#10007;';

      // Build table of squad players - insert relevant class to reflect player status, e.g. sent off, yellow, injured, substituted
      $('.team-panel').append(
        `<p class="player-line ${player.position} ${player.status}" id='${player.name}'>
          <span class="starting ${player.status}" id="${i}">${startingEleven}</span>
          <span class="player-position ">${player.position}</span>
          <span class="player-name">${player.name}</span>
          <span class="player-stat" data-sort="${player.attack}" style="background-color: rgba(0,128,0,${player.attack/100})">${player.attack}</span>
          <span class="player-stat" style="background-color: rgba(0,128,0,${player.defence/100})">${player.defence}</span>
          <span class="player-stat" style="background-color: rgba(0,128,0,${player.creativity/100}")>${player.creativity}</span>
          <span class="player-stat" style="background-color: rgba(0,128,0,${player.defence/100})">${player.defence}</span>
          <span class="player-stat" style="background-color: rgba(0,128,0,${player.fitness/100})">${player.fitness}</span>
        </p>`
      );
    }
  }

  function revealTeam(teamObject) {
    $('.team-display').html('');

    // Split formation into an array
    const formation = ['1'].concat(teamObject.formation.split('-'));

    let playerNumber = 0;
    let positionNumber = 0;

    try {
      // Try to map through the formation array, e.g. [1,4,2,2] (inclusive of goalkeeper)
      formation.map((arrayItem) => {
        const iterations = parseFloat(arrayItem);
        let i = 0;
        // Loop through players while i (initially 0) is less than the number of positions required
        while (i < iterations) {
          // If player.playing === true OR if player.status is 'ejected' (sent off). Players with red cards continue to be added to the team sheet, so that they cannot be removed/replaced. A class of .red is added, which diableds the ability to substitute them. Players with a status of 'ejected' have a .playing value of false - they no longer influence events.
          if (teamObject.players[playerNumber].playing || teamObject.players[playerNumber].status === 'ejected') {

            // If player has been placed out of position add a warning class
            const warningMessage = positions[positionNumber] !== teamObject.players[playerNumber].position ? 'warning' : '';

            // Append player on to the pitch map with classes that indicate the player's status,e.g. red card, yellow card or out of posiiton
            $('.team-display').append(
              `<span class='player-block ${warningMessage} ${(teamObject.players[playerNumber].status)}'>${teamObject.players[playerNumber].name}</span>`
            );
            teamObject.players[playerNumber].chosenPosition = positions[positionNumber];
            i++;
          }
          playerNumber++;
        }
        $('.team-display').append('<div class="seperate-players">');
        positionNumber++;
      });
    } catch(err) {
      // Throws an error when fewer than 11 players are selected. It displays a warning. Do not want to prevent selections as there are legitmate reasons why fewer than 11 players may be selected, e.g. red cards or injuries
      $('.team-display').append(`<p class='team-selection-warning seperate-players'>Less than 11 players selected!</p>`);
    }
  }

  function choosePlayers(teamObject, selectedPlayer) {
    const $selectedPlayer = $(`#${selectedPlayer}`);

    // Toggle selected players playing status (true/false)
    teamObject.players[selectedPlayer].playing = !teamObject.players[selectedPlayer].playing;

    revealTeam(teamTactics);

    if (teamObject.players[selectedPlayer].playing) {
      $selectedPlayer.html('&#10004;');
      if (gameStarted) {
        $selectedPlayer.parent().css({'background': 'green'});
        const playerOn = teamObject.players[selectedPlayer];
        substitute(teamObject, playerOn);
      }
    } else {
      $selectedPlayer.html('&#10007;');
      if (gameStarted) {
        $selectedPlayer.parent().css({'pointer-events': 'none', 'background': 'red'});
        const playerOff = teamObject.players[selectedPlayer];
        substitute(teamObject, playerOff);

      }
    }

  }

  function substitute(teamObject, player) {
    if (teamObject.subs < 7) {
      if (!player.playing) {
        $(`#${teamObject.place}Events`).append(`<i class='fa fa-arrow-right' style='color:red;' aria-hidden='true'></i> ${matchTime} mins: ${player.name} substituted<br/>`);
        teamObject.subs += 1;
        player.playing = false;
        player.status = 'subbed-off';
      } else {
        $(`#${teamObject.place}Events`).append(`<i class='fa fa-arrow-right' style='color:green;' aria-hidden='true'></i> ${matchTime} mins: ${player.name} substituted<br/>`);
        teamObject.subs += 1;
        player.playing = true;
        player.status = 'subbed-on';
      }
    } else {
      console.log('You have had 3 subs!');
    }
  }

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

    const homeBar = document.getElementById('homeBar');

    // Calculate the two teams creativity scores and covert them into a percentage out of 100 - this is for the possession bar.
    // It +/- a small low level integer to keep it moving continously
    width = (homeTeam.averagePlayerValues('creativity') / (homeTeam.averagePlayerValues('creativity') + awayTeam.averagePlayerValues('creativity')) * 100) + (Math.random() < 0.5 ? -genRandomValue(6) : genRandomValue(6));

    homeBar.style.width = width + '%';
  }

  function selectTeam() {
    // Generate a random values from home and away team using their average creativity scores from players on the pitch
    // The higher a teams creativity score, the more chances they will create
    // 24.05.2017 - added a Fitness value for every player, which decreases through the game. This is now added to the random creativity score to determine, which team home/away gets the chance.
    const homeRandom =  genRandomValue(homeTeam.averagePlayerValues('creativity') + homeTeam.averagePlayerValues('fitness'));
    const awayRandom =  genRandomValue(awayTeam.averagePlayerValues('creativity') + awayTeam.averagePlayerValues('fitness'));

    if (homeRandom >= awayRandom) {
      return [homeTeam, awayTeam];
    } else {
      return [awayTeam, homeTeam];
    }
  }

  function setupEvent(attackingTeam) {
    $commentaryBox.css('background-color', attackingTeam.colors[0]);
    $commentaryBox.css('color', attackingTeam.colors[1]);
    if (genRandomValue(20) % 4 === 0){
      attackingTeam.increaseValues(3,'attack',['midfielder', 'striker']);
      attackingTeam.increaseValues(3,'creativity',['midfielder', 'striker']);
      // '' === No player passed in
      $commentaryBox.text(generateCommentary('chance',''));
    }
  }


  // REMOVE
  // function selectPlayer(team) {
  //   const genRandomIndex = Math.floor(Math.random() * team.players.length);
  //   return team.players[genRandomIndex];
  // }

  function goalChance(attackingTeam, defendingTeam) {
    // Refactor this
    const attackingPlayer = attackingTeam.randomPlayer();
    const defendingPlayer = defendingTeam.randomPlayerByPosition('defender');

    if (genRandomValue(attackingPlayer.attack) > genRandomValue(defendingPlayer.defence)) {

      generateCommentary('goal', attackingPlayer);
      updateScore(attackingTeam);

      // Refactor these messages - use a function which passes in player, teamObject, color and icon name
      $(`#${attackingTeam.place}Events`).append(`<i class='fa fa-futbol-o' style='color:white;' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scored<br/>`);
    }
  }

  function handleDiscipline(attackingTeam, defendingTeam) {

    // Refactor
    // ATTACKING TEAM REDUNDANT
    // teamString can be substituted for defendingTeam.place
    const defendingPlayer = defendingTeam.randomPlayer();


    // Takes match time in account, which decreases the likelihood of bookings happening earlier in the game.
    if ((genRandomValue(defendingPlayer.discipline) + (100-matchTime)) < 90 && defendingPlayer.status !== 'ejected') {

      // Already booked? Send him off!
      if (defendingPlayer.status === 'yellow') {
        // Refactor create a class or pass in as an object - one line
        $commentaryBox.css('background-color', '#FF0000');
        $commentaryBox.css('color', '#FFFFFF');
        defendingTeam.reduceValues(20,'defence',['striker','midfielder', 'defender', 'goalkeeper']);
        defendingTeam.reduceValues(20,'attack',['striker','midfielder', 'defender', 'goalkeeper']);
        defendingTeam.reduceValues(20
          ,'creativity',['striker','midfielder', 'defender', 'goalkeeper']);

        generateCommentary('secondYellow', defendingPlayer);

        // Refactor these messages - use a function which passes in player, teamObject, color and icon name
        $(`#${defendingTeam.place}Events`).append(`<i class='fa fa-square event-item' style='color: red;' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);
        defendingPlayer.status = 'ejected';
        defendingPlayer.playing = false;

      } else {
        // Refactor create a class or pass in as an object - one line
        $commentaryBox.css('background-color', 'yellow');
        $commentaryBox.css('color', '#000000');
        generateCommentary('yellow', defendingPlayer);
        defendingPlayer.defence -= 8;

        $(`#${defendingTeam.place}Events`).append(`
          <i class='fa fa-square event-item' style='color: yellow;' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} booked<br/>`);
        defendingPlayer.status = 'yellow';
        defendingPlayer.fitness -= genRandomValue(10);
      }
    }
  }

  function handleInjury(attackingTeam) {
    const attackingPlayer = attackingTeam.randomPlayer();

    if (genRandomValue(101) % 40 === 0) {

      generateCommentary('injury', attackingPlayer);
      $(`#${attackingTeam.place}Events`).append(`<i class='fa fa-plus' style='color: green;' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} injured<br/>`);
      if (attackingTeam.place === 'away' && cpuMode) {
        attackingPlayer.playing = !attackingPlayer.playing;
        substitute(awayTeam, attackingPlayer);
        const addPlayer = awayTeam.randomSubstitute(attackingPlayer.position);
        addPlayer.playing = !addPlayer.playing;
        substitute(awayTeam, addPlayer);
      } else {
        attackingPlayer.fitness = 0 + genRandomValue(30);
        attackingPlayer.status = 'injured';
        attackingPlayer.playing = false;
      }

    } else {
      attackingPlayer.fitness -= genRandomValue(15);
      attackingPlayer.defence -= genRandomValue(10);
      attackingPlayer.attack -= genRandomValue(10);
      // Refactor -
      generateCommentary('nearMiss', attackingPlayer);
    }

  }

  function handleFreekick(attackingTeam, defendingTeam) {
    const attackingPlayer = attackingTeam.randomPlayerByPosition('midfielder');
    const defendingValue = (defendingTeam.randomPlayerByPosition('goalkeeper').defence + defendingTeam.averagePlayerValues('defender'));

    if (attackingPlayer.attack > defendingValue) {
      updateScore(attackingTeam);

      generateCommentary('freekick', attackingPlayer);
      $(`#${attackingTeam.place}Events`).append(`<i class='fa fa-futbol-o' style='color:white;' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scored<br/>`);
      attackingPlayer.attack += 5;
    } else {
      generateCommentary('wastedFreekick', attackingPlayer);
      attackingPlayer.creativity -= 5;
      attackingTeam.reduceValues(genRandomValue(10), 'attack', ['striker', 'midfielder']);
      attackingTeam.reduceValues(genRandomValue(10), 'creativity', ['striker', 'midfielder']);

    }
  }
  function handlePenalty(attackingTeam, defendingTeam) {

    const attackingPlayer = attackingTeam.randomPlayerByPosition('striker');
    const defendingPlayer = defendingTeam.randomPlayerByPosition('goalkeeper');
    const bookedPlayer = defendingTeam.randomPlayerByPosition('defender');
    // Book the player?
    if (genRandomValue(100) > 25) {
      bookedPlayer.status = 'yellow';
      $(`#${defendingTeam.place}Events`).append(`<i class='fa fa-square event-item' style='color: yellow;' aria-hidden='true'></i> ${matchTime} mins: ${bookedPlayer.name} booked<br/>`);
    }

    if ((genRandomValue(attackingPlayer.attack)*2) > genRandomValue(defendingPlayer.defence)) {

      updateScore(attackingTeam);

      // $commentaryBox.text(`${attackingPlayer.name}'s clinical from the spot! Goal!`);
      generateCommentary('penalty', attackingPlayer);
      $(`#${attackingTeam.place}Events`).append(`<i class='fa fa-futbol-o' style='color:white' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} scores penalty<br/>`);
      attackingPlayer.attack += 5;
    } else {
      generateCommentary('missedPenalty', attackingPlayer);
      $(`#${attackingTeam.place}Events`).append(`<i class='fa fa-futbol-o' style='color:red' aria-hidden='true'></i> ${matchTime} mins: ${attackingPlayer.name} missed penalty<br/>`);
      defendingPlayer.defence += 10;
      attackingPlayer.attack -= 10;
    }
  }

  function straightRed(defendingTeam) {
    const defendingPlayer = defendingTeam.randomPlayer();
    if (genRandomValue(defendingPlayer.discipline) + (100-matchTime) < 25) {
      defendingPlayer.playing = false;
      defendingPlayer.status = 'ejected';

      // $commentaryBox.text('The referee gives him a straight red!');
      generateCommentary('straightRed', defendingPlayer);
      $(`#${defendingTeam.place}Events`).append(`<i class='fa fa-square' style=' color: red;' aria-hidden='true'></i> ${matchTime} mins: ${defendingPlayer.name} sent off<br/>`);
      // if (defendingTeam.place === 'home') pausePlay();
    }
  }

  function configTeam(team, selector) {
    // Refactor all teams into one object, then pass in object[selector] => save about 20 lines of code
    if (homeTeam === null) {
      $('.home-team  .team-name').text(selector);
      switch (selector) {
        case 'Tottenham':
          homeTeam = spurs;
          break;
        case 'Man United':
          homeTeam = manUnited;
          break;
        case 'Liverpool':
          homeTeam = liverpool;
          break;
        case 'Man City':
          homeTeam = manCity;
          break;
        case 'Everton':
          homeTeam = everton;
          break;
        case 'Chelsea':
          homeTeam = chelsea;
          break;
        case 'Leicester':
          homeTeam = leicester;
          break;
        case 'Arsenal':
          homeTeam = arsenal;
          break;
      }
      homeTeam.place = 'home';
      $('.home-team-logo').attr('src', `images/${homeTeam.name}.png`);
      $('.home-team-logo').show();
      $('.home-team, #homeBar').css('background-color', homeTeam.colors[0]);
      $('.home-team').css('color', homeTeam.colors[1]);
    } else {
      $('.away-team .team-name').text(selector);
      switch (selector) {
        case 'Tottenham':
          awayTeam = spurs;
          break;
        case 'Man United':
          awayTeam = manUnited;
          break;
        case 'Liverpool':
          awayTeam = liverpool;
          break;
        case 'Man City':
          awayTeam = manCity;
          break;
        case 'Everton':
          awayTeam = everton;
          break;
        case 'Chelsea':
          awayTeam = chelsea;
          break;
        case 'Leicester':
          awayTeam = leicester;
          break;
        case 'Arsenal':
          awayTeam = arsenal;
          break;
      }
      awayTeam.place = 'away';
      $('.away-team-logo').attr('src', `images/${awayTeam.name}.png`);
      $('.away-team-logo').show();
      $('.logo-display span').show();
      $('.away-team, .possession-bar').css('background-color', awayTeam.colors[0]);
      $('.away-team').css('color', awayTeam.colors[1]);
    }
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
      chance: [`The ball is wasted`, `Possession is sloppily given away`, `That is wasted`, `The referee pulls back play`, `The ball goes out for a throw`, `Good interception!`, `He's robbed him of possesion`, `That was a wayward ball`, `He can't quite get on the end of that one`],
      nearMiss: [`${player.name} is limping, but he'll be okay`, `That's a sore one.`, `${player.name} looks to be struggling`, `There's a nasty coming together`, `The referee waves play on`]
    };
    const randomIndex = genRandomValue(commentary[scenario].length);
    const message = commentary[scenario][randomIndex];
    $commentaryBox.text(`${message}`);

  }

  function updateScore(teamObject) {
    let score = null;
    let getScore = null;
    if (teamObject.place === 'home') {
      getScore = $homeScore.text();
      score = parseFloat(getScore) + 1;
      $homeScore.text(score);
    } else {
      getScore = $awayScore.text();
      score = parseFloat(getScore) + 1;
      $awayScore.text(score);
    }
  }

  function randomPosition() {
    const randomIndex = genRandomValue(positions.length) + 1;
    const chosenPosition = positions[randomIndex];
    return [chosenPosition];
  }
});
