
const words = [
  "Jackhammer",
  "Blacksmith",
  "Helicopter",
  "Exacerbate",
  "Earthquake",
  "Conclusive",
  "Encyclopedia",
  "Handwriting",
  "Holography",
  "Jackrabbit",
];

export function randomWord() {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}
