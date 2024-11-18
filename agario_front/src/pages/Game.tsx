import React from 'react';
import useMove from '../hooks/useMove';
import usePlayer from '../hooks/usePlayer';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001'); 

const Game = () => {
    const { canvasRef, allPlayer,setPlayer, setAllPlayer} = usePlayer()
    React.useEffect(() => {
        if(!canvasRef.current)return
        socket.emit('createPlayer', {width:window.innerWidth, height: window.innerHeight})
        socket.on('player', (infoPlayer : Player)=>{
            setPlayer(infoPlayer)
        })
        socket.on('newPlayer', (data)=>{
            setAllPlayer([...allPlayer, data])
        })
        socket.on('removePlayer', (data)=>{
            setAllPlayer([...data])
        })
    return () => {
    socket.off('player');
    socket.off('newPlayer');
    socket.off('removePlayer');
    };
    }, [socket]);

    useMove((event)=>{
        socket.emit("position",{x:event.clientX, y: event.clientY})
      
    })

    return (
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} id="canvas" ></canvas>
    );

}

export default Game;
