# Задание

> 1. Написать html страницу с текстом "Сюрприз!".
> 2. С помощью JavaScript выполнить 5 000 итераций,
> 3. поменять фон на желтый и вывести текст "Сейчас будет еще один цветной сюрприз...", 
> 4. выполнить 50 000 итераций и поменять фон

# Решение

В папке с ресурсами есть две папки **first version/** и **improved version/**

first version - началный вариант решения
improved version - улучшенный вариант со стилями

Пройдемся по каждому.

first-version/index.html

````html
<html>
    <head><title>Background Color Changing Test</title></head>
    <body>
        <h1>СЮРПРИЗ!</h1>
        <script>
            for(var i = 0; i < 5000; i++){}
            document.bgColor = "yellow"
        </script>
        <div>Сейчас будет еще один цветной сюрприз...</div>
        <script>
            for(var i = 0; i < 50000; i++){}
            document.bgColor = "red"
        </script>
    </body>
</html>
````
<details>
  <summary>Анализ кода</summary>

  > 1. Определяем документ через тег html
  > 2. Внутри тега head объявляем title страницы
  > 3. body - тело документа, тут пишется основная разметка страницы
  > 4. пишем текст "Сюрпиз!" как заголовок h1 (для стиля)
  > 5. JS скрипт пишется внутри тега script
  > 6. Нам нужно выполнить 5000 итераций `` for(var i = 0; i < 5000; i++) {} `` 
  > Выполняется 5000 раз и меняется цвет фона на желтый `` document.bgColor = "yellow" ``
  > 7. Выводим следующий текст
  > 8. Еще один цикл выполняется 50000 раз и меняет цвет фона на красный ``document.bgColor = "red"``
</details>
 
Данный код работает, но неправильно. Если открыть файл в браузере мы увидим конечный результат, а все выполненные действия нет. Дело в том что браузер читает каждый тег и создает их объект, читает скрипт и выполняет, после этого прорисовывает все это на экране. По этому видим только конечный результат, а не процесс выполнения. Если прорисовка происходила моментально мы бы получили то чего ожидали, но производительность браузера резко уменьшится

## Правильное решение!

В папке **improved-version/**

Код разделил на три файла:
````
 index.html - HTML разметка страницы
 css/
    style.css - CSS стили
 js/
    script.js - JavaScript код
````

> Разделения кода на файлы (разметка, стили и логика) хорош тем что код станет более понятым и лаконичным. Не придется для изменения например, javascript'a искать в куче тегов тег script, а просто открыть js/script.js

Теперь немного углубимся в код. В первую очередь заглянем index.html и разберем его по подробней

```` html
<html>
    <head>
        <title>Background Color Change Test</title>
        <link rel="stylesheet" href="css/style.css">
        <script src="js/script.js"></script>
    </head>
    <body>
        <div id="surpise">Сюрприз!</div>
        <div id="next-surprise"></div>
        <div id="dynamic-container">
            <input class = "click-me" onclick = "onClickAction()" value="Нажми на меня!" type="button">
         </div>
        </body>
    </html>
````
*только теги*

### Что тут происходить?

Подключаем стили

````html 
<link rel="stylesheet" href="css/style.css">
````

Подключаем скрипт

````html 
<script src="js/script.js"></script>
````
id для привязки стилей (см. css/styles.css: #surprise)
````html 
<div id="surpise">Сюрприз!</div> 
````
Здесь будет размещатся текст *"Сейчас будет еще один цветной сюрприз..."*. Оставил пустым, так как он выводится после через Javascript

````html
<div id="next-surprise"></div>
````

''dynamic-container''
```` html
<div id="dynamic-container">
    <input class = "click-me" onclick = "onClickAction()" value="Нажми на меня!" type="button">
</div>
````
тут немного сложновато, но понять в полне реально. Если запустить index.html в браузере, увидим кнопку "Нажми на меня", описанный тут
```` html
<input class = "click-me" onclick = "onClickAction()" value="Нажми на меня!" type="button">
````
Если нажать на него, кнопка пропадает и в место него появляется счетчик. **id="dynamic-container"** нужен для того чтобы после нажатия на кнопку заменить его содержимое (кнопку) на счетчик, т.е.:
    
    -dynamic-container
        -button

меняется на:

    -dynamic-container
        -counter

Теперь сама кнопка
```` html
<input class = "click-me" onclick = "onClickAction()" value="Нажми на меня!" type="button">
````
**class="click-me"** это класс описания стилей (см. css/style.css: .click-me)

**onclick="onClickAction()"** Данный атрибут говорит какое действие следует выполнить при нажатии на кнопку. В нашем случае это функция onClickAction() в файле js/script.js

## Наконец-то Javascript
Открываем файл js/script.js

````js
function onClickAction() {

    container = elementById("dynamic-container")
    container.innerHTML = "<span id = \"counter\">0</span>"
    
    runLoop(changeCounter, function() {
        document.bgColor = "yellow"
    
        elementById("next-surprise").textContent = "Сейчас будет еще один цветной сюрприз..."
    
        runLoop(changeCounter, function() {
    
            document.bgColor = "blue"
    
            elementById("surpise").textContent = "ВСЕ!"
            elementById("next-surprise").textContent = "Закончили, закрой вкладку :)"
        
        }, 5000)
    }, 5000)
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

````
## Фунции changeCounter и elementById

Две функции **changeCounter** и **elementById** дополнительные, можно было и без них обойтись, но получилось бы много копипаста (такой код называют говнокодом).

**changeCounter** - Меняет значение счетчика на значение time

**elementById** - Возвращает элемент по указанному id (чтобы не приходилось каждый раз писать ``document.getElementById(id)`` )

## Фунция runLoop
Сначала давайте изучим функцию runLoop
````js
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
````
Функция принимает 3 аргумента:
 
 * actionInIteration
 * actionActerComplete
 * iterations

Фукнция выполняет цикл столько раз, сколько задано параметром **iterations**

При каждой итерации выполняется функция **actionInIteration** с значением текущей итерации

После окончания цикла выполняется функция **actionAfterComplete**

Код функции

Задаем текущий индекс итерации
````js
    i = 0;
````
Так как не можем обновлять страницу через цилк for, используем страндартную фукнцию JS для анимации setInterval

**setInterval(function, ms)** принимает два аргумента, первый аргумент это функция, второй числовое значение. Выполняет переданную функция **function** через **ms** (миллисекунды, задается в виде числа). Возвращает свой экземпляр для манипуляций, сохранеям в переменную, например в ``var interval``

````js
var interval = setInterval(function(){

    if(i > interations) {
        clearInterval(interval)
        actionAfterComplete()
    }
        
    actionInIteration(i)
    i++
}, 1)
````
т.е. в нашем случае следующий код будет выполнятся каждую 1 миллисекунду.
````js
if(i > interations) {
    clearInterval(interval)
    actionAfterComplete()
}
actionInIteration(i)
i++
````
Теперь разберем что происходит каждую 1мс
````js
if(i > interations) {
    clearInterval(interval)
    actionAfterComplete()
}
````
Если количество итераций ``i`` превысит заданное колчество в аргументе ``iterations`` цикл прекращается, для завершения используется функция ``clearInterval(instance)``. **instance** - экземпляр возвращенный с ``setInterval``

````js
clearInterval(interval)
`````

После завершения выполняется фукнция ``actionAfterComplete``

Если ``i`` меньше чем ``interations`` выполняется функция ``actionInIterations(i)`` передав текущее значение `i`

## Фунция onClickAction
При нажатии на кнопку вызывается функция `onClickAction()`.
````js
function onClickAction() {

    container = elementById("dynamic-container")
    container.innerHTML = "<span id = \"counter\">0</span>"
    
    runLoop(changeCounter, function() {
        document.bgColor = "yellow"
    
        elementById("next-surprise").textContent = "Сейчас будет еще один цветной сюрприз..."
    
        runLoop(changeCounter, function() {
    
            document.bgColor = "blue"
    
            elementById("surpise").textContent = "ВСЕ!"
            elementById("next-surprise").textContent = "Закончили, закрой вкладку :)"
        
        }, 5000)
    }, 5000)
}
````
Что тут происходит?
Как говорил выше, при нажатии кнопка пропадает и в место него появляется счетчик. Работает таким образом:

Получаем объект c `id` "dynamic-container"
````js
container = elementById("dynamic-container")
````
Меняем сожержимое контейнера c помощью свойства innerHTML
````js
container.innerHTML = "<span id = \"counter\">0</span>"
````

Дальше вызываем ``runLoop``, в качестве аргумента `actionInIteration` передаем функцию `changeCounter`, чтобы при каждой итерации менял значение счетчика. А в качестве `actionAfterComplete` (запускается после завершения цикла) передаем анонимную функцию которая будет выполнятся каждую 1мс 500 раз
````js
runLoop(changeCounter, function() {
    ...
}, 500)
````

содержание первой runLoop

После завершения первого цикла в 500 раз меняем фон на желтый 
````js
document.bgColor = "yellow"
````
получаем объект с id 'next-surprice' и меняем его текст с помощью свойства textContent
````js
elementById("next-surprise").textContent = "Сейчас будет еще один цветной сюрприз..."
````
запускаем еще один цикл в 5000 итераций. В качестве аргумента `actionInInteration`
передаем функцию `changeCounter` чтобы менял счетчик

После завершения меняем опять меняем фон
````js
runLoop(changeCounter, function() {
    // После
    document.bgColor = "blue"
}, 5000)
````

##  Заключение

Данную задачу можно было решить и по другому, более коротко и быстро использовав функцию setTimeout, но счетчика бы не было :)

>Можете попробовать файл js/script2.js
>
>меняем index.html строчку

>``<script src="js/script.js"></script>`` 

>на 

>``<script src="js/script2.js"></script>``

## Думаю что было понятно, если не понятно всегда можете спросить. Удачи! :)
