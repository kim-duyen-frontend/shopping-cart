import { Box, Container, Grid, Paper } from '@mui/material';
import React from 'react';
import styles from "../../styles/listproduct.module.scss";

const ListProduct = () => {
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
                        <Paper elevation={0}>Tất cả sản phẩm</Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ListProduct;