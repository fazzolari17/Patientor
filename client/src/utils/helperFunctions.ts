export const capitalized: (arg0: string) => string = (string) => {
  const newString: string[] = string.split(' ');
  const capitalizedWords = newString.map((word) => {
    const newWord = word.split('');
    const cap = newWord[0].toUpperCase();
    const endOfWord = newWord.slice(1);
    const caps = [...cap, ...endOfWord];
    return caps.join('');
  });

  return capitalizedWords.join(' ');
};

export const uppercase: (arg0: string) => string = (string) => {
  const uppercase = [];
  let count = 0;

  while (count < string.length) {
    uppercase.push(string[count].toUpperCase());
    count++;
  }

  return uppercase.join('');
};
