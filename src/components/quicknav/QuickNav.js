import React, { useContext, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { StateContext } from "../statecontext/stateContext";
import Styles from "./QuickNav.module.css";
import "react-tabs/style/react-tabs.css";

function HideAndShowDivOnClick() {
  const {
    picdatanew,
    setPicID,
    grafitiParam,
    setGrafitiParam,
    textParam,
    setTextParam,
    myImage,
    setTabIndex,
    icons, 
    setIconID,
    setClearAll,
    setClearLast
  } = useContext(StateContext);
  const [showDiv, setShowDiv] = useState(false);
  const [chips, setChips] = useState();
  const [fish, setFish] = useState()

  const availablefonts = [['Indie Flower', Styles.indieFlower], ["Kaushan Script", Styles.kaushanScript], ["Pacifico", Styles.pacifico], 
                ["VT323", Styles.vt323], ["Wallpoet", Styles.wallpoet], ["Bebas Neue", Styles.bebasNeue], ["Monoton", Styles.monoton], ["Bangers", Styles.bangers], ["Piedra", Styles.piedra], 
                ["Fredericka the Great", Styles.frederickaTheGreat], ["Homemade Apple", Styles.homemadeApple], ["Vast Shadow", Styles.vastShadow]]

  //function getInfo(e) {
    //setPicID(e.target.id);
  //}

  function IconID(e){
    setIconID(e.target.src)
  
  }


  useEffect(() => {
    if (picdatanew !== undefined) {
      setChips(
        picdatanew.map((v, i) => (
          <img
            key={i}
            id={i}
            onClick={(e)=>setPicID(e.target.id)}
            type="image"
            src={v.previewURL}
            alt="choice image"
            className={Styles.quicklistPic}
          />
        ))
      );
    }
  }, [picdatanew]);

  useEffect(()=>{
    if(icons!==undefined){
      setFish(icons.map((v, i) => (
            <img key={i} id={i} onClick={IconID} onTouchStart={IconID} type="image" src={v.previewURL} alt="choose donald" className={Styles.quicklistPic}/>
      ))) }}, [icons])




  return (
    <div className={Styles.quicklistContainer}>
      <button
        className={Styles.quicklistBtn}
        onClick={() => setShowDiv(!showDiv)}
      >
        {showDiv ? "Hide" : "Customize"}
      </button>

      <a download="meme.jpg" href={myImage}>
        <button className={Styles.downloadBtn}>Download</button>
      </a>
      <button className={Styles.downloadBtn} onClick={setClearLast(true)}>Clear Last</button>
      <button className={Styles.downloadBtn} onClick={()=>{setClearAll(true); setTimeout(()=>{setClearAll(false)}, 100)}}>Clear All</button>

      {showDiv && (
        <Tabs className={Styles.tabs} defaultIndex={0} onSelect={index=>setTabIndex(index)}>
          <TabList>
            <Tab>Donald</Tab>
            <Tab>Text</Tab>
            <Tab>Font</Tab>
            <Tab>Graffiti</Tab>
            <Tab>Icons</Tab>
          </TabList>

          <TabPanel>
            {/* <ul className="quicklist-content">{chips}</ul> */}
            <ul className={Styles.quicklistContent}>{chips}</ul>
          </TabPanel>
          <TabPanel>
            <div className={Styles.container}>
              <div className={Styles.boxes}>
                <input
                  className={Styles.inputs}
                  type="color"
                  value={textParam.textColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, textColor: e.target.value })
                  }
                />
                <label>TEXT COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={textParam.blurColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, blurColor: e.target.value })
                  }
                />
                <label>BLUR COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={textParam.threeDColor}
                  onChange={(e) =>
                    setTextParam({ ...textParam, threeDColor: e.target.value })
                  }
                />
                <label>3D COLOR</label>
              </div>

              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={textParam.fontSize}
                  onChange={(e) =>
                    setTextParam({ ...textParam, fontSize: e.target.value })
                  }
                  min="10"
                  max="50"
                />
                <label>FONT SIZE: {textParam.fontSize}px</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={textParam.blurWidth}
                  onChange={(e) =>
                    setTextParam({ ...textParam, blurWidth: e.target.value })
                  }
                  min="0"
                  max="40"
                />
                <label>BLUR WIDTH: {textParam.blurWidth}</label>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={Styles.fontContainer}>
                {availablefonts.map((ent, idq)=>
                <p key={idq} className={Styles.wrapper1}             
                    onClick={() =>setTextParam({ ...textParam, font: ent[0] })}
                    className={ent[1]}
                    >{ent[0]}
                </p>)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className={Styles.container}>
              <div className={Styles.boxes}>
                <input
                  type="color"
                  className={Styles.inputs}
                  value={grafitiParam.Color}
                  onChange={(e) =>
                    setGrafitiParam({ ...grafitiParam, Color: e.target.value })
                  }
                />
                <label>Grafiti COLOR</label>
              </div>
              <div className={Styles.boxes}>
                <input
                  type="range"
                  className={Styles.inputs}
                  value={grafitiParam.Width}
                  onChange={(e) =>
                    setGrafitiParam({ ...grafitiParam, Width: e.target.value })
                  }
                  min="1"
                  max="40"
                />
                <label>Grafiti WIDTH: {grafitiParam.Width}</label>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
              <ul className="quicklist-content">
                 {fish}    
                </ul>

          </TabPanel>
        </Tabs>
      )}
    </div>
  );
}

export default HideAndShowDivOnClick;
