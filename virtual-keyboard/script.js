import ru from "./assets/languages/ru-RU.js";
import en from "./assets/languages/en-En.js";
const keyboarObject = {
    classes: {
        mainWrap: document.querySelector('.main__wrapper'),
        keyboarSec: document.querySelector('.keyboard'),
        display: document.querySelector('.display'),
        keyboardMain: document.querySelector('.keyboard__wrapper__main')
    },
    langs: {
        ru,
        en
    },
    buttonRender() {
        let keys = Object.keys(keyboarObject.langs.ru)
        let keysProp = Object.values(keyboarObject.langs.ru)
        console.log(keysProp)
        keys.map((item, index) => {
            let button = document.createElement('button');
            button.classList.add(`key`)
            button.classList.add(`${item}`)

            let span = document.createElement('span')
            button.appendChild(span)
            if (button.classList.contains('Space')) {
                button.style.width = 39 + '%'

            } else if (button.classList.contains('Tab')) {
                button.style.width = 8.7 + '%'

            } else if (button.classList.contains('Backspace')) {
                button.style.width = 15 + '%'
            } else if (button.classList.contains('Enter')) {
                button.style.width = 14 + '%'

            } else if (button.classList.contains('CapsLock')) {
                button.style.width = 13 + '%'

            } else if (button.classList.contains('ShiftLeft') || button.classList.contains('ShiftRight')) {
                button.style.width = 13.5 + '%'

            } else if (button.classList.contains('ControlLeft') || button.classList.contains('ControlRight')) {
                button.style.width = 9.4 + '%'

            }
            span.innerText = keysProp[index][0]
            keyboarObject.classes.keyboardMain.appendChild(button)
        })

    },
    addHandlers() {
        document.body.addEventListener('keypress', this.physKeyboardHandler)
        keyboarObject.classes.keyboardMain.addEventListener('click', (e)=>{
            this.keyClickTextHandler(e);
            this.capsLockHandler(e)
        })
    },
    physKeyboardHandler(e) {
        keyboarObject.classes.display.textContent += String.fromCharCode(e.keyCode);

    },
    keyClickTextHandler(e) {
        let key = e.target.closest('.key');
        let keyNodes = e.target.closest('.key').childNodes[0];

        if (key.classList.contains('ControlLeft') || key.classList.contains('ControlRight') || key.classList.contains('AltLeft') ||
            key.classList.contains('AltRight') || key.classList.contains('ShiftLeft') || key.classList.contains('MetaLeft') ||
            key.classList.contains('ShiftRight') || key.classList.contains('Delete') || key.classList.contains('CapsLock') ||
            key.classList.contains('ArrowLeft') || key.classList.contains('ArrowDown') || key.classList.contains('ArrowRight') ||
            key.classList.contains('ArrowUp') ) {
            return;
        } else if (key.classList.contains('Backspace')) {
            keyboarObject.backspaceHandler()
        } else if (key.classList.contains('Enter')) {
            keyboarObject.enterHandler()
        } else if (key.classList.contains('Tab')) {
            e.preventDefault();
            keyboarObject.tabHandler()
        } else {
            keyboarObject.classes.display.textContent += keyNodes.textContent
        }



    },
    tabHandler() {
        keyboarObject.classes.display.textContent += `\t`;
    },
    enterHandler() {
        keyboarObject.classes.display.textContent += `\n`;
    },
    backspaceHandler() {
        keyboarObject.classes.display.textContent = keyboarObject.classes.display.textContent.slice(0, keyboarObject.classes.display.textContent.length - 1)
    },
    capsLockHandler(e) {
        let key = e.target.closest('.key');
        let
        if(key.classList.contains('CapsLock')) {
            
        }
    },
    init() {
        this.addHandlers()
        this.buttonRender()
    }
}
keyboarObject.init()