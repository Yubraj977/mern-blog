import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Foot from './components/Foot'
import CreatePost from './pages/CreatePost'
import DashboardCover from './components/DashboardCover'
import CreatePostCover from './components/CreatePostCover'
import UpdatePost from './pages/UpdatePost'
import { Flowbite } from 'flowbite-react'
function App() {


  return (
    <Flowbite>
   <BrowserRouter>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/projects' element={<Projects/>}/>
    <Route element={<DashboardCover/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>
    <Route element={<CreatePostCover/>}>
    <Route path='/update-post/:postId' element={<UpdatePost/>}/>
    <Route path='/create-post' element={<CreatePost/>}/>
    </Route>
   
   </Routes>
   <Foot/>
   </BrowserRouter>
   </Flowbite>
  )
}

export default App
