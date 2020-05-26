
class SimplePopup {

  popupContent = 'popup-content';
  popupOverlay = 'popup-overlay';
  toggleButton = null;
  url = null;

  constructor({ buttonId, dataUrl }) {
    this.toggleButton = buttonId;
    this.url = dataUrl

    window.addEventListener('DOMContentLoaded', () => {

      this.createElements()
      this.getDomReferences()
      this.bindEvents();

    });
  }

  createElements() {

    this.createElement(this.popupContent);
    this.createElement(this.popupOverlay);

  }

  createElement(id) {

    let element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);
    return element;

  }

  getDomReferences() {

    this.toggleButton = document.getElementById(this.toggleButton);
    this.popupOverlay = document.getElementById(this.popupOverlay);
    this.popupContent = document.getElementById(this.popupContent);

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

let popup = new SimplePopup({
  buttonId: "toggle-popup-button",
  dataUrl: "api/data.php"
});