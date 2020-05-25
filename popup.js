
class SimplePopup {

  toggleButton = null;
  popupContent = null;
  popupOverlay = null;
  url = '/api/data.php';

  constructor() {

    window.addEventListener('DOMContentLoaded', () => {
      this.toggleButton = document.getElementById('toggle-popup-button');
      this.popupContent = document.getElementById('popup-content');
      this.popupOverlay = document.getElementById('popup-overlay');

      this.bindEvents();

    });
  }

  bindEvents() {

    this.toggleButton.addEventListener('click', this.togglePopup.bind(this), false);
    this.popupOverlay.addEventListener('click', this.togglePopup.bind(this), false);

  }

  togglePopup() {

    this.popupState = !this.popupState;
    this.popupContent.style.display = this.popupState ? 'block' : 'none';
    this.popupOverlay.style.display = this.popupState ? 'block' : 'none';

    if (this.popupState) {
      this.loadData();
    }
  }

  async loadData() {

    try {
      let response = await fetch(this.url, {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        }
      });
      let data = await response.json();
      this.popupContent.innerHTML = data.response;
    } catch (error) {
      console.log(error);
    }
  }
}

let popup = new SimplePopup();