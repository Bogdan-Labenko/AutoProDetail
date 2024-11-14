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

const cookies = document.cookie.split('; ')
  
const cookie = cookies.find(row => row.startsWith('language='))
if (cookie) {
    setLanguage(cookie.split('=')[1])
}
else{
    setLanguage('pl');
}

function toggleCard(event) {
  const cardHeader = event.currentTarget;
  const card = cardHeader.closest('.card');
  
  // const allCards = document.querySelectorAll('.card');
  // allCards.forEach((otherCard) => {
  //     if (otherCard !== card) {
  //         otherCard.classList.remove('active');
  //     }
  // });

  card.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const cardHeaders = document.querySelectorAll('.card-header');
  cardHeaders.forEach(header => header.addEventListener('click', toggleCard));
});