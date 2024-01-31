let d = document
let backet_box = d.querySelector('.backet_box')
let btn_backet = d.querySelector('.btn_backet')
let havenot = d.querySelector('.havenot')
let counter2 = d.querySelector('.counter2')
let all_modal = d.querySelector('.all_modal')
let body_cross = d.querySelector('.body_cross')
let all_box_cont = d.querySelector('.all_box_cont')
let totaly = d.querySelector('.totaly')
let count_span = d.querySelector('.count_span')
import menu from "./menu.js"

function backet () {
    let getLocalStorage = localStorage.getItem('backet');


try {
    let backetInfo = JSON.parse(getLocalStorage || '[]');
    console.log(backetInfo);

    if (backetInfo.length === 0) {
        console.log('Корзина пуста');
        btn_backet.classList.add('btn_backet_none')
        havenot.classList.add('havenot_active')
        
    } else {
        for (let index = 0; index < backetInfo.length; index++) {
            const item = backetInfo[index];
            console.log(item);
            let cost = item.howMany
    
            // Блок
            let backet_block = d.createElement('div')
            backet_block.classList.add('backet_block')
            backet_box.appendChild(backet_block)
    
            // Загаловок элеменота
            let backet_title = d.createElement('div')
            backet_title.classList.add('backet_title')
            backet_title.textContent = `${item.title} ( ${cost} )`
            backet_block.appendChild(backet_title)
    
            // Цена элемента
            let into_cost2 = d.createElement('div')
            into_cost2.classList.add('into_cost2')
            into_cost2.textContent = `${parseInt(item.cost) * parseInt(cost)} 000 сум`
            backet_block.appendChild(into_cost2)
    
            // Отменить
            let del = d.createElement('div')
            del.classList.add('del')
            del.textContent = "Отменить"
            backet_block.appendChild(del)
    
            del.onclick = () => {
                backetInfo.splice(index, 1);
                localStorage.setItem('backet', JSON.stringify(backetInfo));
                backet_block.remove()
                window.location.reload()
            }
        }
    }

    // Корзина на отправке
    btn_backet.onclick = () => {
        all_modal.classList.add('all_modal_active')
        let totalCost = 0;
        let totalHowMany = 0;
        for(let item of backetInfo) {
            let cost = item.howMany;

            let all_modal_elem = d.createElement('div');
            all_modal_elem.classList.add('all_modal_elem');
            all_box_cont.prepend(all_modal_elem);

            let h3 = d.createElement('h3');
            h3.textContent = item.title;
            all_modal_elem.prepend(h3);

            let span = d.createElement('span');
            span.classList.add('how_span');
            let spanText = ` - ${item.howMany} `;
            span.textContent = spanText;
            h3.appendChild(span);

            totalHowMany += parseInt(item.howMany);

            let p = d.createElement('p');
            let itemCost = parseInt(item.cost) * parseInt(cost);
            p.textContent = `${itemCost} 000 сум`;
            all_modal_elem.appendChild(p);
            totalCost += itemCost;


        }
        totaly.textContent = `${totalCost} 000 сум`
        count_span.textContent = totalHowMany
    }
    body_cross.onclick = () => {
        all_modal.classList.remove('all_modal_active')
        window.location.reload()
    }
    window.addEventListener('keydown', (e) => {
        if(e.key === "Escape") {
            all_modal.classList.remove('all_modal_active')
            window.location.reload()
        }
    })
    

} 
catch (error) {
    console.error('Ошибка при разборе или получении данных из локального хранилища:', error);
}


}
backet()
