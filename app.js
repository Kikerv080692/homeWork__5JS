class Card {
    constructor({ id, title, body, name, email }) {
        this.id = id
        this.title = title
        this.body = body
        this.name = name
        this.email = email
    }
    createCard() {
        const html = `
                    <h2 class="card__title">${this.title}</h2>
                    <p class="card__body">${this.body}</p>
                    <div class="card__name">${this.name}</div>
                    <a href="mailto:${this.email}">${this.email}</a>
                    <div class="card__action">
                    <button data-id="${this.id}" class="card__delete">Delete</button>
                    <button data-id="${this.id}" class="card__edit">Edit</button>
                    </div>
                    `
        const element = document.createElement('div')
        element.classList.add('card')
        element.id = this.id
        element.innerHTML = html
        return element
    }
    
}

const usersFetch = fetch('https://ajax.test-danit.com/api/json/users').then(response => response.json())

const postsFetch = fetch('https://ajax.test-danit.com/api/json/posts').then(response => response.json())

const deletePost = async ( postId ) => {
    try {
        const response =  await fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, { method: 'DELETE' })
        console.log(response)
        if(response.status === 200){
            const element = document.getElementById(postId)
            element.remove()
        }
       
    }catch(error){
        console.error(error)
    }
}

const getInfo = async () => {
    try {
        const [users, posts] = await Promise.all([usersFetch, postsFetch])
        console.log(users, posts)
        const cards = posts.map((post) => {
            const [user] = users.filter(user => user.id === post.userId)
            return new Card({ ...user, ...post })
        })
        console.log(cards)
        const root = document.getElementById('root')
        cards.forEach(element => {
            const cardHTML = element.createCard()
            root.appendChild(cardHTML)
        });
    } catch (error) {
        console.error(error)
    }
}
getInfo()

document.addEventListener('click', (event) => {
    switch (event.target.classList.value){
        case 'card__delete':
            console.log('delete')
            deletePost(event.target.dataset.id)
            break
        case 'card__edit':
            console.log('edit')
            break

        default:
    }
})

