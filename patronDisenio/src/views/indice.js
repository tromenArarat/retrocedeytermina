fetch('http://localhost:8080/api/orders').then(result=>result.json()).then(json=>{
    const fragment = document.createDocumentFragment();
    json.result.forEach(order=>{
        const div = document.createElement('p')
        const priceParagraph = document.createElement('p')
        const statusParagraph = document.createElement('p')
        const number = document.createElement('p')
        priceParagraph.innerHTML = `Total de la orden: ${order.totalPrice}`;
        statusParagraph.innerHTML = `Estado: ${order.status}`;
        number.innerHTML = `Orden número: ${order.number}`;
        div.appendChild(number);
        div.appendChild(priceParagraph);
        div.appendChild(statusParagraph);
        fragment.append(div);
    }) 
    const ordersContainer = document.getElementById('orders');
    ordersContainer.appendChild(fragment);
})