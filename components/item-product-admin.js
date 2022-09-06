import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ModalEditProduct from './modal-edit-product';
import ModalDeleteProduct from './modal-delete-product';
import { Tr, Td } from 'react-super-responsive-table';
import { Stack, Button } from '@mui/material';

const ItemProductAdmin = ({ product, fetchProducts }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataProductModalEdit, setDataProductModalEdit] = useState({});
    const [dataProductModalDelete, setDataProductModalDelete] = useState({});

    const handleOpenModalEditProduct = (product) => {
        setIsModalVisible(true);
        setDataProductModalEdit(product);
    }
    const handleCloseModalEditProduct = () => setIsModalVisible(false);

    const handleOpenModalDeleteProduct = (product) => {
        setOpenModalDelete(true);
        setDataProductModalDelete(product);
    }
    const handleCloseModalDeleteProduct = () => setOpenModalDelete(false);
    return (
        <React.Fragment>
            <Tr>
                <Td>{product.title}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.origin}</Td>
                <Td>{product.store}</Td>
                <Td>{product.price}</Td>
                <Td>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" color="warning" size="large" onClick={() => handleOpenModalEditProduct(product)}><FaEdit /></Button>
                        <Button variant="contained" color="error" size="large" onClick={() => handleOpenModalDeleteProduct(product)}><FaTrashAlt /></Button>
                    </Stack>
                </Td>
            </Tr>
            <ModalEditProduct isModalVisible={isModalVisible} handleCloseModalEditProduct={handleCloseModalEditProduct} dataProductModalEdit={dataProductModalEdit} refresh={fetchProducts} />
            <ModalDeleteProduct openModalDelete={openModalDelete} handleCloseModalDeleteProduct={handleCloseModalDeleteProduct} dataProductModalDelete={dataProductModalDelete} refresh={fetchProducts} />
        </React.Fragment>
    );
};

export default ItemProductAdmin;