

let catProduct = async (productName = '', searchQuery = '') => {
    let productapiurl = '';

    if (searchQuery !== '') {
        productapiurl = `https://dummyjson.com/products/search?q=${searchQuery}`;
    } else if (productName !== '') {
        productapiurl = `https://dummyjson.com/products/category/${productName.replace(/\s+/g, '-')}`;

        document.querySelector(".search-bar input").value = '';
    } else {
        productapiurl = 'https://dummyjson.com/products';
    }

    let Catelement = document.querySelector(".forScroll ul");

    let Catlist = async () => {
        let apiurl = await fetch('https://dummyjson.com/products/categories');
        let AllCat = await apiurl.json();
        let AllCategories = '';
        
        AllCat.forEach((CatName) => {
            AllCategories += `<li onclick="catProduct('${CatName.name}'); Bgred(this)">${CatName.name}</li>`;
        });

        Catelement.innerHTML = AllCategories;
    };
    Catlist();

    let products = document.querySelector(".product-gallery");

    let productList = async () => {
        let apiurl = await fetch(productapiurl);
        let product = await apiurl.json();
        let productList = '';

        if (product.products.length !=0) {
            product.products.forEach(({ title, category, price, thumbnail }) => {
                productList += `<div class="product">
                    <img src="${thumbnail}" alt="${title}">
                    <div class="ProductDetails">
                        <h2>${title}</h2>
                        <p class="pcat">${category}</p>
                        <p class="Price">Price $${price}</p>
                    </div>
                </div>`;
            });
        }else{
            productList += `<div class="product">
                    <h1>Product Not found</h1>
                </div>`;
        }

        products.innerHTML = productList;
    };
    await productList();
};

let Bgred = (item) => {
    item.style.background="red"
};

let forminput = document.querySelector(".search-bar");
forminput.addEventListener("submit", (event) => {
    event.preventDefault();
    let Value = event.target.inputbox.value;
    handleSearch(Value);
});

function handleSearch(value) {
    catProduct('', value);
}

// Load default products initially
handleSearch('');
