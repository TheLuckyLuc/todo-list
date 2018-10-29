const input = document.querySelector('#input');
const ul = document.querySelector('#list');
const arrow = document.querySelector('.arrow-down');
const counter = document.querySelector('#counter');
const footer = document.querySelector('#footer');

ul.addEventListener('click', function(e){
    const target = e.target;
    // check if the target element that was clicked on is the cross
    if (target.classList.contains('cross')) {
        // if the cross is clicked, remove the parent element i.e. the whole li
        target.parentNode.remove();

        if (!document.querySelector('li')) {
            // if no li element is present, remove the below classes
            arrow.classList.remove('visible');
            footer.classList.remove('visible-footer');
        }
    }
    // run the countItems function to update the outstanding item counter
    countItems();
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
        // make the arrow appear once there is at least 1 li
        arrow.classList.add('visible');
        countItems();
    }
});

function countItems(){
    if (document.querySelector('li')) {
        // if an li is present, make the footer visible
        footer.classList.add('visible-footer');
        // select any present lis
        const li = document.querySelectorAll('li');
        // set a counter to start at 0
        let count = 0;
        // loop through each li that's present and increment the counter by 1 each time
        for (item of li) {
            // check if the checkbox of the current li is checked
            if (!item.childNodes[0].childNodes[1].checked) {
                // if it isn't checked, increment the counter by 1
                count++;
            }
        }
        // update the counter with the outstanding lis once the loop has completed
        return (count === 1) ? counter.textContent = `${count} item left` : counter.textContent = `${count} items left`;
    }
}
