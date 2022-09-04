import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from "../styles/modaldelete.module.scss";
import { myAPI } from "../utils/api/callAPI";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalDeleteProduct = ({ openModalDelete, handleCloseModalDeleteProduct, dataProductModalDelete, refresh }) => {

    const handleDeleteProduct = async () => {
        let id = dataProductModalDelete._id;
        const response = await myAPI.delete(`/products/${id}`);
        handleCloseModalDeleteProduct();
        refresh();
        return response?.data;
    }
    return (
        <>
            <Modal
                open={openModalDelete}
                onClose={handleCloseModalDeleteProduct}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Box className={styles.btnActiosnDelete}>
                        <Button variant="contained" onClick={handleDeleteProduct}>Xóa sản phẩm</Button>
                        <Button variant="contained" onClick={handleCloseModalDeleteProduct}>Thoát</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ModalDeleteProduct;