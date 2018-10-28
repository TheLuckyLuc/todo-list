const input = document.querySelector('#input');
const ul = document.querySelector('#list');
const list = document.querySelector('#list');

list.addEventListener('click', function(e){
    const target = e.target;
    // check if the target element that was clicked on is the cross
    if (target.classList.contains('cross')) {
        // if the cross is clicked, remove the parent element i.e. the whole li
        target.parentNode.remove();
    }
});

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
        // clear the input bar once enter is pressed
        input.value = '';
    }
});
