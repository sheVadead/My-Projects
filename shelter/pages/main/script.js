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
            modalImg: document.querySelector('.modal-img')
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
            return fetch('../main/data.json').then(response => response.json()).then(petsData => this.configurePets(petsData))
        },
        configurePets(petsData) {
            this.pets = petsData;
            let popupItem;
            this.classes.petsSlider.addEventListener('click', function (e) {
                let petsBlock = e.target.closest('.pets__slider__item');
                let popupName = petsBlock.childNodes[3].innerText
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
                if (petsBlock) {
                    shelterObject.classes.modalWindow.classList.add('active')
                    shelterObject.classes.overlay.classList.add('active')
                }
            })
            this.classes.overlay.addEventListener('click', function (e) {
                    if (shelterObject.classes.overlay.classList.contains('active')) {
                        shelterObject.classes.overlay.classList.remove('active')
                        shelterObject.classes.modalWindow.classList.remove('active')
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