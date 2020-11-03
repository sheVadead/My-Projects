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
    shift: false,
    voice: false,
    voiceButtons: true,
  },
  isFirst: true,
  keyboardWrap: document.querySelector('.keyboard__keys'),
  case: 0,
  langs: {
    ru,
    en
  },
  display: document.querySelector('.use-keyboard-input'),
  currentLang: localStorage.getItem('ru') || 'ru',
  pressedKeys: new Set(),
  recognition: new webkitSpeechRecognition(),
  allKeyBoard: document.querySelector('.keyboard'),
  doneButton: document.querySelector('.Done'),
  isRec: false,
  audioPlay: document.querySelector('audio'),
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
      const span = document.createElement('span');
      span.textContent = `${key[keyCase]}`;
      keyElement.appendChild(span)




      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      keyElement.classList.add(`${keyClass[index]}`)
      const insertLineBreak = ['Backspace', 'Enter', 'Backslash', 'Speech'].indexOf(keyElement.classList[1]) !== -1;
      console.log(insertLineBreak)
 
      switch (key[0]) {
        


        case "⬅":
         
          keyElement.style.backgroundColor = 'rgb(216, 216, 216)'
        keyElement.addEventListener('click',()=>{
          Keyboard.audioHandler('default',Keyboard.currentLang)
          const { selectionStart: start } = Keyboard.display;
          Keyboard.setPositionCursor(start - 1);
        })
          
          break;
          case "➡":
           
            keyElement.style.backgroundColor = 'rgb(216, 216, 216)'
            keyElement.addEventListener('click',()=>{
              Keyboard.audioHandler('default',Keyboard.currentLang)
              const { selectionStart: start } = Keyboard.display;
              Keyboard.setPositionCursor(start + 1);
            })
              
              break;
        case "":
          
          keyElement.style.backgroundColor = 'rgb(216, 216, 216)'
          keyElement.innerText = `${this.currentLang}`.toUpperCase()
          keyElement.addEventListener('click', () => {
            this.audioHandler('default',Keyboard.currentLang)
            this._setLang(event)
          })
          break;
        case `sound`:
          keyElement.innerHTML = createIconHTML("volume_up");
          keyElement.classList.add("keyboard__key--activatable")
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            
            Keyboard.audioHandler("default", Keyboard.currentLang);
            Keyboard.properties.voiceButtons = !Keyboard.properties
              .voiceButtons;
            keyElement.classList.toggle("keyboard__key--active");
            Keyboard.display.focus();
          });
          Keyboard.properties.voiceButtons ?
            keyElement.classList.add("keyboard__key--active") :
            keyElement.classList.remove("keyboard__key--active");
          break;
        case "Backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.audioHandler("backspace", Keyboard.currentLang);
            const {
              selectionStart: start,

            } = Keyboard.display;
            let text = this.properties.value;
            let position = this.display.selectionStart

            let b = text.substring(0, position - 1) + text.substring(position)
            this.properties.value = b
            this._triggerEvent("oninput");
            this.setPositionCursor(start - 1);
          });

          break;
        case ('Shift'):
          keyElement.classList.add("keyboard__key--wide");
          keyElement.classList.add("keyboard__key--activatable")
          keyElement.addEventListener("click", () => {
            this.audioHandler("space", Keyboard.currentLang);
            keyElement.classList.toggle(this.properties.shift)
            keyElement.classList.toggle('keyboard__key--active')
            this._toggleShift()
          })
          break;
        case "CapsLock":

          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.attributes.id = 'caps'

          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            keyElement.classList.toggle('keyboard__key--active')
            this._toggleCapsLock()

          });
          keyElement.addEventListener("click", () => {
            this.audioHandler("capslock", Keyboard.currentLang);
            keyElement.classList.toggle(this.properties.capsLock)
          });

          break;

        case "Enter":


          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.audioHandler("enter", Keyboard.currentLang);
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;
        case "Tab":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.addEventListener("click", () => {
            this.audioHandler('default',Keyboard.currentLang)
            this.properties.value += "\t";
            this._triggerEvent("oninput");
          });

          break;

        case "voice":
          
          keyElement.classList.add("keyboard__key--wide");
          keyElement.classList.add("keyboard__key--activatable")

          keyElement.innerHTML = createIconHTML("settings_voice");

          keyElement.addEventListener("click", () => {
            this.display.focus()
            this.voiceButtonHandler()
            this.audioHandler('default',Keyboard.currentLang)
          });

          break;
        case " ":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
              this.audioHandler('default', Keyboard.currentLang)
            
            const {
              value: value,
              selectionStart: start,
              selectionEnd: end,
            } = Keyboard.display;
            Keyboard.properties.value = `${value.substring(
              0,
              start
            )} ${value.substring(end)}`;
            this._triggerEvent("oninput");
            Keyboard.setPositionCursor(start + 1);
          });
          

          break;

        case "done":
          keyElement.addEventListener("click", ()=>{
            this.audioHandler('default', Keyboard.currentLang)
           })
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:

          let textLength = keyElement.childNodes[0].innerText.length

          // keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", (e) => {
            Keyboard.audioHandler("default", Keyboard.currentLang);
            if (textLength < 2 && keyElement.childNodes[0].innerText !== '⬅' && keyElement.childNodes[0].innerText !== '➡') {
              const {
                selectionStart: start,

              } = Keyboard.display;
              let text = this.properties.value;
              let position = this.display.selectionStart;
              let b = text.substring(0, position) + keyElement.childNodes[0].textContent + text.substring(position);
              Keyboard.properties.value = b;
              this._triggerEvent("oninput");


              this.setPositionCursor(start + 1);
            }


          });

          keyElement.addEventListener("mousedown", (e) => {
            keyElement.classList.add('test')
          })
          keyElement.addEventListener("mouseup", (e) => {
            keyElement.classList.remove('test')
          })
          break;
      }

      keyElement.addEventListener("click", this.audioHandler)
      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        let br = document.createElement("div");
        br.classList.add('break')
        fragment.appendChild(br);
        console.log(fragment)
      }

    });

    return fragment;
  },

  _triggerEvent(handlerName) {

    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
    this.display.focus()
  },
  _toggleShift() {
    let wrap = document.querySelector('.keyboard__keys');
    let shift = document.querySelector('.ShiftLeft');
    this.properties.shift = !this.properties.shift;
    if (this.properties.shift) {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.changeBackShift()
      this.elements.keys = wrap.childNodes

    } else {
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      this.elements.keys = wrap.childNodes
    }



  },
  _toggleCapsLock() {
    let wrap = document.querySelectorAll('.keyboard__keys')
    let test = document.querySelector('.Digit8')
    this.properties.capsLock = !this.properties.capsLock;
    if (this.properties.capsLock) {

      this.elements.keys.forEach(item => {
        if (item.textContent.length == 1) {
          item.textContent = item.textContent.toUpperCase()
        }
      })
    } else {

      this.elements.keys.forEach(item => {

        if (item.textContent.length == 1) {
          item.textContent = item.textContent.toLowerCase()
        }
      })
    }
  },
  changeBackShift() {

    let wrap = document.querySelector('.keyboard__keys');

    let shift = document.querySelector('.ShiftLeft');
    if (this.properties.capsLock) {
      this.properties.capsLock = !this.properties.capsLock;
      this.properties.shift = !this.properties.shift
      wrap.innerHTML = ''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      this.elements.keys = wrap.childNodes
    } else if (shift.classList.contains('test')) {
      wrap.innerHTML = ''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.elements.keys = wrap.childNodes
    } else {
      wrap.innerHTML = ''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.elements.keys = wrap.childNodes
      let shift = document.querySelector('.ShiftLeft');
      shift.classList.add('keyboard__key--active')
    }
  },
  changeBackCaps() {
    let cap = document.querySelector('.CapsLock')
    cap.classList.add('keyboard__key--active')
  },
  styleForShift() {
    let shift = document.querySelector('.ShiftLeft');
    shift.classList.toggle('test')
  },
  _setLang(e) {

    let cap = document.querySelector('.CapsLock')
    let wrap = document.querySelector('.keyboard__keys')
    const keyboard = document.querySelector('.keyboard__keys')
    this.pressedKeys.add(e.target.closest('button').classList[1])

    // if (this.pressedKeys.has('ControlLeft') && this.pressedKeys.has('AltLeft')) {

    if (keyboard.classList.contains('ru') && !cap.classList.contains('keyboard__key--active')) {
      keyboard.classList.remove('ru');
      keyboard.classList.add('en');
      this.currentLang = 'en'
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      let wrapS = document.querySelector('.keyboard__keys')
      this.elements.keys = wrapS.childNodes
      this.pressedKeys.clear()

    } else if (keyboard.classList.contains('ru') && cap.classList.contains('keyboard__key--active')) {
      keyboard.classList.remove('ru');
      keyboard.classList.add('en')
      this.currentLang = 'en'
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      let wrapS = document.querySelector('.keyboard__keys')
      this.elements.keys = wrapS.childNodes
      this.elements.keys.forEach(item => {
        if (item.textContent.length == 1) {
          item.childNodes[0].innerText = item.textContent.toUpperCase()
        }
      })

      this.changeBackCaps()
      this.pressedKeys.clear()
    } else if (keyboard.classList.contains('en') && !cap.classList.contains('keyboard__key--active')) {
      keyboard.classList.remove('en');
      keyboard.classList.add('ru')
      this.currentLang = 'ru'
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      let wrapS = document.querySelector('.keyboard__keys')
      this.elements.keys = wrapS.childNodes
      this.pressedKeys.clear()
    } else if (keyboard.classList.contains('en') && cap.classList.contains('keyboard__key--active')) {
      keyboard.classList.remove('en');
      keyboard.classList.add('ru')
      this.currentLang = 'ru'
      while (wrap.firstChild) {
        wrap.removeChild(wrap.firstChild)
      }
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      let wrapS = document.querySelector('.keyboard__keys')
      this.elements.keys = wrapS.childNodes
      this.elements.keys.forEach(item => {

        if (item.innerText.length == 1) {
          item.childNodes[0].innerText = item.textContent.toUpperCase()
        }
      })
      this.changeBackCaps()

      this.pressedKeys.clear()
    }



    // }
  },

  open(initialValue, oninput, onclose) {
    const keyboard = document.querySelector('.keyboard__keys')
    if (this.isFirst) {
      keyboard.classList.toggle('ru');
      this.isFirst = false;
    }
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
    document.addEventListener('keydown', (e) => {
      const key = document.querySelector(`.${e.code}`);
      this.pressedKeys.add(key)

    })
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
    this.doneButton.addEventListener('click', () => {
      this.elements.main.classList.add("keyboard--hidden");
    })
  },
  physKeyboardHandler() {
    document.addEventListener('keydown', () => {
      this.keydownHandler(event);
      this.physKeyboardValue(event)
    })
    document.addEventListener('keyup', this.keydownHandler)

  },
  keydownHandler(e) {
    const {
      code,
      type,
      target
    } = e;
    const nodeArray = Array.from(Keyboard.elements.keys)
    // const keyObj = Keyboard.elements.keys.find(key => key.code === code)
    const keyObj = nodeArray.find((key) => key.className.split(' ')[1] === code)

    if (!keyObj) return;
    keyObj.classList.add('test')
    if (type === 'keyup') {
      keyObj.classList.remove('test')
    }
  },
  audioHandler(type, lang) {

    if (Keyboard.properties.voiceButtons) {
      if (type === "default" && lang === "en") {
        type = "audio_en";
      } else if (type === "default" && lang === "ru") {
        type = "audio_ru";
      } else if (type === "shift") {
        type = "shift";
      } else if (type === "backspace") {
        type = "backspace";
      } else if (type === "caps") {
        type = "caps";
      } else if (type === "enter") {
        type = "enter";
      }

      let audio = document.querySelector(`audio[id="${type}"]`);
      audio.currentTime = 0;
      audio.play();
    }
  },
  physKeyboardValue(e) {
    const {
      code,
      key,
      target
    } = e;

    if (key.length < 2) {
      this.properties.value += key
      this.display.focus();
    }
    if (key == 'Backspace') {
      this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)

    } else if (key == "CapsLock") {
      document.querySelector('.CapsLock').classList.toggle('keyboard__key--active');

      this._toggleCapsLock()
      this.display.focus();
    } else if (key == "Enter") {
      this.properties.value += `\n`
      this.display.focus();

    } else if (code === 'Tab') {
      e.preventDefault()
      Keyboard.display.value += '\t';
      this.display.focus();
    } else if (code === 'ShiftLeft') {
      this._toggleShift()
    }
  },

  speechRecognitionOn() {

    let recognitionLang = this.currentLang
    this.recognition.interimResults = true;
    this.recognition.lang = `${recognitionLang}`;
    this.recognition.maxAlternatives = 1;
    this.recognition.interimResults = false;

    this.isRec = !this.isRec
    if (Keyboard.isRec) {
      this.recognition.start()
      this.recognition.addEventListener("end", this.recognition.start);
      this.recognition.addEventListener('result', this.addResultVoice)
    } else {
      this.recognition.removeEventListener("end", this.recognition.start);
      this.recognition.removeEventListener('result', this.addResultVoice);
      this.recognition.stop();
    }
  },
  setPositionCursor(position) {
    Keyboard.display.focus();
    Keyboard.display.selectionStart = position;
    Keyboard.display.selectionEnd = position;
  },
  addResultVoice(e) {
    const transcript = Array.from(e.results)
      .map(item => item[0])
      .map(item => item.transcript);
    if (e.results[0][0].confidence > 0.8) {
      Keyboard.properties.value += transcript + ' '
      Keyboard._triggerEvent("oninput");
    }
  },
  voiceButtonHandler() {
    let speech = document.querySelector('.Speech')
    this.properties.voice = !this.properties.voice;
    if (this.properties.voice) {
      speech.classList.add('keyboard__key--active')
      this.speechRecognitionOn()
    } else {
      speech.classList.remove('keyboard__key--active');
      this.speechRecognitionOn()
    }
  }

};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();

});
document.addEventListener('keyup', (e) => {
  Keyboard.pressedKeys.clear();
});
document.addEventListener('keyup', (e) => {
  Keyboard.properties.value = Keyboard.display.value
})

// .addEventListener('click', Keyboard.display.focus())