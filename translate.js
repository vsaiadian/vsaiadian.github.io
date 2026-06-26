// Shared Google Translate toggle (EN <-> UA)
// Each page needs:
//   <button id="lang-toggle" class="lang-button">UA</button>
//   <div id="google_translate_element" style="display:none;"></div>
//   <script src="translate.js"></script>
//   <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,uk',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', function () {
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;

  langBtn.addEventListener('click', () => {
    langBtn.classList.add('lang-switching');
    setTimeout(() => langBtn.classList.remove('lang-switching'), 500);

    const newLang = langBtn.innerText === 'UA' ? 'uk' : 'en';
    langBtn.innerText = newLang === 'uk' ? 'EN' : 'UA';

    // Poll for the Google Translate iframe, then click the target language
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const iframe = document.querySelector('iframe.goog-te-menu-frame');
      if (iframe) {
        try {
          const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
          const langLink = innerDoc.querySelector(`a[lang='${newLang}']`);
          if (langLink) {
            langLink.click();
            clearInterval(interval);
          }
        } catch (e) {
          clearInterval(interval);
        }
      }
      if (attempts > 20) clearInterval(interval); // give up after ~10s
    }, 500);
  });
});