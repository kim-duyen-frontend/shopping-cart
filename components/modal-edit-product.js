import React, { useState, useEffect } from 'react';
import { myAPI } from "../utils/api/callAPI";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from "../styles/modaledit.module.scss"

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
const ModalEditProduct = ({ isModalVisible, handleCloseModalEditProduct, dataProductModalEdit, refresh }) => {
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [origin, setOrigin] = useState("");
    const [store, setStore] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (isModalVisible) {
            setTitle(dataProductModalEdit.title);
            setBrand(dataProductModalEdit.brand);
            setOrigin(dataProductModalEdit.origin);
            setStore(dataProductModalEdit.store);
            setPrice(dataProductModalEdit.price);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataProductModalEdit])

    const handleSaveModalEditProduct = async () => {
        const response = await myAPI.put(`/products/${dataProductModalEdit._id}`, { title: title, brand: brand, origin: origin, store: store, price: price });
        handleCloseModalEditProduct();
        refresh();
        return response?.data;
    }
    return (
        <Modal
            keepMounted
            open={isModalVisible}
            onClose={handleCloseModalEditProduct}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    S???a th??ng tin s???n ph???m
                </Typography>
                <Box paddingTop={1}>
                    <TextField
                        id="title"
                        label="Ti??u ?????"
                        size='small'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        id="brand"
                        label="Th????ng hi???u"
                        size='small'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <TextField
                        id="origin"
                        label="Xu???t x???"
                        size='small'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                    <TextField
                        id="quantity"
                        label="S??? l?????ng kho"
                        size='small'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={store}
                        onChange={(e) => setStore(e.target.value)}
                    />
                    <TextField
                        id="price"
                        label="Price"
                        size='small'
                        variant="outlined"
                        fullWidth
                        margin='normal'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Box>
                <Box className={styles.btnActiosnEdit}>
                    <Button variant="contained" onClick={handleSaveModalEditProduct}>L??u n???i dung</Button>
                    <Button variant="contained" onClick={handleCloseModalEditProduct}>Tho??t</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalEditProduct;