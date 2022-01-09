import React, { ChangeEvent } from 'react';
import {
    Badge,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import colors from '../../../assets/colors';

const logoPictureWebP = require('../pictures/logo.webp');
const logoPicturePng = require('../pictures/logo.png');

function DesktopHead({
    shoppingCart = [],
    totalPrice = 0,
    search,
    setSearch,
    filteredSearch,
    ratingStars,
    setRatingStars,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sorting,
    language,
    setLanguage,
}: any) {
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Stack sx={{ bgcolor: colors.white, width: '33%' }}>
                <picture>
                    <source srcSet={logoPictureWebP} type="image/webp" />
                    <source srcSet={logoPicturePng} type="image/png" />
                    <img
                        src={logoPicturePng}
                        srcSet="$"
                        alt="pic"
                        loading="lazy"
                        style={{
                            cursor: 'pointer',
                            height: 49,
                            marginLeft: 40,
                            marginTop: 24,
                            width: 175,
                        }}
                    />
                </picture>
            </Stack>
            <Stack
                gap={4}
                sx={{
                    alignItems: 'center',
                    height: 207,
                    justifyContent: 'flex-start',
                    width: '33%',
                }}
            >
                <OutlinedInput
                    data-testid="search-bar"
                    fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon
                                sx={{
                                    color: colors.darkGray,
                                    cursor: 'pointer',
                                }}
                                onClick={filteredSearch}
                            />
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position="start">
                            <CloseIcon
                                color="primary"
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => setSearch('')}
                            />
                        </InputAdornment>
                    }
                    inputProps={{
                        background: colors.darkGray,
                        maxLength: 160,
                        placeholder:
                            language === 'en-us'
                                ? 'Search for an item here!'
                                : 'Procure por um item aqui!',
                        spellCheck: false,
                    }}
                    sx={{
                        bgcolor: colors.gray,
                        display: 'flex',
                        flexDirection: 'row',
                        height: 40,
                        width: 291,
                        mt: 4,
                        mb: 2,
                    }}
                    value={search}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setSearch(event.target.value)
                    }
                />
                <Stack direction="row">
                    <FormControl size="small" sx={{ width: '40%' }}>
                        <TextField
                            id="outlined-adornment-amount"
                            label="€ Max"
                            placeholder="€ Max"
                            size="small"
                            value={maxPrice}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setMaxPrice(event.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl size="small" sx={{ ml: 2, width: '40%' }}>
                        <TextField
                            id="outlined-adornment-amount"
                            label="€ Min"
                            placeholder="€ Min"
                            size="small"
                            value={minPrice}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                setMinPrice(event.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl size="small" sx={{ ml: 2, width: '40%' }}>
                        <InputLabel id="sorting-items" sx={{ fontSize: 10 }}>
                            RATING
                        </InputLabel>
                        <Select
                            id="select-items"
                            label="RATING"
                            sx={{
                                border: '1px solid black',
                            }}
                            value={ratingStars}
                            onChange={event =>
                                setRatingStars(event.target.value)
                            }
                        >
                            <MenuItem defaultChecked value="1">
                                {language === 'en-us'
                                    ? '1 and above'
                                    : '1 ou mais'}
                            </MenuItem>
                            <MenuItem value="2">
                                {language === 'en-us'
                                    ? '2 and above'
                                    : '2 ou mais'}
                            </MenuItem>
                            <MenuItem value="3">
                                {language === 'en-us'
                                    ? '3 and above'
                                    : '3 ou mais'}
                            </MenuItem>
                            <MenuItem value="4">
                                {language === 'en-us'
                                    ? '4 and above'
                                    : '4 ou mais'}
                            </MenuItem>
                            <MenuItem value="5">
                                {language === 'en-us'
                                    ? '5 stars'
                                    : '5 estrelas'}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    width: '33%',
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        mt: 4,
                        alignItems: 'flex-end',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <FormControl variant="standard" size="small" sx={{ ml: 2 }}>
                        <Select
                            id="select-items"
                            label="LANGUAGE"
                            sx={{
                                border: 'none',
                                minWidth: 60,
                            }}
                            value={language}
                            onChange={event => setLanguage(event.target.value)}
                        >
                            <MenuItem defaultChecked value="en-us">
                                English
                            </MenuItem>
                            <MenuItem value="pt-br">Português</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{
                            alignSelf: 'center',
                            display: 'flex',
                            height: 48,
                            width: 232,
                        }}
                        onClick={() =>
                            window.open(
                                `https://wa.me/5571993096528?text=Olá, testei sua aplicação!`,
                            )
                        }
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
                                mr: { lg: '10%', xs: '20%' },
                                textTransform: 'none',
                            }}
                        >
                            Sub total: {totalPrice.toFixed(2)} €
                        </Typography>
                    </Button>
                </Stack>
                <Button
                    variant="outlined"
                    sx={{
                        alignSelf: 'end',
                        display: 'flex',
                        fontWeight: 600,
                        height: 40,
                        mr: 8,
                        mt: 5,
                        textTransform: 'none',
                        width: 164,
                    }}
                    onClick={() => sorting()}
                >
                    {language === 'en-us' ? 'Apply filters' : 'Filtrar'}
                </Button>
            </Stack>
        </Stack>
    );
}

export default DesktopHead;
