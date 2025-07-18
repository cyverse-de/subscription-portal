import { auth } from "@/auth";
import AccountAvatar from "@/components/AccountAvatar";
import SignInCard from "@/components/SignInCard";

import Image from "next/image";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";

export default async function Home() {
    const session = await auth();
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        size="large"
                        aria-label={
                            session
                                ? `${session?.user?.name} Account Menu`
                                : "Login"
                        }
                    >
                        <AccountAvatar />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main>
                <Image
                    src="/cyverse_logo_2.png"
                    alt="CyVerse logo"
                    width={375}
                    height={76}
                    priority
                />
                <Stack justifyContent="center" alignItems="center">
                    {session ? (
                        <>Welcome {session?.user?.name}!</>
                    ) : (
                        <SignInCard />
                    )}
                </Stack>
            </main>
        </Box>
    );
}
