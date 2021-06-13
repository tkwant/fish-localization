import React, { useEffect } from 'react'
import VideoPage from './screens/VideoPage/VideoPage'
import FrontPage from './screens/FrontPage/FrontPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Title from './Title'
// const theme = extendTheme({
//     fonts: {
//         heading: "Inter",
//         body: "Inter",
//     },
// })
const queryClient = new QueryClient()
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div class="flex flex-col h-screen">
                <Title />
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={FrontPage} exact />
                        <Route path="/player" component={VideoPage} />
                    </Switch>
                </BrowserRouter>
            </div>
        </QueryClientProvider>
    )
}

export default App