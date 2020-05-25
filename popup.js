
// Singelton instance of Simple Popup

let SimplePopup = (function () {
  let simplePopupInstance;

  function initPopup(butonId, contentId) {
    let popupState = false;

    //DOM Elements
    let toggleButton;
    let popupContent;
    let popupOverlay;

    let url = '/api/data';

    window.addEventListener('DOMContentLoaded', (event) => {
      toggleButton = document.getElementById('toggle-popup-button');
      popupContent = document.getElementById('popup-content');
      popupOverlay = document.getElementById('popup-overlay');

      toggleButton.addEventListener('click', togglePopup, false);
      popupOverlay.addEventListener('click', togglePopup, false);
    });

    function togglePopup() {
      popupState = !popupState;
      popupContent.style.display = popupState ? 'block' : 'none';
      popupOverlay.style.display = popupState ? 'block' : 'none';
      if (popupState) {
        loadData();
      }
    }

    async function loadData() {
      try {
        let response = await fetch(url, {
          method: "get",
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        let data = await response.json();
        popupContent.innerHTML = data.response;
      } catch (error) {
        console.log(error);
      }
    }

    return new Object("Simple Popup");

  }

  function create() {
    if (!simplePopupInstance) {
      simplePopupInstance = initPopup();
    }
  }

  return { create }

})();

SimplePopup.create();