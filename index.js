document.addEventListener('DOMContentLoaded', function () {

    // Обработка всех кнопок с ответами (включая картинки)
    const answerButtons = document.querySelectorAll('.pair-btn, .pic-btn');

    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Если уже нажата - ничего не делаем
            if (this.classList.contains('clicked')) return;

            // Добавляем класс clicked с небольшой задержкой для плавности
            setTimeout(() => {
                this.classList.add('clicked');
            }, 10);

            // Через 3 секунды убираем подсветку
            setTimeout(() => {
                this.classList.add('fade-out');

                // Еще через 0.5 секунды полностью убираем
                setTimeout(() => {
                    this.classList.remove('clicked', 'fade-out');
                }, 500);

            }, 3000); // Через 3 секунды начинаем исчезать
        });
    });
    // Правильные ответы
    const correctAnswers = [2, 3, 5];

    // Обработчик нажатия Enter в поле ввода
    const answerInput = document.querySelector('.answer-input');
    if (answerInput) {
        answerInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkAnswer();
            }
        });
    }

    function checkAnswer() {
        const input = document.querySelector('.answer-input');
        const userInput = input.value.trim();

        // Если поле пустое - сбрасываем
        if (!userInput) {
            resetHighlighting();
            return;
        }

        // Получаем массив чисел из ввода
        const userNumbers = userInput.split(/[, ]+/)
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num) && num >= 1 && num <= 5);

        // Считаем правильные
        let correctCount = 0;
        userNumbers.forEach(num => {
            if (correctAnswers.includes(num)) {
                correctCount++;
            }
        });

        // Определяем цвет подсветки
        let inputColorClass = '';
        if (userNumbers.length === 0) {
            // Ничего не введено
            inputColorClass = '';
        } else if (correctCount === userNumbers.length && correctCount === correctAnswers.length) {
            // Все введенные правильные И найдены все правильные
            inputColorClass = 'green';
        } else if (correctCount > 0) {
            // Есть хотя бы один правильный
            inputColorClass = 'yellow';
        } else {
            // Нет правильных
            inputColorClass = 'red';
        }

        // Подсвечиваем поле ввода
        input.className = 'answer-input';
        if (inputColorClass) {
            input.classList.add(inputColorClass);
        }

        // Подсвечиваем пункты списка
        highlightListItems(userNumbers);
    }

    function highlightListItems(userNumbers) {
        const listItems = document.querySelectorAll('.list li');

        listItems.forEach((item, index) => {
            const itemNumber = index + 1;
            item.classList.remove('correct-answer', 'incorrect-answer');

            // Если пользователь ввел этот номер
            if (userNumbers.includes(itemNumber)) {
                if (correctAnswers.includes(itemNumber)) {
                    item.classList.add('correct-answer'); // Зеленый
                } else {
                    item.classList.add('incorrect-answer'); // Красный
                }
            }
        });
    }

    function resetHighlighting() {
        const input = document.querySelector('.answer-input');
        const listItems = document.querySelectorAll('.list li');

        // Сбрасываем поле ввода
        input.className = 'answer-input';

        // Сбрасываем подсветку списка
        listItems.forEach(item => {
            item.classList.remove('correct-answer', 'incorrect-answer');
        });
    }

    const bigText = document.querySelector('.big-text');
    if (bigText) {
        // Разбиваем текст на слова
        const text = bigText.textContent;
        const words = text.split(/\s+/); // Разделяем по пробелам

        // Правильный ответ: "дифференциация," (тавтология с "разграничение")
        const correctWord = 'дифференциация,';

        // Создаем HTML с кликабельными словами
        let newHTML = '';
        words.forEach(word => {
            newHTML += `<span class="word">${word}</span> `;
        });

        bigText.innerHTML = newHTML;

        // Обработчик кликов
        bigText.querySelectorAll('.word').forEach(wordEl => {
            wordEl.addEventListener('click', function () {
                // Убираем подсветку со всех слов
                bigText.querySelectorAll('.word').forEach(w => {
                    w.classList.remove('correct', 'incorrect');
                });

                // Подсвечиваем текущее слово
                if (this.textContent === correctWord) {
                    this.classList.add('correct'); // Зеленый
                } else {
                    this.classList.add('incorrect'); // Красный
                }
            });
        });
    }
});
// 3. Текстовое поле блока 5
const textarea = document.querySelector('textarea.big');
if (textarea) {
    textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { // Ctrl+Enter или Cmd+Enter
            e.preventDefault();
            sendAnswer();
        }
    });

    // Добавим подсказку
    textarea.placeholder = "Введите ваш ответ здесь... (Ctrl+Enter для отправки)";
}

function sendAnswer() {
    const textarea = document.querySelector('textarea.big');
    const answerBox = document.querySelector('.answer-box');

    if (textarea && textarea.value.trim() !== '') {
        // Визуальная индикация
        answerBox.classList.add('sent');

        // Сообщение в консоль
        console.log('Спасибо за Ваш ответ');

        // Можно еще alert добавить (опционально)
        // alert('Спасибо за Ваш ответ!');
    }
}