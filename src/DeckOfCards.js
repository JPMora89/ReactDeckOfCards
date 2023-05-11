import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

const DeckOfCards = () => {
    const [deckId, setDeckId] = useState('');
    const [cards, setCards] = useState([]);
    const rotationRef = useRef(0);
    const intervalRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    
    useEffect(() => {
        async function getDeckId() {
        const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        setDeckId(res.data.deck_id);
        }
        getDeckId();
    }, []);

    const startDrawing = () => {
        setIsDrawing(true);
        intervalRef.current = setInterval(() => {
            if (cards.length >= 52) {
                alert('The deck has been exhausted.');
                setIsDrawing(false);
                clearInterval(intervalRef.current);
            } else {
                drawCard();
            }
        }, 1000);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        clearInterval(intervalRef.current);
    };

    const toggleDrawing = () => {
        if (isDrawing) {
            stopDrawing();
        } else {
            startDrawing();
        }
    };

    
    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const card = res.data.cards[0];
        setCards(cards => [...cards, card]);
        rotationRef.current += 0;
    }

    const getRandCoords = () => {
        const transX = Math.floor(Math.random() * 20);
        const transY = Math.floor(Math.random() * 20);
        const rotateDeg = Math.floor(Math.random() * 180);
        return { transX, transY, rotateDeg };
      };
 
      const buttonText = isDrawing ? 'Stop drawing' : 'Start drawing';

    
    return (
        <div>
        <button onClick={toggleDrawing}>{buttonText}</button>
        <div>
            {cards.map(card => <Card 
            key={card.code} 
            image={card.image}
            transX={getRandCoords().transX} 
            transY={getRandCoords().transY}
            rotateDeg={getRandCoords().rotateDeg} 
            
            />)}
        </div>
        </div>
    )
    }

export default DeckOfCards;