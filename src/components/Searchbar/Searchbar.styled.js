import styled from '@emotion/styled';
const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  background-color: orange;
  .button {
    display: inline-block;
    width: 48px;
    height: 48px;
    border: 0;
    background-image: url('https://img.icons8.com/ios/50/search--v1.png');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;

    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    outline: none;
    &:hover {
      opacity: 1;
    }
  }
  .button-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
    border: 0;
  }
  input {
    display: inline-block;
    width: 400px;
    height: 46px;
    font: inherit;
    font-size: 20px;
    border: none;
    outline: none;
    padding-inline: 0;
    padding-left: 4px;
    padding-right: 4px;
    &::placeholder {
      font: inherit;
      font-size: 18px;}
`;
export { Form };
