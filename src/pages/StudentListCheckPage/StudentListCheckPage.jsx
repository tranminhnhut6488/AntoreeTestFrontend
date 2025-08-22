import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getPackage, paidLesson } from '../../services/BookingService';
import { Button, Container, Paid, Table, Td, Th, Title, Unpaid } from './style';
import ToastComponent from '../../components/ToastComponent/ToastComponent';
import { convertPrice } from '../../utils';
import { jwtDecode } from 'jwt-decode';

const StudentListCheckPage = () => {
    const [toast, setToast] = useState(null);
    const token = localStorage.getItem("access_token");

    const mutationPaid = useMutation({
        mutationFn: async (data) => {
            const { id } = data
            const res = await paidLesson(id)
            return res
        },
        onSuccess: (data) => {
            if (data?.status === 'ERROR') {
                setToast({ type: 'error', message: data?.message });
            } else {
                setToast({ type: 'success', message: 'Thanh toán thành công' });
            }
        },
        onError: () => {
            setToast({ type: 'error', message: 'Thất bại' });
        },
    });

    const fetchPackageAll = async () => {
        const res = await getPackage()
        return res
    }

    const { data: packageLession } = useQuery({ queryKey: ['packageLession'], queryFn: fetchPackageAll })

    const decoded = token && jwtDecode(token);
    const packageFilter = packageLession && packageLession.filter(p => p.student.id === decoded.id)

    const handlePaid = async (id) => {
        mutationPaid.mutate({ id })
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            {toast && <ToastComponent type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <Container>
                <Title>Danh sách khóa học đã đăng ký</Title>
                <Table>
                    <thead>
                        <tr>
                            <Th>ID</Th>
                            <Th>Học viên</Th>
                            <Th>Giáo viên</Th>
                            <Th>Loại</Th>
                            <Th>Giá</Th>
                            <Th>Thanh toán</Th>
                            <Th>Thao tác</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageFilter?.map((pkg) => {
                            const typeLessons = pkg.type === '20lessons' ? 'Khóa 1 - Gói 20 buổi' : pkg.type === '3h3t1w' ? 'Khóa 2 - Gói 3 tháng' : 'Gói học thử';
                            const isFree = pkg.price === 0;
                            const status = isFree ? (<Paid>Miễn phí</Paid>) : pkg.isPaid ? (<Paid>Đã thanh toán</Paid>) : (<Unpaid>Chưa thanh toán</Unpaid>);
                            const action = isFree ? (<Button disabled>Miễn phí</Button>) : (
                                <Button disabled={pkg.isPaid} onClick={() => handlePaid({ id: pkg.id })}>
                                    Thanh toán
                                </Button>);
                            return (
                                <tr key={pkg.id}>
                                    <Td>{pkg.id}</Td>
                                    <Td>{pkg.student?.name}</Td>
                                    <Td>{pkg.name}</Td>
                                    <Td>{typeLessons}</Td>
                                    <Td>{convertPrice(pkg.price)}</Td>
                                    <Td>{status}</Td>
                                    <Td>{action}</Td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default StudentListCheckPage;