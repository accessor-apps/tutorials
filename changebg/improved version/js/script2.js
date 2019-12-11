function onClickAction() {
    // wait for 5000 
    setTimeout(function() {
        // change color
        document.bgColor = "yellow"
        // Сейчас будет еще один цветной сюрприз...
        elementById("next-surprise").textContent = "Сейчас будет еще один цветной сюрприз..."
        // wait for 50000 
        setTimeout(function() {
            // change color
            document.bgColor = "blue"
            // finalize
            elementById("surpise").textContent = "ВСЕ!"
            elementById("next-surprise").textContent = "Закончили, закрой вкладку :)"
        }, 5000)
    }, 500)
}

function elementById(id) {
    return document.getElementById(id)
}