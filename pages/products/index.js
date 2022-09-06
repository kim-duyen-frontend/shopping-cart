import React, { useEffect, useState } from 'react';
import ProductsLayout from '../../components/products-layout';
import { Box, Container, Grid, Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import styles from "../../styles/productspage.module.scss";
import { getProductsPage } from "../../utils/api/callAPI";
import ItemProduct from '../../components/item-product';

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
        <Box pt={4}>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={styles.leftCol}>
                        <Paper elevation={0}>
                            Left column
                        </Paper>
                    </Grid>
                    <Grid item className={styles.rightCol}>
                        <Paper elevation={0}>
                            <Box>
                                <Grid container>
                                    {productList.map((item) => (
                                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                                            <ItemProduct product={item} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Paper>
                        <Pagination
                            count={totalPages.last_page}
                            page={parseInt(pagesArray.join())}
                            onChange={(event, value) => setPage(value)}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};


ProductsPage.getLayout = function getLayout(page) {
    return <ProductsLayout>{page}</ProductsLayout>
}
export default ProductsPage;