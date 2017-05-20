$(() => {
  const $matchTime = $('.changing-minutes');
  const $commentaryBox = $('#commentaryBox');
  const $primaryButton = $('.primary-button');
  const $homeScore = $('.home-team .score');
  const $awayScore = $('.away-team .score');

  let matchTime = 0;
  let run = false;
  let homeTeam = null;
  let awayTeam = null;
  homeTeam = spurs;
  awayTeam = arsenal;


  // Loop through each second
  const timerID = setInterval(function() {
    if (run) {

      const eventValue = genRandomValue(100) + 1;


      const [teamObject, teamString] = selectTeam();
      const chosenPlayer = selectPlayer(teamObject);

      // Who has the event?


      if (eventValue % 15 === 0) {
        handleFreekick(chosenPlayer, teamString);
      }
      if (eventValue % 20 === 0) {
        handleDiscipline(chosenPlayer, teamString);
      }

      if (eventValue % 30 === 0) {
        goalChance(teamObject,teamString, chosenPlayer);
      }

      if (eventValue % 75 === 0) {
        handleInjury(chosenPlayer, teamString);
      }

      timeControl();
    }
  },100);

  // Event Listeners -------------------------------------------------------------

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

  function selectTeam() {
    const homeRandom =  genRandomValue(homeTeam.averagePlayerValues('attack'));
    const awayRandom =  genRandomValue(awayTeam.averagePlayerValues('attack'));

    if (homeRandom >= awayRandom) {
      return [homeTeam, 'home'];
    } else {
      return [awayTeam, 'away'];
    }
  }

  function selectPlayer(team) {
    const genRandomIndex = Math.floor(Math.random() * team.players.length);
    return team.players[genRandomIndex];
  }

  function goalChance(object, team, player) {

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

    $(`#${team}Events`).append(`<i class='fa fa-futbol-o' style='font-size: 22px; color:white; padding-top:5px' aria-hidden='true'></i>${matchTime} mins: ${player.name} scored<br/>`);


  }

  function handleDiscipline(player, team) {
    if (player.status !== 'Ejected') {
      // Already booked? Send him off!
      console.log(player.status);
      if (player.status === 'Yellow') {

        // Store mesages and details in an game Object
        $commentaryBox.text(`${player.name} gets a red!`);
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: red; padding-top:5px' aria-hidden='true'></i>${matchTime} mins: ${player.name} sent off<br/>`);

        player.status = 'Ejected';
        player.playing = false;

      } else {
        $commentaryBox.text(`${player.name} gets a yellow!`);

        // Store mesages and details in an game Object
        $(`#${team}Events`).append(`<i class='fa fa-square event-item' style='font-size: 24px; color: yellow; padding-top:5px' aria-hidden='true'></i>${matchTime} mins: ${player.name} booked<br/>`);

        player.status = 'Yellow';
      }
    }
  }

  function handleInjury(player, team) {

    if (player.playing) {
      // THERE COULD BE AN INJURY
      if (genRandomValue(101) % 8 === 0) {
        $commentaryBox.text(`${player.name} gets taken off on a stretcher!`);
        $(`#${team}Events`).append(`<i class='fa fa-plus' style='font-size: 26px; color: green; padding-top:5px' aria-hidden='true'></i>${matchTime} mins: ${player.name} injured<br/>`);
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

  function generateEventMessage() {
    // Store mesages and details in an game Object

  }

});
