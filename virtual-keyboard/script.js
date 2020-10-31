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
  display: document.querySelector('.use-keyboard-input'),
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
            keyElement.classList.toggle(this.properties.shift)
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
          keyElement.addEventListener("click", (e) => {
            if(keyElement.querySelector('span').textContent !== 'Ctrl' && keyElement.querySelector('span').textContent !== 'Alt' && keyElement.querySelector('span').textContent !== 'Alt Gr'&& keyElement.querySelector('span').textContent !== 'Del') {
              this.properties.value += keyElement.childNodes[0].textContent
              this._triggerEvent("oninput");
              const {code, key, target} = e;
              const audio = document.querySelector('audio');
              
            audio.currentTime = 0;
            audio.play()
            }
            

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
    let wrap = document.querySelectorAll('.keyboard__keys > button > span')
    let test = document.querySelector('.Digit8')
 
    this.properties.capsLock = !this.properties.capsLock;
    console.log(wrap)
    console.log(  this.properties.capsLock)
    if (this.properties.capsLock) {
      wrap.forEach(item => {
        if(item.textContent !== 'Shift'  && item.textContent !== 'Tab' && item.textContent !== 'Del' && item.textContent !== 'Ctrl' && item.textContent !== 'Alt' && item.textContent !== 'Alt Gr' && item.textContent !== 'Win') {
          item.textContent = item.textContent.toUpperCase()
        }
      })
    } else {
      
      wrap.forEach(item => {
        if(item.textContent !== 'Shift'  && item.textContent !== 'Tab' && item.textContent !== 'Del' && item.textContent !== 'Ctrl' && item.textContent !== 'Alt' && item.textContent !== 'Alt Gr' && item.textContent !== 'Win'){
          item.textContent= item.textContent.toLowerCase()
        }
      })
    }
  },
  changeBackShift() {

    let wrap = document.querySelector('.keyboard__keys');
    let shift = document.querySelector('.ShiftLeft');
    console.log(shift)
    if(this.properties.capsLock) {
      this.properties.capsLock = !this.properties.capsLock;
      this.properties.shift = !this.properties.shift
      wrap.innerHTML =''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
      this.elements.keys = wrap.childNodes
    } else if(shift.classList.contains('test')) {
      wrap.innerHTML =''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`],1))
    }
    else {
      wrap.innerHTML =''
      wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 1))
      this.elements.keys = wrap.childNodes
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
    this.pressedKeys.add(e.code)
    if (this.pressedKeys.has('ControlLeft') && this.pressedKeys.has('AltLeft')) {
      if (keyboard.classList.contains('ru') && !cap.classList.contains('keyboard__key--active')) {
        keyboard.classList.remove('ru');
        keyboard.classList.add('en')
        this.currentLang = 'en'
        wrap.innerHTML = ''
        wrap.appendChild(this._createKeys(this.langs[`${this.currentLang}`], 0))
        this.elements.keys = wrap.childNodes

        this.pressedKeys.clear()

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
    document.addEventListener('keydown',() =>{
      this.keydownHandler(event);
      this.physKeyboardValue(event)
    })
    document.addEventListener('keyup',this.keydownHandler)
    
  },
  keydownHandler(e) {
    const {code, type, target} = e;
    const nodeArray = Array.from(Keyboard.elements.keys)

    // const keyObj = Keyboard.elements.keys.find(key => key.code === code)
    const keyObj = nodeArray.find((key) => key.className.split(' ')[1] === code)
  
    if(!keyObj) return;
    keyObj.classList.add('test')
    if(type === 'keyup') {
      keyObj.classList.remove('test')
    }
    
  },

  physKeyboardValue(e) {

    const {code, key, target} = e;
    const audio = document.querySelector('audio');
    const audioSpace = document.querySelector('.space')
  console.log(key)
  audio.currentTime = 0;
  audio.play()
    if(key !== 'Shift'  && key !== 'Tab' && key !== 'Del' && key !== 'Ctrl' && key !== 'Alt' && key !== 'Alt Gr' && key !== 'Win' && key !== 'Backspace'&& key !== 'Enter'){
      this.properties.value += key
      this.display.focus();
    }
    if(key == 'Backspace') {
      this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
      audio.currentTime = 0;
      audioSpace.play();
     
    } else if( key == "CapsLock") {
      document.querySelector('.CapsLock').classList.toggle('keyboard__key--active');
      this._toggleCapsLock()
      this.display.focus();
    }  else if( key == "Enter") {
      this.properties.value += `\n`
      this.display.focus();
   
    } else if ( code === 'Tab') {
      e.preventDefault()
      Keyboard.properties.value += '\t';
      this.display.focus();
    }
  
  }
  
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});
document.addEventListener('keyup', (e) => {
  Keyboard.pressedKeys.clear();
});

window.addEventListener('keydown', (e)=>{

})
// .addEventListener('click', Keyboard.display.focus())