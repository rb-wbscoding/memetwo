import React, { useRef, useEffect, useState, useContext } from "react";
import Styles from "./Canvas.module.css";
import { StateContext } from "../statecontext/stateContext";

export default function Canvas() {
  const {
    picdatanew,
    quotenew,
    picID,
    grafitiParam,
    textParam,
    textInput,
    setTextInput,
    pers,
    setPers,
    randomQuoteName,
    setMyImage,
    icons, 
    iconID,
    tabIndex,
    setClearAll,
    clearAll,
    setClearLast,
    clearLast
  } = useContext(StateContext);
  const contextRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvassize, setCanvasSize] = useState({ width: 800, height: 800 });

  const [picturedata, setPicturedata] = useState();
  const [lined, setLined] = useState([]);
  const [wholedata, setWholedata] = useState([]);
  const [startpos, setStartpos] = useState([]);
  const [singleQ, setSingleQ] = useState("");
  const [mouseTouch, setMouseTouch] = useState(true);
  const [imgIcon, setImgIcon] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    contextRef.current.font = "bold 20px Roman";
  }, []);

  //show the selected picture
  useEffect(() => {
    const img = new Image();
    if (picdatanew.length !== 0) {
      img.setAttribute("crossorigin", "anonymous");
      img.src = picdatanew[picID].webformatURL;
      setCanvasSize({
        width: picdatanew[picID].webformatWidth,
        height: picdatanew[picID].webformatHeight,
      });
      setPicturedata(img);
      setWholedata([]);

      img.addEventListener('load', () => {
         contextRef.current.drawImage(
          img,
          0,
          0,
          picdatanew[picID].webformatWidth,
          picdatanew[picID].webformatHeight
        );
        var image = canvasRef.current.toDataURL("image/jpg");
        setMyImage(image);  
      });
    }
   
    //setClearAll(false)
  }, [picID, picdatanew]);
   //console.log(clearAll)

  // draw, set a starting point and an end point
  // need to creat data structure for icons just like drawing
  const startDrawing = ({ nativeEvent }) => {
    
    if (tabIndex===3){
      
    contextRef.current.strokeStyle = grafitiParam.Color;
    contextRef.current.lineWidth = grafitiParam.Width;
    contextRef.current.shadowBlur = 0;
    contextRef.current.lineCap = "round";
    contextRef.current.beginPath();
    const LineColor = grafitiParam.Color;
    const LineWidth = grafitiParam.Width;
    setIsDrawing(true);
    setStartpos([]);
    setLined([]);

      if (mouseTouch) {
      
        const { offsetX, offsetY } = nativeEvent;
        const xy = [offsetX, offsetY, LineColor, LineWidth];
          contextRef.current.moveTo(xy[0], xy[1]);
      setStartpos((previous) => [...previous, xy]);
      } else {
      
        const nn = nativeEvent.targetTouches[0];
        const xy = [
          nn.pageX - nn.target.offsetLeft,
          nn.pageY - nn.target.offsetTop,
          LineColor,
          LineWidth,
        ];
        contextRef.current.moveTo(xy[0], xy[1]);
        setStartpos((previous) => [...previous, xy]);
    }} else if(tabIndex===0||tabIndex===1||tabIndex===2) {}
    else {
      
      const imgicon = new Image(); // Create new img element
      setIsDrawing(true);
      if(picdatanew.length !==0){
      //console.log("bat"+tabIndex)
      console.log(iconID)
      imgicon.crossOrigin="anonymous";
      //imgicon.setAttribute("crossorigin", "anonymous");
      imgicon.src = iconID;
     
       
      setImgIcon(imgicon)
      imgicon.addEventListener('load', () => {    
        contextRef.current.drawImage(imgicon, nativeEvent.offsetX-40, nativeEvent.offsetY-40, 80, 80);
    });
    

    }}
  };

  // folow the cursor and draw
  let zz=0
  const draw = ({ nativeEvent }) => {
    //console.log("tab"+tabIndex)
    if (!isDrawing) {
      //console.log("234")
      return;
    }
    var z = 1
    if (window.innerWidth<canvassize.Width){
      z=canvassize.Width/window.innerWidth
    }else(z=1)

    if (tabIndex===3){
     
    if (mouseTouch) {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      const fishX = { offsetX, offsetY };
      setLined((gp) => [...gp, fishX]);
    } else {
      const offsetX =
        nativeEvent.targetTouches[0].pageX -
        nativeEvent.targetTouches[0].target.offsetLeft;
      const offsetY =
        nativeEvent.targetTouches[0].pageY -
        nativeEvent.targetTouches[0].target.offsetTop;
      contextRef.current.lineTo(z*offsetX, z*offsetY);
      const fishX = { offsetX, offsetY };
      setLined((gp) => [...gp, fishX]);
    }
    contextRef.current.stroke();}
    else if(tabIndex===0||tabIndex===1||tabIndex===2) {}
    else {
      zz=zz+1
      const { offsetX, offsetY } = nativeEvent;
      //console.log("123")
      if(zz%5===0){
      drawforrandom();
      contextRef.current.drawImage(imgIcon, nativeEvent.offsetX-40, nativeEvent.offsetY-40, 80, 80);
      }
    }
  };

  //finish the drawing process and construct the data Array
  const finishDrawing = () => {
    const newStartStop = { movT: startpos, lineT: lined };
    setWholedata((ln) => [...ln, newStartStop]);
    setIsDrawing(false);
    var image = canvasRef.current.toDataURL("image/jpg");
    setMyImage(image);
  };

  //function generater(){
  useEffect(() => {
    if (textInput.toptext.length !== 0 || textInput.bottomtext.length !== 0) {
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
      const longtop = Math.floor(
        contextRef.current.measureText(textInput.toptext).width
      );
      const starttop = canvassize.width / 2 - longtop / 2;
      const longbottom = Math.floor(
        contextRef.current.measureText(textInput.bottomtext).width
      );
      const startbottom = canvassize.width / 2 - longbottom / 2;

      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(picturedata, 0, 0);

      if(clearAll===false){
      drawagainline();

      

      contextRef.current.shadowColor = textParam.blurColor;
      contextRef.current.shadowBlur = textParam.blurWidth;
      contextRef.current.fillStyle = "black";
      fillTexts(textInput.toptext, starttop + 6, 50 + 6);

      fillTexts(textInput.bottomtext, startbottom + 6, canvassize.height - 44);

      contextRef.current.fillStyle = textParam.threeDColor;
      fillTexts(textInput.toptext, starttop + 4, 50 + 4);

      fillTexts(textInput.toptext, starttop + 2, 50 + 2);

      fillTexts(textInput.bottomtext, startbottom + 4, canvassize.height - 46);

      fillTexts(textInput.bottomtext, startbottom + 2, canvassize.height - 48);

      contextRef.current.fillStyle = textParam.textColor;
      fillTexts(textInput.toptext, starttop, 50);

      fillTexts(textInput.bottomtext, startbottom, canvassize.height - 50)
    }
    else if(clearAll===true){
      setWholedata([]);
      setStartpos([]);
      setLined([]);
      setTextInput({ toptext: "", bottomtext: "" })
    }
  }
    var image = canvasRef.current.toDataURL("image/jpg");
    setMyImage(image);
  }, [textInput, textParam, clearAll]);

  function fillTexts(e, f, g){
    contextRef.current.fillText(e,f,g,canvassize.width - 30);
  }

  //generate the random text
  useEffect(() => {
    if (quotenew.length !== 0) {
      retry();
    }

    function retry() {
      const lengt = quotenew.messages.personalized.length;
      const randomnum = Math.floor(Math.random() * lengt - 1);
      const singleq = quotenew.messages.personalized[randomnum];

      contextRef.current.font = "bold 50px " + textParam.font;
      const message = randomQuoteName + " " + singleq;
      const long = Math.floor(contextRef.current.measureText(message).width);
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;

      if (long < canvassize.width) {
        setSingleQ(singleq);
        drawforrandom(singleq);
        //setPers(false)
        setTextInput({ toptext: "", bottomtext: "" });
      } else {
        retry();
      }
    }
  }, [pers]);

  // allow text modification of the random quote
  useEffect(() => {
    if (textInput.toptext.length === 0 && textInput.bottomtext.length === 0) {
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
      drawforrandom(singleQ);
    }
  }, [textInput, textParam]);

  // put the generated text on the canvas
  function drawforrandom(singleq) {
    console.log(singleQ)
    if (picturedata !== undefined || singleQ !== "") {
      contextRef.current.font =
        "bold " + textParam.fontSize + "px " + textParam.font;
      const message = randomQuoteName + " " + singleq;
      const long = Math.floor(contextRef.current.measureText(message).width);
      const start = canvassize.width / 2 - long / 2;
      const starth = 50;
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(picturedata, 0, 0);

      drawagainline();
    
      contextRef.current.shadowColor = textParam.blurColor;
      contextRef.current.shadowBlur = textParam.blurWidth;
      contextRef.current.fillStyle = "black";
      fillTexts(
        randomQuoteName + " " + singleq,
        start + 6,
        starth + 6);

      contextRef.current.fillStyle = textParam.threeDColor;
      fillTexts(
        randomQuoteName + " " + singleq,
        start + 4,
        starth + 4);

      fillTexts(
        randomQuoteName + " " + singleq,
        start + 2,
        starth + 2);

      contextRef.current.fillStyle = textParam.textColor;
      fillTexts(
        randomQuoteName + " " + singleq,
        start,
        starth);

      var image = canvasRef.current.toDataURL("image/jpg");
      setMyImage(image);
    }
  }

  function drawagainline() {
    contextRef.current.shadowBlur = 0;
    contextRef.current.lineWidth = 10;
    if (wholedata.length !== 0) {
      var z;
      for (z = 0; z < wholedata.length; z++) {
        contextRef.current.lineWidth = wholedata[z].movT[0][3];
        contextRef.current.strokeStyle = wholedata[z].movT[0][2];
        contextRef.current.lineCap = "round";

        contextRef.current.beginPath();

        var i;
        contextRef.current.moveTo(
          wholedata[z].movT[0][0],
          wholedata[z].movT[0][1]
        );

        for (i = 0; i < wholedata[z].lineT.length; i++) {
          contextRef.current.lineTo(
            wholedata[z].lineT[i].offsetX,
            wholedata[z].lineT[i].offsetY
          );
        }
        contextRef.current.stroke();
      }
    }
  }

  //Mouse or touch control
  function mouseTT(e, zz, nn){
      nn?startDrawing(e):finishDrawing(e)
      //if(nn){      
        //startDrawing(e)}
      //else{finishDrawing(e)};
      document.getElementsByTagName("body")[0].style = "overflow: visible";
      setMouseTouch(zz);
  }

  return (
    <div className={Styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        onMouseDown={(e)=>mouseTT(e, true, true)}
        onMouseUp={(e)=>mouseTT(e, true, false)}
        onMouseMove={(e) => {
          draw(e);
          setMouseTouch(true);
        }}
        onTouchStart={(e)=>mouseTT(e, false, true)}
        onTouchEnd={(e)=>mouseTT(e, false, false) }
        onTouchMove={(e) => {
          draw(e);
          setMouseTouch(false);
        }}
        width={canvassize.width}
        height={canvassize.height}
        className={Styles.canvas}
      ></canvas>
    </div>
  );
}
