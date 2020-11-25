import cards from './dataForCards.js'
let dataHandler = {
    categoryBlocks: [],
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
            img.setAttribute('src',`${cards[index + 1][2].image}`);
            img.setAttribute('alt',`${cards[index + 1][2].word}`)
            img.classList.add('category-img');
            divFooter.classList.add('main-card__inner__footer');
            divContainer.classList.add('main-card__inner');
            divFooter.appendChild(span)
            div.classList.add('main-card');
            imgWrap.appendChild(img)
            divContainer.appendChild(imgWrap);
            divContainer.appendChild(divFooter);
           
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
        input.setAttribute('id','checkbox');
        input.setAttribute('type', 'checkbox')
        label.setAttribute('for','checkbox')
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
    }
}

export default dataHandler;