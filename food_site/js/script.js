window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadLine = '2021-11-23';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            min = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'min': min,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.min);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    //modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
    //use classes for card food

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAN();
        }

        changeToUAN() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${res}, status ${res.status}`);
        } 

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thank you',
        failure: 'wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = message.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMsg);
            const formData = new FormData(form);

            const obj = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', obj)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMsg.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });        
    }

    function showThanksModal(msg) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div calss="modal__title">${msg}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //slider
    const next = document.querySelector('.offer__slider-next'),
        prev = document.querySelector('.offer__slider-prev'),
        slides = document.querySelectorAll('.offer__slide'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let indexSlide = 1;
    
    displaySlides(indexSlide);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    
    function displaySlides(n) {
        if (n > slides.length) {
            indexSlide = 1;
        }

        if (n < 1) {
            indexSlide = slides.length;
        }

        slides.forEach(elem => elem.style.display = 'none');

        slides[indexSlide - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${indexSlide}`;
        } else {
            current.textContent = indexSlide;
        }
    }

    function plusSlide(n) {
        displaySlides(indexSlide += n);
    }

    prev.addEventListener('click', () => {
        console.log(slides[0]);
        plusSlide(-1);
    }); 

    next.addEventListener('click', () => {
        plusSlide(1);
    });

    //calculator calories
    const manClicker = document.querySelector('.man__clicker'),
        girlClicker = document.querySelector('.girl__clicker'),
        
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),

        input = document.querySelector('.calculating__choose_big'),

        lowActivity = document.querySelector('#low'), 
        smallActivity = document.querySelector('#small'),
        mediumActivity = document.querySelector('#medium'),
        highActivity = document.querySelector('#high'),

        resultCalculate = document.querySelector('.calculating__result span');

    function calculator(gender, weight, growth, age, activity) {
        let result = 0;

        let objActive = {
            low: 1.2,
            small: 1.375,
            medium: 1.55,
            high: 1.725
        };

        if (gender === 'man') {
            result =  88.36 + (13.4 * Number(weight)) + (4.8 * Number(growth)) - (5.7 * Number(age));
        }

        if (gender === 'girl') {
            result =  447.6 + (9.2 * Number(weight)) + (3.1 * Number(growth)) - (4.3 * Number(age));
        }

        for (const i in objActive) {
            if (activity == i) {
                return Math.round(result * objActive[i]);
            }
        }
    }

    function greenPoint(triger, eTarget) {
        if (triger === 'girl') {
            girlClicker.classList.add('calculating__choose-item_active');
            manClicker.classList.remove('calculating__choose-item_active');
        }

        if (triger === 'man') {
            manClicker.classList.add('calculating__choose-item_active');
            girlClicker.classList.remove('calculating__choose-item_active');
        }

        if (triger === 'activity' && eTarget.getAttribute('data-ratio') === 'activeGreen') {
            let statusActivity = [lowActivity, smallActivity, mediumActivity, highActivity];
            statusActivity.forEach(status => status.classList.remove('calculating__choose-item_active'));
            return eTarget.classList.add('calculating__choose-item_active');
        }
    }

    function displayResult(gender) {
        input.addEventListener('click', (e) => {
            greenPoint('activity', e.target);
            let res = calculator(gender, weight.value, height.value, age.value, e.target.id);
            resultCalculate.innerHTML = `${res} kkal`;
        });
    } 
    
    girlClicker.addEventListener('click', ( ) => {
        greenPoint('girl');
        displayResult('girl');
    });

    manClicker.addEventListener('click', () => {
        greenPoint('man');
        displayResult('man');
    });
});