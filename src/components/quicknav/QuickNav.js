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
    setIconID
  } = useContext(StateContext);
  const [showDiv, setShowDiv] = useState(false);
  const [chips, setChips] = useState();
  const [fish, setFish] = useState()

  function getInfo(e) {
    setPicID(e.target.id);
  }

  function IconID(e){
    setIconID(e.target.id)
  
  }


  useEffect(() => {
    if (picdatanew !== undefined) {
      setChips(
        picdatanew.map((v, i) => (
          <img
            key={i}
            id={i}
            onClick={getInfo}
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
      <button className={Styles.downloadBtn}>Clear Last</button>
      <button className={Styles.downloadBtn}>Clear All</button>

      {showDiv && (
        <Tabs className={Styles.tabs} defaultIndex={0} onSelect={index=>setTabIndex(index)}>
          <TabList>
            <Tab>Donald</Tab>
            <Tab>Text</Tab>
            <Tab>Font</Tab>
            <Tab>Graffiti</Tab>
            <Tab >Icons</Tab>
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
              <div className={Styles.wrapper1}>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Indie Flower" })
                  }
                  className={Styles.indieFlower}
                >
                  Indie Flower
                </p>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Kaushan Script" })
                  }
                  className={Styles.kaushanScript}
                >
                  Kaushan Script
                </p>
                <p
                  className={Styles.psize}
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Pacifico" })
                  }
                  className={Styles.pacifico}
                >
                  Pacifico
                </p>
              </div>

              <div className={Styles.wrapper2}>
                <p
                  onClick={() => setTextParam({ ...textParam, font: "VT323" })}
                  className={Styles.vt323}
                >
                  VT323
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Wallpoet" })
                  }
                  className={Styles.wallpoet}
                >
                  Wallpoet
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Bebas Neue" })
                  }
                  className={Styles.bebasNeue}
                >
                  Bebas Neue
                </p>
              </div>
              <div className={Styles.wrapper3}>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Monoton" })
                  }
                  className={Styles.monoton}
                >
                  Monoton
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Bangers" })
                  }
                  className={Styles.bangers}
                >
                  Bangers
                </p>
                <p
                  onClick={() => setTextParam({ ...textParam, font: "Piedra" })}
                  className={Styles.piedra}
                >
                  Piedra
                </p>
              </div>
              <div className={Styles.wrapper4}>
                <p
                  onClick={() =>
                    setTextParam({
                      ...textParam,
                      font: "Fredericka the Great",
                    })
                  }
                  className={Styles.frederickaTheGreat}
                >
                  Fredericka the Great
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Homemade Apple" })
                  }
                  className={Styles.homemadeApple}
                >
                  Homemade Apple
                </p>
                <p
                  onClick={() =>
                    setTextParam({ ...textParam, font: "Vast Shadow" })
                  }
                  className={Styles.vastShadow}
                >
                  {" "}
                  Vast Shadow
                </p>
              </div>
              {/* </ul> */}
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
