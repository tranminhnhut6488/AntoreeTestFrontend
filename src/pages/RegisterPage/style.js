import styled from "styled-components";

export const WrapperContainer = styled.div`
  width: 800px;
  min-height: 445px;
  border-radius: 15px;
  background: #fff;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    min-height: auto;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    margin: 8px 0;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
  }

  button {
    background: #ffd66d;
    color: #bd1220ff;
    font-weight: 700;
    border: none;
    width: 100%;
    height: 48px;
    margin: 8px 0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f5c94d;
    }
  }
`

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 40px 45px 24px;
  display: flex;
  flex-direction: column;
  background: #bd1220ff;

  @media (max-width: 768px) {
    padding: 20px;
    align-items: center;
    text-align: center;
  }
`

export const WrapperContainerRight = styled.div`
  width: 300px;
  background: linear-gradient(
    136deg,
    rgb(240, 248, 255) -1%,
    rgb(189, 18, 32) 85%
  );
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 30px 10px;
  }
`

export const WrapperTextLight = styled.span`
  color: #0b1f3a;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: #143a51;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`
