import products from './products';

const getProducts = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id) {
                const product = products.find(prod => prod.id === id);
                if (product) {
                    resolve(product);
                } else {
                    reject({ error: 'Producto no encontrado' });
                }
            } else {
                resolve(products);
            }
        }, 2000);
    });
};

export default getProducts;