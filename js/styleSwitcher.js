
const links = document.querySelectorAll('.alternate-style'),
    totalLinks = links.length;

function setActiveStyle(color)
{
    for (let i = 0; i < totalLinks; i++) {
        if (color === links[i].getAttribute('title')) {
            links[i].removeAttribute('disabled');
        } else {
            links[i].setAttribute('disabled', true);
        }
    }
}

// body skin

const bodySkin = document.querySelectorAll('.body-skin'),
    totalBodySkin = bodySkin.length;

for (let i = 0; i < totalBodySkin; i++) {
    bodySkin[i].addEventListener('change', function(){
        if(this.value === 'dark'){
            document.body.className = 'dark';
        } else {
            document.body.className = '';
        }
    });
}

// Set dark mode as default on page load
window.addEventListener('load', () => {
    document.body.className = 'dark';
    // Set the dark radio button as checked
    const darkRadio = document.querySelector('input[name="body-skin"][value="dark"]');
    if (darkRadio) {
        darkRadio.checked = true;
    }
});

document.querySelector('.toggle-style-switcher').addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
});