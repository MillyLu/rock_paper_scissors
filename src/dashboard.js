class Dashboard {
    constructor(element) {
        if(!(element instanceof HTMLElement)){
            throw new Error('Передан не HTMLElement');
        }

        this.element = element;
        this.handlers = [];
        this.onInnerClick = this.onInnerClick.bind(this);
        this.onUserFormSubmit = this.onUserFormSubmit.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this); /////
        this.handleEditUser = this.handleEditUser.bind(this);  ///
        this.getList();

        this.element.addEventListener('click', this.onInnerClick);
    }

    subscribe(handler) {
        this.handlers.push(handler);
    }

    getList(page  = 0) {
        if(page === 0) {
            this.list = [];
        }

        request({
            url: `${Dashboard.BASE_API_URL}user`,
            headers: {
                'app-id': Dashboard.APP_ID,
            },
            params: { page },
            onSuccess: (data) => {
                //this.list = this.list.concat(data.data); или
                this.list = [...this.list, ...data.data];

                if((data.page + 1) * data.limit >= data.total) {
                    this.render();
                    
                    return;
                }
                this.getList(page + 1);
            } 
        });
    }

    render() {
        this.element.innerHTML = '';
        this.element.appendChild(templateEngine(
            this.list.map(Dashboard.itemTemplate)
        ));
    }

    onInnerClick(event) {
        const target = event.target;

        if(target.classList.contains('dashboard__user-delete')) {
            this.handleDeleteItem(target.dataset.id);
        }

        if(target.classList.contains('dashboard__user-edit')) {
            this.handleEditItem(target.dataset.id);
        }


    }

    handleDeleteItem(id) {
        request({
            method: 'DELETE',
            url: `${Dashboard.BASE_API_URL}user/${id}`,
            headers: {
                'app-id': Dashboard.APP_ID,
            },
            onSuccess: (data) => {
                console.log(data);
                this.list = this.list.filter(item => item.id !== id);

                this.render();
            } 
        });
       
    }

    handleEditItem(id) {
        this.editingId = id;
        const item = this.list.find(item => item.id === id);

        if(!item) {
            return;
        }

        this.handlers.forEach(handler => handler(item));
    }

    onUserFormSubmit(data) {
        if(this.editingId) {
            this.handleEditUser(data);

            return;
        }

        this.handleCreateUser(data);
        
    }

    handleCreateUser(data) {
        request({
            method: 'POST',
            url: `${Dashboard.BASE_API_URL}user/create`,
            headers: {
                'app-id': Dashboard.APP_ID, 
            },
            requestType: 'json',
            body: data,
            onSuccess: (data) => {

                this.list.push(data);

                this.render();

            } 
        });
    }

    handleEditUser(data) {
        request({
            method: 'PUT',
            url: `${Dashboard.BASE_API_URL}user/${this.editingId}`,
            headers: {
                'app-id': Dashboard.APP_ID, 
            },
            requestType: 'json',
            body: data,
            onSuccess: (data) => {
                this.list.forEach(item => {
                    if(item.id === data.id) {

                    item.firstName = data.firstName;
                    item.lastName = data.lastName;
                    item.email = data.email;
                    }   

                });

                this.editingId = undefined;

                this.render();

            } 
        });
    }
}

Dashboard.BASE_API_URL = 'https://dummyapi.io/data/v1/';
Dashboard.APP_ID = '6330a88df546cb1d11c41593';

Dashboard.itemTemplate = (user) => ({
    tag: 'article',
    cls: 'dashboard__user',
    content: [
        {
            tag: 'img',
            cls: 'dashboard__user-avatar',
            attrs: {
                src: user.picture,
            }
        },
        {
            tag: 'div',
            cls: 'dashboard__user-title',
            content: user.firstName + ' ' + user.lastName,
        },
        {
            tag: 'i',
            cls: ['dashboard__user-edit', 'fa', 'fa-pencil'],
            attrs: {
                'data-id': user.id,
            },
        },
        {
            tag: 'i',
            cls: ['dashboard__user-delete', 'fa', 'fa-times'],
            attrs: {
                'data-id': user.id,
            },
        },
    ]
})