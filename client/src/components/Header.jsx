import React from 'react'
import { Navbar, DarkThemeToggle, TextInput, Button } from 'flowbite-react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Dropdown } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate=useNavigate()
    const currentUser=useSelector((state)=>state.user.currentUser)
 
    return (
        <Navbar fluid rounded >
            <Navbar.Brand as={Link} href="/">
                <img src="https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="mr-3 h-6 sm:h-9" alt="Blog Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Blog Site</span>
            </Navbar.Brand>



            <form className='hidden lg:inline'>
                <TextInput
                    type='text'
                    placeholder='search'
                    rightIcon={AiOutlineSearch}
                />
            </form>
            <button className='lg:hidden'>
                <AiOutlineSearch className='h-10 w-10 dark:text-white rounded' />
            </button>



            <div className="flex md:order-2 gap-2">
                <DarkThemeToggle />
                {currentUser?
                <Dropdown inline arrowIcon={false} label={<div className=' h-10 w-10  rounded-full'><img src={currentUser.photo} alt="" /></div>}>
                        <Dropdown.Header className='flex flex-col gap-3'>
                        <span>{currentUser.username}</span>
                            <span>{currentUser.email}</span>            
        
                        </Dropdown.Header>
                        <Dropdown.Header className='flex flex-col gap-3'>
                          <Link to='/dashboard'>Profile</Link>
                            <button>SignOut</button>
                        </Dropdown.Header>
                </Dropdown>

                :<NavLink to='signin'>
                    <Button color="gray">SignIn</Button>
                </NavLink>}
               

                <Navbar.Toggle />

            </div>




            <Navbar.Collapse>
                {/* The Search area */}


                {/* Navigation items */}
                <Navbar.Link as={'div'}>
                    <NavLink to='/'> Home</NavLink>
                </Navbar.Link>
                <Navbar.Link as={'div'}>
                    <NavLink to='about'> About</NavLink>
                </Navbar.Link >
                <Navbar.Link as={'div'}>
                    <NavLink to='projects'> Projects</NavLink>
                </Navbar.Link>

                {/* Buttons */}

            </Navbar.Collapse>
        </Navbar>



        //     <Navbar fluid rounded>
        //     <Navbar.Brand href="https://flowbite-react.com">
        //       <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        //       <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
        //     </Navbar.Brand>
        //     <div className="flex md:order-2">
        //       <Button>Get started</Button>
        //       <Navbar.Toggle />
        //     </div>
        //     <Navbar.Collapse>
        //       <Navbar.Link href="#" active>
        //         Home
        //       </Navbar.Link>
        //       <Navbar.Link href="#">About</Navbar.Link>
        //       <Navbar.Link href="#">Services</Navbar.Link>
        //       <Navbar.Link href="#">Pricing</Navbar.Link>
        //       <Navbar.Link href="#">Contact</Navbar.Link>
        //     </Navbar.Collapse>
        //   </Navbar>



    )
}

export default Header;
