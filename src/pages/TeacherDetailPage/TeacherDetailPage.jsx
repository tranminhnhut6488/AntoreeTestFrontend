import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { BsLightbulbFill } from 'react-icons/bs';
import { convertPrice, formatDateDDMMYYYY } from '../../utils';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import { Container, ImageWrapper, InfoWrapper, Title, Paragraph, FlexRow, Price, Button, StarWrapper, ModalOverlay, ModalBox, ModalButton, CancelButton, Subtitle } from './style';
import { getTeacher } from '../../services/TeacherService';
import { jwtDecode } from 'jwt-decode';
import ToastComponent from '../../components/ToastComponent/ToastComponent';
import { bookingPackage, handleBooking } from '../../services/BookingService';

const TeacherDetailPage = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user)
    const token = localStorage.getItem("access_token");
    const [toast, setToast] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const mutationBookingPackage = useMutation({
        mutationFn: async (data) => {
            const { type, ...rest } = data
            const resBooking = await handleBooking(rest);
            if (resBooking?.status === 'ERROR') {
                return resBooking;
            }
            if (token) {
                const decoded = jwtDecode(token);
                if (type === 'trial') {
                    const resPackage = await bookingPackage({ name: teacher.user.name, studentId: decoded.id, type: type, price: 0, isPaid: 1 });
                    return resPackage;
                }
                if (type === '3h3t1w') {
                    const resPackage = await bookingPackage({ name: teacher.user.name, studentId: decoded.id, type: type, price: teacher.pricePerHour * 36 });
                    return resPackage;
                }
                if (type === '20lessons') {
                    const resPackage = await bookingPackage({ name: teacher.user.name, studentId: decoded.id, type: type, price: teacher.pricePerHour * 20 });
                    return resPackage;
                }
            }
        },
        onSuccess: (data) => {
            if (data?.status === 'ERROR') {
                setToast({ type: 'error', message: data?.message });
            } else {
                setToast({ type: 'success', message: 'Đăng ký gói học thành công' });
            }
            setShowModal(false);
        },
        onError: () => {
            setToast({ type: 'error', message: 'Thất bại' });
        },
    });


    const fetchGetTeacherDetail = async (context) => {
        const id = context?.queryKey?.[1];
        const res = await getTeacher(id);
        return res;
    };

    const { isLoading, data: teacher } = useQuery({
        queryKey: ['teacher-detail', id],
        queryFn: fetchGetTeacherDetail,
        retry: 3,
        enabled: !!id,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleBookingPackage = (status, type) => {
        if ((!user.name && !user.email) || !token) {
            navigate('/login')
        }
        if (token) {
            const decoded = jwtDecode(token)
            mutationBookingPackage.mutate({ teacher: { id: teacher.id }, student: { id: decoded.id }, date: formatDateDDMMYYYY(new Date()), status: status, type: type })
        }
    }

    return (
        <>
            {toast && <ToastComponent type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <Loading isLoading={isLoading}>
                {teacher && (
                    <Container>
                        <FlexRow>
                            <ImageWrapper>
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/uploads/${teacher.image}`}
                                    alt={teacher.user.name}
                                />
                            </ImageWrapper>

                            <InfoWrapper>
                                <Title>{teacher.user.name}</Title>

                                <StarWrapper>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </StarWrapper>

                                <Price>{convertPrice(teacher.pricePerHour)}/h</Price>

                                <Subtitle>Chuyên môn</Subtitle>
                                <Paragraph>{teacher.expertise}</Paragraph>

                                <Subtitle>Thông tin giảng viên</Subtitle>
                                <Paragraph style={{ whiteSpace: 'pre-line' }}>{teacher.bio}</Paragraph>

                                <Subtitle>Thông tin khóa học</Subtitle>
                                <Paragraph>Khóa 1 (Khóa học giao tiếp): 20 buổi, 1 buổi 1 tiếng, học trong 1 tháng gồm Listening và Speaking</Paragraph>
                                <Paragraph>Khóa 2 (Khóa học gợi ý): 36 buổi, 1 buổi 1 tiếng, học trong 3 tháng gồm 4 kĩ năng cơ bản</Paragraph>

                                <div className="actions">
                                    <Button onClick={() => setShowModal(true)}>Đăng ký học</Button>
                                    <Button onClick={() => handleBookingPackage('package', '20lessons')}><BsLightbulbFill /> : Gói 1 - 20 buổi/h</Button>
                                </div>
                            </InfoWrapper>
                        </FlexRow>
                    </Container>
                )}
            </Loading>

            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalBox onClick={(e) => e.stopPropagation()}>
                        <h3 className="title">Chọn hình thức học</h3>
                        <div className="actions">
                            <ModalButton onClick={() => handleBookingPackage('trial', 'trial')}>
                                Học thử 1 buổi
                            </ModalButton>
                            <ModalButton onClick={() => handleBookingPackage('official', '3h3t1w')}>
                                Học 3 tháng - gói 36 buổi/tiếng ({convertPrice(teacher.pricePerHour)}/giờ)
                            </ModalButton>
                            <CancelButton onClick={() => setShowModal(false)}>Hủy</CancelButton>
                        </div>
                    </ModalBox>
                </ModalOverlay>
            )}
        </>
    );
};

export default TeacherDetailPage;
