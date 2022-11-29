import { getProviders, signIn } from "next-auth/react"
import { Box, Button, Stack} from "@mui/material";


function Login({ providers }) {
    return (
      <Stack sx={{mt: "200px"}} direction="column" alignItems="center" spacing={8}>
        <Box>
          <img src="https://links.papareact.com/9xl" alt="" height="200px" />
        </Box>
        <Box>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            
            <Button variant="contained"  
                size="large"
                sx={{
                  backgroundColor: "#1DB954",
                  '&:hover': {backgroundColor: '#33c065'},
                  color: "white", }} onClick={() => signIn(provider.id, { callbackUrl: "/encapsulate"})}
            >
              Login to Spotify
            </Button>
          </div>
        ))}
        </Box>
      </Stack>
    
    )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}