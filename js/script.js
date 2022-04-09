const productsWrapper = document.querySelector('.products-wrapper')
const algorithmForm = document.querySelector('#algorithm-form')
const shareForm = document.querySelector('.share-form')
const successDiv = document.querySelector('.div-success')
const successDivFriends = document.querySelector('.div-success-friend')
const moreProducts = document.querySelector('.btn-more-products')
let apiUrl = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'


const loadAPI = function(apiUrl){
    
    fetchAPI = function(){
        
        fetch(apiUrl)
        .then(toJson)
        .then(makeBoxes)
        .catch(err)
    }
    
    const toJson = (response) => {
        
        return response.json()
    }
    
    const makeBoxes = (data) => {
        const products = data.products
        
        for(let count = 0; count < products.length; count++){
            productsWrapper.innerHTML += `
            <div class="products-box">
            <img src="${products[count].image}" alt="">
            <h4>${products[count].name}</h4>
            <p>${products[count].description}</p>
            
            <span>de: R$ ${products[count].oldPrice} </span>
            <h5>Por: R$ ${products[count].price}</h5>
            <span>ou ${products[count].installments.count} de R$ ${products[count].installments.value}</span>
            <button class="btn-buy">Comprar</button>
            </div>
            `
        }
        apiUrl = data.nextPage
        

        moreProducts.addEventListener('click', function(){
            loadAPI(`https://${apiUrl}`)
        })
    }
    
    const err = (err) => {
        console.log('Não foi possivel realizar a requisação erro: '+err)
    }
    fetchAPI()
}


algorithmForm.addEventListener('submit', function(e){
    e.preventDefault()
    const target = e.target
    const name = target.name
    const email = target.email
    const cpf = target.cpf
    const sex = target.sex

    if(name.value != '' & email.value != '' & cpf.value != '' & sex.value != ''){
        algorithmForm.classList.add('hidden')
        successDiv.classList.remove('hidden')
    }else {
        name.classList.add('alert')
        email.classList.add('alert')
        cpf.classList.add('alert')
    }
})

shareForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const target = e.target
    const nameFriend = target.nameFriend
    const emailFriend = target.emailFriend

    console.log(nameFriend)

    if(nameFriend.value != '' & emailFriend.value != ''){
        shareForm.classList.add('hidden')
        successDivFriends.classList.remove('hidden')
    }else {
        nameFriend.classList.add('alert')
        emailFriend.classList.add('alert')
    }
})




loadAPI(apiUrl)