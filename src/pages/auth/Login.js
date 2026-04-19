import Divider from '@mui/material/Divider';
import Background from '../../images/login/background.png';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import useSnackBar from '../../hooks/UseSnackBar';
import SnackbarAlert from "../../components/SnackBar";
import { useLogin } from '../../hooks/UseLogin';
import { useConstants } from '../../hooks/UseConstants';
import Fetch from '../../services/Fetch';
import { useNavigate } from 'react-router-dom';
import { useWaits } from '../../hooks/UseWait';
import CheckLogin from '../../services/CheckLogin';
import { useEffect } from 'react';

function Login() {
    const { host } = useConstants();
    const { openSnackBar, type, message, setOpenSnackBar, setSnackBar } = useSnackBar();
    const { phone, setPhone, password, setPassword } = useLogin();
    const { getWait, setGetWait, sendWait, setSendWait } = useWaits();
    const navigate = useNavigate();

    {/* Check Login Function */ }
    const checkLogin = async () => {
        // let result = await CheckLogin(host);
        // if (result) {
        //     navigate('/employees');
        // } else {
        //     setGetWait(false);
        // }
        if (localStorage.getItem('token')) {
            navigate('/car-categories');
        } else {
            setGetWait(false);
        }
    }

    const login = async () => {
        setSendWait(true);
        const formData = new FormData();
        formData.append('number', phone);
        formData.append('password', password);
        let result = await Fetch(host + '/api/login', 'POST', formData);

        if (result.status === 200) {
            localStorage.setItem('token', result.data.token);
            // localStorage.setItem('language', result.data.data.user.language);
            navigate('/car-categories');
        } else if (result.status === 401) {
            setSnackBar('error', "Incorrect phone number or password");
        } else if (result.status === 422) {
            setSnackBar('error', "Some fields empty");
        }

        setSendWait(false);
    }

    useEffect(() => {
        checkLogin();
        setGetWait(false);
    }, []);

    return (
        <>
            {
                getWait ?
                    <Box className="w-full h-screen relative flex justify-center items-center">
                        <CircularProgress size={70} className='!text-yellow-500' />
                    </Box>
                    :
                    <Box>
                        <Box className="h-screen w-2/5 float-right relative max-sm:hidden">
                            <img src={Background} className='w-full h-screen float-right' />
                        </Box>
                        <Box className='w-3/5 h-screen flex justify-center items-center max-sm:w-full'>
                            <Box className='w-1/2 rounded-xl shadow-lg px-5 py-5 max-sm:w-4/5'>
                                <Typography variant='h5' className='text-yellow-600 !mt-5' fontWeight={700}>SYRIA TAXI</Typography>
                                <Typography variant='body2' className='!mt-7 text-gray-500'>Welcome back !!!</Typography>
                                <Typography variant='h3' className='!my-5' fontWeight={700}>Sign in</Typography>
                                <Typography variant='body1'>Phone</Typography>
                                <input onChange={(e) => setPhone(e.target.value)} type='text' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-200' />
                                <Typography variant='body1' className='!mt-3'>Password</Typography>
                                <input onChange={(e) => setPassword(e.target.value)} type='password' className='w-full py-2 rounded-lg indent-2 outline-none bg-yellow-200' />
                                <Typography onClick={() => navigate('/forgot-password')} variant='body1' className='!my-3 cursor-pointer text-gray-600 hover:text-yellow-500 w-fit'>Forgot Password?</Typography>
                                <Box className='mx-auto w-fit'>
                                    <Button variant='outlined' className='!rounded-full w-32 !border-green-500 !bg-green-500 !text-white hover:!bg-white hover:!text-green-500' onClick={login}>
                                        {
                                            sendWait ?
                                                <CircularProgress size={20} className="" color="white" />
                                                :
                                                'SIGN IN'
                                        }
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }

            {/* Snackbar Alert */}
            <SnackbarAlert open={openSnackBar} message={message} severity={type} onClose={() => setOpenSnackBar(false)} />
        </>
    );
}

export default Login;