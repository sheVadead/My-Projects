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
        while (set.size <8) {
            let randomInt = Math.floor( Math.random() * (petsData.length  ));
            set.add(randomInt)
        }
       console.log(petsData)
        setArray = Array.from(set)
        for (let i = 0; i < shelterObject.classes.sliderItemImg.length; i++) {
            shelterObject.classes.sliderItemImg[i].attributes.src.textContent = petsData[setArray[[i]]].img
            shelterObject.classes.sldierItemName[i].textContent = petsData[setArray[[i]]].name
        }
    },
    initSlider() {
        let counter = 1;
        let size = this.classes.petsSliderItem[1].clientWidth *2;
        console.log(size)
        this.classes.nextArrow.addEventListener('click',()=> {
            if(counter <= 0) return
            this.classes.petsSlider.style.transition = "transform 0.2s ease-in-out"
            counter++;
            this.classes.petsSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        })
        this.classes.prevArrow.addEventListener('click',()=> {
            this.classes.petsSlider.style.transition = "transform 0.2s ease-in-out"
            counter--;
            this.classes.petsSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
        })
        this.classes.petsSlider.addEventListener('transitionend', ()=>{
            if (this.classes.petsSliderItem[counter].id === 'last-clone') {
                this.classes.petsSlider.style.transform =-100 + 'px';
                counter = shelterObject.classes.petsSliderItem.length - 7;
                this.classes.petsSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
            }
            if (this.classes.petsSliderItem[counter].id === 'first-clone') {
                counter = shelterObject.classes.petsSliderItem.length - counter;
                this.classes.petsSlider.style.transform = 0;
                this.classes.petsSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
                
            }
        })
          
    },
    init() {
        this.sendRequest()
        this.disableInactive()
        this.toThePets()
    }

}
shelterObject.init()