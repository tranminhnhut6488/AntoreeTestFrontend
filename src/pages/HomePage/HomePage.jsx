import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import Loading from '../../components/LoadingComponent/LoadingComponent';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { WrapperTeacherGrid, WrapperTeacherItem } from './style';
import SliderComponent from '../../components/SlideComponent/SlideComponent';
import ToastComponent from '../../components/ToastComponent/ToastComponent';
import VissionAndMissionComponent from '../../components/VissionAndMissionComponent/VissionAndMissionComponent';
import LearningMethod from '../../components/LearningMethod/LearningMethod';
import FadeInSection from '../../components/FadeInSection/FadeInSection';
import { getAllTeacher } from '../../services/TeacherService';
import TeacherCardComponent from '../../components/TeacherCardComponent/TeacherCardComponent';


const HomePage = () => {
    const [filterPrice, setFilterPrice] = useState([]);
    const [price, setPrice] = useState([]);
    const [toast, setToast] = useState(null);
    const arrImages = ['theme1.webp', 'theme2.jpg', 'theme3.png'];

    const fetchTeacherAll = async () => {
        const res = await getAllTeacher()
        return res
    }

    const { isLoading, data: teachers } = useQuery({ queryKey: ['teachers'], queryFn: fetchTeacherAll, retry: 3, retryDelay: 1000, keepPreviousData: true })

    useEffect(() => {
        setPrice(filterPrice);
    }, [filterPrice]);

    const handleFilterPrice = (value) => {
        setFilterPrice(value)
    }

    const teacherFilter = (teachers && teachers.filter((teacher) => {
        if (!price || price.length === 0) return true;

        return price.some((range) => {
            if (range === '300000+') return teacher.pricePerHour > 300000;
            const [min, max] = range.split('-').map(Number);
            return teacher.pricePerHour >= min && teacher.pricePerHour <= max;
        });
    }));

    const handleSetToast = (value) => {
        setToast(value);
    }
    return (
        <>
            {toast && <ToastComponent type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
            <Loading isLoading={isLoading}>
                <SliderComponent arrImages={arrImages} />
                <div style={{ padding: '0px 24px', maxWidth: '1270px', margin: '0 auto' }}>
                    <FadeInSection>
                        <SearchComponent teachers={teachers} priceTeacher={handleFilterPrice} />
                    </FadeInSection>
                    <FadeInSection>
                        <h2 style={{ textAlign: 'center' }}>
                            Giảng viên Tiếng Anh
                        </h2>
                    </FadeInSection>
                    <FadeInSection>
                        <WrapperTeacherGrid>
                            {teacherFilter && teacherFilter.map((teacher) => (
                                <WrapperTeacherItem key={teacher.id}>
                                    <TeacherCardComponent teacher={teacher} setToast={handleSetToast} />
                                </WrapperTeacherItem>
                            ))}
                        </WrapperTeacherGrid>
                    </FadeInSection>
                    <FadeInSection>
                        <VissionAndMissionComponent />
                    </FadeInSection>
                    <FadeInSection>
                        <LearningMethod />
                    </FadeInSection>
                </div>
            </Loading>
        </>

    );
};

export default HomePage;
