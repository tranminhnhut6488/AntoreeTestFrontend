import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 24px;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    max-width: 400px;
    max-height: 400px;
    border-radius: 12px;
    object-fit: contain;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
`

export const InfoWrapper = styled.div`
  flex: 1;
  padding: 16px 24px;

  .actions {
    margin-top: 24px;
    display: flex;        
    gap: 12px;           
    flex-wrap: wrap;
  }
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
`

export const Paragraph = styled.p`
  margin-top: 16px;
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`

export const Price = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #fa541c;
  margin: 12px 0;
`

export const Button = styled.button`
  height: 50px;
  width: 150px;
  border: 1px solid #bd1220;
  border-radius: 10px;
  background: white;
  color: #bd1220;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  background: linear-gradient(to left, white 50%, #bd1220 50%);
  background-size: 200% 100%;
  background-position: right;
  transition: background-position 0.5s ease;

  &:hover {
    background-position: left;
    color: white;
  }
`

export const StarWrapper = styled.div`
  color: #fadb14;
  font-size: 18px;
  margin-bottom: 12px;
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalBox = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  animation: fadeInScale 0.3s ease;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`
export const ModalButton = styled(Button)`
  width: 100%;
  height: 48px;
`

export const CancelButton = styled.button`
  border: none;
  background: transparent;
  color: #666;
  font-size: 15px;
  cursor: pointer;
  margin-top: 4px;

  &:hover {
    color: #000;
  }
`
export const Subtitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 8px;
  color: #333;
`
