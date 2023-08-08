import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './LoginRegister/Login/LoginPage'
import RegisterPage from './LoginRegister/Register/RegisterPage'
import { useAppSelector } from '../../app/hooks'
import HomePage from './HomePage/HomePage'
import UserProfile from './UserPage/UserAccPage/UserProfile'
import ServicePage from './HomePage/Services/ServicePage'
import AdminPanel from './Panels/AdminPanel'
import ModeratorPanel from './Panels/ModeratorPanel'
import NewsMain from './HomePage/News/NewsMain'

const Main = () => {
    const { mode, users } = useAppSelector(state => state);

   
    return (
        <div className={mode ? 'body__light' : 'body__dark'}>
            <Routes>
                <Route
                    path={'login'}
                    element={<LoginPage />} />
                <Route
                    path={'registration'}
                    element={<RegisterPage />} />
                {/* <Route
                    path={'userposts'}
                    element={<UserPostsPage />} /> */}
                <Route
                    path={'/*'}
                    element={<HomePage />} />
                <Route
                    path={'news/*'}
                    element={<NewsMain />} />
                {/* .filter((item)=>item.roles?.toString().toLocaleLowerCase().includes('user')) */}
                {users.map(item => <Route
                    path={item._id!}
                    key={item._id}
                    element={<UserProfile item={item} />}
                />)}
                {/* {services.map(item => <Route
                key={item.title}
                path={item.title}
                element={<ServicePage item={item}/>}/>)} */}
                <Route
                    path={'services'}
                    element={<ServicePage />} />
                <Route
                    path={'admin'}
                    element={<AdminPanel />} />
                <Route
                    path={'moderator'}
                    element={<ModeratorPanel />} />
            </Routes>
        </div>
    )
}

export default Main