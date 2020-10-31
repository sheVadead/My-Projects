import ru from "./assets/languages/ru-RU.js";
import en from "./assets/languages/en-En.js";
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false
  },
  keyboardWrap: document.querySelector('.keyboard__keys'),
  case: 0,
  langs: {
    ru,
    en
  },
  currentLang: localStorage.getItem('ru') || 'ru',
  pressedKeys: new Set(),
  init() {

    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys(this.langs[`${this.currentLang}`], this.case));

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
    this.physKeyboardHandler()
  },

  _createKeys(lang, keyCase) {

    const keys = lang;
    const fragment = document.createDocumentFragment();
    const keyClass = Object.keys(keys)
    const keyLayout = Object.values(keys)
    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key, index) => {
      const keyElement = document.createElement("button");
      keyElement.innerHTML = `<span>${key[keyCase]}</span>`



      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.classList.add(`${keyClass[index]}`)
      const insertLineBreak = ["Backspace", "Enter", "?"].indexOf(keyElement.classList[1]) !== -1;
      switch (key[0]) {

        case "Backspace":

          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;
        case ('Shift'):
          keyElement.addEventListener("click", () => {
            console.log('asdasd')
            keyElement.classList.toggle(this.properties.shift)
            this._toggleShift()
          })
          break;
        case "CapsLock":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.attributes.id = 'caps'

          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {

            this._toggleCapsLock()
          });
          keyElement.addEventListener("click", () => {
            // keyElement.classList.toggle("keyboard__key--active");

            keyElement.classList.toggle(this.properties.capsLock)
          });

          break;

        case "Enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.style.width = 16 + '%'
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;
        case "Tab":
          keyElement.style.width = 9 + '%'
          keyElement.addEventListener("click", () => {
            this.properties.value += "\t";
            this._triggerEvent("oninput");
          });

          break;
        case " ":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          // keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += keyElement.childNodes[0].textContent
            this._triggerEvent("oninput");

          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }

    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleShift() {
    let wrap = document.querySelector('.keyboard__keys');
    this.properties.shift = !this.properties.shift;

    if (this.properties.shift) {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.changeBackShift()
    } else {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
    }



  },
  _toggleCapsLock() {
    let wrap = document.querySelector('.keyboard__keys')
    this.properties.capsLock = !this.properties.capsLock;
    if (this.properties.capsLock) {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.changeBackCaps()

    } else {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
    }
  },
  changeBackShift() {
    let shift = document.querySelector('.ShiftLeft')
    shift.classList.add('test')
  },
  changeBackCaps() {
    let cap = document.querySelector('.CapsLock')
    cap.classList.add('keyboard__key--active')
  },
  _setLang(e) {
    let cap = document.querySelector('.CapsLock')
    let wrap = document.querySelector('.keyboard__keys')
    const keyboard = document.querySelector('.keyboard__keys')
    this.pressedKeys.add(e.code)
    if (this.pressedKeys.has('ControlLeft') && this.pressedKeys.has('AltLeft')) {
      if (keyboard.classList.contains('ru') && !cap.classList.contains('keyboard__key--active')) {
        keyboard.classList.remove('ru');
        keyboard.classList.add('en')
        this.currentLang = 'en'
        wrap.innerHTML = ''
        wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
        console.log(this.pressedKeys)
        this.pressedKeys.clear()
        console.log(this.pressedKeys)
      } else if (keyboard.classList.contains('ru') && cap.classList.contains('keyboard__key--active')) {
        keyboard.classList.remove('ru');
        keyboard.classList.add('en')
        this.currentLang = 'en'
        wrap.innerHTML = ''
        wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
        this.changeBackCaps()
        
        this.pressedKeys.clear()
    }else if (keyboard.classList.contains('en') && !cap.classList.contains('keyboard__key--active')) {
      keyboard.classList.remove('en');
      keyboard.classList.add('ru')
      this.currentLang = 'ru'
      wrap.innerHTML = ''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      this.pressedKeys.clear()
  }else if (keyboard.classList.contains('en') && cap.classList.contains('keyboard__key--active')) {
    keyboard.classList.remove('en');
    keyboard.classList.add('ru')
    this.currentLang = 'ru'
    wrap.innerHTML = ''
    wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
    this.changeBackCaps()

    this.pressedKeys.clear()
}

  }
},
  open(initialValue, oninput, onclose) {
    const keyboard = document.querySelector('.keyboard__keys')
    keyboard.classList.add('ru')
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
    document.addEventListener('keydown', (e) => {
      const key = document.querySelector(`.${e.code}`);
      this.pressedKeys.add(key)
      this._setLang(e)
    })
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
  physKeyboardHandler() {
    document.addEventListener('keydown',this.keydownHandler)
    document.addEventListener('keyup',this.keydownHandler)
  },
  keydownHandler(e) {
    const {code, type} = e;
    const nodeArray = Array.from(Keyboard.elements.keys)

    // const keyObj = Keyboard.elements.keys.find(key => key.code === code)
    const keyObj = nodeArray.find((key) => key.className.split(' ')[1] === code)
    console.log(keyObj)
    if(!keyObj) return;
    keyObj.classList.add('test')
    if(type === 'keyup') {
      keyObj.classList.remove('test')
    }
  },


};

window.addEventListener("DOMContentLoaded", function () {
  localStorage.setItem('keyboardLang', this.currentLang);
  Keyboard.init();
});
document.addEventListener('keyup', (e) => {
  Keyboard.pressedKeys.clear();
});