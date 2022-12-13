export function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

export function showElement(element) {
  element.classList.remove('hidden');
}

export function hideElement(element) {
  element.classList.add('hidden');
}
