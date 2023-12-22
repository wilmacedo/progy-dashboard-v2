export function capitalize(text: string) {
  const words = text.split(' ');

  const result: string[] = [];
  for (const word of words) {
    if (word.length <= 3) {
      result.push(word.toLowerCase());
      continue;
    }

    result.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
  }

  return result.join(' ');
}
