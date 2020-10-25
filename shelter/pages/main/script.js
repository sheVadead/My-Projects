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
        prevArrow: document.querySelector('.arrow-left')
    },

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
            }
            shelterObject.classes.overlay.addEventListener('click', function (e) {
                if (shelterObject.classes.overlay.classList.contains('active')) {
                    shelterObject.classes.overlay.classList.remove('active')
                    shelterObject.classes.modalWindow.classList.remove('active')
                }
            })
            shelterObject.classes.closePopupButton.addEventListener('click', function (e) {
                shelterObject.classes.overlay.classList.remove('active')
                shelterObject.classes.modalWindow.classList.remove('active')
            })

        });
    },
    initPetsBlocks(petsData) {
        let setArray;
        let set = new Set();
        while (set.size < 8) {
            let randomInt = Math.floor(Math.random() * (petsData.length));
            set.add(petsData[randomInt])
        }
        setArray = Array.from(set)
        let index = 3;
        if (screen.width < 768) {
            let iter =0;
            let div = document.createElement('div');
            div.classList.add('pets__slider__item')
            div.innerHTML = `
        <img src="${setArray[iter].img}"  class="pets-img"  alt="${setArray[iter].type} ${setArray[iter].name}  ">
        <span class="pets-name">${setArray[iter].name}</span>
        <button class="about-pet">Learn more</button>`
        shelterObject.classes.petsSlider.appendChild(div)   
        } else {
            for (let i = 0; i < 3; i++) {
                let div = document.createElement('div');
                div.classList.add('pets__slider__item')
                div.innerHTML = `
            <img src="${setArray[i].img}"  class="pets-img"  alt="${setArray[i].type} ${setArray[i].name}  ">
            <span class="pets-name">${setArray[i].name}</span>
            <button class="about-pet">Learn more</button>`
            shelterObject.classes.petsSlider.appendChild(div)
        }

    shelterObject.classes.petsSlider.appendChild(div)
        }


       
    },
    initSlider() {

        

    },
    init() {
        this.sendRequest()
        this.disableInactive()
        this.toThePets()
    }

}
shelterObject.init()