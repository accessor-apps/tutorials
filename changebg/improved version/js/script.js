function onClickAction() {
    container = elementById("dynamic-container")
    container.innerHTML = "<span id = \"counter\">0</span>"
    // wait for 5000 
    runLoop(changeCounter, function() {
        // change color
        document.bgColor = "yellow"
        // Сейчас будет еще один цветной сюрприз...
        elementById("next-surprise").textContent = "Сейчас будет еще один цветной сюрприз..."
        // wait for 50000 
        runLoop(changeCounter, function() {
            // change color
            document.bgColor = "blue"
            // finalize
            elementById("surpise").textContent = "ВСЕ!"
            elementById("next-surprise").textContent = "Закончили, закрой вкладку :)"
        }, 5000)
    }, 500)
}

function runLoop(actionInIteration, actionAfterComplete, interations) {
        i = 0;
        var interval = setInterval(function(){
            if(i > interations) {
                clearInterval(interval)
                actionAfterComplete()
            }
            actionInIteration(i)
            i++
    }, 1)
}

function changeCounter(time) {
    elementById("counter").textContent = time
}

function elementById(id) {
    return document.getElementById(id)
}