import { Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useConstants } from "../../hooks/UseConstants";
import PhoneInput from "react-phone-input-2";
import { useWaits } from "../../hooks/UseWait";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AuthContext from "../../context/AuthContext";
import Fetch from "../../services/Fetch";
import { useAddDriver } from "../../hooks/UseAddDriver";
import { buildDriverFormData } from "../../helper/DriverFormData";
import FetchContent from "../../services/FetchContent";
import { useEffect, useState } from "react";

function DriverImage({ onClickCancel, setSnackBar, driver }) {
    const theme = useTheme();
    const { host, language } = useConstants();
    const { sendWait, setSendWait } = useWaits();
    const [idImage, setIdImage] = useState('');

    useEffect(() => {
        if(driver)
            setIdImage(driver.IDImage);
    }, [driver]);

    return (
        <Box sx={{ backgroundColor: theme.palette.background.paper }} className="shadow-lg w-3/5 h-screen rounded-3xl px-4 py-5 overflow-y-scroll none-view-scroll max-sm:w-4/5 max-sm:translate-x-0 max-sm:left-0 relative max-sm:overflow-y-scroll max-sm:h-screen" dir={language === 'en' ? 'ltr' : "rtl"}>
            <Typography variant="h5" className="!font-semibold max-sm:!text-xl">
                <FormattedMessage id='id_image' />
            </Typography>
            <CloseIcon onClick={() => { onClickCancel(); }} className="text-gray-700 cursor-pointer absolute top-5 left-5" fontSize="large" sx={{ left: language === 'en' && '90%' }}></CloseIcon>
            <Divider className="!my-5" />
            <Box>
                <img src={`${host}/storage/${idImage}`} className="w-full"/>
            </Box>
        </Box>
    );
}

export default DriverImage;