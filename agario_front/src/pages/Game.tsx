import React from 'react';
import useMove from '../hooks/useMove';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001'); 

const Game = () => {
    const [player, setPlayer] = React.useState<Player>({} as Player)
    const [allPlayer, setAllPlayer] =  React.useState<Player[]>([])
    
    React.useEffect(() => {
        socket.emit('createPlayer', {width:window.innerWidth, height: window.innerHeight})
        socket.on('player', (infoPlayer : Player)=>{
            setPlayer(infoPlayer)
        })
        socket.on('newPlayer', (data)=>{
            setAllPlayer([...data])
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



    useMove((e)=>{
        socket.emit('position', {x: e.clientX, y: e.clientY})
    })

      
    React.useEffect(()=>{
       const newChild =  allPlayer.map((player )=>createPlayers(player))
       document.getElementById("agario-map")?.replaceChildren(...newChild)
    },[allPlayer])
    const createPlayers = (playerInfo : Player)=>{
        const divPlayer = document.createElement('div')
        divPlayer.style.width = `${playerInfo.point * 30}px`
        divPlayer.style.height = `${playerInfo.point * 30}px`
        divPlayer.style.borderRadius = `20px`
        divPlayer.style.backgroundColor = playerInfo.color
        divPlayer.style.position = "absolute"
        divPlayer.style.top = `${playerInfo.y}px`
        divPlayer.style.left = `${playerInfo.x}px`
        divPlayer.id = playerInfo.id
        return divPlayer
    }
 
    
    return (
        <div id='agario' className='h-screen relative'>
            <div id='agario-map' className='w-full h-full overflow-hidden bg-lime-100'></div>
        </div>
    );
}

export default Game;
