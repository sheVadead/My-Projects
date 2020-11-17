import Render from './render.js'
let timerId;
let min = 0;
let sec = 0;
let draggingCell;
let dragBlock;
class GameRules extends Render {
    constructor() {
        super();
        this.targetDragBlock;
    }
    audioHandler() {
        if (this.isVolume) {
            const audio = document.querySelector('#click-sound');
            audio.currentTime = 0;
            audio.play();
        }

    }
    dragStart(e) {
        this.targetDragBlock = e.target;
        const target = e.target.closest('[data-num]');
        const emptyTarget = document.querySelector(`[data-num="${this.rows * this.columns}"]`);
        if (target === emptyTarget) {

            return
        }
        const field = document.querySelector('.field');
        const draggingIndex = Array.from(field.childNodes).indexOf(e.target)
        draggingCell = this.blocksCoord[draggingIndex];
        dragBlock = e.target.closest('[data-num]');


        e.dataTransfer.setData('block', e.target.id);
        target.classList.add('invisible');
        e.dataTransfer.setData('block', target)
    }
    dragFinish(e) {
        const target = e.target.closest('[data-num]');
        target.classList.remove('invisible');   
    }

    moveHandler(e, indexOfNodes) {

        const moveCount = document.querySelector('.move-count')
      
        const empty = document.querySelector(`[data-num="${this.rows * this.columns}"]`)
        const target = e.target.closest('[data-num]');
        if (target === null) return;
        this.audioHandler()
        const targetElem = this.blocksCoord[indexOfNodes];
        const leftDiv = Math.abs(parseFloat(this.empty.left) - (parseFloat(target.style.left)));
        const topDiv = Math.abs(parseFloat(this.empty.top) - (parseFloat(target.style.top)));

        if ((topDiv + leftDiv) > this.blockSize) {
            return
        }
        if ((topDiv + leftDiv) == this.blockSize) {

            moveCount.textContent = ++moveCount.textContent;
        }
        const emptyLeft = empty.style.left;
        const emptyTop = empty.style.top;
        const emptyCell = this.blocksCoord[this.emptyBlock]
        empty.style.left = targetElem.elem.style.left;
        empty.style.top = targetElem.elem.style.top;

        targetElem.elem.style.top = emptyTop;
        targetElem.elem.style.left = emptyLeft;
        targetElem.left = parseFloat(emptyLeft) / this.blockSize
        targetElem.top = parseFloat(emptyTop) / this.blockSize
        this.empty.left = empty.style.left;
        this.empty.top = empty.style.top;

        emptyCell.top = parseFloat(this.empty.top) / this.blockSize;
        emptyCell.left = parseFloat(this.empty.left) / this.blockSize;
        const isFinished = this.blocksCoord.every((item) => item.value == item.top * this.rows + item.left)





        if (isFinished) {

            this.winHandler()

        }
    }

    dragDrop(e, indexOfNodes, indexOfblockNode) {
        const moveCount = document.querySelector('.move-count')
        let target = e.target;
        let targetElem = this.blocksCoord[indexOfNodes];
        let blockElem = this.blocksCoord[indexOfblockNode]
        const emptyLeft = targetElem.elem.style.left;
        const emptyTop = targetElem.elem.style.top;
        this.audioHandler()
        const leftDiv = Math.abs(parseFloat(this.empty.left) - (parseFloat(dragBlock.style.left)));
        const topDiv = Math.abs(parseFloat(this.empty.top) - (parseFloat(dragBlock.style.top)));

        if ((topDiv + leftDiv) > this.blockSize) {
            return
        }


        target.style.top = draggingCell.elem.style.top
        target.style.left = draggingCell.elem.style.left;

        draggingCell.elem.style.top = emptyTop
        draggingCell.elem.style.left = emptyLeft
        const empty = document.querySelector(`[data-num="${this.rows * this.columns}"]`)

        blockElem.left = parseFloat(emptyLeft) / this.blockSize
        blockElem.top = parseFloat(emptyTop) / this.blockSize

        this.empty.left = empty.style.left;
        this.empty.top = empty.style.top;
        const isFinished = this.blocksCoord.every((item) => item.value == item.top * this.rows + item.left)
        if ((topDiv + leftDiv) == this.blockSize) {

            moveCount.textContent = ++moveCount.textContent;
        }
        if (isFinished) {

            this.winHandler()
        }
    }
    blocksListenerHandler() {
        const field = document.querySelector('.field');
        field.addEventListener('dragstart', (e) => {
            this.dragStart(e)
        })
        field.addEventListener('click', (event) => {

            const indexOfNodes = Array.from(field.childNodes).indexOf(event.target);

            this.moveHandler(event, indexOfNodes)
        })
        field.addEventListener('dragend', this.dragFinish)
        field.addEventListener('drop', (e) => {

            let indexOfNodes = Array.from(field.childNodes).indexOf(e.target);
            let indexOfblockNode = Array.from(field.childNodes).indexOf(this.targetDragBlock);
            this.dragDrop(e, indexOfNodes, indexOfblockNode)

        })

    }

    swapBlocks(i1, i2) {

        let t = this.numbers[i1];
        this.numbers[i1] = this.numbers[i2];
        this.numbers[i2] = t;


    }

    checkSolvability(a) {
        let kDisorder = 0
        for (let i = 1, len = a.length - 1; i < len; i++) {
            for (let j = i - 1; j >= 0; j--) {
                if (a[j] > a[i]) {
                    kDisorder++;
                }
            }
        }
        return !(kDisorder % 2);
    }

    pauseHandler() {

        clearInterval(timerId)

    }
    saveGameHandler() {
        // board: [...Array(15).keys()]

        const moveCount = document.querySelector('.move-count')
       let savedFieldObj = {
           board: {}
       }
       this.blocksCoord.forEach((item) => {
             let savedCoord = item.top*this.rows + item.left
          savedFieldObj.board[`${savedCoord}`] = item.value;
            
            
       })

       savedFieldObj.min = min;
       savedFieldObj.sec = sec;
       savedFieldObj.moves = moveCount.textContent;
       savedFieldObj.block = this.blockSize;
       savedFieldObj.rows = this.rows;
       savedFieldObj.columns = this.columns
       let gameArray = [];
       gameArray.push(savedFieldObj)
       localStorage.setItem('saveField', JSON.stringify(gameArray))
    }

    loadGame() {
        document.body.querySelector('.field').remove()
        document.body.querySelector('.header').remove()
        document.body.querySelector('.leader-wrap').remove()
        let testNew = new GameRules();
        let fieldObj = JSON.parse(localStorage.getItem('saveField'));
        testNew.numbers = Object.values(fieldObj[0].board).map(item => item = item + 1)
        testNew.rows = fieldObj[0].rows;
        testNew.columns = fieldObj[0].columns;
        testNew.blockSize = fieldObj[0].block;
        testNew.getBlocks();
        testNew.isSolved()
        const field = document.querySelector('.field')
        const moves = document.querySelector('.move-count');
        const pause = document.querySelector('.pause-button')
        moves.textContent = fieldObj[0].moves
        min = fieldObj[0].min
        sec = fieldObj[0].sec
        this.addTimer()
        field.querySelector('.overlay').remove()
        pause.removeAttribute('disabled')
    }
    resumeTimer() {
        const stopWatch = document.querySelector('.stop-watch');

        timerId = setInterval(() => {
            sec++;
            sec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
            if (sec > 60) {
                sec = 0;
                min++;
            }
            stopWatch.textContent = `${min}: ${sec}`
        }, 1000)
    }
    newGameHandler() {
        this.pauseHandler()
        let testNew = new GameRules();
        document.body.querySelector('.field').remove()
        document.body.querySelector('.header').remove()
        testNew.init()
        const pause = document.querySelector('.pause-button');
        pause.removeAttribute('disabled')
        min = 0;
        sec = 0;
        const overlay = document.querySelector('.overlay');
        const leader = document.querySelector('.leader-wrap');

        leader.remove()
        overlay.remove()
        this.addTimer()
    }
    isSolved() {
        const reload = document.querySelector('.reload');
        const newGamStart = document.querySelector('.new-game');
        newGamStart.addEventListener('click', () => {
            this.newGameHandler()
        })
        reload.addEventListener('click', ()=>{
            this.newGameHandler()
        })
    }
    addTimer() {
        const stopWatch = document.querySelector('.stop-watch');

        timerId = setInterval(() => {
            sec++;
            sec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
            if (sec > 60) {
                sec = 0;
                min++;
            }
            stopWatch.textContent = `${min}: ${sec}`
        }, 1000)
    }

    winHandler() {
        let results = JSON.parse(localStorage.getItem('results')) || [];
        this.pauseHandler()
        const field = document.querySelector('.field');
        const overlay = document.createElement('div');
        const moves = document.querySelector('.move-count');
        const win = document.createElement('span');
        const pressReload = document.createElement('span');
        const resultWrapper = document.querySelector('.leader-list')
        pressReload.classList.add('win')
        const winTime = document.querySelector('.stop-watch')
        win.classList.add('win')
        win.textContent = `Congratulations! You win after ${moves.textContent} moves and ${winTime.textContent}`
        pressReload.textContent = 'Press reload button to start new game';
        overlay.classList.add('overlay');
        overlay.appendChild(win)
        overlay.appendChild(pressReload)
        field.appendChild(overlay)
        results.unshift([moves.textContent, winTime.textContent])
        localStorage.setItem('results',JSON.stringify(results))

            let li = document.createElement('div');
            li.textContent = `Moves: ${JSON.parse(localStorage.getItem('results'))[0][0]}. Time: ${JSON.parse(localStorage.getItem('results'))[0][1]}`
            resultWrapper.appendChild(li)

    }
    automaticSolve() {
        
    }

    init() {
        
        while (!this.checkSolvability(this.numbers)) {
            
            this.swapBlocks(0, 1)
        }
        super.getBlocks();
        this.isSolved()
    }
}

let testNew2 = new GameRules();
testNew2.init()

