import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import ProductsLayout from '../../components/products-layout';
import Pagination from '@mui/material/Pagination';
import styles from "../../styles/productspage.module.scss";
import { getProductsPage } from "../../utils/api/callAPI";
import ItemProduct from '../../components/item-product';
import Navbar from '../../features/navbar';

const ProductsPage = () => {
    const [page, setPage] = useState(1);
    const [productList, setProductList] = useState([]);
    const [totalPages, setTotalPages] = useState([]);

    useEffect(() => {
        getProductsPage(page).then((json) => {
            setProductList(json.data)
            setTotalPages(json);
        })
    }, [page])
    const pagesArray = Array(totalPages.total).fill().map((_, index) => index + 1);

    return (
        <>
            <Navbar />
            <Paper elevation={0}>
                {productList.map((item) => (
                    <ItemProduct key={item._id} product={item} />
                ))}
            </Paper>
            <div className={styles.pagination}>
                <Pagination
                    count={totalPages.last_page}
                    page={parseInt(pagesArray.join())}
                    onChange={(event, value) => setPage(value)}
                />
            </div>

        </>
    );
};


ProductsPage.getLayout = function getLayout(page) {
    return <ProductsLayout>{page}</ProductsLayout>
}
export default ProductsPage;