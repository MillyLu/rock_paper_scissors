class UserForm {
    constructor(element) {
        if(!(element instanceof HTMLElement)) {
            throw new Error('Передан не HTMLElement');
        }

        this.element = element;
        this.handlers = [];

        this.onSubmit = this.onSubmit.bind(this);
        this.onPutData = this.onPutData.bind(this);

        this.element.addEventListener('submit', this.onSubmit);
    }

    subscribe(handler) {
        this.handlers.push(handler);
    }

    onSubmit(event) {
        event.preventDefault();
        const fields = this.element.querySelectorAll('.user__field');

        const data = {};

        fields.forEach(field => {
            data[field.name] = field.value;
        });

        this.handlers.forEach(handler => handler(data));


    }

    onPutData(data) {
        const fields = this.element.querySelectorAll('.user__field');

        fields.forEach(field => {
            field.value = data[field.name] || '';
        });
    }
}