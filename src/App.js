import React, { useEffect, useState } from 'react';
import TodoList from './component/TodoList';
import Pagination from './component/pagination/Pagination';
import queryString from 'query-string'
import PostFiltersForm from './component/PostFiltersForm/PostFiltersForm';
import Clock from './component/Clock';
import DataSonTra from './component/SonTra/DataSonTra';
import './style/SonTra.css'
import './style/global.css'



function App(props) {
  const [postsList, setPostsList] = useState([])
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRow: 1,
  })
  const [fil, setFil] = useState({
    _page: 1,
    _limit: 10,
    title_like: ''
  }) 

  useEffect(() => {
    async function fetchPosts () {
      try {
        const paramsString = queryString.stringify(fil)
        // _limit=10&_page=1
        const url = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`
        const reponse = await fetch(url)
        const reponseJSON = await reponse.json()
        const {data , pagination} = reponseJSON
        setPostsList(data)
        setPagination(pagination)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [fil])

  const handlePageChange = (newPage) => {
    setFil({
      ...fil,
      _page: newPage
    })
  }
  function handleFormSubmit (formValue) {
    setFil({
      ...fil,
      _page: 1,
      title_like: formValue.value
    })
  }
  return (
    <div>
        {/* <PostFiltersForm  onSubmit={handleFormSubmit}/> */}
        {/* <TodoList posts={postsList} /> */}
        {/* <Pagination pagination={pagination} onPageChange={handlePageChange}/> */}
        {/* <Clock /> */}
        <DataSonTra />
      </div>
  );
}

export default App;