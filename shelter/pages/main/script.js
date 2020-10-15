// const navigationItem = document.querySelectorAll('.navigation-link'),
//     heroButton = document.querySelector('.hero-button'),
//     petsButton = document.querySelector('.pets-button');


// toThePets()
// disableInactive()

let shelterObject = {
    classes: {
        navigationItem: document.querySelectorAll('.navigation-link'),
        heroButton: document.querySelector('.hero-button'),
        petsButton: document.querySelector('.pets-button')
    },
    toThePets() {
        this.classes.heroButton.addEventListener('click', function(){
            document.location='../pets/index.html'
        })
        this.classes.petsButton.addEventListener('click', function(){
            document.location='../pets/index.html'
        })
    },
    disableInactive() {
        for (let i = 2; i<this.classes.navigationItem.length; i++) {
            this.classes.navigationItem[i].style.pointerEvents = 'none';
        }
    },
    init() {
        this.disableInactive()
        this.toThePets()
    }
}
shelterObject.init()