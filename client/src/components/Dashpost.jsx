import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'


function Dashpost() {

  const user = useSelector((state) => state.user.currentUser)
  const [posts, setposts] = useState(null)
  const [fetchError, setfetchError] = useState()
  const [showMore,setshowMore]=useState(true)
  console.log(posts)
  console.log(fetchError)

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch(`api/post/getposts/?userId=${user._id}`)

        const data = await res.json();
        setposts(data.posts)

        if(data.posts.length<9){
          setshowMore(false)
        }
      } catch (error) {
        setfetchError(error)
      }
    })();


  }, [])



async function handleShowMore(){
  const startIndex=posts.length;
  console.log(startIndex)
  try {
    const res=await fetch(`api/post/getposts/?userId=${user._id}&startIndex=${startIndex}`);
    const data=await res.json()
  
  
    if(res.ok){
      setposts((prev)=>[...prev,...data.posts])
      if(data.posts.length<9){
        setshowMore(false)
      }
    }
  } catch (error) {
    setfetchError(error)
  }
}
async function handlePostDelete(id){
  try {
    const res=await fetch(`api/post/delete/${id}`,{
      method:'Delete',
  
    })
    const data=await res.json()
    if(!res.ok){
      console.log(data.message)
    }
    setposts((prev)=>prev.filter((post)=>post._id!==id))
    console.log(data)

   
  } catch (error) {
    setfetchError(error)
  }
 
}
  return (
    <div className='flex flex-col items-center dark:bg-neutral-800 dark:text-white w-full  '>
      {posts ? (
        posts.length > 0 ? (
          <div className='text-black bg-white dark:text-white dark:bg-neutral-700 w-full overflow-x-auto'>
            <Table className='w-full overflow-x-scroll'>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
                <Table.HeadCell>
                  {/* <span className="sr-only">Edit</span> */}
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y w-full">

                {posts.map((item) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 w-full" key={item._id}>

                  <Table.Cell>{new Date(item.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${item.slug}`}>
                      <div className='h-16 w-16 '> <img src={item.image} alt="image" className='h-full w-full' /> </div>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`post/${item.slug}`}>
                      {item.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>

                  <Table.Cell className='text-red-600 hover:underline cursor-pointer' onClick={()=>handlePostDelete(item._id)}>Delete</Table.Cell>
                  <Table.Cell className='text-teal-500 hover:underline'>
                    <Link to={`/update-post/${item._id}`}>
                    
                   Edit
                    </Link>
                  
                  </Table.Cell>

                </Table.Row>)}
              </Table.Body>
  
            </Table>
            {showMore&&(
              <button className='dark:bg-gray-800 flex justify-center w-full text-teal-500 font-bold' onClick={handleShowMore}>Show More!</button>
            )}
            

          </div>
        ) : (
          <div>No posts available</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Dashpost