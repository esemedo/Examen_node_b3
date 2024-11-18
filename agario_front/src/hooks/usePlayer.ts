import React from 'react';

const usePlayer = () => {
    const [player, setPlayer] = React.useState<Player>({} as Player)
    const [allPlayer, setAllPlayer] =  React.useState<Player[]>([])
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    React.useEffect(()=>{
        draw()
    },[canvasRef.current])
    
    const draw = () => {
        const canvas = canvasRef.current;
        if(!canvas) return
        const ctx = canvas.getContext('2d');
        if(!ctx) return

        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.fillStyle = "#d9d971"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

    };
    React.useEffect(()=>{
        allPlayer.map((player )=>requestAnimationFrame(()=>drawPlayers(player)))
    }, [allPlayer])
    
      const drawPlayers = (playerInfo : Player) => {
        const canvas = canvasRef.current;
        if(!canvas) return
        const ctx = canvas.getContext('2d');
        if(!ctx) return
        ctx.beginPath();
        ctx.arc(playerInfo.x, playerInfo.y, playerInfo.point*10, 0, Math.PI * 2);
        ctx.fillStyle = playerInfo.color;
        ctx.fill();
        ctx.closePath();
      };
 

      return {canvasRef, drawPlayers, player, setAllPlayer,setPlayer,allPlayer}
}

export default usePlayer;

