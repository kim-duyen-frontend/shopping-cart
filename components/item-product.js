import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ModalEditProduct from './modal-edit-product';
import ModalDeleteProduct from './modal-delete-product';

const ItemProduct = ({ product, fetchProducts }) => {
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
                    <button onClick={() => handleOpenModalEditProduct(product)}>
                        <FaEdit />
                    </button>
                    <button onClick={() => handleOpenModalDeleteProduct(product)}>
                        <FaTrashAlt />
                    </button>
                </Td>
            </Tr>
            <ModalEditProduct isModalVisible={isModalVisible} handleCloseModalEditProduct={handleCloseModalEditProduct} dataProductModalEdit={dataProductModalEdit} refresh={fetchProducts} />
            <ModalDeleteProduct openModalDelete={openModalDelete} handleCloseModalDeleteProduct={handleCloseModalDeleteProduct} dataProductModalDelete={dataProductModalDelete} refresh={fetchProducts} />
        </React.Fragment>
    );
};

export default ItemProduct;