import dataHandler from './dataHandler';

const render = {
    classes: {
        header: document.createElement('header'),
        main: document.createElement('main'),
        wrapper: document.createElement('div')
    },
    listenersHandler() {
        const menu = document.querySelector('.navigation');
        this.classes.wrapper.addEventListener('click', (e)=>{
          dataHandler.rotateHandler(e);
            dataHandler.categoryCards(e);
            dataHandler.addActiveToMenu(e);
            
        })
        // this.classes.wrapper.addEventListener('mouseout', (e)=>{
            // let target = e.target.closest('.train-card');
            // let backTarget = e.target.closest('div .train-card__back')
            // let clickedBlock = e.target.childNodes;
            // if(backTarget ) {
            //     let nodes = backTarget.parentNode.childNodes
               
            //     nodes[0].classList.toggle('rotate-front');
            //     target.style.transform = 'rotateY(0deg)'
            //     nodes[1].style.transform = 'rotateY(180deg)';
            //     // nodes[1].childNodes[0].children[0].classList.remove('rotate-front')
            //     // nodes[1].childNodes[1].children[0].classList.remove('rotate-front')
            // }
        // })
        this.classes.wrapper.addEventListener('click', dataHandler.audioHandler);
        this.classes.header.addEventListener('click',dataHandler.toMainPage)
        this.classes.header.addEventListener('click',(e)=>{
            const burger = e.target.closest('.burger-img');
            if(burger) {
                burger.classList.toggle('rotate-burger');
                document.querySelector('.navigation').classList.toggle('open-menu')
            }
        })
        menu.addEventListener('click',(e)=>{
            const link = e.target.closest('li');
            const linkChild = document.querySelector('.navigation__inner__list').childNodes
            if(link) {
                dataHandler.categoryCards(e)
                menu.classList.toggle('open-menu');
                linkChild.forEach(item => {
                    if(item.classList.contains('link-active')) {
                        item.classList.remove('link-active')
                    }
                })
                link.classList.add('link-active')
                const burger = document.querySelector('.burger-img');
                burger.classList.toggle('rotate-burger')
            } else {
                return
            }
        })
        this.classes.header.addEventListener('click', dataHandler.gameModeHandler)
    },
    render() {
        this.classes.wrapper.classList.add('wrapper');
        this.classes.header.classList.add('header');
        this.classes.main.classList.add('main');
        
        dataHandler.categoryBlocks.forEach(item => {
            this.classes.wrapper.appendChild(item)
        })
        this.classes.main.appendChild(this.classes.wrapper)
        this.classes.header.appendChild(dataHandler.setHeader())
      document.body.appendChild(this.classes.header)
      document.body.appendChild(this.classes.main)    
    },

    init() {
        dataHandler.setBlocksCategory()
        this.render()
        this.listenersHandler()
    }
}

render.init()
console.log(dataHandler)