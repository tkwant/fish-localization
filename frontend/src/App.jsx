import React, { useEffect } from 'react'
import Dashboard from './screens/Dashboard/Dashboard'
import VideoPage from './screens/VideoPage/VideoPage'
import FrontPage from './screens/FrontPage/FrontPage'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
    fonts: {
        heading: "Inter",
        body: "Inter",
    },
})
const queryClient = new QueryClient()
console.log("import.meta.env")
console.log(import.meta.env)
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <div class="flex flex-col h-screen">
                    <header class="bg-gray-500">Fish Counter</header>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={FrontPage} exact />
                            <Route path="/player" component={VideoPage} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default App