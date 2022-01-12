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
import { makeStyles } from '@material-ui/styles';
import getData from '../../graphql.js';
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
    amount: number;
}

const useStyles = makeStyles({
    root: {
        '& .MuiOutlinedInput-input': {
            color: '#B4B4BB',
        },
        '& .MuiInputLabel-root': {
            color: '#B4B4BB',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B4B4BB',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: '#19191D',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#19191D',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: '#19191D',
            },
    },
    select: {
        '& .MuiOutlinedInput-input': {
            color: '#19191D',
        },
        '& .MuiInputLabel-root': {
            color: '#B4B4BB',
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B4B4BB',
            border: 'none',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
            color: '#19191D',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#19191D',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
                borderColor: '#19191D',
            },
    },
});

function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

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
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>(
        [],
    );
    const [page, setPage] = useState(1);
    const [language, setLanguage] = useState('en-us');
    const [inputValues, setInputValues] = useState<any>({});
    const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
    const [amountProducts, setAmountProducts] = useState(0);

    const handleInputValues = (
        e: ChangeEvent<HTMLInputElement>,
        product: ProductProps,
    ) => {
        const { name } = e.target;
        const { value } = e.target;

        setInputValues({
            ...inputValues,
            [name]: { ...product, amount: Number(value) },
        });
    };
    const handleAddProduct = (product: ProductProps) => {
        const listOfProducts: ProductProps[] = Object.values(inputValues);
        setSelectedProducts([...selectedProducts, ...listOfProducts]);
        const foundProductInSelectedProducts =
            selectedProducts.length > 0 &&
            selectedProducts.find(element => element.id === product.id);
        const foundProductInInputValues =
            listOfProducts.length > 0 &&
            listOfProducts.find(element => element.id === product.id);

        if (foundProductInSelectedProducts && foundProductInInputValues) {
            foundProductInSelectedProducts.amount =
                Number(foundProductInSelectedProducts.amount) +
                Number(foundProductInInputValues.amount);

            const listOfSelectedProducts = selectedProducts.filter(
                item => item.id !== product.id,
            );
            setSelectedProducts([
                ...listOfSelectedProducts,
                foundProductInSelectedProducts,
            ]);
        } else if (foundProductInInputValues) {
            setSelectedProducts([
                ...selectedProducts,
                foundProductInInputValues,
            ]);
        } else {
            setSelectedProducts([
                ...selectedProducts,
                { ...product, amount: 1 },
            ]);
            setInputValues({
                ...inputValues,
                [product.id]: { ...product, amount: 1 },
            });
        }
    };

    const filteredSearch = () => {
        if (language === 'en-us') {
            const productFound = allProducts.filter(
                (product: any) =>
                    product.description
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.title
                        .toLowerCase()
                        .startsWith(search.toLowerCase()),
            );
            setFilteredProducts(productFound);
        } else {
            const productFound = allProducts.filter(
                (product: any) =>
                    product.descriptionPt
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    product.titlePt
                        .toLowerCase()
                        .startsWith(search.toLowerCase()),
            );
            setFilteredProducts(productFound);
        }
    };

    const sorting = () => {
        let productList = allProducts;
        productList = productList.filter(product => {
            if (minPrice && !maxPrice) {
                return product.price >= minPrice && product.price <= 1000;
            }
            if (!minPrice && maxPrice) {
                return product.price >= 0 && product.price <= maxPrice;
            }
            if (minPrice && maxPrice) {
                return product.price >= minPrice && product.price <= maxPrice;
            }
            return product.price >= 0 && product.price <= 1000;
        });
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
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }
                return 0;
            });
            setFilteredProducts(() => sortByRating);
        }
    };

    useEffect(() => {
        getData().then(res => {
            setAllProducts(res.allProducts);
            setFilteredProducts(res.allProducts);
        });
    }, []);

    useEffect(() => {
        if (selectedProducts.length > 1) {
            const sum = selectedProducts.reduce(
                (total, object) =>
                    total + Number(object.price) * Number(object.amount),
                0,
            );

            const amount = selectedProducts.reduce(
                (total, object) => total + Number(object.amount),
                0,
            );

            setTotalPrice(sum);
            setAmountProducts(amount);
        } else {
            const sum =
                selectedProducts[0] &&
                selectedProducts[0].price * selectedProducts[0].amount;
            const amount = selectedProducts[0] && selectedProducts[0].amount;
            setTotalPrice(sum);
            setAmountProducts(amount);
        }
    }, [selectedProducts, inputValues]);

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
                    classes={classes}
                    amountProducts={amountProducts}
                />
            )}
            <Stack
                sx={{
                    alignItems: { lg: 'flex-end', xs: 'center' },
                    flexDirection: 'row',
                    height: 65,
                    justifyContent: { lg: 'center', xs: 'space-between' },
                    mb: { lg: 2, xs: 1 },
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
                            '.MuiSelect-select': {
                                borderColor: 'black',
                                border: 'none',
                                fontSize: 14,
                            },
                            fontSize: 10,
                            minWidth: { lg: 206, xs: 164 },
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
                    alignSelf: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    maxWidth: 900,
                    width: '100%',
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
                        handleInputValues={handleInputValues}
                        handleAddProduct={handleAddProduct}
                    />
                ))}
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
                <Pagination
                    count={paginatedPages.total}
                    color="primary"
                    hidePrevButton
                    variant="outlined"
                    onChange={paginationHandler}
                    sx={{
                        '& .Mui-selected.MuiPaginationItem-page': {
                            backgroundColor: colors.darkBlue,
                            color: colors.black,
                        },
                        mt: { lg: 2, xs: 1 },
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
                    onClick={() =>
                        window.open(
                            `https://wa.me/5571993096528?text=Olá, testei sua aplicação!`,
                        )
                    }
                >
                    <Badge
                        badgeContent={amountProducts}
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
                        Sub total: {totalPrice && totalPrice.toFixed(2)} €
                    </Typography>
                </Button>
            )}
        </Stack>
    );
}

export default Home;
