export const capitalized: (arg0: string) => string = (string) => {
  let newString: string[] = string.split(' ');
  const capitalizedWords = newString.map((word) => {
    let newWord = word.split('');
    let cap = newWord[0].toUpperCase();
    let endOfWord = newWord.slice(1);
    let caps = [...cap, ...endOfWord];
    return caps.join('');
  });

  return capitalizedWords.join(' ');
};

export const uppercase: (arg0: string) => string = (string) => {
  let newString = string.split('');
  let uppercase = [];
  let count = 0;

  while (count < string.length) {
    uppercase.push(string[count].toUpperCase());
    count++;
  }

  return uppercase.join('');
};
