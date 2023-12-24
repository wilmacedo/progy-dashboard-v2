export function capitalize(text: string, date = false) {
  const words = text.split(' ');

  const result: string[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 3 || (i === 0 && word.length <= 3) || date) {
      result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
      continue;
    }

    if (i === 0) {
      result.push(word.toUpperCase());
      continue;
    }

    result.push(word.toLowerCase());
  }

  return result.join(' ');
}
