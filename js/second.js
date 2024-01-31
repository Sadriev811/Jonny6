let d = document
let main_box = d.querySelector('.main_box')
let main_box_sec = d.querySelector('.main_box_sec')
let ul = d.querySelector('.ul')
let title_menu_h2 = d.querySelector('.title_menu_h2')
let min = d.querySelector('.min')
let plus = d.querySelector('.plus')
let numb = d.querySelector('.numb')
let modal = d.querySelector('.modal')
let modal_box2 = d.querySelector('.modal_box')
let modal_cross = d.querySelector('.modal_cross')
let into_title = d.querySelector('.into_title')
let to_top = d.querySelector('.to_top')
let intoCost = d.querySelector('.into_cost')
let btnModalBacket = d.querySelector('.btn_modal_backet')
let btn_modal = d.querySelector('.btn_modal')
let body_cross = d.querySelector('.body_cross')
let backetArray = [];
import menu from "./menu.js"

function second () {
    
    for (let index = 0; index < menu.length; index++) {
        let item = menu[index]
    
        // header li's
        let a = d.createElement('a')
        ul.appendChild(a)
        let li = d.createElement('li')
        li.textContent = item.title
        if(index >= 6) {
            li.classList.add('last')
        }
        a.appendChild(li)

        // title
        title_menu_h2.textContent = localStorage.getItem('sub')
        d.title = localStorage.getItem('sub')

        // =======================================

            if(index >= 7) {
                let local = localStorage.getItem('next')
            let local2 = JSON.parse(local)

            for(let item of local2) {
                let box_sec = d.createElement('a')
                box_sec.classList.add('box_sec')
                main_box_sec.appendChild(box_sec)
            
                let block_sec = d.createElement('div')
                block_sec.classList.add('block_sec')
                box_sec.appendChild(block_sec)

                let pos_sec = d.createElement('div')
                pos_sec.classList.add('pos_sec')
                box_sec.appendChild(pos_sec)

                let pos_sec_name = d.createElement('div')
                pos_sec_name.classList.add('pos_sec_name')
                pos_sec_name.textContent = item.subtitle
                pos_sec.appendChild(pos_sec_name)

                let pos_sec_price = d.createElement('div')
                pos_sec_price.classList.add('pos_sec_price')
                pos_sec_price.textContent = '50 000 сум'
                pos_sec.appendChild(pos_sec_price)

                // Open modal
                block_sec.onclick = () => {
                    modal.classList.add('modal_active')
                    d.body.style.overflow = 'hidden'
                    into_title.textContent = item.subtitle
                }
                // close modal click on window
                d.querySelector('.modal .modal_box').addEventListener('click', (event) => {
                    event._isClickWithInModal = true;
                });
                d.querySelector('.modal').addEventListener('click', (event) => {
                    if(event._isClickWithInModal) return;
                    event.currentTarget.classList.remove('modal_active')
                    numb.value = 1
                    d.body.style.overflow = 'visible' 
                })

                // close modal with ESCAPE
                window.addEventListener('keydown', (e) => {
                    if(e.key === "Escape") {
                        modal.classList.remove('modal_active')
                        numb.value = 1
                        d.body.style.overflow = 'visible' 
                    }
                })
                body_cross.onclick = () => {
                    modal.classList.remove('modal_active')
                    numb.value = 1
                    d.body.style.overflow = 'visible' 
                }

                // Якорь
                window.addEventListener('scroll', () => {
                    let scroll = d.querySelector('.to_top')
                    scroll.classList.toggle("to_top_active", window.scrollY > 500)
                })

                function scrollTopTop() {
                    window.scrollTo({
                        top:0,
                        behavior:"smooth"
                    });
                }
                to_top.onclick = () => {
                    scrollTopTop()
                }

                // To backet
                btnModalBacket.onclick = () => {
                    let backetObj = {
                        title: into_title.textContent,
                        cost: intoCost.textContent,
                        howMany: numb.value
                    };
                
                    let backetArray = JSON.parse(localStorage.getItem('backet')) || [];
                    backetArray.push(backetObj);
                
                    localStorage.setItem('backet', JSON.stringify(backetArray));
                    modal.classList.remove('modal_active')
                    numb.value = 1
                    d.body.style.overflow = 'visible'
                };

                btn_modal.onclick = async () => {
                    // Формируем объект с данными
                    let backetObj = {
                    title: into_title.textContent,
                    cost: intoCost.textContent,
                    howMany: numb.value
                    };
                
                    try {
                    // Отправляем данные на сервер
                    const response = await fetch('http://localhost:5500/sendToTelegram', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(backetObj),
                    });
                
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    // Обработка успешного ответа 
                    const data = await response.json();
                    console.log('Успешно отправлено в телеграм:', data);
                    } catch (error) {
                    console.error('Ошибка при отправке в телеграм:', error);
                    }
                    modal.classList.remove('modal_active')
                    numb.value = 1
                    d.body.style.overflow = 'visible'
                };
            }
            }

        // li header
        li.onclick = () => {
            localStorage.setItem('sub', item.title)
            let obj2 = JSON.stringify(item.content)
            localStorage.setItem('next', obj2);
            a.href = 'second.html'
        }
    }

    // counter
    min.onclick = () => {
        numb.value--
            if(numb.value <= 1) {
                numb.value = 1
            }
    }
    plus.onclick = () => {
        numb.value++
    }
}
export default second;
second()