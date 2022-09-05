import React from 'react';
import ProductsLayout from '../../components/products-layout';
import ListProduct from '../../features/list-product';

const ProductsPage = () => {
    return (
        <div className="productsPage">
            <ListProduct />
        </div>
    );
};
ProductsPage.getLayout = function getLayout(page) {
    return <ProductsLayout>{page}</ProductsLayout>
}
export default ProductsPage;