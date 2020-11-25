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
    }
}

export default dataHandler;