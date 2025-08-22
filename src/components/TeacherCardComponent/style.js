import styled from 'styled-components'

export const TeacherCardWrapper = styled.div`
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  z-index: 0;

  &:hover {
    transform: scale(1.05);
    transform-origin: center;
    z-index: 10;
  }

  &:hover .overlay {
    opacity: 1;
  }
`

export const StyledCard = styled.div`
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: box-shadow 0.3s ease;
  gap: 16px;
`

export const StyledImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`

export const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #222;
`

export const StyledPrice = styled.div`
  color: #bd1220;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`

export const Section = styled.div`
  margin-bottom: 12px;
`

export const SectionTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #BD1220;
  margin-bottom: 4px;
`

export const StyledContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #555;
  line-height: 1.4;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  gap: 10px;

  button {
    height: 34px;
    width: 130px;
    border: 1px solid #BD1220;
    border-radius: 10px;
    background: #BD1220;
    display: flex; 
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 13px;
    overflow: hidden;
    background: linear-gradient(to left, #BD1220 50%, #fff 50%);
    background-size: 200% 100%;
    background-position: right;
    transition: background-position 0.5s ease, color 0.3s ease;

    &:hover {
      background-position: left;
      color: #BD1220;
    }
  }
`
