import styled from "styled-components";
import LoginForm from "./../features/authentication/LoginForm";
import Logo from "./../ui/Logo";
import Heading from "../ui/Heading";
import CabinTable from "./../features/cabins/CabinTable";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading size="h4" align="center">
        Login into your account
      </Heading>
      <LoginForm />

      <CabinTable />
    </LoginLayout>
  );
}

export default Login;
