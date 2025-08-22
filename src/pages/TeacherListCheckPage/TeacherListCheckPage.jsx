import React, { useEffect } from 'react';
import { getBooking } from '../../services/BookingService';
import { useQuery } from '@tanstack/react-query';
import { Container, StatusLabel, Title } from './style';
import { Table, Td, Th } from '../StudentListCheckPage/style';
import { jwtDecode } from 'jwt-decode';
import { getAllTeacher } from '../../services/TeacherService';

const TeacherListCheckPage = () => {
    const token = localStorage.getItem("access_token");
    const decoded = token && jwtDecode(token);

    const fetchBookingAll = async () => {
        const res = await getBooking()
        return res
    }
    const fetchTeacherAll = async () => {
        const res = await getAllTeacher()
        return res
    }

    const { data: teachers } = useQuery({ queryKey: ['teachers'], queryFn: fetchTeacherAll })
    const { data: booking } = useQuery({ queryKey: ['booking'], queryFn: fetchBookingAll })

    const filterTeacher = teachers && teachers?.find(b => b?.user?.id === decoded.id);
    const filterBooking = booking && booking?.filter(b => b?.teacher?.id === filterTeacher.id);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <Container>
                <Title>Danh sách booking</Title>
                <Table>
                    <thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Học viên</Th>
                            <Th>Giáo viên</Th>
                            <Th>Ngày</Th>
                            <Th>Trạng thái</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterBooking?.map((b) => (
                            <tr key={b.id}>
                                <Td>{b.id}</Td>
                                <Td>{b.student?.name}</Td>
                                <Td>{b.teacher?.user?.name}</Td>
                                <Td>{b.date}</Td>
                                <Td>
                                    <StatusLabel status={b.status}>
                                        {b.status === 'trial'
                                            ? 'Gói học thử'
                                            : b.status === 'official'
                                                ? 'Gói học 3 tháng'
                                                : 'Gói khóa học 20 buổi'}
                                    </StatusLabel>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default TeacherListCheckPage;