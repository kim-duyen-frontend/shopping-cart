import { Box, Skeleton } from '@mui/material';
import React from 'react';
import Link from "next/link";
import formatNumberToVND from "../utils/currency";
import styles from "../styles/itemproduct.module.scss";

const ItemProduct = ({ product }) => {
    
    return (
        <Link href="/products/[id]" as={`/products/${product._id}`}>
            <Box padding={1} className={styles.itemProduct}>
                <Box>
                    <Skeleton variant="rectangular" width={270} height={200} />
                </Box>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.price}>{formatNumberToVND(product.price)}</div>
            </Box>
        </Link>
    );
};

export default ItemProduct;