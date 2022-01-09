import React, { ChangeEvent } from 'react';
import { InputAdornment, OutlinedInput, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import colors from '../../../assets/colors';
import MobileModal from './MobileModal';

function MobileHead({
    closeModal,
    openModal,
    search,
    setSearch,
    filteredSearch,
    ratingStars,
    setRatingStars,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sortBy,
    setSortBy,
    sorting,
    language,
}: any) {
    return (
        <>
            <Stack
                sx={{
                    alignItems: 'center',
                    height: 84,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <OutlinedInput
                    data-testid="search-bar"
                    fullWidth
                    endAdornment={
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
                    inputProps={{
                        background: colors.darkGray,
                        maxLength: 160,
                        placeholder:
                            language === 'en-us'
                                ? 'Search for an item here!'
                                : 'Procure por um item aqui',
                        spellCheck: false,
                    }}
                    sx={{
                        bgcolor: colors.gray,
                        display: 'flex',
                        flexDirection: 'row',
                        height: 40,
                        width: 291,
                        ml: 2,
                    }}
                    value={search}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setSearch(event.target.value)
                    }
                />
                <MenuIcon
                    sx={{
                        cursor: 'pointer',
                        display: { lg: 'none', xs: 'block' },
                        mr: 2,
                    }}
                />
            </Stack>
            {openModal && (
                <MobileModal
                    closeModal={closeModal}
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
            )}
        </>
    );
}

export default MobileHead;
