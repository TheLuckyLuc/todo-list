const input = document.querySelector('#input');
const ul = document.querySelector('#list');
const arrow = document.querySelector('.arrow-down');
const counter = document.querySelector('#counter');

ul.addEventListener('click', function(e){
    const target = e.target;
    // check if the target element that was clicked on is the cross
    if (target.classList.contains('cross')) {
        // if the cross is clicked, remove the parent element i.e. the whole li
        target.parentNode.remove();
        countItems();

        if (!document.querySelector('li')) {
            arrow.classList.remove('visible');
        }
    }
});

input.addEventListener('keypress', function(e){
    // listen out for the 'enter' key and make sure the input isn't empty
    if (e.keyCode === 13 && input.value) {
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `<div id="item-check">
                            <input type="checkbox" class="item-check__box">
                            <span>${input.value}</span>
                        </div>
                        <i class="fas fa-times cross"></i>`;
        ul.appendChild(li);
        // clear the input bar once enter is pressed
        input.value = '';
        arrow.classList.add('visible');
        countItems();
    }
});

function countItems(){
    if (document.querySelector('li')) {
        const li = document.querySelectorAll('li');
        let count = 0;
        li.forEach(function(){
            count++;
        });
        return (count === 1) ? counter.textContent = `${count} item left` : counter.textContent = `${count} items left`;
    }
}
