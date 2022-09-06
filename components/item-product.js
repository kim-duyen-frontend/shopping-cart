import { Box, Skeleton } from '@mui/material';
import React from 'react';
import formatNumberToVND from "../utils/currency";
import styles from "../styles/itemproduct.module.scss";

const ItemProduct = ({ product }) => {
    return (
        <Box padding={1}>
            <Box>
                <Skeleton variant="rectangular" width={210} height={200} />
            </Box>
            <h3 className={styles.title}>{product.title}</h3>
            <div className={styles.price}>{formatNumberToVND(product.price)}</div>
        </Box>
    );
};

export default ItemProduct;