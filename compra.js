document.addEventListener('DOMContentLoaded', function() {
    const productFilter = document.getElementById('product-filter');
    const caseSubfilterContainer = document.getElementById('case-subfilter-container');
    const caseSubfilter = document.getElementById('case-subfilter');
    const chargerSubfilterContainer = document.getElementById('charger-subfilter-container');
    const chargerSubfilter = document.getElementById('charger-subfilter');
    const earphoneSubfilterContainer = document.getElementById('earphone-subfilter-container');
    const earphoneSubfilter = document.getElementById('earphone-subfilter');
    const products = document.querySelectorAll('.product');

    function filterProducts() {
        const filterValue = productFilter.value;
        const subfilterValue = 
            filterValue === 'case' ? caseSubfilter.value :
            filterValue === 'charger' ? chargerSubfilter.value :
            filterValue === 'earphone' ? earphoneSubfilter.value : 'all';

        products.forEach(product => {
            if (filterValue === 'all') {
                product.style.display = 'block';
            } else {
                if (subfilterValue === 'all') {
                    product.style.display = product.classList.contains(filterValue) ? 'block' : 'none';
                } else {
                    product.style.display = product.classList.contains(filterValue) && product.classList.contains(subfilterValue) ? 'block' : 'none';
                }
            }
        });
    }

    productFilter.addEventListener('change', function() {
        caseSubfilterContainer.style.display = 'none';
        chargerSubfilterContainer.style.display = 'none';
        earphoneSubfilterContainer.style.display = 'none';

        if (productFilter.value === 'case') {
            caseSubfilterContainer.style.display = 'block';
        } else if (productFilter.value === 'charger') {
            chargerSubfilterContainer.style.display = 'block';
        } else if (productFilter.value === 'earphone') {
            earphoneSubfilterContainer.style.display = 'block';
        }
        filterProducts();
    });

    caseSubfilter.addEventListener('change', filterProducts);
    chargerSubfilter.addEventListener('change', filterProducts);
    earphoneSubfilter.addEventListener('change', filterProducts);

    // Initial filter
    filterProducts();
});


const productFilter = document.getElementById('product-filter');
const caseSubfilterContainer = document.getElementById('case-subfilter-container');
const chargerSubfilterContainer = document.getElementById('charger-subfilter-container');
const earphoneSubfilterContainer = document.getElementById('earphone-subfilter-container');

productFilter.addEventListener('change', function() {
    const value = this.value;
    caseSubfilterContainer.style.display = value === 'case' ? 'block' : 'none';
    chargerSubfilterContainer.style.display = value === 'charger' ? 'block' : 'none';
    earphoneSubfilterContainer.style.display = value === 'earphone' ? 'block' : 'none';
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

document.querySelectorAll('.btn-compra').forEach(button => {
    button.addEventListener('click', function() {
        const title = this.getAttribute('data-title');
        const price = this.getAttribute('data-price');
        const description = this.getAttribute('data-description');
        const imgSrc = this.getAttribute('data-img');

        document.getElementById('purchase-title').textContent = title;
        document.getElementById('purchase-price').textContent = price;
        document.getElementById('purchase-description').textContent = description;
        document.getElementById('purchase-img').setAttribute('src', imgSrc);

        document.querySelector('.products-container').style.display = 'none';
        document.getElementById('purchase-screen').style.display = 'block';
    });
});

document.getElementById('product-filter').addEventListener('change', function() {
    const value = this.value;
    document.querySelectorAll('.product').forEach(product => {
        if (value === 'all' || product.classList.contains(value)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    document.getElementById('case-subfilter-container').style.display = value === 'case' ? 'block' : 'none';
    document.getElementById('charger-subfilter-container').style.display = value === 'charger' ? 'block' : 'none';
    document.getElementById('earphone-subfilter-container').style.display = value === 'earphone' ? 'block' : 'none';
});

document.getElementById('case-subfilter').addEventListener('change', function() {
    const value = this.value;
    document.querySelectorAll('.case').forEach(product => {
        if (value === 'all' || product.classList.contains(value)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('charger-subfilter').addEventListener('change', function() {
    const value = this.value;
    document.querySelectorAll('.charger').forEach(product => {
        if (value === 'all' || product.classList.contains(value)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.getElementById('earphone-subfilter').addEventListener('change', function() {
    const value = this.value;
    document.querySelectorAll('.earphone').forEach(product => {
        if (value === 'all' || product.classList.contains(value)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

document.querySelectorAll('.btn-compra').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const imgSrc = product.querySelector('img').src;
        const title = product.querySelector('.titulo-card').textContent;
        const price = product.querySelector('.container-btn').previousElementSibling.textContent;

        document.getElementById('purchase-img').src = imgSrc;
        document.getElementById('purchase-title').textContent = title;
        document.getElementById('purchase-price').textContent = price;
        document.getElementById('total-price').textContent = price;
        document.getElementById('purchase-screen').style.display = 'block';
        document.getElementById('contact-screen').style.display = 'none';
    });
});

document.getElementById('quantity').addEventListener('input', () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('purchase-price').textContent.replace('R$', '').replace(',', '.'));
    const totalPrice = (quantity * price).toFixed(2).replace('.', ',');
    document.getElementById('total-price').textContent = `R$ ${totalPrice}`;
});

document.querySelector('.botao-compra').addEventListener('click', () => {
    document.getElementById('contact-screen').style.display = 'block';
    document.getElementById('purchase-screen').style.display = 'none';
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
