const input = document.querySelector('#input');
const ul = document.querySelector('#list');

input.addEventListener('keypress', function(e){
    // listen out for the 'enter' key and make sure the input isn't empty
    if (e.keyCode === 13 && input.value) {
        const li = document.createElement('li');
        li.innerHTML = `<li class="item">
                            <div id="item-check">
                                <input type="checkbox" class="item-check__box">
                                <span>${input.value}</span>
                            </div>
                            <i class="fas fa-times cross"></i>
                        </li>`;
        ul.appendChild(li);
        input.value = '';
    }
});
