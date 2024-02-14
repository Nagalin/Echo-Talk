import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import Button from '../../../components/ui/Button'
import useLogin from '../hooks/useLogin'
import Alert from '../../../components/ui/Alert'

const LoginForm = () => {
    const {
        username,
        password,
        handleLogin,
        error
    } = useLogin()

    return (
        <form onSubmit={handleLogin}
        >
            <Box
                boxShadow='outline'
                p='6'
                rounded='md'
                bg='white'
                w={400}
            >
                <svg 
                width=
                "80px" height="80px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="si-glyph si-glyph-person-talk">

                    <title>139</title>

                    <defs>

                    </defs>
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g fill="#434343">
                            <path d="M5.524,12.285 C4.664,12.285 3.509,11.836 2.923,11.099 C0.114,11.099 0.029,15 0.029,15 L10.966,15 C10.967,15 11.186,11.083 8.029,11.083 C7.445,11.828 6.386,12.285 5.524,12.285 Z" className="si-glyph-fill">

                            </path>
                            <path d="M7.938,6.264 C7.938,7.515 6.833,9.907 5.469,9.907 C4.105,9.907 3,7.515 3,6.264 C3,5.015 4.104,4 5.469,4 C6.833,4 7.938,5.015 7.938,6.264 L7.938,6.264 Z" className="si-glyph-fill">

                            </path>
                            <path d="M12.527,0.041 C10.617,0.041 9.066,1.199 9.066,2.631 C9.066,3.937 10.36,5.013 12.037,5.192 L11.051,7.004 L13.807,5.035 C15.084,4.654 15.989,3.722 15.989,2.631 C15.988,1.199 14.439,0.041 12.527,0.041 L12.527,0.041 Z" className="si-glyph-fill">

                            </path>
                        </g>
                    </g>
                </svg>

                <FormControl
                    display='flex'
                    flexDirection='column'
                    gap={10}
                    isRequired
                >
                    <div>
                        <FormLabel>Username</FormLabel>
                        <Input ref={username} type='text' />
                    </div>

                    <div>
                        <FormLabel>Password</FormLabel>
                        <Input ref={password} type='password' />
                    </div>
                    {error && <Alert description={error}/>}
                    <Button>Login</Button>
                </FormControl>
            </Box>
        </form>
    )
}

export default LoginForm
