import cards from './dataForCards.js'
let dataHandler = {
    categoryBlocks: [],
    trainCards: [],
    setBlocksCategory() {
        cards[0].forEach((item, index) => {
            let div = document.createElement('div');
            let divContainer = document.createElement('div');
            let divFooter = document.createElement('div');
            let imgWrap = document.createElement('div')
            let img = document.createElement('img');
            let span = document.createElement('span');
            imgWrap.classList.add('img-wrap');

            span.classList.add('category-name')
            span.textContent = item;
            img.setAttribute('src', `${cards[index + 1][2].image}`);
            img.setAttribute('alt', `${cards[index + 1][2].word}`)
            img.classList.add('category-img');
            divFooter.classList.add('main-card__inner__footer');
            divContainer.classList.add('main-card__inner');
            divFooter.appendChild(span)
            div.classList.add('main-card');
            imgWrap.appendChild(img)
            divContainer.appendChild(imgWrap);
            divContainer.appendChild(divFooter);
            div.setAttribute('data-index', `${index+1}`)
            div.appendChild(divContainer);
            this.categoryBlocks.push(div);
        })

    },
    setNavMenu() {
        const navigation = document.createElement('nav')
        const navigationInner = document.createElement('div');
        const menuList = document.createElement('ul');
        menuList.classList.add('navigation__inner__list')
        navigationInner.classList.add('navigation__inner');
        cards[0].forEach((item, index)=>{
            const li = document.createElement('li');
            li.classList.add('navigation__inner__list-item');
            
            li.textContent = item;
            menuList.appendChild(li)
        })
        navigationInner.appendChild(navigationInner)
        navigation.appendChild(navigationInner);
        return navigation;
    },
    setHeader() {
        let headerWrapp = document.createElement('div');
        let burgerWrap = document.createElement('div');
        let siteLogoWrap = document.createElement('div');
        let buttonSliderWrap = document.createElement('div');
        let spanLogo = document.createElement('span');
        let input = document.createElement('input');
        let label = document.createElement('label');
        let burger = document.createElement('img');
        let logoBurgerWrapper = document.createElement('div')
        const navigation = document.createElement('nav')
        const navigationInner = document.createElement('div');
        const menuList = document.createElement('ul');
        navigation.classList.add('navigation')
        menuList.classList.add('navigation__inner__list')
        navigationInner.classList.add('navigation__inner');
        cards[0].forEach((item,index)=>{
            const li = document.createElement('li');
            li.classList.add('navigation__inner__list-item');
            li.setAttribute('data-index', `${index+1}`)
            li.textContent = item;
            menuList.appendChild(li)
        })
        navigationInner.appendChild(menuList)
        navigation.appendChild(navigationInner);
        logoBurgerWrapper.classList.add('menu-wrapper')
        input.setAttribute('id', 'checkbox');
        input.setAttribute('type', 'checkbox')
        label.setAttribute('for', 'checkbox')
        spanLogo.classList.add('logo-text');
        spanLogo.textContent = 'English for Kids'
        siteLogoWrap.classList.add('site-logo')
        siteLogoWrap.appendChild(spanLogo);
        buttonSliderWrap.classList.add('slider-button')
        buttonSliderWrap.appendChild(input);
        buttonSliderWrap.appendChild(label);
        burgerWrap.classList.add('burger-menu');
        burger.classList.add('burger-img')
        burger.setAttribute('src','./img/burger.png');
        burgerWrap.appendChild(burger)
        // logoBurgerWrapper.appendChild(burgerWrap)
        // logoBurgerWrapper.appendChild(siteLogoWrap)
        headerWrapp.classList.add('header__inner');
        headerWrapp.appendChild(burgerWrap);
        headerWrapp.appendChild(siteLogoWrap);
        headerWrapp.appendChild(buttonSliderWrap)
        headerWrapp.appendChild(navigation)
        return headerWrapp;
    },
    categoryCards(e) {
        const target = e.target.closest('[data-index]');
        if (target === null) return;
        const targetIndex = target.dataset.index

        const mainWrapper = document.querySelector('.wrapper');
        while (mainWrapper.firstChild) {
            mainWrapper.removeChild(mainWrapper.firstChild);
        }
        cards[targetIndex].forEach(item => {
            let div = document.createElement('div');
            let divContainer = document.createElement('div');
            let divFooter = document.createElement('div');
            let imgWrap = document.createElement('div');
            let img = document.createElement('img');
            let span = document.createElement('span');
            let rotateImg = document.createElement('img');
            let additionalblock = document.createElement('div');

            let divContainerBack = document.createElement('div');
            let divFooterBack = document.createElement('div');
            let imgBack = document.createElement('img');
            let spanBack = document.createElement('span');
            let imgWrapBack = document.createElement('div');



            additionalblock.style.width = 4 + 'rem';
            imgWrap.classList.add('img-wrap');
            rotateImg.setAttribute('src', './img/rotate.svg');
            rotateImg.classList.add('rotate-img')
            span.classList.add('word-name')
            span.textContent = item.word;
            img.setAttribute('src', `${item.image}`);
            img.setAttribute('alt', `${item.word}`)
            img.classList.add('word-img');
            divFooter.classList.add('train-card__front__footer');
            divContainer.classList.add('train-card__front');
            divFooter.appendChild(additionalblock)
            divFooter.appendChild(span)

            divFooter.appendChild(rotateImg)
            div.classList.add('train-card');
            imgWrap.appendChild(img)
            divContainer.appendChild(imgWrap);
            divContainer.appendChild(divFooter);

            divContainerBack.classList.add('train-card__back');

            divFooterBack.classList.add('train-card__back__footer')
            spanBack.classList.add('word-name');
            spanBack.textContent = item.translation;
            imgWrapBack.classList.add('img-wrap');
            imgBack.setAttribute('src', `${item.image}`);
            imgBack.setAttribute('alt', `${item.word}`)
            imgBack.classList.add('word-img');
            imgWrapBack.appendChild(imgBack)
            divFooterBack.appendChild(spanBack)
            divContainerBack.appendChild(imgWrapBack);
            divContainerBack.appendChild(divFooterBack)
            div.appendChild(divContainer);
            div.appendChild(divContainerBack);
            div.setAttribute('data-word',`${item.word}`)
            div.addEventListener('mouseout', this.backRotate)
            this.trainCards.push(div)
        })
        this.shuffle(this.trainCards).forEach(item => {
            mainWrapper.appendChild(item)
        })
        this.trainCards = [];
    },
    backRotate(e) {
        let backTarget = e.target.closest('.train-card');
        if(e.relatedTarget.classList.contains('train-card') && backTarget.classList.contains('flipped')) {
            backTarget.childNodes[1].style.visibility = 'hidden'
            backTarget.style.transform = 'rotateY(0deg)';
            backTarget.childNodes[0].classList.remove('rotate-front');
            backTarget.childNodes[1].style.transform = 'rotateY(180deg)'
            backTarget.classList.remove('flipped')
        }
    },
    rotateHandler(e) {
        let target = e.target.closest('.rotate-img');
        let trainCard = e.target.closest('.train-card')
        let clickedBlock = e.target.parentNode.parentNode.parentNode.childNodes
        if (target) {
            trainCard.classList.add('flipped')
            clickedBlock[0].classList.toggle('rotate-front');
            trainCard.style.transform = 'rotateY(180deg)'
            clickedBlock[1].style.transform = 'rotateY(0deg)';
            clickedBlock[1].style.visibility = '';
            clickedBlock[1].childNodes[0].children[0].classList.add('rotate-front')
            clickedBlock[1].childNodes[1].children[0].classList.add('rotate-front')
        }
    },
    audioHandler(e) {
        const audio = document.createElement('audio');
       const card = e.target.closest('.train-card')
       if(!card.classList.contains('flipped')) {
        audio.setAttribute('src', `./audio/${card.dataset.word}.mp3`)
        audio.currentTime = 0;
        audio.play();
       }
    
    },
    addActiveToMenu(e) {
        const linkChild = document.querySelector('.navigation__inner__list').childNodes;
      
        let targ = e.target.closest('.main-card')
        if(targ) {
            linkChild.forEach(item => {
                if(item.classList.contains('link-active')) {
                    item.classList.remove('link-active')
                }
                if(item.dataset.index === targ.dataset.index) {
                    item.classList.add('link-active')
                }
            })

        }
      
    },
    toMainPage(e) {
       const target = e.target.closest('.logo-text');
       if(target) {
        const mainWrapper = document.querySelector('.wrapper');
        while (mainWrapper.firstChild) {
            mainWrapper.removeChild(mainWrapper.firstChild);
        }
        dataHandler.categoryBlocks.forEach(item => {
            mainWrapper.appendChild(item)
        })
        const linkChild = document.querySelector('.navigation__inner__list').childNodes
        linkChild.forEach(item => {
         if(item.classList.contains('link-active')) {
             item.classList.remove('link-active')
         }
     })
       }

    },
    
    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}

export default dataHandler;