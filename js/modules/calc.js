function calc() {

    //Calc
    let hGender, activity;
    let hHeight, hWeight, hAge;
    initLocalStorage();
    function calcTotal() {
        let result = document.querySelector('.calculating__result span');
        
        if (!hHeight || !hWeight || !hAge) {
            result.textContent = '____';
        } else {
            if (hGender === 'male') {
                result.textContent =  Math.round((88.36 + (13.4 * hWeight) + (4.8 * hHeight) - (5.7 * hAge))*activity);
            }else {
                result.textContent = Math.round((447.6 + (9.2 * hWeight) + (3.1 * hHeight) - (4.3 * hAge))*activity);
            }
        }
        localStorage.setItem('hGender', hGender);
        localStorage.setItem('activity', activity);
    }

    function setActivity(parent, activityClass) {
        const elements = document.querySelectorAll(`${parent} div`);
        elements.forEach(element => {
            element.addEventListener('click',(e)=>{
                elements.forEach(item=>{
                    item.classList.remove(activityClass);
                });
                e.target.classList.add(activityClass);
                if (e.target.getAttribute('data-ratio')) {
                    activity = +e.target.getAttribute('data-ratio');
                } else {
                    hGender = e.target.getAttribute('id');
                }
                calcTotal();

            });
        });

    }

    function getConstitution(){
        const elements = document.querySelectorAll('.calculating__choose_medium input');
        elements.forEach(element=>{
            element.addEventListener('input',(e)=>{
                if (e.target.value.match(/\D/g)) {
                    e.target.style.border = '1px solid red';
                }else {
                    e.target.style.border = 'none';
                }
                switch(e.target.getAttribute('id')) {
                    case 'height': hHeight = +e.target.value; break;
                    case 'weight': hWeight = +e.target.value; break;
                    case 'age': hAge = +e.target.value; break;
                }
                calcTotal();
            });
            
        });
    }

    function initLocalStorage(){
        if(localStorage.getItem('hGender')){
            hGender = localStorage.getItem('hGender');
        }else {
            localStorage.setItem('hGender', 'female');
            hGender = localStorage.getItem('hGender');
        }
        if(localStorage.getItem('activity')){
            activity = localStorage.getItem('activity');
        }else {
            localStorage.setItem('activity', 1.375);
            activity = localStorage.getItem('activity');
        }

        const elements = document.querySelectorAll('.calculating__choose div');
        elements.forEach(element=>{
            element.classList.remove('calculating__choose-item_active');
            if(element.getAttribute('id') === hGender){
                element.classList.add('calculating__choose-item_active');
            }
            if(element.getAttribute('data-ratio') === activity){
                element.classList.add('calculating__choose-item_active');
            }
        });
        
    }
    calcTotal(); // inizialize
    getConstitution();
    setActivity('#gender', 'calculating__choose-item_active');
    setActivity('.calculating__choose_big', 'calculating__choose-item_active');
}

export default calc;