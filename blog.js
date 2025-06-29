document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('lang-toggle');
    let currentLang = 'en';
  
    langBtn.addEventListener('click', () => {
      const targetLang = currentLang === 'en' ? 'uk' : 'en';
  
      // Set language cookie
      document.cookie = `googtrans=/en/${targetLang};path=/;domain=${location.hostname}`;
      location.reload();
  
      // Optional: update the button label
      langBtn.textContent = targetLang === 'en' ? 'UA' : 'EN';
      currentLang = targetLang;
    });
  });  