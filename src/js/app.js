$(() => {
  const $matchTime = $('.changing-minutes');
  const $commentaryBox = $('#commentaryBox');
  const $primaryButton = $('.primary-button');
  let $homeScore = $('.home-team .score');
  let $awayScore = $('.away-team .score');

  let matchTime = 0;
  let run = false;

  // Event Listeners
  $primaryButton.on('click', () => {
    run = !run;
    run ? $primaryButton.text('Pause') : $primaryButton.text('Play');
  });

  // Loop through each second
  const timerID = setInterval(function() {
    if (run) {
      const eventValue = genRandomValue(100) + 1;
      console.log(eventValue);
      if (eventValue % 25 === 0) {
        const getScore = $homeScore.text();
        const score = parseFloat(getScore) + 1;
        $homeScore.text(score);
        $commentaryBox.text(`Goal!!!`);

      }

      timeControl();
    }
  },100);

// Functions

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

});
