import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Badge,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { gql, GraphQLClient } from 'graphql-request';
import colors from '../../assets/colors';
import MobileHead from './components/MobileHead';
import DesktopHead from './components/DesktopHead';
import CardContent from './components/CardContent';
import paginationAdapter from '../../adapters/pagination';

interface ProductProps {
    id: string;
    title: string;
    titlePt: string;
    description: string;
    descriptionPt: string;
    picture: { url: string };
    picturewebp: { url: string };
    price: number;
    rating: number;
    onsale: boolean;
}

async function getData() {
    const query = gql`
        query {
            allProducts {
                id
                title
                titlePt
                description
                descriptionPt
                price
                rating
                picturewebp {
                    url
                }
                picture {
                    url
                }
                onsale
            }
        }
    `;

    const endpoint = 'https://graphql.datocms.com/';
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer f46ee2ea99fe2c706e118c9d0afd30',
        },
    });
    const products = await graphQLClient.request(query);
    return products;
}

function Home() {
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [shoppingCart, setShoppingCart] = useState<ProductProps[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [addedToCart, setAddedToCart] = useState('');
    const [clickedButtonToAddProduct, setClickedButtonToAddProduct] =
        useState('');
    const [search, setSearch] = useState('');
    const [ratingStars, setRatingStars] = useState('1');
    const [sortBy, setSortBy] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(
        [],
    );
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState('en-us');

    const filteredSearch = () => {
        if (language === 'en-us') {
            const productFound = allProducts.filter((product: any) =>
                product.title.startsWith(search),
            );
            setFilteredProducts(productFound);
        } else {
            const productFound = allProducts.filter((product: any) =>
                product.titlePt.startsWith(search),
            );
            setFilteredProducts(productFound);
        }
    };

    const sorting = () => {
        let productList = allProducts;
        productList = productList.filter(
            product => product.price >= minPrice && product.price <= maxPrice,
        );
        productList = productList.filter(
            product => Number(product.rating) >= Number(ratingStars),
        );
        setFilteredProducts(productList);
    };
    const closeModal = (event: any) => {
        if (event.target.id === 'modal') {
            setOpenModal(false);
        }
    };
    const sortingSelect = (value: string) => {
        if (value === 'Price') {
            const minToMaxPrice = filteredProducts.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
            setFilteredProducts(() => minToMaxPrice);
        }
        if (value === 'Rating') {
            const sortByRating = filteredProducts.sort((a, b) => {
                if (a.rating < b.rating) {
                    return -1;
                }
                if (a.rating > b.rating) {
                    return 1;
                }
                return 0;
            });
            setFilteredProducts(() => sortByRating);
        }
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    useEffect(() => {
        getData().then(res => {
            setAllProducts(res.allProducts);
            setFilteredProducts(res.allProducts);
        });
    }, []);

    useEffect(() => {
        const sum = shoppingCart.reduce(
            (previousValue, { price }) => previousValue + Number(price),
            0,
        );
        setTotalPrice(sum);
    }, [shoppingCart]);

    useEffect(() => {
        filteredSearch();
    }, [search]);

    const addToCart = (product: ProductProps) => {
        setShoppingCart([...shoppingCart, product]);
        setAddedToCart(product.id);
        setTimeout(() => {
            setAddedToCart('');
        }, 2000);
    };
    const paginationHandler = (_: ChangeEvent<unknown>, nextPage: number) =>
        setPage(nextPage);
    const paginatedPages = paginationAdapter({
        items: filteredProducts,
        itemsPerPage: 6,
        page,
    });

    return (
        <Stack>
            {isMobile ? (
                <MobileHead
                    openModal={openModal}
                    closeModal={closeModal}
                    search={search}
                    setSearch={setSearch}
                    filteredSearch={filteredSearch}
                    allProducts={allProducts}
                    ratingStars={ratingStars}
                    setRatingStars={setRatingStars}
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    maxPrice={maxPrice}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sorting={sorting}
                    language={language}
                />
            ) : (
                <DesktopHead
                    search={search}
                    setSearch={setSearch}
                    filteredSearch={filteredSearch}
                    shoppingCart={shoppingCart}
                    totalPrice={totalPrice}
                    ratingStars={ratingStars}
                    setRatingStars={setRatingStars}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sorting={sorting}
                    language={language}
                    setLanguage={setLanguage}
                />
            )}
            <Stack
                sx={{
                    alignItems: { lg: 'flex-start', xs: 'center' },
                    height: 83,
                    flexDirection: 'row',
                    justifyContent: { lg: 'center', xs: 'space-between' },
                }}
            >
                <FormControl size="small" sx={{ ml: 2 }}>
                    <InputLabel id="sorting-items" sx={{ fontSize: 10 }}>
                        {language === 'en-us' ? 'SORT BY' : 'ORDENAR'}
                    </InputLabel>
                    <Select
                        id="select-items"
                        label="SORT BY"
                        sx={{
                            border: '1px solid black',
                            minWidth: { lg: 206, xs: 184 },
                        }}
                        value={sortBy}
                        onChange={event => {
                            setSortBy(event.target.value);
                            sortingSelect(event.target.value);
                        }}
                    >
                        <MenuItem value="Rating">
                            {language === 'en-us' ? 'Rating' : 'Avaliação'}
                        </MenuItem>
                        <MenuItem value="Price">
                            {language === 'en-us' ? 'Price' : 'Preço'}
                        </MenuItem>
                    </Select>
                </FormControl>
                <Typography
                    sx={{
                        color: colors.blue,
                        cursor: 'pointer',
                        display: { lg: 'none', xs: 'block' },
                        mr: 2,
                    }}
                    onClick={() => {
                        setOpenModal(!openModal);
                    }}
                >
                    {language === 'en-us' ? 'FILTERS' : 'FILTROS'}
                </Typography>
            </Stack>
            <Stack
                sx={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    width: '100%',
                    maxWidth: 900,
                }}
            >
                {paginatedPages.items.map(product => (
                    <CardContent
                        key={product.id}
                        addedToCart={addedToCart}
                        clickedButtonToAddProduct={clickedButtonToAddProduct}
                        setClickedButtonToAddProduct={
                            setClickedButtonToAddProduct
                        }
                        addToCart={addToCart}
                        product={product}
                        shoppingCart={shoppingCart}
                        isMobile={isMobile}
                        language={language}
                    />
                ))}
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={paginatedPages.total}
                    color="primary"
                    hidePrevButton
                    variant="outlined"
                    onChange={paginationHandler}
                    sx={{
                        '.Mui-selected:hover': {
                            bgcolor: 'blue',
                            color: colors.black,
                        },
                        pb: { lg: 4, xs: 'none' },
                    }}
                />
            </Stack>
            {isMobile && (
                <Button
                    variant="contained"
                    sx={{
                        alignSelf: 'center',
                        display: 'flex',
                        height: 56,
                        mt: 4,
                        mb: 4,
                        width: '90%',
                    }}
                >
                    <Badge
                        badgeContent={shoppingCart.length}
                        color="error"
                        sx={{
                            display: 'flex',
                            mr: 'auto',
                            zIndex: 0,
                        }}
                    >
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            mr: '20%',
                            textTransform: 'none',
                        }}
                    >
                        Sub total: {totalPrice.toFixed(2)} €
                    </Typography>
                </Button>
            )}
        </Stack>
    );
}

export default Home;
