const details = document.querySelector('.comments')

const getData = (url) => 
    new Promise ((resolve, reject) => 
    fetch(url)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
)

const postData = (url, product) => {
    return new Promise((resolve, reject) =>
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(error => reject(error))
    )
}

document.addEventListener('DOMContentLoaded', async e => {
    e.preventDefault()
    const data = await getData('http://localhost:3002/comments1')
    data.forEach(el => {
        details.insertAdjacentHTML('beforeend', 
        `
        <div class="comment">
            <div class="user">${el.username}</div>
            <div class="text">${el.comment}</div>
        </div>
        `)
    })
    details.insertAdjacentHTML('beforeend', 
        `
        <div class="sentThis">
            <input type="text" class="comment-input" placeholder="Enter a comment" />
            <button class="material-symbols-outlined">
                arrow_circle_right
            </button>
        </div>
        `
     )
    const but = document.querySelector('button')
    const input = document.querySelector('input')
    but.addEventListener('click', async (e) => {
        e.preventDefault()
        if (input.value.length === 0) {
            alert('Введите текст комментария')
        }
        else {
            try {
                let username = "User"
                let comment = input.value
                input.value = ''
                details.insertAdjacentHTML('afterbegin', 
                    `
                    <div class="comment">
                        <div class="user">${username}</div>
                        <div class="text">${comment}</div>
                    </div>
                    `
                )
                const product = await postData('http://localhost:3002/comments1', {
                    id: Math.floor(Math.random() * 10000),
                    username,
                    comment
                })
                console.log(product)
            } catch (error) {
                console.error(error)
            }
        }
    })
})