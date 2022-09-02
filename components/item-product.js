import React from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const ItemProduct = ({ product }) => {
    return (
        <Tr>
            <Td>{product.title}</Td>
            <Td>{product.brand}</Td>
            <Td>{product.origin}</Td>
            <Td>{product.store}</Td>
            <Td>{product.price}</Td>
            <Td>
                <button>
                    <FaEdit />
                </button>
                <button>
                    <FaTrashAlt />
                </button>
            </Td>
        </Tr>
    );
};

export default ItemProduct;