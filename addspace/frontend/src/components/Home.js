import React from 'react'
import './Home.css';
import Chat from "./Chat"

function Home() {
  return (
    <div className="container">
        <div className="left">70% Width
            <Chat />
        </div>
        <div className="right">30% Width</div>
    </div>
  )
}

export default Home