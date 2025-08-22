import React, { useState } from 'react';
import { WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import { registerUser } from '../../services/UserService';
import { useMutation } from '@tanstack/react-query';
import ToastComponent from '../../components/ToastComponent/ToastComponent';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const mutationRegister = useMutation({
        mutationFn: async (data) => {
            const res = await registerUser(data);
            return res;
        },
        onSuccess: (data) => {
            if (data?.status === 'OK') {
                navigate('/login')
            }
        },
    });

    const { data } = mutationRegister;

    const handleOnChangeName = (e) => setName(e.target.value);
    const handleOnChangeEmail = (e) => setEmail(e.target.value);
    const handleOnChangePassword = (e) => setPassword(e.target.value);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleRegister();
    };

    const handleRegister = () => {
        mutationRegister.mutate({ name, email, password })
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
                        <p style={{ fontSize: '17px', color: '#fff' }}>Đăng ký</p>

                        <input
                            type="text"
                            placeholder='Nhập tên'
                            onChange={handleOnChangeName}
                            onKeyDown={handleKeyPress}
                        />
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

                        <button onClick={handleRegister}>
                            Đăng ký
                        </button>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                            <WrapperTextLight></WrapperTextLight>
                            <WrapperTextLight onClick={() => navigate('/login')}>Đăng nhập</WrapperTextLight>
                        </div>
                    </WrapperContainerLeft>

                    <WrapperContainerRight>
                        <h2>Chào mừng bạn mới!</h2>
                        <p style={{ fontSize: "14px", textAlign: "center" }}>
                            Tạo tài khoản để bắt đầu hành trình của bạn
                        </p>
                    </WrapperContainerRight>
                </WrapperContainer>
            </div>
        </>
    );
};

export default RegisterPage;
