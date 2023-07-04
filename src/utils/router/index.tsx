/**
 * Gestion de la logique de routage
 **/

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { MuiThemeProvider } from "../context";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Login from "../../pages/Login";
import NewUser from "../../pages/NewUser";
import NewCustomer from "../../pages/NewCustomer";
import NewOrder from "../../pages/NewOrder";
import Verify from "../../pages/Verify";
import Home from "../../pages/Home";
import Previews from "../../pages/Previews";
import Orders from "../../pages/Orders";
import Order from "../../pages/Order";
import Customer from "../../pages/Customer";
import Customers from "../../pages/Customers";
import Error from "../../pages/Error";
import { store } from "../store";
import Users from "../../pages/Users";
import User from "../../pages/User";
import MyAccount from "../../pages/MyAccount";
import UpdatePassword from "../../pages/UpdatePassword";
import Helper from "../../pages/Helper";
import LogBook from "../../pages/LogBook";
import AddFirstUser from "../../pages/AddFirstUser";

/**
 * Gestion du router et des routes principales de l'application
 */
export function MyRouter() {
    let persistor = persistStore(store);
    return (
        <BrowserRouter>
            <MuiThemeProvider>
                <Header />
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Routes>
                            <Route path='/' element={<Login />} />
                            <Route path='/add-first-user' element={<AddFirstUser />} />
                            <Route path='/verify/:id/:token' element={<Verify />} />
                            <Route path='/helper' element={<Helper />} />
                            <Route path="/update-password/:id/:token" element={<UpdatePassword />} />
                            <Route path='/home//*' element={<Home />} />

                            {/* Ajout d'une route error pour les routes non répertoriées */}
                            <Route element={<Error />} path='*' />
                        </Routes>
                    </PersistGate>
                </Provider>
                <Footer />

            </MuiThemeProvider >
        </BrowserRouter>
    )
}

/**
 * Gestion du router de la page du tableau de bord permettant les affichages de chacun des components
 */
export function DashBoardRouter() {
    return (
        <Routes>
            <Route path='/' element={<Previews />} />
            <Route path='/profile' element={<MyAccount />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/:id' element={<Order />} />
            <Route path='/orders/new' element={<NewOrder />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/:id' element={<Customer />} />
            <Route path='/customers/new' element={<NewCustomer />} />
            <Route path='/users/' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/users/new' element={<NewUser />} />
            <Route path='/logs' element={<LogBook />} />

            {/* Ajout d'une route error pour les routes non répertoriées */}
            <Route element={<Error />} path='*' />
        </Routes>
    )
}

