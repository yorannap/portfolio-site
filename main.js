let heading = document.querySelector('h1');
let trigger = document.querySelector('h3');

trigger.addEventListener('click', onClick);

function onClick(e) {
    if ( heading.innerText == 'My Portfolio') {
        heading.innerHTML = 'Nevermind';
    }
    else {
        heading.innerHTML = 'My Portfolio';
        console.log('trigger');
    }
}

console.log(typeof heading.innerText);