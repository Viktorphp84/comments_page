const form = document.forms['comment-form'];
const submit = form.elements['comment-form__submit'];
const formText = form.elements['comment-form__text'];
const nameText = form.elements['comment-form__name'];
const inputDate = form.elements['comment-form__date'];

const comment = document.querySelector('.comments__one-comment');
comment.style.display = 'none';

submit.addEventListener('click', function (event) {
    event.preventDefault();
    submitForm();
});

formText.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitForm();
    }
});

nameText.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitForm();
    }
});

function submitForm() {
    const errorName = document.querySelector('.comment-form__error');
    const errorDate = document.querySelector('.comment-form__error-date');
    const formDate = form.elements['comment-form__date'];

    nameText.addEventListener("click", function () {
        errorName.textContent = "";
    });

    inputDate.addEventListener("click", function () {
        errorDate.textContent = "";
    });

    if (formDate.value == "") {
        errorDate.textContent = "Укажите дату";
    }

    if (nameText.value.length == "") {
        errorName.textContent = "Поле не должно быть пустым";
    } else if (!/^[a-zA-Z0-9а-яА-Я]+$/.test(nameText.value)) {
        errorName.textContent = "Имя должно содержать только буквы или цифры";
    } else if (nameText.value.length < 3) {
        errorName.textContent = "Длина имени должна быть больше двух символов";
    } else if (formDate.value != "") {
        const cloneComment = comment.cloneNode(true);
        cloneComment.querySelector('.comments__text').textContent = formText.value;
        cloneComment.querySelector('.comments__name').textContent = nameText.value;
        cloneComment.style.display = 'flex';

        /******************************************************************************************/
        const cloneDate = cloneComment.querySelector('.comments__date');
        const inputDate = new Date(formDate.value);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        function formatTime(date) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }

        inputDate.setHours((new Date()).getHours());
        inputDate.setMinutes((new Date()).getMinutes());

        if (inputDate.toDateString() === today.toDateString()) {
            const time = formatTime(inputDate);
            cloneDate.textContent = `Сегодня, ${time}`;
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
            const time = formatTime(inputDate);
            cloneDate.textContent = `Вчера, ${time}`;
        } else {
            cloneDate.textContent = inputDate.toLocaleDateString();
        }
        /******************************************************************************************/

        const heart = cloneComment.querySelector('.comments__like');
        heart.addEventListener("click", function () {
            const src = heart.getAttribute('src');
            if (src.includes('heart-black.svg')) {
                heart.setAttribute('src', 'images/heart-red.svg');
            } else {
                heart.setAttribute('src', 'images/heart-black.svg');
            }
        });

        const basket = cloneComment.querySelector('.comments__basket');
        basket.addEventListener("click", function () {
            cloneComment.remove();
        });

        const clonedElements = document.querySelectorAll('.comments__one-comment');
        const lastClonedElement = clonedElements[clonedElements.length - 1];

        lastClonedElement.after(cloneComment);
    }
}

