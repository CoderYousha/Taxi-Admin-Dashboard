import { Box, Button, Checkbox, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import { useAddCarCategory } from "../../hooks/UseAddCarCategory";
import { buildCarCategoryFormData } from "../../helper/CarCategoryFormData";
import FetchContent from "../../services/FetchContent";

function UpdateCarCategory({ onClickCancel, setSnackBar, categ, getCategories }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { category, setCategory, timePrice, setTimePrice, kmPrice, setKmPrice, openPrice, setOpenPrice } = useAddCarCategory();

    const updateCategory = async () => {
        setSendWait(true);
        const formData = buildCarCategoryFormData({
            category: category,
            timePrice: timePrice,
            kmPrice: kmPrice,
            openPrice: openPrice,
            id: categ.id,
        });

        let result = await FetchContent(host + `/api/car-types/update`, 'PUT', JSON.stringify({
            id: categ.id,
            name: category,
            timePrice: timePrice,
            KMPrice: kmPrice,
            openPrice: openPrice
        }));

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="updated_success" />);
            await getCategories();
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', <FormattedMessage id="fields_empty" />);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setCategory(categ.name);
        setTimePrice(categ.timePrice);
        setKmPrice(categ.KMPrice);
        setOpenPrice(categ.openPrice);
    }

    useEffect(() => {
        if (categ)
            resetValue();
    }, [categ]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='update_category' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className=''>
                    <TextField variant="outlined" label={<FormattedMessage id="category" />} className="w-full max-sm:w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Box>
                <Box className='mt-16'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="km_price" />} className="w-full max-sm:w-full" value={kmPrice} onChange={(e) => setKmPrice(e.target.value)} />
                </Box>
                <Box className='mt-16'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="time_price" />} className="w-full max-sm:w-full" value={timePrice} onChange={(e) => setTimePrice(e.target.value)} />
                </Box>
                <Box className='mt-16'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="open_price" />} className="w-full max-sm:w-full" value={openPrice} onChange={(e) => setOpenPrice(e.target.value)} />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button onClick={updateCategory} variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500'>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="update" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default UpdateCarCategory;