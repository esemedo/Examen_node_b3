import React from 'react';

const usePlayer = () => {
    const [offset, setOffset] = React.useState<OffsetObject>({ x: 1, y: 1 })
    // const [player, setPlayer] = React.useState<Player>({} as Player)
    const [allPlayer, setAllPlayer] =  React.useState<AllPlayer[]>([])
    const [mousePosition, setMousePosition] =  React.useState<OffsetObject>({x:0, y:0})
    const [targetOffset, setTargetOffset] = React.useState<OffsetObject>({ x: 0, y: 0 })
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const backgroundRef = React.useRef<OffsetObject>({x:0, y:0})
    const playerRef = React.useRef<Player>({} as Player)
    const allPlayerRef = React.useRef<AllPlayer[]>([])
    const radiusPlayer = 10
    const speed = 0.1; 
React.useEffect(()=>{
        if( !canvasRef.current) return 
        canvasRef.current.width = window.innerWidth ;
            canvasRef.current.height = window.innerHeight;
}, [])
    React.useEffect(()=>{
        if(Object.keys(playerRef.current).length ==0) return
        const OGOffsetX = playerRef.current.x/2
        const OGOffsetY = playerRef.current.y/2
        // const ogCoordBackground = calculateNewCoordAndOffset(OGOffsetX, OGOffsetY)
        // backgroundRef.current = ogCoordBackground
        setOffset({x:OGOffsetX, y:OGOffsetY})
        draw();
    }, [playerRef.current])
    const draw = () => {
        const canvas = canvasRef.current;
        if(!canvas) return
        const ctx = canvas.getContext('2d');
        if(!ctx) return

        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight;

        let playerLocale = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: radiusPlayer };
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        ctx.translate(offset.x, offset.y);
        ctx.fillStyle = "#d9d971"
        ctx.fillRect(backgroundRef.current.x, backgroundRef.current.y, canvas.width, canvas.height);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(playerLocale.x, playerLocale.y, playerLocale.radius, 0, Math.PI * 2);
        ctx.fillStyle = playerRef.current.color;
        ctx.fill();
        ctx.closePath();
    };
    const calculateNewCoordAndOffset =(newOffsetX : number, newOffsetY: number)=>{
        if( !canvasRef.current) return backgroundRef.current
        
        const newCoordBackgroundX =  backgroundRef.current.x + newOffsetX 
        const limitRightX = -(canvasRef.current.width /2) +radiusPlayer
        const limitLeftX = canvasRef.current.width /2 -radiusPlayer
        const newCoordBackgroundY =  backgroundRef.current.y + newOffsetY 
        const limitRightY = -(canvasRef.current.height /2) +radiusPlayer
        const limitLeftY = canvasRef.current.height /2 -radiusPlayer
        console.log('limit', limitRightX, limitLeftX, limitRightY, limitLeftY);
        console.log("old back", backgroundRef.current);
        
        const newCoordBackground = {
            x: newCoordBackgroundX < limitRightX ? limitRightX :  newCoordBackgroundX > limitLeftX ? limitLeftX: newCoordBackgroundX,
            y:  newCoordBackgroundY < limitRightY ? limitRightY :   newCoordBackgroundY > limitLeftY ? limitLeftY: newCoordBackgroundY,
        }
        console.log("new back", newCoordBackground);
        console.log("animate ", newOffsetX, newOffsetY);
        return newCoordBackground
    }
      const animate = () => {
        if( !canvasRef.current) return
        const targetPositionX = (mousePosition.x - canvasRef.current.width / 2)   * speed;
        const targetPositionY = (mousePosition.y - canvasRef.current.height / 2)  * speed
        const newTargetOffset = {x: -targetPositionX, y: -targetPositionY}
        // console.log("target",newTargetOffset);
        // console.log("og", offset.x, offset.y);

        const newOffsetX = offset.x +(newTargetOffset.x -offset.x)  * speed;
        const newOffsetY = offset.y+ (newTargetOffset.y -offset.y)  * speed;
        const newCoordBackground = calculateNewCoordAndOffset(newOffsetX, newOffsetY)
        backgroundRef.current = newCoordBackground
        const newOffset = {
            x:newOffsetX,
            y:newOffsetY,
          };
        setOffset(newOffset);
        draw();
        
        };
      React.useEffect(()=>{
        animate()
        }, [mousePosition])
        // React.useEffect(()=>{
        //     allPlayerRef.current.map((player )=>drawEnnemy(player.info))

        // }, [allPlayerRef.current, animate])
      const drawEnnemy = (playerInfo : Player) => {
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
 

      return {canvasRef, offset,allPlayerRef, targetOffset, setTargetOffset,allPlayer, setAllPlayer, setMousePosition, mousePosition, playerRef}
}

export default usePlayer;

