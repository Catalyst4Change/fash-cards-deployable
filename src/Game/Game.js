import React from "react";
import PropTypes from 'prop-types'
import Card from "./Card/Card.js";

const Game = ({ cardsData, shuffle, saveCardForLater, gameOver, flipCard, addOneCorrect, nextSlide, carouselIndex, shuffledData }) => {  
  
  const makeButtons = (currentSymbol) => {
    const answers = []
    answers.push(currentSymbol)
    
    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * 200)
      if (!answers.includes(cardsData[random])) {
        answers.push(cardsData[random].symbol)
      }        
    }
    
    shuffle(answers)
    return answers
  }

  const cards = shuffledData.map((card, index) => {
    const currentSymbol = card.symbol
    console.log(currentSymbol, index, carouselIndex);

    const answerButtons = makeButtons(currentSymbol)
    
    return (
      <article className={`card-section column  ${index === carouselIndex ? 'focus' : 'hidden'}`} key={`card${index}`}> 
        <Card 
        card={card} 
        cardNumber={index}
        answerButtons={answerButtons} 
        flipCard={flipCard} 
        addOneCorrect={addOneCorrect} 
        saveCardForLater={saveCardForLater} 
        nextSlide={nextSlide}
        />
      </article>
    )
  })

  return (
    <section className='carousel-container'>
      <div className="carousel column">
        <div className="carousel-item column">
          {!gameOver && cards}
        </div>
      </div>
    </section>
  )
}

Game.propTypes = {
  cardsData: PropTypes.array,
  shuffle: PropTypes.func,
  saveCardForLater: PropTypes.func,
  gameOver: PropTypes.bool,
  flipCard: PropTypes.func,
  addOneCorrect: PropTypes.func,
  nextSlide: PropTypes.func,
  carouselIndex: PropTypes.number,
  shuffledData: PropTypes.array
}

export default Game



