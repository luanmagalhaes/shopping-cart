import React from 'react';
import {
    Alert,
    Button,
    Rating,
    Stack,
    Typography,
    MenuItem,
    Select,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import colors from '../../../assets/colors';

function CardContent({
    product = {
        id: '',
        title: '',
        titlePt: '',
        description: '',
        descriptionPt: '',
        rating: 0,
        onsale: false,
        picture: { url: '' },
        picturewebp: { url: '' },
        price: 0,
    },
    clickedButtonToAddProduct,
    setClickedButtonToAddProduct = () => {},
    handleAddProduct = () => {},
    addToCart = () => {},
    addedToCart,
    isMobile,
    language = '',
    handleInputValues = () => {},
}: any) {
    return (
        <Stack
            sx={{
                alignItems: 'center',
                border: { lg: '1px solid #BCBDBC', xs: '1px solid #F0F0F0' },
                borderRadius: 2,
                boxSizing: 'content-box',
                flexBasis: '45%',
                gap: 2,
                height: { lg: 484, xs: 'auto' },
                justifyContent: 'space-evenly',
                maxWidth: 288,
                ml: 1,
                mt: 1,
                position: 'relative',
                pb: 2,
            }}
        >
            {addedToCart === product.id && (
                <Stack
                    sx={{
                        height: '100%',
                        pointerEvents: 'none',
                        position: 'absolute',
                        width: '100%',
                        zIndex: 'tooltip',
                    }}
                >
                    <Alert
                        data-testid="addedToCart-msg"
                        variant="filled"
                        severity="success"
                        icon={<CheckCircleIcon color="success" />}
                        sx={{
                            bgcolor: colors.white,
                            color: colors.black,
                            fontWeight: 400,
                            left: '50%',
                            position: 'absolute',
                            right: '50%',
                            top: '2%',
                            transform: 'translate(-50%, 0%)',
                            width: '80%',
                        }}
                    >
                        {language === 'en-us'
                            ? 'Added to cart successfully!'
                            : 'Adicionado ao carrinho!'}
                    </Alert>
                </Stack>
            )}
            <picture
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: isMobile ? '144px' : '224px',
                    justifyContent: 'center',
                    position: 'relative',
                    width: isMobile ? '157px' : '256px',
                }}
            >
                <source srcSet={product.picturewebp.url} type="image/webp" />
                <source srcSet={product.picture.url} type="image/png" />
                <img
                    src={product.picture.url}
                    alt="pic"
                    loading="lazy"
                    style={{
                        objectFit: 'contain',
                        height: '100%',
                        width: '100%',
                    }}
                />
            </picture>
            <Stack sx={{ width: '90%' }}>
                <Typography
                    sx={{ fontSize: { lg: 16, xs: 14 }, height: 72, pb: 2 }}
                >
                    {language === 'en-us'
                        ? product.description
                        : product.descriptionPt}
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        height: 32,
                        maxWidth: { lg: 143, xs: 154 },
                    }}
                >
                    <Rating
                        name="costumer-rating"
                        value={product.rating}
                        precision={0.5}
                    />
                    <Typography
                        sx={{
                            color: colors.lightGray,
                            pl: 1,
                            pt: 1,
                        }}
                    >
                        {product.rating.toFixed(1)}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                }}
            >
                <Typography
                    sx={{
                        color: colors.black,
                        fontSize: { lg: 24, xs: 16 },
                        fontWeight: 700,
                    }}
                >
                    ${product.price.toFixed(2)}
                </Typography>
                <Select
                    name={product.id}
                    onChange={e => handleInputValues(e, product)}
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        height: { lg: 36, xs: 32 },
                        justifyContent: 'center',
                        pl: 2,
                        width: { lg: 90, xs: 64 },
                    }}
                >
                    {Array.from(Array(10).keys()).map(i => (
                        <MenuItem value={i + 1}>{i + 1}</MenuItem>
                    ))}
                </Select>
            </Stack>
            {clickedButtonToAddProduct === product.id ? (
                <Button
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        textTransform: 'none',
                        width: '90%',
                    }}
                >
                    <CheckIcon color="success" />
                    <Typography
                        sx={{
                            alignSelf: 'center',
                            justifySelf: 'center',
                            pl: 2,
                        }}
                    >
                        {language === 'en-us' ? 'Added' : 'Adicionado'}
                    </Typography>
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    sx={{ fontSize: 14, textTransform: 'none', width: '90%' }}
                    onClick={() => {
                        handleAddProduct(product);
                        addToCart(product);
                        setClickedButtonToAddProduct(String(product.id));
                        setTimeout(
                            () => setClickedButtonToAddProduct(''),
                            2000,
                        );
                    }}
                >
                    {language === 'en-us' ? 'Add to cart' : 'Adicionar'}
                </Button>
            )}
        </Stack>
    );
}

export default CardContent;
