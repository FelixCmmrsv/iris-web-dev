function loadLanguage(language) {
    fetch(`/static/language_pack/${language}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const translation = key.split('.').reduce((obj, i) => obj?.[i], data);
                if (translation) element.innerText = translation;
            });
            document.querySelectorAll('[data-i18n-title]').forEach(element => {
                const key = element.getAttribute('data-i18n-title');
                const translation = key.split('.').reduce((obj, i) => obj?.[i], data);
                if (translation) element.title = translation;
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

function setLanguage(event) {
    const language = event.target.value;
    loadLanguage(language);
    localStorage.setItem('selectedLanguage', language);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    document.getElementById('language-select').value = savedLanguage;
    loadLanguage(savedLanguage);
});