let d = document
let main_box = d.querySelector('.main_box')
let ul = d.querySelector('.ul')
import menu from "./menu.js"


function block () {
    for (let index = 0; index < menu.length; index++) {
        let item = menu[index]
        console.log(item);
    
        // header li's
        let a = d.createElement('a')
        ul.appendChild(a)
        let li = d.createElement('li')
        li.textContent = item.title
        if(index >= 6) {
            li.classList.add('last')
        }
        a.appendChild(li)
    
        // main blocks
        let block = d.createElement('a')
        block.classList.add('block')
        main_box.appendChild(block)
    
        let pos = d.createElement('div')
        pos.classList.add('pos')
        pos.textContent = item.title
        block.appendChild(pos)
    
    
        // block onclick
        block.onclick = () => {
            localStorage.setItem('sub', item.title)
            let obj2 = JSON.stringify(item.content)
            localStorage.setItem('next', obj2);
            block.href = 'second.html'
        }
        li.onclick = () => {
            localStorage.setItem('sub', item.title)
            let obj2 = JSON.stringify(item.content)
            localStorage.setItem('next', obj2);
            a.href = 'second.html'
        }
    }
}
export default block;