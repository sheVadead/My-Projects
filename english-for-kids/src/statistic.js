import cards from './dataForCards';

cards.forEach((item, index) => {
  if (index !== 0) {
    item.forEach((item1) => {
      let play; let mistakes; let train;
      if (!JSON.parse(localStorage.getItem(`${item1.word}`))) {
        play = 0;
        mistakes = 0;
        train = 0;
      } else {
        play = JSON.parse(localStorage.getItem(`${item1.word}`)).play;
        mistakes = JSON.parse(localStorage.getItem(`${item1.word}`)).mistakes;
        train = JSON.parse(localStorage.getItem(`${item1.word}`)).train;
      }
      const { word } = item1;
      const translate = item1.translation;
      const localWord = {
        word,
        translate,
        play,
        mistakes,
        train,
      };
      localStorage.setItem(`${item1.word}`, JSON.stringify(localWord));
    });
  }
});
