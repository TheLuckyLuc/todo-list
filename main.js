const input = document.querySelector('#input');
const ul = document.querySelector('#list');
const arrow = document.querySelector('.arrow-down');
const counter = document.querySelector('#counter');
const footer = document.querySelector('#footer');
const all = document.querySelector('#all');
const active = document.querySelector('#active');
const completed = document.querySelector('#completed');
const clear = document.querySelector('#clear');
const label = document.querySelector('label');

ul.addEventListener('click', function(e){
    const target = e.target;
    // check if the target element that was clicked on is the cross
    if (target.classList.contains('cross')) {
        // if the cross is clicked, remove the parent element i.e. the whole li
        target.parentNode.remove();

        checkForList();
    }
    // if a checkbox is clicked, run the boxCheck function
    if (target.classList.contains('item-check__box')) {
        boxCheck();
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
        // add a border to the 'All' button in the footer
        all.classList.add('border');
    }
});

function countItems(){
    if (document.querySelector('li')) {
        // if an li is present, make the footer visible
        footer.classList.add('visible-footer');
        // select any present lis
        const lis = document.querySelectorAll('li');
        // set a counter to start at 0
        let count = 0;
        // loop through each li that's present and increment the counter by 1 each time
        for (li of lis) {
            // check if the checkbox of the current li is checked
            if (!li.childNodes[0].childNodes[1].checked) {
                // if it isn't checked, increment the counter by 1
                count++;
            }
        }
        // update the counter with the outstanding lis once the loop has completed
        return (count === 1) ? counter.textContent = `${count} item left` : counter.textContent = `${count} items left`;
    }
}

all.addEventListener('click', function() {
    // add a border the button that was clicked
    addBorder(this);
    const lis = document.querySelectorAll('li');

    for (li of lis) {
        // remove the invisible class from all li elements
        li.classList.remove('invisible');
    }
});

active.addEventListener('click', function() {
    addBorder(this);
    const lis = document.querySelectorAll('li');

    for (li of lis) {
        // make all checked lis invisible
        if (li.childNodes[0].childNodes[1].checked) {
            li.classList.add('invisible');
        } else {
            li.classList.remove('invisible');
        }
    }
});

completed.addEventListener('click', function() {
    addBorder(this);
    const lis = document.querySelectorAll('li');

    for (li of lis) {
        // make all un-checked lis invisible
        if (!li.childNodes[0].childNodes[1].checked) {
            li.classList.add('invisible');
        } else {
            li.classList.remove('invisible');
        }
    }
});

function addBorder(element) {
    // grab all of the footer buttons
    const buttons = document.querySelectorAll('.buttons');

    for (button of buttons) {
        // cycle through each button and remove the border class
        button.classList.remove('border');
    }
    // add the border class to the element that was clicked
    element.classList.add('border');
}

clear.addEventListener('click', function() {
    const lis = document.querySelectorAll('li');

    for (li of lis) {
        if (li.childNodes[0].childNodes[1].checked) {
            li.remove();
        }
    }
    checkForList();
});

function checkForList() {
    if (!document.querySelector('li')) {
        // if no li element is present, remove the below classes
        arrow.classList.remove('visible');
        arrow.classList.remove('arrow-color');
        footer.classList.remove('visible-footer');
    }
}

label.addEventListener('click', tickThemAll);

function tickThemAll() {
    const checkboxes = document.querySelectorAll('.item-check__box');
    // if the arrow-color class is on the arrow icon, remove it and untick all the boxes
    if (arrow.classList.contains('arrow-color')) {
        arrow.classList.remove('arrow-color');
        for (checkbox of checkboxes) {
            checkbox.checked = false;
        }
        // update the list counter
        countItems();
        // break the function so the boxes don't get re-checked
        return;
    }
    // if the arrow-color class isn't on the arrow, loop through the checkboxes and tick them all
    for (checkbox of checkboxes) {
        checkbox.checked = true;
    }

    arrow.classList.add('arrow-color');
    countItems();
}

function boxCheck() {
    const checkboxes = document.querySelectorAll('.item-check__box');

    // assume all the boxes are checked
    let allChecked = true;
    // loop through each checkbox to see if it's checked
    for (checkbox of checkboxes) {
        // if the current checkbox isn't checked, set the 'allChecked' variable to false, as they're not all checked
        if (checkbox.checked === false) {
            allChecked = false;
        }
        // if the current box is checked and the 'active' button is active, remove it from the list
        if (checkbox.checked === true && active.classList.contains('border')) {
            checkbox.parentNode.parentNode.classList.add('invisible');
        }
        // if the current box is NOT checked and the 'completed' button is active, remove it from the list
        if (checkbox.checked === false && completed.classList.contains('border')) {
            checkbox.parentNode.parentNode.classList.add('invisible');
        }
    }
    // if all the boxes are checked, colour the arrow in
    if (allChecked) {
        arrow.classList.add('arrow-color');
        // get rid of the arrow colour if the boxes aren't all checked
    } else {
        arrow.classList.remove('arrow-color');
    }
}
