const editor = ace.edit("editor");
const buttonRun = document.querySelector('.js-button-run');
const log = document.querySelector('.js-log');
const consoleLog = console.log;

editor.setOption('useWorker', false);
editor.session.setMode("ace/mode/javascript");
editor.setTheme("ace/theme/monokai");
buttonRun.addEventListener('click', () => {
    log.innerHTML = '';

    console.log = (...params) => {
        

        log.innerHTML += `<div class="log-line"> ${params.join(' ')} </div>`;

        consoleLog(...params);
    }

    eval(sweet.compile(templates.join('') + editor.getValue()).code);
});

window.addEventListener('load', () => {
    buttonRun.click();
});