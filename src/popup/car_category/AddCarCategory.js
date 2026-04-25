import { Box, Button, Checkbox, CircularProgress, Divider, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import CloseIcon from '@mui/icons-material/Close';
import Fetch from "../../services/Fetch";
import { useConstants } from "../../hooks/UseConstants";
import { useWaits } from "../../hooks/UseWait";
import { useAddCarCategory } from "../../hooks/UseAddCarCategory";
import { buildCarCategoryFormData } from "../../helper/CarCategoryFormData";

function AddCarCategory({ onClickCancel, setSnackBar, setCategories }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const { category, setCategory, timePrice, setTimePrice, kmPrice, setKmPrice } = useAddCarCategory();

    const addCategory = async () => {
        setSendWait(true);
        const formData = buildCarCategoryFormData({
            category: category,
            timePrice: timePrice,
            kmPrice: kmPrice,
        });

        let result = await Fetch(host + '/api/car-types/store', 'POST', formData);

        if (result.status === 200) {
            setSnackBar('success', <FormattedMessage id="added_success" />);
            setCategories((prevCategories) => [result.data.data, ...prevCategories]);
            onClickCancel();
        } else if (result.status === 422) {
            setSnackBar('error', <FormattedMessage id="fields_empty" />);
        }

        setSendWait(false);
    }

    const resetValue = () => {
        setCategory('');
        setKmPrice('');
        setTimePrice('');
    }

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-fit rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='add_category' />
            </Typography>
            <CloseIcon onClick={() => { resetValue(); onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <Box className=''>
                    <TextField variant="outlined" label={<FormattedMessage id="category" />} className="w-full max-sm:w-full" value={category} onChange={(e) => setCategory(e.target.value)} />
                </Box>
                <Box className='mt-16 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="km_price" />} className="w-full max-sm:w-full" value={kmPrice} onChange={(e) => setKmPrice(e.target.value)} />
                </Box>
                <Box className='mt-16 max-sm:flex-col'>
                    <TextField type="number" variant="outlined" label={<FormattedMessage id="time_price" />} className="w-full max-sm:w-full" value={timePrice} onChange={(e) => setTimePrice(e.target.value)} />
                </Box>
                <Box className='mx-auto w-1/3 mt-10 max-sm:w-full'>
                    <Button variant='outlined' className='!rounded-full w-full !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500' onClick={addCategory}>
                        {
                            sendWait ?
                                <CircularProgress size={20} className="" color="white" />
                                :
                                <FormattedMessage id="add" />
                        }
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddCarCategory;