import styled from 'styled-components'

export const Container = styled.div`
  > div {
    position: relative;
    width: 100%;
  }

  > div > span {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #b3b8bd;
    z-index: 2;
    border-right: 1px solid #ced4da;
    padding-right: 10px;
  }

  svg {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 4;
  }

  .react-datepicker {
    min-width: 220px;
  }

  input {
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-clip: padding-box;
    border: 1px solid;
    border-color: ${(props) => (props.error ? '#a94442' : '#ced4da')};
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: 12px !important;

    height: 32px;
    padding: 4px 45px;
    padding-right: 0;

    background-color: ${(props) => (props.disabled ? '#EBEBE4' : '#fff')};
  }
`
