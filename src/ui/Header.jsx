import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: orange;
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <HeaderWrapper>HEADER</HeaderWrapper>;
}

export default Header;
