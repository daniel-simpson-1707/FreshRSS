'use strict';

window.onload = function () {
    // Initial stripping for situation where 'no new item changes triggered later'
    stripTitleHTML();

    // Insert entry monitor for autoloading list
    monitorEntry(stripTitleHTML);

    function monitorEntry(monitorCallback) {
        const targetNode = document.getElementById('stream');
        const config = { attributes: false, childList: true, subtree: false };
        const callback = function (mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    monitorCallback(mutationsList);
                }
            }
        };
        const observer = new MutationObserver(callback);
        if (targetNode) {
            observer.observe(targetNode, config);
        }
    }
};

function stripTitleHTML() {
    // Original selector
    const entries1 = document.querySelectorAll('.content h1.title > a');
    entries1.forEach(entry => {
        entry.innerHTML = strip_tags(entry.innerHTML);
    });

    // New selector
    const entries2 = document.querySelectorAll('.flux .flux_header .item .title:has(~.date)');
    entries2.forEach(entry => {
        entry.innerHTML = strip_tags(entry.innerHTML);
    });
}

function strip_tags(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}
