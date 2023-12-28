interface MatchesKey {
  [key: string]: number;
}

export function getTimeSince(date: Date) {
  const currentDate = new Date();
  const seconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
  const matches: MatchesKey = {
    anos: 31536000,
    meses: 2592000,
    dias: 86400,
    horas: 3600,
    minutos: 60,
    segundos: 1,
  };

  for (let key in matches) {
    const interval = seconds / matches[key];
    if (interval > 1) {
      const value = Math.floor(interval);
      let suffix = key;
      if (value === 1) {
        suffix = suffix.substring(suffix.length - 1, 0);
      }

      return `${value} ${suffix}`;
    }
  }
}
