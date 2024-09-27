import { createContext, useEffect, useState } from 'react'

import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Container from './components/Container'
import SignupModal from './SignupModal'

import SocketWrapper from './SocketWrapper'


export const sidebarContext = createContext();
export const selectedUserContext = createContext();
export const meContext = createContext();


function App() {

  const [userSignedUp, setUserSignedUp] = useState(false);
  const [showMembers, setShowMembers] = useState(window.innerWidth < 768 ? false : true);
  const [showGroups, setShowGroups] = useState(window.innerWidth < 768 ? false : true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        setShowMembers(false)
        setShowGroups(false)
      } else {
        setShowMembers(true)
        setShowGroups(true)
      }
    })
  }, [])






  return (
    <div>
      <meContext.Provider value={{ me, setMe }}>
        <sidebarContext.Provider value={{ showMembers, setShowMembers, showGroups, setShowGroups }}>
          <selectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
            <SocketWrapper>
              {
                userSignedUp ?
                  <div>

                    <Header />
                    <div className="flex h-[calc(100vh-104px)] md:h-[calc(100vh-64px)]">
                      <Sidebar />
                      <Container />
                    </div>
                  </div>

                  : <SignupModal setUserSignedUp={setUserSignedUp} />
              }
            </SocketWrapper>
          </selectedUserContext.Provider>

        </sidebarContext.Provider>
      </meContext.Provider>
    </div>
  )
}

export default App
