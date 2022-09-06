import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import formatNumberToVND from "../utils/currency";

const ItemProduct = ({ product }) => {
    return (
        <Box padding={1}>
            <Box>
                <Image src="/products/balo-1.png" width={200} height={200} alt={product.title} />
            </Box>
            <Typography>{product.title}</Typography>
            <Typography>{formatNumberToVND(product.price)}</Typography>
        </Box>
    );
};

export default ItemProduct;