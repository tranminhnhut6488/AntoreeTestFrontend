import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PriceCheckbox, PriceFilterWrapper, WrapperTeacherGrid, WrapperTeacherItem } from './style';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import EmptyComponent from '../../components/EmptyComponent/EmptyComponent';
import { getAllTeacher } from '../../services/TeacherService';
import TeacherCardComponent from '../../components/TeacherCardComponent/TeacherCardComponent';

const SearchTeacherPage = () => {
    const location = useLocation()
    const [queryParams, setQueryParams] = useState({ name: '' });
    const [selectedPrices, setSelectedPrices] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryObject = {};

        params.forEach((value, key) => {
            queryObject[key] = decodeURIComponent(value);
        });

        setQueryParams(queryObject);
    }, [location]);

    const name = queryParams?.name || '';

    const fetchTeacherAll = async () => {
        const res = await getAllTeacher()
        return res
    }

    const { isLoading, data: teachers } = useQuery({ queryKey: ['teachers'], queryFn: fetchTeacherAll, retry: 3, retryDelay: 1000, keepPreviousData: true })
    const searchTeacher = teachers && teachers.filter(teacher => teacher.user.name?.toLowerCase().includes(name.toLowerCase()))

    const handlePriceChange = (value) => {
        setSelectedPrices(prev =>
            prev.includes(value)
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const priceOptions = [
        { label: 'Dưới 200.000₫', value: '0-199999' },
        { label: '200.000₫ - 300.000₫', value: '200000-300000' },
        { label: 'Trên 300.000₫', value: '300000+' }
    ];

    return (
        <Loading isLoading={isLoading}>
            <div style={{ padding: '24px', maxWidth: '1270px', margin: '0 auto' }}>
                <div style={{ width: '100%', padding: '35px 0 17.5px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center' }}>Giáo viên đã tìm kiếm</div>
                    <span style={{ fontSize: '14px', opacity: 0.5 }}>
                        Kết quả tìm kiếm cho "<span style={{ fontWeight: '700' }}>{name}</span>"
                    </span>
                </div>
                <PriceFilterWrapper>
                    Giá:
                    {priceOptions.map(opt => (
                        <PriceCheckbox key={opt.value}>
                            <input
                                type="checkbox"
                                id={opt.value}
                                checked={selectedPrices.includes(opt.value)}
                                onChange={() => handlePriceChange(opt.value)}
                            />
                            <label htmlFor={opt.value}>{opt.label}</label>
                        </PriceCheckbox>
                    ))}
                </PriceFilterWrapper>
                <WrapperTeacherGrid>
                    {searchTeacher && searchTeacher.filter((teacher) => {
                        if (!selectedPrices || selectedPrices.length === 0) return true;

                        return selectedPrices.some((range) => {
                            if (range === '300000+') return teacher.pricePerHour > 300000;

                            const [min, max] = range.split('-').map(Number);
                            return teacher.pricePerHour >= min && teacher.pricePerHour <= max;
                        });
                    }).map((teacher) => (
                        <WrapperTeacherItem key={teacher.id}>
                            <TeacherCardComponent teacher={teacher} />
                        </WrapperTeacherItem>
                    ))}
                </WrapperTeacherGrid>
                {teachers && teachers.filter(teacher => teacher.user.name?.toLowerCase().includes(name.toLowerCase())).length === 0 && (
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                        <EmptyComponent description="Không tìm thấy giáo viên tương ứng" />
                    </div>
                )}
            </div>
        </Loading>
    );
};

export default SearchTeacherPage;