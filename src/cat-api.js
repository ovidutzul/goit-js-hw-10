const apiKey = 'live_T1vWRtkdv5anCx9KaGieIfc0Sf1wdkzRGAsvUiFPZ3LPaJ3iHQcWWRgFmgLZJ9KI';

  export function fetchBreeds() {
  return fetch(
    `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}