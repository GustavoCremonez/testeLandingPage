const productsWrapper = document.querySelector('.products-wrapper')
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

const formValidation = function(){

}

loadAPI(apiUrl)