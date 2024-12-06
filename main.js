async function setLanguage(language) {
  // Загрузить файл перевода
    
  const response = await fetch(`translations/${language}.json`);
  const translations = await response.json();

    // Найти все элементы с data-i18n и обновить их текст
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translations[key];
  });
  
  if(language == 'ua')
  {
    document.documentElement.lang = 'uk'
  }
  else{
    document.documentElement.lang = language
  }
  document.cookie = `language=${language}`
}

let images_box = document.querySelector('.images-box');

async function loadRealizations() {
  const response = await fetch(`media/realizations/realizations.json`);

  const realizations = await response.json();
  
  realizations.forEach((element) => {
    const div = document.createElement('div');
    div.classList += 'image-box';
    const img = document.createElement('img');
    img.src = 'media/realizations/' + element;
    div.appendChild(img);
    images_box.appendChild(div);
  })
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

const cookies = document.cookie.split('; ')
  
const cookie = cookies.find(row => row.startsWith('language='))
if (cookie) {
    setLanguage(cookie.split('=')[1])
}
else{
    setLanguage('pl');
}

loadRealizations();


