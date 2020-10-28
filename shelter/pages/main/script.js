let shelterObject = {
    classes: {
        navigationItem: document.querySelectorAll('.navigation-link'),
        heroButton: document.querySelector('.hero-button'),
        petsButton: document.querySelector('.pets-button'),
        petsSlider: document.querySelector('.pets__slider'),
        modalWindow: document.querySelector('#modal'),
        overlay: document.querySelector('#overlay'),
        modalName: document.querySelector('.modal-name'),
        typeBreed: document.querySelector('.type-breed'),
        modalmodalDescription: document.querySelector('.modal__description'),
        petAge: document.querySelector('.age-info'),
        petInoculations: document.querySelector('.inoculations-info'),
        petDiseases: document.querySelector('.diseases-info'),
        petParasites: document.querySelector('.parasites-info'),
        modalImg: document.querySelector('.modal-img'),
        closePopupButton: document.querySelector('.close-button'),
        petsSliderItem: document.querySelectorAll('.pets__slider__item'),
        sliderItemImg: document.querySelectorAll('.pets-img'),
        sldierItemName: document.querySelectorAll('.pets-name'),
        petsSlider: document.querySelector('.pets__slider'),
        nextArrow: document.querySelector('.arrow-right'),
        prevArrow: document.querySelector('.arrow-left'),
        burger: document.querySelector('.burger'),
        navigationBlock: document.querySelector('.main-navigation'),
        darkBack: document.querySelector('.dark-back'),
        header: document.querySelector('header'),
        overFlow: document.querySelector('.burger-overflow-hidden')
    },
    iterIndex: 3,
    setArray: [],
    pets: [],
    toThePets() {
        this.classes.heroButton.addEventListener('click', function () {
            document.location = '../pets/index.html'
        })
        this.classes.petsButton.addEventListener('click', function () {
            document.location = '../pets/index.html'
        })
    },
    disableInactive() {
        for (let i = 2; i < this.classes.navigationItem.length; i++) {
            this.classes.navigationItem[i].style.pointerEvents = 'none';
        }
    },
    sendRequest() {
        return fetch('../main/data.json').then(response => response.json()).then(petsData => {
            this.initPopup(petsData)
            this.initModal(petsData)
            this.initPetsBlocks(petsData)
            this.initSlider()
        })
    },
    initPopup(petsData) {
        this.pets = petsData;
        let popupItem;
        this.classes.petsSlider.addEventListener('click', function (e) {
            let petsBlock = e.target.closest('.pets__slider__item');
            let popupName = petsBlock.childNodes[3].innerText
            console.log(petsBlock.childNodes)
            petsData.map((item) => {
                if (item.name == popupName) {
                    popupItem = item;
                }
            })
            shelterObject.classes.modalName.textContent = popupItem.name;
            shelterObject.classes.typeBreed.textContent = `${popupItem.type} - ${popupItem.breed}`;
            shelterObject.classes.modalmodalDescription.textContent = popupItem.description;
            shelterObject.classes.petAge.textContent = popupItem.age;
            shelterObject.classes.petInoculations.textContent = popupItem.inoculations;
            shelterObject.classes.petDiseases.textContent = popupItem.diseases;
            shelterObject.classes.petParasites.textContent = popupItem.parasites;
            shelterObject.classes.modalImg.src = popupItem.img
        })

    },
    initModal(petsData) {
        this.classes.petsSlider.addEventListener('click', function (e) {
            let petsBlock = e.target.closest('.pets__slider__item');
            if (petsBlock) {
                shelterObject.classes.modalWindow.classList.add('active')
                shelterObject.classes.overlay.classList.add('active')
                document.body.style.overflow = 'hidden';
            }
            shelterObject.classes.overlay.addEventListener('click', function (e) {
                if (shelterObject.classes.overlay.classList.contains('active')) {
                    shelterObject.classes.overlay.classList.remove('active');
                    shelterObject.classes.modalWindow.classList.remove('active');
                    document.body.style.overflow = '';
                }
            })
            shelterObject.classes.closePopupButton.addEventListener('click', function (e) {
                shelterObject.classes.overlay.classList.remove('active')
                shelterObject.classes.modalWindow.classList.remove('active')
                document.body.style.overflow = '';
            })

        });
    },
    initPetsBlocks(petsData) {
        let set = new Set();
        while (set.size < 8) {
            let randomInt = Math.floor(Math.random() * (petsData.length));
            set.add(petsData[randomInt])
        }
        shelterObject.setArray = Array.from(set)
        if (screen.width < 768) {
            shelterObject.iterIndex = 1;
            let iter =0;
            let div = document.createElement('div');
            div.classList.add('pets__slider__item')
            div.innerHTML = `
        <img src="${shelterObject.setArray[iter].img}"  class="pets-img"  alt="${shelterObject.setArray[iter].type} ${shelterObject.setArray[iter].name}  ">
        <span class="pets-name">${shelterObject.setArray[iter].name}</span>
        <button class="about-pet">Learn more</button>`
        console.log(shelterObject.classes.petsSlider)
        shelterObject.classes.petsSlider.appendChild(div)   
        } else if (screen.width < 1279) {
            for (let i = 0; i < 2; i++) {
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.innerHTML = `
            <img src="${shelterObject.setArray[i].img}"  class="pets-img"  alt="${shelterObject.setArray[i].type} ${shelterObject.setArray[i].name}  ">
            <span class="pets-name">${shelterObject.setArray[i].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
        }
        }
        
        else {
            for (let i = 0; i < 3; i++) {
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.innerHTML = `
            <img src="${shelterObject.setArray[i].img}"  class="pets-img"  alt="${shelterObject.setArray[i].type} ${shelterObject.setArray[i].name}  ">
            <span class="pets-name">${shelterObject.setArray[i].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
        }

        }


       
    },
    initSlider() {
        shelterObject.classes.nextArrow.addEventListener('click', this.sliderHandlerNext);
        shelterObject.classes.prevArrow.addEventListener('click', this.sliderHandlerPrev)

    },
    sliderHandlerNext() {
        if (shelterObject.iterIndex == shelterObject.setArray.length) {
            shelterObject.iterIndex = 0
        }
        shelterObject.classes.petsSlider.innerHTML = ''
        for (let i =0; i < 3; i++) {
            if (shelterObject.iterIndex == shelterObject.setArray.length) {
                shelterObject.iterIndex = 0
            }
            let div = document.createElement('div');
            div.classList.add('pets__slider__item')
            div.classList.add('run-animation')
            div.innerHTML = `
        <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
        <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
        <button class="about-pet">Learn more</button>`
        shelterObject.classes.petsSlider.appendChild(div)
        shelterObject.iterIndex = shelterObject.iterIndex + 1
        }
        if (screen.width < 1280) {
            if (shelterObject.iterIndex == shelterObject.setArray.length) {
                shelterObject.iterIndex = 0
            }
            shelterObject.classes.petsSlider.innerHTML = ''
            for (let i =0; i < 2; i++) {
                if (shelterObject.iterIndex == shelterObject.setArray.length) {
                    shelterObject.iterIndex = 0
                }
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.classList.add('run-animation')
                div.innerHTML = `
            <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
            <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
            shelterObject.iterIndex = shelterObject.iterIndex + 1
            }
        }  if (screen.width < 1280 && 768 < screen.width ) {
            if (shelterObject.iterIndex == shelterObject.setArray.length) {
                shelterObject.iterIndex = 0
            }
            shelterObject.classes.petsSlider.innerHTML = ''
            for (let i =0; i < 2; i++) {
                if (shelterObject.iterIndex == shelterObject.setArray.length) {
                    shelterObject.iterIndex = 0
                }
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.classList.add('run-animation')
                div.innerHTML = `
            <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
            <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
            shelterObject.iterIndex = shelterObject.iterIndex + 1
            }
        }            
            if (screen.width < 768) {
                if (shelterObject.iterIndex == shelterObject.setArray.length) {
                    shelterObject.iterIndex = 0
                }
                shelterObject.classes.petsSlider.innerHTML = ''
                for (let i =0; i < 1; i++) {
                    if (shelterObject.iterIndex == shelterObject.setArray.length) {
                        shelterObject.iterIndex = 0
                    }
                    let div = document.createElement('div');
                    div.classList.add('pets__slider__item')
                    div.classList.add('run-animation')
                    div.innerHTML = `
                <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
                <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
                <button class="about-pet">Learn more</button>`
                shelterObject.classes.petsSlider.appendChild(div)
                shelterObject.iterIndex = shelterObject.iterIndex + 1
                }
        }
            
        console.log(shelterObject.iterIndex)
    },
    sliderHandlerPrev() {
        if (shelterObject.iterIndex == 0) {
            shelterObject.iterIndex = 7
        }
        shelterObject.classes.petsSlider.innerHTML = ''
        if ( 1280 <= screen.width ) {
            for (let i =0; i < 3; i++) {
                if (shelterObject.iterIndex == 0) {
                    shelterObject.iterIndex = 7
                }
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.classList.add('run-animation')
                div.innerHTML = `
            <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
            <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
            shelterObject.iterIndex = shelterObject.iterIndex -1
            }
        } else if ( screen.width <1280 &&  768<= screen.width ) {
                for (let i =0; i < 2; i++) {
                    if (shelterObject.iterIndex == 0) {
                        shelterObject.iterIndex = 7
                    }
                    let div = document.createElement('div');
                    div.classList.add('pets__slider__item')
                    div.classList.add('run-animation')
                    div.innerHTML = `
                <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
                <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
                <button class="about-pet">Learn more</button>`
                shelterObject.classes.petsSlider.appendChild(div)
                shelterObject.iterIndex = shelterObject.iterIndex -1
                }
        } else if (  screen.width < 768) {
            for (let i =0; i < 1; i++) {
                if (shelterObject.iterIndex == 0) {
                    shelterObject.iterIndex = 7
                }
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.classList.add('run-animation')
                div.innerHTML = `
            <img src="${shelterObject.setArray[shelterObject.iterIndex].img}"  class="pets-img "  alt="${shelterObject.setArray[shelterObject.iterIndex].type} ${shelterObject.setArray[shelterObject.iterIndex].name}  ">
            <span class="pets-name">${shelterObject.setArray[shelterObject.iterIndex].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
            shelterObject.iterIndex = shelterObject.iterIndex -1
            }
        }
        
    },
    initBurgerMenu() {
        shelterObject.classes.burger.addEventListener('click', this.burgerHandler)
        shelterObject.classes.overFlow.addEventListener('click',()=>{
            shelterObject.classes.burger.classList.remove('burger__active');
            shelterObject.classes.navigationBlock.classList.remove('slide-in');
            shelterObject.classes.overFlow.classList.remove('blackout');
            document.body.style.overflow = ''
        })
    },
    burgerHandler() {
        shelterObject.classes.burger.classList.toggle('burger__active');
        shelterObject.classes.navigationBlock.classList.toggle('slide-in');
        shelterObject.classes.overFlow.classList.toggle('blackout');
        
        if (shelterObject.classes.burger.classList.contains('burger__active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        
    },
    init() {
        this.sendRequest()
        this.disableInactive()
        this.toThePets()
        this.initBurgerMenu()
    }

}
shelterObject.init()