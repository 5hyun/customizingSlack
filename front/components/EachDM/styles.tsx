import styled from '@emotion/styled';

export const Div = styled.div`
  .navLink {
    text-decoration: none;
    color: white;
  }

  .selected {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const List = styled.span`
  display: block;

  margin: 5px 0;
  margin-left: 30px;

  .circle {
    font-size: 12px;
    margin-right: 4px;
  }
  
  .full-circle {
    color: #51FFA6;
    background-color: #51FFA6;
    border-radius: 50%;
  }
`;
