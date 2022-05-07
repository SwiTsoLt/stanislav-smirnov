import React from 'react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './styles/App.css';
import './styles/Media.css';
import { AuthContext } from './context/authContext';
import { Aside } from './elements/Aside';
import { Main } from './elements/Main';
import { Search } from './elements/Search';
import { useLang } from './hooks/lang.hook';
import { Loader } from './elements/Loader';
import { useUser } from './hooks/user.hook';

function App() {

  const [asideProps, setAsideProps] = useState({
    isAuth: false,
    roles: ["USER"],
    page: '/news',
    lang: 'en',
  })

  const { lang } = useLang()
  const { token, ready } = useUser()
  const { userState } = useUser()

  const blackWallClickHandler = (e) => {
    const aside = document.getElementById("aside")
    aside.classList.remove('active')
    e.classList.remove('show')
  }

  let vrazrobotke = false

  if (vrazrobotke) {
    return (
      <div><h1 className='center'>В разроботке</h1></div>
    )
  }

  return (
    <AuthContext.Provider value={{
      token, ready, lang, userState, asideProps
    }}>
      <BrowserRouter>
        <div className="App">
          <div id='blackWall' className="blackWall" onClick={e => blackWallClickHandler(e.target)}></div>
          <div className="wrapper">
            <Aside asideProps={asideProps} setAsideProps={setAsideProps} />
            <div className="content">
              <Search asideProps={asideProps}></Search>
              {
                ready
                  ? <Main asideProps={asideProps} setAsideProps={setAsideProps} ></Main>
                  : <Loader />
              }
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
