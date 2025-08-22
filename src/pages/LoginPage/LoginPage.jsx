import React, { useState } from 'react';
import { WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import { getDetailUser, loginUser } from '../../services/UserService';
import { useMutation } from '@tanstack/react-query';
import ToastComponent from '../../components/ToastComponent/ToastComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mutationLogin = useMutation({
        mutationFn: async (data) => {
            const res = await loginUser(data);
            return res;
        },
        onSuccess: (data) => {
            if (data?.status === 'OK') {
                setToast({ type: 'success', message: data?.message });
                localStorage.setItem('access_token', JSON.stringify(data?.access_token));
                navigate('/')
            }
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handdleGetDetailUser(decoded?.id)
                }
            }
        },
    });

    const { data } = mutationLogin

    const handdleGetDetailUser = async (id) => {
        try {
            const res = await getDetailUser(id)
            dispatch(updateUser({ name: res?.name, email: res?.email, role: res?.role }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnChangeEmail = (e) => setEmail(e.target.value);
    const handleOnChangePassword = (e) => setPassword(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSignIn();
    };

    const handleSignIn = () => {
        mutationLogin.mutate({ email, password })
    }

    return (
        <>
            {toast && (
                <ToastComponent
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fff',
                    minHeight: '100vh',
                    padding: '10px'
                }}
            >
                <WrapperContainer>
                    <WrapperContainerLeft>
                        <h1 style={{ fontWeight: 'bold', color: '#fff', cursor: 'pointer' }} onClick={() => navigate('/')}>Logo</h1>
                        <p style={{ fontSize: '17px', color: '#fff' }}>Đăng nhập</p>

                        <input
                            type="text"
                            placeholder='Nhập email'
                            onChange={handleOnChangeEmail}
                            onKeyDown={handleKeyPress}
                        />
                        <input
                            type="password"
                            placeholder='Nhập mật khẩu'
                            onChange={handleOnChangePassword}
                            onKeyDown={handleKeyPress}
                        />
                        {data?.status === 'ERROR' && (
                            <span style={{ color: '#000', fontSize: '14px', paddingLeft: '1px' }}>
                                {data?.message}
                            </span>
                        )}
                        <button onClick={handleSignIn}>
                            Đăng nhập
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <WrapperTextLight></WrapperTextLight>
                            <WrapperTextLight onClick={() => navigate('/register')}>Tạo tài khoản</WrapperTextLight>
                        </div>
                    </WrapperContainerLeft>

                    <WrapperContainerRight>
                        <h2>Chào mừng bạn!</h2>
                        <p style={{ fontSize: "14px", textAlign: "center" }}>
                            Hãy đăng nhập để tiếp tục trải nghiệm
                        </p>
                    </WrapperContainerRight>
                </WrapperContainer>
            </div>
        </>
    );
};

export default LoginPage;
