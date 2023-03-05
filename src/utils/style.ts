export function ct(...args: string[]) {
  return args.map(arg => arg.trim()).join(' ');
}
