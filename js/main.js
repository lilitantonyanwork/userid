const menu__btn = document.querySelector(".menu__btn");
const menu__box  = document.querySelector(".menu ");
const mainBlock = document.querySelector("body ");
const modal = document.getElementById('contact-modal');
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
    const msg = document.querySelector('.modal__message');

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
        document.querySelector('input[name=email]').classList.add('error');
        return;
    }

    try {
        const res = await fetch('https://userid.sh/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        if (res.ok) {
            msg.textContent = 'Сообщение отправлено!';
            modal.classList.add('show')
            form.reset();

        } else {
            msg.textContent = 'Ошибка при отправке. Попробуйте позже.';
            modal.classList.add('show')
        }
    } catch (err) {
        msg.textContent = 'Ошибка сети. Попробуйте позже.';
        modal.classList.add('show')
    }
    document.getElementById('submit-form').classList.add('disabled')
});

document.querySelector('.close').addEventListener('click',function (){
    document.getElementById('contact-modal').classList.remove('show')
})
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove('show')

    }
});

document.querySelector('.open__form').addEventListener('click',function (e){
    e.preventDefault();
    document.querySelector('details').open = true;
    document.querySelector('details').scrollIntoView({ behavior: 'smooth', block: 'start' });
})