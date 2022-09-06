import React from 'react';
import ProductsLayout from '../../components/products-layout';
import { Box, Container, Grid, Paper } from '@mui/material';
import styles from "../../styles/productspage.module.scss";
import { myAPI } from "../../utils/api/callAPI";
import ItemProduct from '../../components/item-product';

export const getStaticProps = async () => {
    try {
        const response = await myAPI.get("http://localhost:5000/products");
        const data = response.data.data;
        return {
            props: {
                products: data
            }
        }
    } catch (error) {
        console.log(error);
    }
}
const ProductsPage = ({ products }) => {
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
                                    {products.map((item) => (
                                        <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                                            <ItemProduct product={item} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>


                        </Paper>
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