import React from 'react';
import useMove from '../hooks/useMove';
import usePlayer from '../hooks/usePlayer';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001'); 

const Game = () => {
    const { canvasRef, setTargetOffset, targetOffset,allPlayerRef, playerRef, setAllPlayer, setMousePosition} = usePlayer()
    React.useEffect(() => {
        if(!canvasRef.current)return
        socket.emit('createPlayer', {width: canvasRef.current.width, height: canvasRef.current?.height})
        socket.on('player', (infoPlayer : Player)=>{
            playerRef.current = infoPlayer
        })
        socket.on('newPlayer', (data)=>{
            allPlayerRef.current = data
        })
        // socket.emit('point')
    return () => {
    socket.off('player');
};
}, [socket, canvasRef.current]);
    // function updateOffset(mouseX : number, mouseY: number) {
    //     if( !canvasRef.current) return
    //     const speed = 0.1; 
    //     const targetPositionX = (mouseX - canvasRef.current.width / 2) * speed;
    //     const targetPositionY = (mouseY - canvasRef.current.height / 2) * speed;
    //     const newTargetOffset = {x: -targetPositionX, y: -targetPositionY}
    //     console.log("target",newTargetOffset);

    //     setTargetOffset(newTargetOffset)
    // }
    useMove((event)=>{
        if(!canvasRef.current) return
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        setMousePosition({x:mouseX, y:mouseY})
        // updateOffset(mouseX, mouseY);
    })

    return (
            <canvas ref={canvasRef} id="canvas" ></canvas>
    );

}

export default Game;
