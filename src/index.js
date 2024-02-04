import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_T1vWRtkdv5anCx9KaGieIfc0Sf1wdkzRGAsvUiFPZ3LPaJ3iHQcWWRgFmgLZJ9KI";
  
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSel = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const textBox = document.querySelector('.box');

loader.textContent = "Please select a cat";

catInfo.style.display = "flex";
catInfo.style.flexDirection = "row";
catInfo.style.justifyContent = "space-evenly";
catInfo.style.marginTop = "20px";
catInfo.style.gap = "30px";
catInfo.style.margin = "10px";
catInfo.style.fontFamily = "font-family: Arial, Helvetica, sans-serif";
catInfo.style.fontStyle = "italic";

const style = document.createElement("style")
style.textContent = ".is-hidden { display: none; }"
document.head.appendChild(style);

catInfo.classList.add('is-hidden');
error.classList.add('is-hidden');

breedSel.addEventListener('change', onChangeSelect);

updateSelect();

function updateSelect(data) {
  fetchBreeds(data)
    .then(data => {
      loader.classList.toggle('loader', 'is-hidden');

      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      breedSel.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: breedSel,
      });
    })
    .catch(onFetchError);
};

function onChangeSelect(event) {
  loader.classList.toggle('is-hidden', 'loader');
  breedSel.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  catInfo.style.filter = "blur(0px)";
  catInfo.style.webkitFilter = "blur(0px)";

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.toggle('loader', 'is-hidden');
      breedSel.classList.remove('is-hidden');

      const { url, breeds } = data[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;

      catInfo.classList.remove('is-hidden');

      Notiflix.Notify.info('Loading data, please wait...', {
        timeout: 1000,
      });
    })
    .catch(onFetchError);
};

function onFetchError() {
  breedSel.classList.remove('is-hidden');
  loader.classList.toggle('loader', 'is-hidden');
  catInfo.style.filter = "blur(8px)";
  catInfo.style.webkitFilter = "blur(8px)";
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reload the page or select another cat breed!', {
      timeout: 2000,
    }
  );
};
