import React from 'react';
import { InfoWrapper, Overlay, StyledCard, StyledImage, StyledPrice, StyledTitle, TeacherCardWrapper, Section, SectionTitle, StyledContent } from './style';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

const TeacherCardComponent = ({ teacher }) => {
  const navigate = useNavigate()

  const handleClickTeacherDetail = () => {
    navigate(`/teachers/${teacher.id}`)
  }

  return (
    <TeacherCardWrapper>
      <StyledCard>
        <StyledImage
          src={`${process.env.REACT_APP_API_URL}/uploads/${teacher.image}`}
          alt={teacher.user.name}
        />
        <InfoWrapper>
          <StyledTitle>{teacher.user.name}</StyledTitle>
          <StyledPrice>{convertPrice(teacher.pricePerHour)}/h</StyledPrice>

          <Section>
            <SectionTitle>📘 Chuyên môn</SectionTitle>
            <StyledContent>{teacher.expertise}</StyledContent>
          </Section>

          <Section>
            <SectionTitle>👩‍🏫 Thông tin giảng viên</SectionTitle>
            <StyledContent>{teacher.bio}</StyledContent>
          </Section>
        </InfoWrapper>

        <Overlay className="overlay">
          <button onClick={handleClickTeacherDetail}>Xem chi tiết</button>
        </Overlay>
      </StyledCard>
    </TeacherCardWrapper>
  );
};

export default TeacherCardComponent;
