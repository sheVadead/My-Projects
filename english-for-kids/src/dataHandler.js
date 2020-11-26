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
    setHeader() {
        let headerWrapp = document.createElement('div');
        let burgerWrap = document.createElement('div');
        let siteLogoWrap = document.createElement('div');
        let buttonSliderWrap = document.createElement('div');
        let spanLogo = document.createElement('span');
        let input = document.createElement('input');
        let label = document.createElement('label');
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

        headerWrapp.classList.add('header__inner');
        headerWrapp.appendChild(burgerWrap);
        headerWrapp.appendChild(siteLogoWrap);
        headerWrapp.appendChild(buttonSliderWrap)
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
            div.appendChild(divContainerBack)
            this.trainCards.push(div)
        })
        this.shuffle(this.trainCards).forEach(item => {
            mainWrapper.appendChild(item)
        })
    },
    rotateHandler(e) {
        // let wrapper = document.querySelector('.wrapper')
        // console.log(wrapper.children)
        let target = e.target.closest('.rotate-img');
        let trainCard = e.target.closest('.train-card')
        let clickedBlock = e.target.parentNode.parentNode.parentNode.childNodes
        console.log(e.target.parentNode.parentNode.parentNode)
        if (target) {
            
            clickedBlock[0].classList.toggle('rotate-front');
            trainCard.style.transform = 'rotateY(180deg)'
            clickedBlock[1].style.transform = 'rotateY(0deg)';
            clickedBlock[1].childNodes[0].children[0].classList.add('rotate-front')
            clickedBlock[1].childNodes[1].children[0].classList.add('rotate-front')
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