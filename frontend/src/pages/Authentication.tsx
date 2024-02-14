import LoginForm from "../features/login/components/LoginForm";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Box, Text } from '@chakra-ui/react';
import RegisterForm from "../features/register/components/RegisterForm";

const Login = () => {
  return (
    <Container  h='100vh'  display='flex' gap={5} flexDirection='column' justifyContent='center'>

      <Box bg='white' rounded={10} >
      <Text fontSize='5xl' p={3} >Echo-Talk</Text>
      </Box>

      <Box bg='white' p={5} rounded={10}>
        <Tabs>

          <TabList>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>

            <TabPanel>
            <LoginForm />
            </TabPanel>

            <TabPanel>
            <RegisterForm/>
            </TabPanel>
           
          </TabPanels>
        </Tabs>
        </Box>
    </Container>
  );
};

export default Login;
