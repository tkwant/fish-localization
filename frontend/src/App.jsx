import React from 'react'
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
    console.log("2222")
    console.log(document.body.style.position)

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