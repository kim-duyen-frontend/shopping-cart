import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ModalEditProduct from './modal-edit-product';

const ItemProduct = ({ product }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataProduct, setDataProduct] = useState({});

    const handleEditProduct = (product) => {
        console.log("check product: ", product);
        setIsModalVisible(true);
        setDataProduct(product)
    }
    const handleCloseModalEditProduct = () => setIsModalVisible(false);
    return (
        <>
            <Tr>
                <Td>{product.title}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.origin}</Td>
                <Td>{product.store}</Td>
                <Td>{product.price}</Td>
                <Td>
                    <button onClick={() => handleEditProduct(product)}>
                        <FaEdit />
                    </button>
                    <button>
                        <FaTrashAlt />
                    </button>
                </Td>
            </Tr>
            <ModalEditProduct isModalVisible={isModalVisible} handleCloseModalEditProduct={handleCloseModalEditProduct} dataProduct={dataProduct} />
        </>
    );
};

export default ItemProduct;