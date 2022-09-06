import { Box, Typography } from '@mui/material';
import React from 'react';

const ItemProduct = ({ product }) => {
    return (
        <Box>
            <Typography>{product.title}</Typography>
            <Typography>{product.price}</Typography>
        </Box>
    );
};

export default ItemProduct;