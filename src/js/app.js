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

      const [teamObject, teamString] = selectTeam();
      const chosenPlayer = selectPlayer(teamObject);
      console.log(chosenPlayer);
      // Who has the event?
      if (eventValue % 2 === 0) {
        goalChance(teamString, chosenPlayer);
      }

      // if (eventValue % 80 === 0) {
      //   handlePenalty(chosenPlayer, teamString);
      // }
      //
      // if (eventValue % 95 === 0) {
      //   straightRed(chosenPlayer, teamString);
      // }
      //
      // if (eventValue % 12 === 0) {
      //   handleFreekick(chosenPlayer, teamString);
      // }
      // if (eventValue % 20 === 0) {
      //   handleDiscipline(chosenPlayer, teamString);
      // }
      //
      // if (eventValue % 75 === 0) {
      //   handleInjury(chosenPlayer, teamString);
      // }
      move();
      timeControl();
    }
  },200);

  // Event Listeners -------------------------------------------------------------

  $('.team-input').on('click', (e) => {
    const userTeam = e.target.innerHTML;
    console.log(e);
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

  $primaryButton.on('click', () => {
    run = !run;
    run ? $primaryButton.text('Pause') : $primaryButton.text('Play');
  });

  // Functions -------------------------------------------------------------

  function timeControl() {

    if(matchTime === 44) {
      $commentaryBox.text(`That's half-time!`);
      run = !run;
      $primaryButton.text('Play');
    }

    if(matchTime === 90) {
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
    const homeRandom =  genRandomValue(homeTeam.averagePlayerValues('attack'));
    const awayRandom =  genRandomValue(awayTeam.averagePlayerValues('attack'));

    if (homeRandom >= awayRandom) {
      $commentaryBox.css('background-color', homeTeam.colors[0]);
      $commentaryBox.css('color', homeTeam.colors[1]);
      return [homeTeam, 'home'];
    } else {
      $commentaryBox.css('background-color', awayTeam.colors[0]);
      $commentaryBox.css('color', awayTeam.colors[1]);
      return [awayTeam, 'away'];
    }
  }

  function selectPlayer(team) {
    const genRandomIndex = Math.floor(Math.random() * team.players.length);
    return team.players[genRandomIndex];
  }

  function goalChance(team, player) {
    if (player.playing) {
      // Refactor this
      let score = null;
      let getScore = null;
      if (team === 'home') {
        getScore = $homeScore.text();
        score = parseFloat(getScore) + 1;
        $homeScore.text(score);
      } else {
        getScore = $awayScore.text();
        score = parseFloat(getScore) + 1;
        $awayScore.text(score);
      }
      $commentaryBox.text(`Goal!!!`);

      $(`#${team}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} scored<br/>`);
    }
  }

  function handleDiscipline(player, team) {
    if (player.status) {
      // Already booked? Send him off!
      console.log(player.status);
      if (player.status === 'Yellow') {
        $commentaryBox.css('background-color', '#FF0000');
        $commentaryBox.css('color', '#FFFFFF');
        // Store mesages and details in an game Object
        $commentaryBox.text(`${player.name} gets a red!`);
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} sent off<br/>`);

        player.status = 'Ejected';
        player.playing = false;

      } else {
        $commentaryBox.css('background-color', 'yellow');
        $commentaryBox.css('color', '#000000');
        $commentaryBox.text(`${player.name} gets a yellow!`);

        // Store mesages and details in an game Object
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: yellow; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} booked<br/>`);

        player.status = 'Yellow';
      }
    }
  }

  function handleInjury(player, team) {

    if (player.playing) {
      // THERE COULD BE AN INJURY
      if (genRandomValue(101) % 8 === 0) {
        $commentaryBox.text(`${player.name} gets taken off on a stretcher!`);
        $(`#${team}Events`).append(`<i class='fa fa-plus' style='font-size: 26px; color: green; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} injured<br/>`);
        player.playing = false;
      } else {
        $commentaryBox.text(`${player.name}'s limping, but he'll be okay`);
      }
    }
  }

  function handleFreekick(player, team) {

    if (player.playing) {
      // THERE COULD BE AN INJURY
      if (genRandomValue(101) % 5 === 0) {

        // Refactor this
        let score = null;
        let getScore = null;
        if (team === 'home') {
          getScore = $homeScore.text();
          score = parseFloat(getScore) + 1;
          $homeScore.text(score);
        } else {
          getScore = $awayScore.text();
          score = parseFloat(getScore) + 1;
          $awayScore.text(score);
        }

        $commentaryBox.text(`It's a wonder goal! Goal!!!`);
        $(`#${team}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} scored<br/>`);

      } else {
        $commentaryBox.text(`Oh! ${player.name} has put it in Row Z!`);
      }
    }
  }

  function handlePenalty(player, team) {
    if (player.status) {
      if (genRandomValue(101) % 5 === 0) {
        // Refactor this
        let score = null;
        let getScore = null;
        if (team === 'home') {
          getScore = $homeScore.text();
          score = parseFloat(getScore) + 1;
          $homeScore.text(score);
        } else {
          getScore = $awayScore.text();
          score = parseFloat(getScore) + 1;
          $awayScore.text(score);
        }

        $commentaryBox.text(`${player.name}'s clinical from the spot! Goal!!!`);

        $(`#${team}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} scores penalty<br/>`);

      } else {
        $commentaryBox.text(`He's missed it! The pressure has got to him`);
        $(`#${team}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} scores penalty<br/>`);

      }
    }
  }

  function straightRed(player, team) {
    if (player.playing) {
      player.playing = false;
      $commentaryBox.text('The referee gives him a straight red!');
      $(`#${team}Events`).append(`<i class='fa fa-square' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i> ${matchTime} mins: ${player.name} sent off<br/>`);
    }
  }




  function generateEventMessage() {
    // Store mesages and details in an game Object

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

});
