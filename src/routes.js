import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Main from './pages/main'
import Product from './pages/product';

const Routes = () => (
    // Define que estamos utilizando rotas através de um browser
    <BrowserRouter>
        {/* faz com que apenas uma rota seja chamada */}
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/products/:id" component={Product} />
        </Switch>
    </BrowserRouter>
)

export default Routes;