import styled from 'styled-components';


const Divider = styled.div`
  width: 2px;
  min-height: 350px;
  margin-top: 45px;
  margin-left: 30px;
  padding: 100% 0 100% 0;

  border: 1px solid ${props => props.theme.lightGrey};
`;

export default Divider;
