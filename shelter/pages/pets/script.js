let petsObject = {
    classes: {
        petsBlocks: document.querySelectorAll('.first-line__item'),
        firstLine: document.querySelector('.first-line'),
        pageButton: document.querySelectorAll('.pages-content__button'),
        pageNumber: document.querySelector('.page-number'),
        modalWindow: document.querySelector('#modal'),
        modalName: document.querySelector('.modal-name'),
        typeBreed: document.querySelector('.type-breed'),
        modalmodalDescription: document.querySelector('.modal__description'),
        petAge: document.querySelector('.age-info'),
        petInoculations: document.querySelector('.inoculations-info'),
        petDiseases: document.querySelector('.diseases-info'),
        petParasites: document.querySelector('.parasites-info'),
        modalImg: document.querySelector('.modal-img'),
        overlay: document.querySelector('#overlay'),
        closePopupButton: document.querySelector('.close-button'),
        burger: document.querySelector('.burger'),
        overflow: document.querySelector('.burger-overflow-hidden'),
        navigationBlock: document.querySelector('.main-navigation')
    },
    pages: 1,
    allPages: '',
    blocksArray: [],
    sendRequest() {
        return fetch('../main/data.json').then(response => response.json()).then(petsData => {
            this.initPetsBlocks(petsData)
            this.renderBlocks();
            this.initModal(petsData);
            this.initModalContent(petsData)
        })
    },
    initPetsBlocks(petsData) {
        let paginationArray = [];
        for (let i= 0; i < 6; i++) {
            paginationArray.push(petsData)
        }
        let paginationArrayFlat = paginationArray.flat();
        let set2 = new Set();
        if (1280 <= screen.width) {
            petsObject.allPages = 6;
            for (let i =0; i<6; i++) {
                while (set2.size <8) {
                    let randomInt = Math.floor( Math.random() * (paginationArrayFlat.length));
                    
                    set2.add(paginationArrayFlat[randomInt])
                }
                petsObject.blocksArray.push(Array.from(set2));
                set2.clear()
            }
        } else if (768 <= screen.width && screen.width < 1280) {
            petsObject.allPages = 8;
            for (let i =0; i<8; i++) {
            while (set2.size <6) {
                
                let randomInt = Math.floor( Math.random() * (paginationArrayFlat.length));
                
                set2.add(paginationArrayFlat[randomInt])
                
            }
            
            petsObject.blocksArray.push(Array.from(set2));
            console.log(Array.from(set2))
                set2.clear()
        }
        } else if (320<=screen.width && screen.width < 768) {
            petsObject.allPages = 16;
            for (let i =0; i<16; i++) {
            while (set2.size < 3) {
                let randomInt = Math.floor( Math.random() * (paginationArrayFlat.length));
                set2.add(paginationArrayFlat[randomInt])
            }
            petsObject.blocksArray.push(Array.from(set2));
                set2.clear()
        }
    }
        // petsObject.pages = petsObject.blocksArray.length
    },
    renderBlocks() {
        petsObject.classes.pageNumber.textContent = petsObject.pages
        petsObject.blocksArray[petsObject.pages  - 1].map(item=>{
            let appendItem = document.createElement('div')
            appendItem.classList.add('first-line__item');
            let img = document.createElement('img');
            img.src = item.img;
            img.classList.add('pets-img')
            let spanItem = document.createElement('span')
            spanItem.classList.add('item-name');
            spanItem.textContent = item.name
            let button = document.createElement('button');
            button.textContent = 'Learn more'
            button.classList.add('item-button')
            petsObject.classes.firstLine.insertBefore(appendItem, petsObject.classes.firstLine.firstChild)
            appendItem.appendChild(img)
            appendItem.appendChild(spanItem)
            appendItem.appendChild(button)
        })
    },
    handlers() {
        petsObject.classes.pageButton[1].disabled =  'true';
        petsObject.classes.pageButton[3].addEventListener('click',()=>{
            petsObject.classes.pageButton[0].classList.remove('inactive')
          petsObject.pages = petsObject.pages + 1
          petsObject.classes.pageButton[1].disabled =  '';
          petsObject.classes.pageButton[1].classList.remove('inactive')
         while( petsObject.classes.firstLine.firstChild) {
          petsObject.classes.firstLine.removeChild(petsObject.classes.firstLine.firstChild)
         }
         petsObject.classes.pageButton[0].disabled =  '';
              petsObject.classes.pageButton[0].classList.remove('inactive')
         if(!petsObject.blocksArray[petsObject.pages]) {
              petsObject.classes.pageButton[3].disabled =  'true';
              petsObject.classes.pageButton[3].classList.add('inactive')
              petsObject.classes.pageButton[4].disabled =  'true';
              petsObject.classes.pageButton[4].classList.add('inactive')
              
         } else {
            
            petsObject.classes.pageButton[3].classList.remove('inactive')
         }
         
          this.renderBlocks()
        })
       
        petsObject.classes.pageButton[1].addEventListener('click',()=>{
            petsObject.pages = petsObject.pages - 1;
            petsObject.classes.pageButton[4].disabled =  '';
            petsObject.classes.pageButton[4].classList.remove('inactive')
            petsObject.classes.pageButton[3].disabled =  '';
            petsObject.classes.pageButton[3].classList.remove('inactive')
            while( petsObject.classes.firstLine.firstChild) {
                petsObject.classes.firstLine.removeChild(petsObject.classes.firstLine.firstChild)
               }
            if(petsObject.pages == 1) {
                petsObject.classes.pageButton[0].classList.add('inactive')
                petsObject.classes.pageButton[1].classList.add('inactive')
                petsObject.classes.pageButton[1].disabled =  'true';
                petsObject.classes.pageButton[0].disabled =  'true';
            }
            this.renderBlocks()
        })
        petsObject.classes.pageButton[4].addEventListener('click', ()=>{
            petsObject.pages = petsObject.allPages;
            petsObject.classes.pageButton[0].classList.remove('inactive')
            petsObject.classes.pageButton[0].disabled =  '';
            petsObject.classes.pageButton[4].disabled =  'true';
            petsObject.classes.pageButton[4].classList.add('inactive')
            petsObject.classes.pageButton[1].classList.remove('inactive')
            petsObject.classes.pageButton[3].disabled =  'true';
            petsObject.classes.pageButton[3].classList.add('inactive')
            petsObject.classes.pageButton[1].disabled =  '';
            while( petsObject.classes.firstLine.firstChild) {
                petsObject.classes.firstLine.removeChild(petsObject.classes.firstLine.firstChild)
               }
            this.renderBlocks()
        })
        petsObject.classes.pageButton[0].addEventListener('click', ()=>{
            petsObject.pages = 1;
            petsObject.classes.pageButton[0].disabled =  'true';
            petsObject.classes.pageButton[0].classList.add('inactive');
            petsObject.classes.pageButton[1].disabled =  'true';
            petsObject.classes.pageButton[1].classList.add('inactive');
            petsObject.classes.pageButton[4].classList.remove('inactive')
            petsObject.classes.pageButton[3].classList.remove('inactive')
            petsObject.classes.pageButton[4].disabled =''
            petsObject.classes.pageButton[3].disabled =''
            while( petsObject.classes.firstLine.firstChild) {
                petsObject.classes.firstLine.removeChild(petsObject.classes.firstLine.firstChild)
               }
            this.renderBlocks()
        })
    },
    initModal(petsData) {
        petsObject.classes.firstLine.addEventListener('click', function (e) {
            let petsBlock = e.target.closest('.first-line__item');
            console.log(petsBlock)
            if (petsBlock) {
                petsObject.classes.modalWindow.classList.add('active')
                petsObject.classes.overlay.classList.add('active')
                document.body.style.overflow = 'hidden';
            }
            petsObject.classes.overlay.addEventListener('click', function (e) {
                if (petsObject.classes.overlay.classList.contains('active')) {
                    petsObject.classes.overlay.classList.remove('active')
                    petsObject.classes.modalWindow.classList.remove('active')
                    document.body.style.overflow = '';
                }
            })
            petsObject.classes.closePopupButton.addEventListener('click', function (e) {
                petsObject.classes.overlay.classList.remove('active')
                petsObject.classes.modalWindow.classList.remove('active')
                document.body.style.overflow = '';
            })

        });
    },
    initModalContent(petsData) {
        let popupItem;
        petsObject.classes.firstLine.addEventListener('click', function (e) {
            let petsBlock = e.target.closest('.first-line__item');
            console.log(petsData)
            let popupName = petsBlock.childNodes[1].innerText
            console.log(petsBlock.childNodes)
            petsData.map((item) => {
                if (item.name == popupName) {
                    popupItem = item;
                }
            })
            petsObject.classes.modalName.textContent = popupItem.name;
            petsObject.classes.typeBreed.textContent = `${popupItem.type} - ${popupItem.breed}`;
            petsObject.classes.modalmodalDescription.textContent = popupItem.description;
            petsObject.classes.petAge.textContent = popupItem.age;
            petsObject.classes.petInoculations.textContent = popupItem.inoculations;
            petsObject.classes.petDiseases.textContent = popupItem.diseases;
            petsObject.classes.petParasites.textContent = popupItem.parasites;
            petsObject.classes.modalImg.src = popupItem.img
        })

    },
    initBurgerMenu () {
        petsObject.classes.burger.addEventListener('click', this.burgerHandler)
        petsObject.classes.overflow.addEventListener('click',()=>{
            petsObject.classes.burger.classList.remove('burger__active');
            petsObject.classes.navigationBlock.classList.remove('slide-in');
            petsObject.classes.overflow.classList.remove('blackout');
            document.body.style.overflow = ''
        })
    },
    burgerHandler() {
        console.log(petsObject.classes.overflow)
        petsObject.classes.burger.classList.toggle('burger__active');
        petsObject.classes.navigationBlock.classList.toggle('slide-in');
        petsObject.classes.overflow.classList.toggle('blackout');
        
        if (petsObject.classes.burger.classList.contains('burger__active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        
    },
    init() {
        this.sendRequest();
        this.handlers()
        this.initBurgerMenu ()
        
    }
}

petsObject.init()