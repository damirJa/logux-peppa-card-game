export const playMatchSound = () => {
  try {
    const audio = new Audio('/sounds/peppa-match.mp3')
    audio.volume = 1;
    audio.play().catch(error => {
      console.log('Could not play sound:', error)
    })
  } catch (error) {
    console.log('Audio not supported:', error)
  }
}
