const menu__btn = document.querySelector(".menu__btn");
const menu__box  = document.querySelector(".menu ");
const mainBlock = document.querySelector("body ");
menu__btn.addEventListener("click", () => {

    if (menu__box.classList.contains('open')) {
        mainBlock.classList.remove("no-scroll")
        menu__box.classList.remove('open');
    } else {
        menu__box.classList.add("open");
        mainBlock.classList.add("no-scroll")
    }

});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const status = document.getElementById('formStatus');
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        status.textContent = 'Пожалуйста, заполните все поля.';
        return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        status.textContent = 'Введите корректный email.';
        return;
    }

    try {
        const res = await fetch('https://userid.sh/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
            status.textContent = 'Сообщение отправлено!';
            form.reset();
        } else {
            status.textContent = 'Ошибка при отправке. Попробуйте позже.';
        }
    } catch (err) {
        status.textContent = 'Ошибка сети. Попробуйте позже.';
    }
});