import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, NavMenu, MenuItem, MenuButton, Drawer, DrawerMenu, CloseButton, Backdrop, Container, } from './style';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import PopoverComponent from '../PopoverComponent/PopoverComponent';
import { resetUser } from '../../redux/slides/userSlice';

const HeaderComponent = () => {
    const user = useSelector((state) => state.user)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activePath, setActivePath] = useState('/');
    const [showPopoverDesktop, setShowPopoverDesktop] = useState(false);
    const [showDropdownMobile, setShowDropdownMobile] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const anchorRef = useRef(null);

    const handleClick = (path) => {
        setDrawerOpen(false);
        setActivePath(path);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        dispatch(resetUser());
        setDrawerOpen(false);
        navigate('/');
    };

    return (
        <Container>
            <HeaderContainer>
                <Logo onClick={() => handleClick('/')}>Logo</Logo>
                <NavMenu>
                    <MenuItem active={activePath === '/'} onClick={() => handleClick('/')}>Trang chủ</MenuItem>
                    {!user?.name && <MenuItem active={activePath === '/login'} onClick={() => handleClick('/login')}>Đăng nhập</MenuItem>}
                    {user?.name && (
                        <MenuItem ref={anchorRef} onClick={() => setShowPopoverDesktop(!showPopoverDesktop)}>
                            Chào {user.name}
                        </MenuItem>
                    )}
                </NavMenu>
                <MenuButton onClick={() => setDrawerOpen(true)}><GiHamburgerMenu /></MenuButton>
            </HeaderContainer>

            <Drawer className={drawerOpen ? 'open' : ''}>
                <CloseButton onClick={() => setDrawerOpen(false)}><GrFormClose /></CloseButton>
                <DrawerMenu>
                    <MenuItem onClick={() => handleClick('/')}>Trang chủ</MenuItem>
                    {!user?.name && <MenuItem onClick={() => handleClick('/login')}>Đăng nhập</MenuItem>}
                    {user?.name && (
                        <>
                            <MenuItem onClick={() => setShowDropdownMobile(!showDropdownMobile)}>
                                Chào {user.name}
                            </MenuItem>
                            {showDropdownMobile && (
                                <div style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {user.role === 'student' && (
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/student-list-check')
                                                setDrawerOpen(false)
                                            }}
                                        >
                                            Danh sách khóa học
                                        </MenuItem>
                                    )}
                                    {user.role === 'teacher' && (
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/teacher-list-check')
                                                setDrawerOpen(false)
                                            }}
                                        >
                                            Quản lý học viên
                                        </MenuItem>)}
                                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                </div>
                            )}
                        </>
                    )}
                </DrawerMenu>
            </Drawer>

            {drawerOpen && <Backdrop onClick={() => setDrawerOpen(false)} />}

            {showPopoverDesktop && (
                <PopoverComponent
                    anchorRef={anchorRef}
                    onClose={() => setShowPopoverDesktop(false)}
                    onLogout={handleLogout}
                    roleUser={user.role}
                    onCheckListStudent={() => navigate('/student-list-check')}
                    onCheckListTeacher={() => navigate('/teacher-list-check')}
                />
            )}
        </Container>
    );
};

export default HeaderComponent;
