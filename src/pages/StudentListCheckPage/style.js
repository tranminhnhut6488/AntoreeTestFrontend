import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
`

export const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const Th = styled.th`
  background: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
`

export const Paid = styled.span`
  color: green;
  font-weight: 600;
`

export const Unpaid = styled.span`
  color: red;
  font-weight: 600;
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

  &:disabled {
    cursor: not-allowed;
  }
`