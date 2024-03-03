const words: string[] = [
    "apple",
    "beach",
    "cloud",
    "dance",
    "earth",
    "flame",
    "grape",
    "happy",
    "image",
    "jolly"
];

const randomWord = () => {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
}