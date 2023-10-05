import styled from '@emotion/styled';
const Li = styled.li`
  transition: transform 0.2s;
  box-shadow: 4px 4px 4px 4px #aa720c;

  img {
    display: block;
    width: 100%;
    height: 260px;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &: hover {
      transform: scale(1.05);
    }
  }
`;
export { Li };
