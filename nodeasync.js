let baseURL = "http://numbersapi.com/";
let deckURL = "http://deckofcardsapi.com/api/deck/";

async function partone1() {
    axios
    .get(`${baseURL}7/trivia?json`)
    .then(p1 => {
        console.log(`First Request ${p1.data.text}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    });
}

async function partone2() {
  axios
  .get(`${baseURL}7,22,38,107`)
  .then(p1 => {
    $("#part-one-2").append(p1.data[7] + "<br>");
    $("#part-one-2").append(p1.data[22] + "<br>");
    $("#part-one-2").append(p1.data[38] + "<br>");
    $("#part-one-2").append(p1.data[107] +"<br><br>" );
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });
}

async function partone3() {
  axios
  .get(`${baseURL}7/trivia?json`)
  .then(p1 => {
    $("#part-one-3").append(p1.data.text + "<br/>");
    return axios.get(`${baseURL}7/trivia?json`);
  })
  .then(p2 => {
    $("#part-one-3").append(p2.data.text + "<br/>");
    return axios.get(`${baseURL}7/trivia?json`);
  })
  .then(p3 => {
    $("#part-one-3").append(p3.data.text + "<br/>");
    return axios.get(`${baseURL}7/trivia?json`);
  })
  .then(p4 => {
    $("#part-one-3").append(p4.data.text + "<br/>");
    return axios.get(`${baseURL}7/trivia?json`);
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });
}

async function parttwo1() {
  axios
  .get(`${deckURL}new/draw/?count=1`)
  .then(p1 => {
    console.log(`${p1.data.cards[0].value.toLowerCase()} of ${p1.data.cards[0].suit.toLowerCase()}`);
  }).catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });
}

async function parttwo2() {
  let first = "";
  axios
  .get(`${deckURL}new/draw/?count=1`)
  .then(p1 => {
    first = p1.data.cards[0];
    return axios.get(`${deckURL}${p1.data.deck_id}/draw/?count=1`);
  })
  .then(p2 => {
    console.log(`${first.value.toLowerCase()} of ${first.suit.toLowerCase()}`);
    console.log(`${p2.data.cards[0].value.toLowerCase()} of ${p2.data.cards[0].suit.toLowerCase()}`);
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });
}

// Referenced the Solution, I'm really rusty in jquery and the idea of placing the card was intimidating.
// Also, the jquery and the axios wasn't the main issue, the css transform effect was...
async function parttwo3() {
    let $btn = $('button');
    let $board = $('#board');

    let deckData = await $.getJSON(`${deckURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${deckURL}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $board.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
}
// partone1();
// partone2();
// partone3();
// parttwo1();
// parttwo2();
parttwo3();
