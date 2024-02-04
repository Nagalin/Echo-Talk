import { Form, Container, Stack, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useRegister from '../hooks/useRegister';

const RegisterForm = () => {
    const navigate = useNavigate()
    const {
        usernameRef,
        passwordRef,
        confirmPasswordRef,
        setFile,
        error,
        handleRegister
    } = useRegister()
    return (
        <Container style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Form onSubmit={handleRegister} className='bg-light p-5 rounded shadow-lg border border-dark'>
                <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" transform="matrix(-1 0 0 1 22 2)" stroke="#1C274C" stroke-width="1.5" />
                    <path d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C10.1786 2 8.47087 2.48697 7 3.33782M21.8 10C21.9311 10.6462 22 11.3151 22 12C22 17.5228 17.5228 22 12 22C10.4003 22 8.88837 21.6244 7.54753 20.9565C7.19121 20.7791 6.78393 20.72 6.39939 20.8229L4.17335 21.4185C3.20701 21.677 2.32295 20.793 2.58151 19.8267L3.17712 17.6006C3.28001 17.2161 3.22094 16.8088 3.04346 16.4525C2.37562 15.1116 2 13.5997 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <h1 className='mb-3 mt-3'>Echo-Talk</h1>
                <Stack gap={2}>

                    <Form.Label>Username</Form.Label>
                    <Form.Control ref={usernameRef} type="text" placeholder="Enter username" />

                    <Form.Label className='mt-3'>Insert your profile image</Form.Label>
                    <Form.Control type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files && e.target.files[0])}/>


                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Enter password" />

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control ref={confirmPasswordRef} type="password" placeholder="Enter password" />

                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginTop: '10px' }}>
                        <span> Already hava an account?, </span>
                        <span style={{ color: 'blue' }}>click here to sign in</span>
                    </div>
                    {error && (
                        <Alert className="mt-2" variant="danger">
                            {error}
                        </Alert>
                    )}

                    <Button type='submit' variant='primary'>Register</Button>
                </Stack>
            </Form>
        </Container>
    );
}

export default RegisterForm;
