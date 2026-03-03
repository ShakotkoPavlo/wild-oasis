import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const AppLayoutContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
`;

function AppLayout() {
  return (
    <AppLayoutContainer>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </AppLayoutContainer>
  );
}

export default AppLayout;
