import React from 'react';
import ProductsLayout from '../../components/products-layout';

const ProductsPage = () => {
    return (
        <div>
            <h1>Trang bán hàng</h1>
        </div>
    );
};
ProductsPage.getLayout = function getLayout(page) {
    return <ProductsLayout>{page}</ProductsLayout>
}
export default ProductsPage;