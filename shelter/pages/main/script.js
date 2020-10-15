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
    
    pets: [],
    toThePets() {
        this.classes.heroButton.addEventListener('click', function(){
            document.location='../pets/index.html'
        })
        this.classes.petsButton.addEventListener('click', function(){
            document.location='../pets/index.html'
        })
        console.log(this.pets)
    },
    disableInactive() {
        for (let i = 2; i<this.classes.navigationItem.length; i++) {
            this.classes.navigationItem[i].style.pointerEvents = 'none';
        }
    },
    loadPets() {
        let response = fetch('../main/data.json')
       let arrayPets =  response.json()
       this.pets = arrayPets.pets;
    },
    init() {
        this.loadPets()
        this.disableInactive()
        this.toThePets()
    }

}
shelterObject.init()