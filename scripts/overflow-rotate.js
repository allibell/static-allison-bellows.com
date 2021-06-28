overflowRotate = function(){
    const categories = document.querySelectorAll('.category');
    var overflow = false;

    categories.forEach(category => {
        if (category.offsetWidth < category.scrollWidth) {
            /* the text overflows horizontally, so make it vertical */
            console.log('category overflow');
            console.log(category);
            overflow = true;
        } 
    });

    if (overflow) {
        categories.forEach(category => {
            category.classList.toggle('narrow');
        });
    }

};

load = function() {
    burgerMenu();
    overflowRotate();
}

window.onload = load;

window.addEventListener('resize', overflowRotate);
