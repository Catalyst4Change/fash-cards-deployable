import React, { useRef, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import About from '../About/About.js'
import Start from '../NewGame/Start.js'
import Home from '../Home/Home.js'
import Game from '../Game/Game.js'
import Saved from '../Saved/Saved.js'
import './App.css'
import GameOver from '../GameOver/GameOver.js'
import CountDown from 'react-countdown'
import data from '../data.json'
import { useNavigate } from 'react-router-dom'



const App = () => {
  const [cardsData, setCardsData] = useState(data) 
  const shuffledData = useRef()

  
  const [gameOver, setGameOver] = useState(false)
  const [timer, setTimer] = useState(false)
  
  const savedCards = useRef([])
  const cardsFlipped = useRef(0)
  const correctGuesses = useRef(0)
  
  const navigate = useNavigate()
  
  const {pathname} = useLocation()
  const [carouselIndex, setCarouselIndex] = useState(0)
  
  const nextSlide = () => {
    setCarouselIndex(carouselIndex + 1)
  }
  
  const shuffle = (array) => {
    let currentIndex = array.length
    let randomIndex
    
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]]
      }
      
      return array
    }
    shuffledData.current = shuffle(data)
    
  const saveCardForLater = (card) => {
    const savedCardsCopy = savedCards.current
    savedCardsCopy.push(card)
    savedCards.current = savedCardsCopy
  }
  
  const startTimer = () => {
    setTimer(true)
  }

  const resetTimer = () => {
    setTimer(false)
    setGameOver(false)
  }

  const flipCard = () => {
    cardsFlipped.current = cardsFlipped.current + 1
  }
  
  const addOneCorrect = () => {
    correctGuesses.current = correctGuesses.current + 1
  }
  
  // countdown
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setGameOver(true)
      navigate("/gameover")

      return <span>GAME OVER!</span>
    } else {
      return <span>{minutes}:{seconds}</span>
    }
  }

  return (
    <section className="App column">

      <h1 className='column'>
        FASH CARDS
      </h1>
      {timer && 
        <span className="countdown column">
          <CountDown date={Date.now() + 60000} renderer={renderer} />
        </span>}

      <Routes>
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route path='/home' element={<Home />}/> 
        <Route path='/start' element={<Start />} />
        <Route path='/about' element={<About />} />
        <Route path='/game' element={
          <Game 
          cardsData={cardsData} 
          shuffle={shuffle} 
          saveCardForLater={saveCardForLater} 
          gameOver={gameOver} 
          resetTimer={resetTimer} 
          flipCard={flipCard} 
          addOneCorrect={addOneCorrect} 
          nextSlide={nextSlide} 
          carouselIndex={carouselIndex}
          shuffledData={shuffledData.current}
          />} 
        />
        <Route path='/saved' element={<Saved savedCards={savedCards.current} />} />
        <Route path='/gameover' element={
          <GameOver 
          resetTimer={resetTimer} 
          cardsFlipped={cardsFlipped.current} 
          correctGuesses={correctGuesses.current} />} />
      </Routes>

      <nav className='column'>

        {pathname.includes('start') && 
          <Link to='/game'><button onClick={startTimer}>Play</button></Link>
        }

        {!pathname.includes('home') &&
          <Link to='/home'><button onClick={resetTimer}>Home</button></Link>
        }

        {pathname.includes('home') && 
          <Link to='/about'><button onClick={resetTimer}>About</button></Link>
        }

        {pathname.includes('home') && 
          <Link to='/start'><button onClick={resetTimer}>Start</button></Link>
        }

        {pathname.includes('home') && savedCards.current.length >= 1 && 
          <Link to='/saved'><button onClick={resetTimer}>Saved Cards</button></Link>
        }

        {pathname.includes('gameover') && 
        <div className='column'>
          <Link to='/game'><button onClick={startTimer}>Play Again</button></Link>
          <a href='https://www.adl.org' target="_blank" >
            <button>Learn more about ADL</button>
          </a>
        </div>
        }

        {pathname.includes('about') && 
        <a href='https://www.adl.org' target="_blank" >
          <button>Learn more about ADL</button>
        </a>
        }

      </nav>

    </section>
  )
}

export default App
