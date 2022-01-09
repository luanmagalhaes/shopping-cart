import React, { ChangeEvent } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import colors from '../../../assets/colors';

function MobileModal({
    closeModal,
    ratingStars,
    setRatingStars,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    sorting,
    language,
}: any) {
    return (
        <Stack
            sx={{
                bgcolor: 'rgba(0,0,0,0.5)',
                height: '100vh',
                justifyContent: 'flex-end',
                position: 'fixed',
                width: '100vw',
                zIndex: 1300,
            }}
            id="modal"
            onClick={event => closeModal(event)}
        >
            <Tooltip
                title="modal"
                sx={{
                    bgcolor: colors.white,
                    height: '50%',
                    width: '100%',
                }}
            >
                <Stack gap={2}>
                    <Typography sx={{ fontWeight: 500, ml: 2, mt: 2 }}>
                        {language === 'en-us' ? 'FILTERS' : 'FILTROS'}
                    </Typography>
                    <FormControl size="small" sx={{ m: 1, width: '40%' }}>
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
                    <FormControl size="small" sx={{ m: 1, width: '40%' }}>
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
                    <FormControl size="small" sx={{ ml: 1 }}>
                        <InputLabel id="sorting-items" sx={{ fontSize: 10 }}>
                            {language === 'en-us' ? 'RATING' : 'CLASSIFICAÇÃO'}
                        </InputLabel>
                        <Select
                            id="select-items"
                            label="RATING"
                            sx={{
                                border: '1px solid black',
                                width: '50%',
                            }}
                            value={ratingStars}
                            onChange={event =>
                                setRatingStars(String(event.target.value))
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
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-evenly', mt: 2 }}
                    >
                        <Button
                            variant="text"
                            sx={{
                                fontWeight: 600,
                                textTransform: 'none',
                            }}
                            onClick={() => {
                                setMaxPrice(1000);
                                setMinPrice(0);
                                setRatingStars(1);
                            }}
                        >
                            {language === 'en-us' ? 'Clear' : 'Limpar'}
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                pl: 3,
                                pr: 3,
                                textTransform: 'none',
                            }}
                            id="modal"
                            onClick={event => {
                                sorting();
                                closeModal(event);
                            }}
                        >
                            {language === 'en-us' ? 'Apply filters' : 'Filtrar'}
                        </Button>
                    </Stack>
                </Stack>
            </Tooltip>
        </Stack>
    );
}

export default MobileModal;
