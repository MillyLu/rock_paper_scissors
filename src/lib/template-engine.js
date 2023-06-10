function templateEngine(block) {

    if((block === undefined) || (block === null) || (block === false)) {
        return document.createTextNode(''); // вернет пустой текстовый узел
    }

    if((typeof block === 'string') || (typeof block === 'number') || (block === TextTrackCue)) {
        return document.createTextNode(block); // вернет пустой текстовый узел
    }

    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();

        block.forEach(item => {
            const el = templateEngine(item);

            fragment.appendChild(el);
        });

        return fragment;
    }

    const element = document.createElement(block.tag);

    /*if (block.cls) {
        let classes;
        if (typeof block.cls === 'string') {
            classes = [block.cls];
        } else {
            classes = block.cls;
        }

        classes = classes.filter(Boolean); // filter(item => item !== undefined) одно и тоже
        element.classList.add(...classes);
    }*/ //длинная запись, можно сократить =>

    if(block.cls) {
        element.classList.add(
            ...[].concat(block.cls).filter(Boolean)
        );
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach(key => {
            element.setAttribute(key, block.attrs[key]);
        });
    }

    const content = templateEngine(block.content);

    element.appendChild(content);

    return element;


}
