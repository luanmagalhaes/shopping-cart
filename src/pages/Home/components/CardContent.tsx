import React from 'react';
import { Alert, Button, Chip, Rating, Stack, Typography } from '@mui/material';
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
    addToCart = () => {},
    addedToCart,
    shoppingCart = [],
    isMobile,
    language = '',
}: any) {
    return (
        <Stack
            sx={{
                alignItems: 'center',
                border: '1px solid gray',
                borderRadius: 2,
                boxSizing: 'content-box',
                height: { lg: 484, xs: 'auto' },
                gap: 2,
                justifyContent: 'space-evenly',
                ml: 1,
                mt: 4,
                pb: 1,
                position: 'relative',
                width: { lg: 288, xs: 175 },
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
                            left: '50%',
                            position: 'absolute',
                            right: '50%',
                            top: '2%',
                            transform: 'translate(-50%, 0%)',
                            width: '80%',
                            color: colors.black,
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
                {product.onsale && (
                    <Chip
                        label="ON SALE"
                        color="success"
                        size="small"
                        sx={{
                            bottom: '-10%',
                            position: 'absolute',
                        }}
                    />
                )}
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
                <Typography sx={{ height: 72, pb: 2 }}>
                    {language === 'en-us'
                        ? product.description
                        : product.descriptionPt}
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        height: 22,
                        justifyContent: 'space-between',
                        width: '90%',
                    }}
                >
                    <Rating
                        name="costumer-rating"
                        value={product.rating}
                        precision={0.5}
                    />
                    <Typography
                        sx={{
                            color: colors.darkGray,
                            height: '100%',
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
                        fontSize: 16,
                        fontWeight: 700,
                    }}
                >
                    $ {product.price.toFixed(2)}
                </Typography>
                <Typography
                    sx={{
                        alignItems: 'center',
                        border: '1px solid black',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 32,
                        justifyContent: 'center',
                        width: 64,
                    }}
                >
                    {shoppingCart.length > 0
                        ? shoppingCart.filter(
                              (obj: any) => obj.id === product.id,
                          ).length
                        : 0}
                </Typography>
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
                    sx={{ textTransform: 'none', width: '90%' }}
                    onClick={() => {
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
