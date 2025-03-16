// js/languageLoader.js

export async function loadLanguageModule(lang) {
  switch (lang) {
    case 'en':
      return import('./languages/language-en.js');
    case 'no':
      return import('./languages/language-no.js');
    case 'fr':
      return import('./languages/language-fr.js');
    case 'de':
      return import('./languages/language-de.js');
    case 'sv':
      return import('./languages/language-sv.js');
    case 'it':
      return import('./languages/language-it.js');
    default:
      return import('./languages/language-en.js'); // fallback to English
  }
}
