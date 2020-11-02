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
  },
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
      const insertLineBreak = [].indexOf(keyElement.classList[1]) !== -1;
      switch (key[0]) {

        case "":
        keyElement.innerText = `${this.currentLang}`.toUpperCase()
        keyElement.addEventListener('click',()=> {  
          this._setLang(event)
          console.log('qweqweqwe')
        })
          break;


        case "Backspace":
          
          
          
         
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            let text = this.properties.value;
           let position =  this.display.selectionStart

           let b = text.substring(0, position - 1) + text.substring(position)
            console.log(b)
            // this.properties.value = this.properties.value.split('').splice(this.display.selectionStart,1).join('') ;
            this.properties.value = b
            this._triggerEvent("oninput");
            this.display.focus()
          });

          break;
        case ('Shift'):
          keyElement.classList.add("keyboard__key--activatable")
          keyElement.addEventListener("click", () => {
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
            keyElement.classList.toggle(this.properties.capsLock)
          });

          break;

        case "Enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;
        case "Tab":
          keyElement.addEventListener("click", () => {
            this.properties.value += "\t";
            this._triggerEvent("oninput");
          });

          break;
         
        case "voice":
          keyElement.classList.add("keyboard__key--activatable")

          keyElement.innerHTML = createIconHTML("settings_voice");

          keyElement.addEventListener("click", () => {
            this.display.focus()
            this.voiceButtonHandler()

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
          keyElement.classList.add("keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.style.position = 'absolute'
          keyElement.style.left = 0;
          keyElement.style.bottom = 56 + 'px';
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
      
          break;

        default:
          
          let textLength = keyElement.childNodes[0].innerText.length
          
          // keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", (e) => {
            if (textLength < 2 && keyElement.childNodes[0].innerText!=='⬅' && keyElement.childNodes[0].innerText!=='➡') {
              console.log(this.display.selectionStart)
              let text = this.properties.value;
              let position =  this.display.selectionStart;
           let b = text.substring(0, position) + keyElement.childNodes[0].innerText + text.substring(position)
           Keyboard.properties.value = b
              this._triggerEvent("oninput");
             
            }
          

          });
          
          keyElement.addEventListener("mousedown", (e)=>{
            keyElement.classList.add('test')
          })
          keyElement.addEventListener("mouseup", (e)=>{
            keyElement.classList.remove('test')
          })
          break;
      }
      keyElement.addEventListener("click", (e) => {
        
        const audio = document.querySelector('audio');
        audio.currentTime = 0;
        audio.play()
      })
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
    console.log(wrap)
    this.properties.capsLock = !this.properties.capsLock;

    console.log(this.properties.capsLock)
    if (this.properties.capsLock) {
        
      this.elements.keys.forEach(item => {
        
        if (item.textContent.length == 1 ) {
          item.textContent = item.textContent.toUpperCase()
        }
      })
    } else {

      this.elements.keys.forEach(item => {
        
        if (item.textContent.length == 1 ) {
          item.textContent = item.textContent.toLowerCase()
        }
      })
    }
  },
  changeBackShift() {

    let wrap = document.querySelector('.keyboard__keys');
   
    let shift = document.querySelector('.ShiftLeft');
    console.log(shift)
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
          console.log('asd')
          this.currentLang = 'en'
          while(wrap.firstChild) {
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
          while(wrap.firstChild) {
            wrap.removeChild(wrap.firstChild)
          }
          wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
          let wrapS = document.querySelector('.keyboard__keys')
          this.elements.keys = wrapS.childNodes
          this.elements.keys.forEach(item => {
            if (item.textContent.length == 1 ) {
              item.childNodes[0].innerText = item.textContent.toUpperCase()
            }
          })
        
          this.changeBackCaps()
          this.pressedKeys.clear()
        } else if (keyboard.classList.contains('en') && !cap.classList.contains('keyboard__key--active')) {
          keyboard.classList.remove('en');
          keyboard.classList.add('ru')
          this.currentLang = 'ru'
          while(wrap.firstChild) {
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
          while(wrap.firstChild) {
            wrap.removeChild(wrap.firstChild)
          }
          wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
          let wrapS = document.querySelector('.keyboard__keys')
          this.elements.keys = wrapS.childNodes
          this.elements.keys.forEach(item => {
            
            if (item.innerText.length == 1 ) {
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
    keyboard.classList.add('ru')
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
    this.doneButton.addEventListener('click', ()=>{
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

  physKeyboardValue(e) {
    const {
      code,
      key,
      target
    } = e;
    const audio = document.querySelector('audio');
    const audioSpace = document.querySelector('.space')

    audio.currentTime = 0;
    audio.play()
    console.log(this.display.selectionStart)
    if (key.length < 2) {
      this.properties.value += key
      this.display.focus();
    }
    if (key == 'Backspace') {
      this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
      audio.currentTime = 0;
      audioSpace.play();

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
      console.log(Keyboard.properties.value)
    }
    else if (code === 'ShiftLeft') {
      this.  _toggleShift()
    }
  },

  speechRecognitionOn() {

    let recognitionLang = this.currentLang
    this.recognition.interimResults = true;
    this.recognition.lang = `${recognitionLang}`;
    this.recognition.maxAlternatives = 1;
    this.recognition.interimResults = false;
    this.recognition.start()
    this.recognition.addEventListener('end', this.recognition.start)
    this.recognition.addEventListener('result', e => {
      
      const transcript = Array.from(e.results)
        .map(item => item[0])
        .map(item => item.transcript);
      console.log(e)
      if (e.results[0][0].confidence > 0.7) {
        
        this.properties.value += transcript
        this._triggerEvent("oninput");
      }

    })

    // let speech = document.querySelector('.Speech')
    // recognition.addEventListener('end', recognition.start)
    // this.recognition.addEventListener('speechend', ()=>{
    //   speech.classList.remove('keyboard__key--active');
    //   console.log("Off");
    //   Keyboard.properties.voice = !Keyboard.properties.voice;
    //   recognition.abort();
    // })




  },
  setPositionCursor(position) {
    Keyboard.display.focus();
    Keyboard.properties.value.selectionStart = position;
    Keyboard.elements.textarea.selectionEnd = position;
  },

  voiceButtonHandler() {
    let speech = document.querySelector('.Speech')
    this.properties.voice = !this.properties.voice;
    console.log(this.properties.voice)
    if (this.properties.voice) {
      speech.classList.add('keyboard__key--active')
      this.speechRecognitionOn()
    } else {
      speech.classList.remove('keyboard__key--active');
      this.recognition.removeEventListener('end', this.recognition.start);
    }
  }

};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();

});
document.addEventListener('keyup', (e) => {
  Keyboard.pressedKeys.clear();
});
document.addEventListener('keyup',(e)=>{
 Keyboard.properties.value =  Keyboard.display.value
})

// .addEventListener('click', Keyboard.display.focus())