export let isGameOver = false;

export function setGameOver(value) {
    console.log('Setting isGameOver to:', value);  // Debug to ensure this is called
    isGameOver = value;
}
