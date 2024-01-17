class Card {
    constructor({id, title, body, name, email },root){
        this.id = id,
        this.title = title,
        this.body = body,
        this.name = name,
        this.email = email
        this.root = root
    }
    deleteCard() {
        const element = document.getElementById(this.id)
        element.remove() 
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
        this.root.appendChild(element) 
    }

}

class Cards {
    constructor(usersFetchUrl, postsFetchUrl, card){
        this.usersFetch = fetch(usersFetchUrl).then(response => response.json())

        this.postsFetch = fetch(postsFetchUrl).then(response => response.json())
        this.card = card
        this.cards = []
        this.getInfo() 
    }
  
     getInfo = async () => {
        try {
            const [users, posts] = await Promise.all([this.usersFetch, this.postsFetch])
            console.log(users, posts)
            const root = document.getElementById('root')
            this.cards = posts.map((post) => {
                const [user] = users.filter(user => user.id === post.userId)
                const card = { ...user, ...post }
                const cardObj = new this.card(card, root)
                cardObj.createCard()
                return cardObj
            })
            console.log(this.cards)
        } catch (error) {
            console.error(error)
        }
    }
    deleteCard (id) {
        
        const index = this.cards.findIndex((element) => {
            return element.id === Number(id)
        })

        this.cards[index].deleteCard()
        this.cards.splice(index, 1)
    }
}
const cards = new Cards ('https://ajax.test-danit.com/api/json/users','https://ajax.test-danit.com/api/json/posts', Card)


document.addEventListener('click', (event) => {
    switch (event.target.classList.value){
        case 'card__delete':
            console.log('delete')
            console.log(cards.cards.length)
            cards.deleteCard(event.target.dataset.id)
            break
        case 'card__edit':
            console.log('edit')
            break

        default:
    }
})

