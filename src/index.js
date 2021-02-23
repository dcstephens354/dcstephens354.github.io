import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import FactoryBackground from './images/Circle_Tan_Solid2.png';


const Tile = ({color, position, active, cleared, onClick, tileID}) => {
    let classes = "tile " + position;

    if(cleared){
        classes = classes + " clearedTile"
    }
    else if(active){
        classes = classes + " selectedTile"
    }

    return(
        <div id={tileID} onClick={onClick} className={classes} style={{backgroundColor: color}}></div>
    )
}

let factoryStyle = {
    width: "200px",
    height: "200px",
    backgroundImage: "url("+FactoryBackground+")",
    backgroundSize: "cover",
    position: "relative"
}

function Factory (props){

        const tiles = [1, 2, 3, 4];
        const locations = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
        let chosenTilesArray = [];
        let clearedArray = props.cleared;
        let clearedTiles = false
        let factoryID = props.id + ".";

        if(props.selected.substr(0,1) == props.id){
            let chosenTile = props.selected.substr(2,1);

            for(let i = 0; i < 4; i++){
                if(props.colorList[i] === props.colorList[chosenTile-1]){
                    chosenTilesArray.push(true);
                }
                else{
                    chosenTilesArray.push(false);
                }
            }
        }

        for(let i = 0; i < clearedArray.length; i++){
            if(clearedArray[i].substr(0,1) == props.id){
                clearedTiles = true;
            }
        }

        return(
            <div style={factoryStyle}>
                {tiles.map(t => (
                    <Tile key={t} color={props.colorList[t-1]} position={locations[t-1]} active={chosenTilesArray[t-1]} cleared={clearedTiles} onClick={props.clickHandler} tileID={factoryID + t}  />
                ))}
            </div>
        )
    //}
}


function Square (props) {

        let squareColor = "beige";
        let classes = "square";
        let squareID="0";
        let thisClick = ()=>{};
        if(props.color){
            squareColor = props.color;
        }
        if(props.id){
          squareID = props.id;
          if(props.id.indexOf("WR") > -1 && props.filledWallSpace == null){
                classes = classes + " emptyWall"  
		  }
		}
        if(props.onClick){
            thisClick = props.onClick;
		}
        if(props.centerSelected){
            classes = classes + " selectedTile"  
		}
        return (
            <div id={squareID} className={classes} onClick={thisClick} style={{backgroundColor: squareColor}} >

            </div>
        );
}

let linesStyle = {
    display: "flex",
    justifyContent: "flex-end"
}

class Lines extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.clickHandler(this.props.amount);
    }

    render() {
        const squares = [];
        let selected = false;

        if(this.props.selected == this.props.amount){
            selected = true;
        }

        let squareBGColor = "";
        for(let i = 0; i < this.props.amount; i++){
            if(this.props.contents[i] == null){
                squareBGColor = "beige";
            }
            else {
                squareBGColor = this.props.contents[i];
            }
            squares.push(<Square key={i} highlight={selected} color={squareBGColor}/>)
        }



        return (
            <div onClick={this.handleClick}  style={linesStyle}>
                {squares}
            </div>
        )
    }
}

class WallRow extends React.Component{
    render(){
        
        return(
            <div style={{display: "flex"}}>
                <Square id={this.props.id + ".1"} filledWallSpace={this.props.contents[0]} color={this.props.color1}/>
                <Square id={this.props.id + ".2"} filledWallSpace={this.props.contents[1]} color={this.props.color2}/>
                <Square id={this.props.id + ".3"} filledWallSpace={this.props.contents[2]} color={this.props.color3}/>
                <Square id={this.props.id + ".4"} filledWallSpace={this.props.contents[3]} color={this.props.color4}/>
                <Square id={this.props.id + ".5"} filledWallSpace={this.props.contents[4]} color={this.props.color5}/>
            </div>
        )
    }
}

class Wall extends React.Component{
    render(){
        return(
            <div className={"Wall"}>
                <WallRow id={"WR1"} contents={this.props.contents[0]} color1={"blue"} color2={"orange"} color3={"red"} color4={"darkgrey"} color5={"cyan"}/>
                <WallRow id={"WR2"} contents={this.props.contents[1]} color1={"cyan"} color2={"blue"} color3={"orange"} color4={"red"} color5={"darkgrey"}/>
                <WallRow id={"WR3"} contents={this.props.contents[2]} color1={"darkgrey"} color2={"cyan"} color3={"blue"} color4={"orange"} color5={"red"}/>
                <WallRow id={"WR4"} contents={this.props.contents[3]} color1={"red"} color2={"darkgrey"} color3={"cyan"} color4={"blue"} color5={"orange"}/>
                <WallRow id={"WR5"} contents={this.props.contents[4]} color1={"orange"} color2={"red"} color3={"darkgrey"} color4={"cyan"} color5={"blue"}/>
            </div>
        )
    }
}


class DroppedTilesRow extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.props.clickHandler();
    }

    render(){

        let droppedTilesColors = ["beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige"];
        for(let i = 0; i < this.props.tileColors.length; i++){
            droppedTilesColors[i] = this.props.tileColors[i];
        }

        return(
            <div className={"droppedTilesRow"} onClick={this.handleClick}>
                <div style={{display: "flex"}}>
                    <span> -1 <Square color={droppedTilesColors[0]}/></span>
                    <span> -1 <Square color={droppedTilesColors[1]}/></span>
                    <span> -2 <Square color={droppedTilesColors[2]}/></span>
                    <span> -2 <Square color={droppedTilesColors[3]}/></span>
                    <span> -2 <Square color={droppedTilesColors[4]}/></span>
                    <span> -3 <Square color={droppedTilesColors[5]}/></span>
                    <span> -3 <Square color={droppedTilesColors[6]}/></span>
                </div>
            </div>
        )
    }
}

class CenterBoard extends React.Component{
    render(){
        let centerTileColors = ["beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige", "beige"];
        let selected = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

        for(let i = 0; i < this.props.tileColors.length; i++){
            centerTileColors[i] = this.props.tileColors[i];
        }

        if(this.props.selected.substr(0,1) === "c"){
            let selectedTileColor = centerTileColors[(Number(this.props.selected.substr(1,1)) - 1)];
            for(let i = 0; i < this.props.tileColors.length; i++){
                if(this.props.tileColors[i] === selectedTileColor){
                    selected[i] = true;
				}     
			}  
		}

        return(
            <div className={"centerRow"}>
                <div style={{display: "flex"}}>
                    <Square id={'c1'} color={centerTileColors[0]} onClick={this.props.clickHandler} centerSelected={selected[0]}/>
                    <Square id={'c2'} color={centerTileColors[1]} onClick={this.props.clickHandler} centerSelected={selected[1]}/>
                    <Square id={'c3'} color={centerTileColors[2]} onClick={this.props.clickHandler} centerSelected={selected[2]}/>
                    <Square id={'c4'} color={centerTileColors[3]} onClick={this.props.clickHandler} centerSelected={selected[3]}/>
                    <Square id={'c5'} color={centerTileColors[4]} onClick={this.props.clickHandler} centerSelected={selected[4]}/>
                    <Square id={'c6'} color={centerTileColors[5]} onClick={this.props.clickHandler} centerSelected={selected[5]}/>
                    <Square id={'c7'} color={centerTileColors[6]} onClick={this.props.clickHandler} centerSelected={selected[6]}/>
                    <Square id={'c8'} color={centerTileColors[7]} onClick={this.props.clickHandler} centerSelected={selected[7]}/>
                    <Square id={'c9'} color={centerTileColors[8]} onClick={this.props.clickHandler} centerSelected={selected[8]}/>
                    <Square id={'c10'} color={centerTileColors[9]} onClick={this.props.clickHandler} centerSelected={selected[9]}/>
                    <Square id={'c11'} color={centerTileColors[10]} onClick={this.props.clickHandler} centerSelected={selected[10]}/>
                    <Square id={'c12'} color={centerTileColors[11]} onClick={this.props.clickHandler} centerSelected={selected[11]}/>
                    <Square id={'c13'} color={centerTileColors[12]} onClick={this.props.clickHandler} centerSelected={selected[12]}/>
                    <Square id={'c14'} color={centerTileColors[13]} onClick={this.props.clickHandler} centerSelected={selected[13]}/>
                    <Square id={'c15'} color={centerTileColors[14]} onClick={this.props.clickHandler} centerSelected={selected[14]}/>
                    <Square id={'c16'} color={centerTileColors[15]} onClick={this.props.clickHandler} centerSelected={selected[15]}/>
                </div>
            </div>
	    )
	}
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleRowSelect = this.handleRowSelect.bind(this);
        this.handleDroppedRowSelect = this.handleDroppedRowSelect.bind(this);

        this.state = {
            selectedTile: "0",
            selectedTileColor: null,
            tileBag: [20,20,20,20,20], //[red, blue, black, orange, cyan]
            factoryTiles: [[],[],[],[],[]],
            clearedTiles: [],
            rowContents: [[null],[null,null],[null,null,null],[null,null,null,null],[null,null,null,null,null]],
            droppedTiles: [],
            centerTiles: [],
            filledFactories: [0,1,2,3,4],
            wallContents: [[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null]],
            score: 0
        };

        let waitingForAutoma = false;

    }


    handleTileSelect = (e) => {
        if(!this.waitingForAutoma){
            this.setState({
                selectedTile : e.target.id,
                selectedTileColor : e.target.style.backgroundColor
            });
		}
    }

    


    handleRowSelect(id) {

        if(!this.waitingForAutoma && this.state.selectedTile !== "0" && (this.state.rowContents[id-1][0] == null || this.state.rowContents[id-1][0] === this.state.selectedTileColor) && (this.state.wallContents[id-1].indexOf(this.state.selectedTileColor) === -1)){
            let numberTaken = 0;
            let newFilledFactories = this.state.filledFactories;
            let newCenterTiles = [];

            if(this.state.selectedTile.substr(0,1) !== "c"){
                let clearedTilesArray = this.state.clearedTiles;
                clearedTilesArray.push(this.state.selectedTile);
                
                newFilledFactories = newFilledFactories.filter(factoryNumber => factoryNumber !== (Number(this.state.selectedTile.substr(0,1))-1));

                this.setState({
                    clearedTiles: clearedTilesArray,
                    selectedTile: "0",
                    filledFactories: newFilledFactories,
                })

                let chosenFactory = this.state.factoryTiles[(this.state.selectedTile.substr(0,1))-1];
                let unchosenTiles = [];
                for(let i = 0; i < chosenFactory.length; i++){
                    if(chosenFactory[i] === this.state.selectedTileColor){
                        numberTaken++;
                    }
                    else{
                        unchosenTiles.push(chosenFactory[i]);        
				    }
                }
                let oldCenterTiles = this.state.centerTiles;
                newCenterTiles = oldCenterTiles.concat(unchosenTiles);
                this.setState({
                    centerTiles: newCenterTiles,     
			    })

			}
            else {
                this.setState({
                    selectedTile: "0",
                })

                let chosenCenterTileColor = this.state.selectedTileColor;
                let centerContents = this.state.centerTiles;

                
                for(let i = 0; i < centerContents.length; i++){
                    if(centerContents[i] === chosenCenterTileColor){
                        numberTaken++;
                    }
                }

                newCenterTiles = centerContents.filter(tileColor => tileColor !== chosenCenterTileColor);
                this.setState({
                    centerTiles: newCenterTiles,     
			    })
			}

            
            let chosenRow = this.state.rowContents[id-1];
            let droppedTilesArray = [];
            while(numberTaken > 0){
                for(let i = 0; i < chosenRow.length; i++) {
                    if (chosenRow[i] == null) {
                        chosenRow[i] = this.state.selectedTileColor;
                        break;
                    }
                    if(i === chosenRow.length-1){
                        droppedTilesArray.push(this.state.selectedTileColor)
                        break;
                    }
                }

                numberTaken = numberTaken - 1;
            }

            let newDroppedTiles = this.state.droppedTiles.concat(droppedTilesArray);
            this.setState({
                droppedTiles: newDroppedTiles,
            })
            

            this.waitingForAutoma = true;
            setTimeout(() => {
                this.automaTurn(newFilledFactories, newCenterTiles);
            }, 2000);
        }
    }

    handleDroppedRowSelect(){
        if(!this.waitingForAutoma && this.state.selectedTile !== "0"){
            let newCenterTiles = [];
            let newFilledFactories = this.state.filledFactories;
            let numberTaken = 0;
            
            if(this.state.selectedTile.substr(0,1) !== "c"){
                newFilledFactories = newFilledFactories.filter(factoryNumber => factoryNumber !== (Number(this.state.selectedTile.substr(0,1))-1));

                let clearedTilesArray = this.state.clearedTiles;
                clearedTilesArray.push(this.state.selectedTile);
                this.setState({
                    clearedTiles: clearedTilesArray,
                    selectedTile: "0",
                    filledFactories: newFilledFactories,
                })

                let chosenFactory = this.state.factoryTiles[(this.state.selectedTile.substr(0,1))-1];
                let unchosenTiles = [];
                for(let i = 0; i < chosenFactory.length; i++){
                    if(chosenFactory[i] === this.state.selectedTileColor){
                        numberTaken++;
                    }
                    else {
                        unchosenTiles.push(chosenFactory[i]);     
				    }
                }

                
                let oldCenterTiles = this.state.centerTiles;
                newCenterTiles = oldCenterTiles.concat(unchosenTiles);
                this.setState({
                    centerTiles: newCenterTiles,   
                })  
            }
            else {
                this.setState({
                    selectedTile: "0",
                })

                let chosenCenterTileColor = this.state.selectedTileColor;
                let centerContents = this.state.centerTiles;

                
                for(let i = 0; i < centerContents.length; i++){
                    if(centerContents[i] === chosenCenterTileColor){
                        numberTaken++;
                    }
                }

                newCenterTiles = centerContents.filter(tileColor => tileColor !== chosenCenterTileColor);
                this.setState({
                    centerTiles: newCenterTiles,     
			    })
			}

            let droppedTilesArray = [];

            for(let i = 0; i < numberTaken; i++){
                droppedTilesArray.push(this.state.selectedTileColor)
			}

            let newDroppedTiles = this.state.droppedTiles.concat(droppedTilesArray);
            this.setState({
                droppedTiles: newDroppedTiles,
            })  
            
            this.waitingForAutoma = true;
            setTimeout(() => {
                this.automaTurn(newFilledFactories, newCenterTiles);
			}, 2000);
	    }
	}
    
    automaTurn(filledFactories, oldCenterTiles){
       let colors = ["blue", "orange", "red", "darkgrey", "cyan"];
       let largestFactorySet = 0;
       let largestCenterSet = 0;
       let largestSetFactoryIndex = 0;
       let largestSetColorIndex = "";
       let currentFactory = [];
       let colorsCount = [0,0,0,0,0];
       let tempMax = 0;
       let newCenterTiles = [];
       let newFilledFactories = [];
       for(let i = 0; i < filledFactories.length; i++){            
            currentFactory = this.state.factoryTiles[filledFactories[i]];

            for(let j = 0; j < currentFactory.length; j++){
                colorsCount[colors.indexOf(currentFactory[j])]++;
            }
            
            tempMax = Math.max.apply(null, colorsCount);
            if(tempMax > largestFactorySet){
                largestFactorySet = tempMax;
                largestSetFactoryIndex = i;
                largestSetColorIndex = colorsCount.indexOf(tempMax);
		    }
            colorsCount = [0,0,0,0,0];
	   }

       
       for(let i = 0; i < oldCenterTiles.length; i++){
            colorsCount[colors.indexOf(oldCenterTiles[i])]++;
       }
       largestCenterSet = Math.max.apply(null, colorsCount);

       if(largestFactorySet > 1){
           let automaSelectedFactory = Number(filledFactories[largestSetFactoryIndex])+1;
           let automaSelectedTile = Number(this.state.factoryTiles[(automaSelectedFactory-1)].indexOf(colors[largestSetColorIndex]))+1;
           let automaSelection = automaSelectedFactory + "." + automaSelectedTile;
       
            let clearedTilesArray, oldClearedTilesArray;
           clearedTilesArray = oldClearedTilesArray = this.state.clearedTiles;
           clearedTilesArray.push(automaSelection);
                
           newFilledFactories = filledFactories.filter(factoryNumber => factoryNumber !== (Number(automaSelection.substr(0,1))-1));

           this.setState({
               clearedTiles: clearedTilesArray,
               filledFactories: newFilledFactories,
           })

       
           let chosenFactory = this.state.factoryTiles[(automaSelection.substr(0,1))-1];
           let unchosenTiles = [];
           for(let i = 0; i < chosenFactory.length; i++){
                if(chosenFactory[i] !== colors[largestSetColorIndex]){
                    unchosenTiles.push(chosenFactory[i]);       
                }
           }
           newCenterTiles = oldCenterTiles.concat(unchosenTiles);

           this.setState({
                centerTiles: newCenterTiles,     
	       })
	   }
       else if(largestFactorySet === 1 && largestCenterSet < 2){
           let automaSelectedFactory = Number(filledFactories[0])+1;
           let automaSelectedTile =  Math.floor(Math.random()*Math.floor(4))+1;
           let automaSelection = automaSelectedFactory + "." + automaSelectedTile;
           
           let clearedTilesArray = this.state.clearedTiles;
           clearedTilesArray.push(automaSelection);

           newFilledFactories = filledFactories.filter(factoryNumber => factoryNumber !== (Number(automaSelection.substr(0,1))-1));

           this.setState({
               clearedTiles: clearedTilesArray,
               filledFactories: newFilledFactories,
           })

           
           let chosenFactory = this.state.factoryTiles[(automaSelection.substr(0,1))-1];
           let unchosenTiles = [];
           for(let i = 0; i < chosenFactory.length; i++){
                if(i !== (automaSelectedTile-1)){
                    unchosenTiles.push(chosenFactory[i]);       
                }
           }
           newCenterTiles = oldCenterTiles.concat(unchosenTiles);    
           
           this.setState({
                centerTiles: newCenterTiles,     
	       })
	   }
       else if((largestFactorySet === 1 && largestCenterSet !== 1) || (largestFactorySet === 0 && largestCenterSet > 0)){
            largestSetColorIndex = colorsCount.indexOf(largestCenterSet);
            let largestCenterSetColor = colors[largestSetColorIndex];
            
            newFilledFactories = filledFactories;
            newCenterTiles = oldCenterTiles.filter(tileColor => tileColor !== largestCenterSetColor);

            this.setState({
                 centerTiles: newCenterTiles,     
	        })
	   }
     
       
       if(newCenterTiles.length === 0 && newFilledFactories.length === 0){
           //Score, set up next round
           let playerRows = this.state.rowContents;
           let wallRows = this.state.wallContents;

           for(let i = 0; i < playerRows.length; i++){
               if(playerRows[i].indexOf(null) === -1){
                    let rowColor = playerRows[i][0];
                    let colorIndex = (colors.indexOf(rowColor)+i)%5;
                    wallRows[i][colorIndex] = rowColor;

                    let didHorizontalScoring = 0;
                    let didVerticalScoring = 0;

                    if(colorIndex-1 > -1){
                        if(wallRows[i][colorIndex-1] != null){
                            this.checkHorzontalScoring(colorIndex-1, -1, i);
                            didHorizontalScoring = 1;
                        }
					}

                    if(colorIndex+1 < 4){
                        if(wallRows[i][colorIndex+1] != null){
                            this.checkHorzontalScoring(colorIndex+1, 1, i);
                            didHorizontalScoring = 1;
						}
					}

                    if(i-1 > -1){
                        if(wallRows[i-1][colorIndex] != null){
                            this.checkVerticalScoring(i-1, -1, colorIndex);
                            didVerticalScoring = 1;
					    }
					}

                    if(i+1 < 4){
                        if(wallRows[i+1][colorIndex] != null){
                            this.checkVerticalScoring(i+1, 1, colorIndex);
                            didVerticalScoring = 1;
						}
					}

                    if(didHorizontalScoring === 0 && didVerticalScoring === 0){
                        this.setState((prevState) => {
                            return {
                                score: prevState.score + 1     
			                };
		                });
					}
                    else {
                        this.setState((prevState) => {
                            return {
                                score: prevState.score + didHorizontalScoring + didVerticalScoring     
			                };
		                });
					}



                    for(let j = 0; j <= i; j++){
                        playerRows[i][j] = null;           
					}
		        }     
		   }



            this.setState((prevState) => {       
                let droppedTilesScore = 0;
                   switch(prevState.droppedTiles.length){
                        case 1:
                            droppedTilesScore = -1;
                            break;
                        case 2:
                            droppedTilesScore = -2;
                            break;
                        case 3:
                            droppedTilesScore = -4;
                            break;
                        case 4:
                            droppedTilesScore = -6;
                            break;
                        case 5:
                            droppedTilesScore = -8;
                            break;
                        case 6:
                            droppedTilesScore = -11;
                            break;
                        case 7:
                            droppedTilesScore = -14;
                            break;
                        default:
                            break;
		           }
                let newScore = prevState.score + droppedTilesScore;
                this.checkEndgame(newScore);
                return {
                    score: newScore    
			    };
		    });
            


           this.setState({
                selectedTile: "0",
                selectedTileColor: null,
                clearedTiles: [],
                rowContents: playerRows,
                droppedTiles: [],
                filledFactories: [0,1,2,3,4],
                wallContents: wallRows,
           })

	   }

       this.waitingForAutoma = false;
       
	}

    checkEndgame(score){
        let currentTileBag = this.state.tileBag;
        if(currentTileBag[0] + currentTileBag[1] + currentTileBag[2] + currentTileBag[3] + currentTileBag[4] !== 0){
            this.drawNewRoundTiles();
		}
        else {
            alert("Game over, you scored " + score + " points!");

            this.setState({
                selectedTile: "0",
                selectedTileColor: null,
                tileBag: [20,20,20,20,20], //[red, blue, black, orange, cyan]
                factoryTiles: [[],[],[],[],[]],
                clearedTiles: [],
                rowContents: [[null],[null,null],[null,null,null],[null,null,null,null],[null,null,null,null,null]],
                droppedTiles: [],
                centerTiles: [],
                filledFactories: [0,1,2,3,4],
                wallContents: [[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null],[null, null, null, null, null]],
                score: 0
            }, () => {
                this.drawNewRoundTiles();
            });

		}
	}

    checkHorzontalScoring(index, direction, row){
        if(index+direction > -1 && index+direction < 5){
            if(this.state.wallContents[row][index+direction] != null){
                this.checkHorzontalScoring(index+direction, direction, row);
			}
		}

        this.setState((prevState) => {
            return {
                score: prevState.score + 1     
			};
		});
	}

    checkVerticalScoring(index, direction, column){
        if(index+direction > -1 && index+direction < 5){
            if(this.state.wallContents[index+direction][column] != null){
                this.checkVerticalScoring(index+direction, direction, column);
			}
		}

        this.setState((prevState) => {
            return {
                score: prevState.score + 1     
			};
		});
	}

    drawTile(){
        const tileColors = ["red", "blue", "darkgrey", "orange", "cyan"];
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let currentTileBag = this.state.tileBag;
        let maxRoll = currentTileBag.reduce(reducer);
        let chosenTile = Math.floor(Math.random() * Math.floor(maxRoll));


        if(chosenTile < currentTileBag[0]){
            currentTileBag[0] = currentTileBag[0] - 1;

            this.setState({
                tileBag: currentTileBag
            })
            return tileColors[0];
		}
        else if(chosenTile < [currentTileBag[0], currentTileBag[1]].reduce(reducer)){
            currentTileBag[1] = currentTileBag[1] - 1;

            this.setState({
                tileBag: currentTileBag
            })
            return tileColors[1];
		}
        else if(chosenTile < [currentTileBag[0], currentTileBag[1], currentTileBag[2]].reduce(reducer)){
            currentTileBag[2] = currentTileBag[2] - 1;

            this.setState({
                tileBag: currentTileBag
            })
            return tileColors[2];
		}
        else if(chosenTile < [currentTileBag[0], currentTileBag[1], currentTileBag[2], currentTileBag[3]].reduce(reducer)){
            currentTileBag[3] = currentTileBag[3] - 1;

            this.setState({
                tileBag: currentTileBag
            })
            return tileColors[3];
		}
        else if(chosenTile < [currentTileBag[0], currentTileBag[1], currentTileBag[2], currentTileBag[3], currentTileBag[4]].reduce(reducer)){
            currentTileBag[4] = currentTileBag[4] - 1;

            this.setState({
                tileBag: currentTileBag
            })
            return tileColors[4];
		}

    }

    drawNewRoundTiles(){
        let allFactories = [[],[],[],[],[]];
        for(let i = 0; i < 5; i++){
            for(let j = 0; j < 4; j++){
                allFactories[i].push(this.drawTile());
            }
        }

        this.setState({
            factoryTiles: allFactories,
        })
    }

    componentDidMount(){
        this.drawNewRoundTiles();
    }

    render() {

        return (
            <div className="game">

                <div className="factories">
                    <Factory id={1}  colorList ={this.state.factoryTiles[0]} clickHandler = {this.handleTileSelect} selected={this.state.selectedTile} cleared={this.state.clearedTiles}/>
                    <Factory id={2}  colorList ={this.state.factoryTiles[1]} clickHandler = {this.handleTileSelect} selected={this.state.selectedTile} cleared={this.state.clearedTiles}/>
                    <Factory id={3}  colorList ={this.state.factoryTiles[2]} clickHandler = {this.handleTileSelect} selected={this.state.selectedTile} cleared={this.state.clearedTiles}/>
                    <Factory id={4}  colorList ={this.state.factoryTiles[3]} clickHandler = {this.handleTileSelect} selected={this.state.selectedTile} cleared={this.state.clearedTiles}/>
                    <Factory id={5}  colorList ={this.state.factoryTiles[4]} clickHandler = {this.handleTileSelect} selected={this.state.selectedTile} cleared={this.state.clearedTiles}/>
                </div>

                <CenterBoard selected={this.state.selectedTile} tileColors={this.state.centerTiles} clickHandler={this.handleTileSelect}/>

                <section className="playerBoard">
                    <div className="playerLines">
                        <Lines clickHandler={this.handleRowSelect} amount={1} contents={this.state.rowContents[0]}/>
                        <Lines clickHandler={this.handleRowSelect} amount={2} contents={this.state.rowContents[1]}/>
                        <Lines clickHandler={this.handleRowSelect} amount={3} contents={this.state.rowContents[2]}/>
                        <Lines clickHandler={this.handleRowSelect} amount={4} contents={this.state.rowContents[3]}/>
                        <Lines clickHandler={this.handleRowSelect} amount={5} contents={this.state.rowContents[4]}/>
                    </div>


                    <Wall contents={this.state.wallContents}/>

                    <DroppedTilesRow clickHandler={this.handleDroppedRowSelect} tileColors={this.state.droppedTiles}/>
                </section>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


serviceWorker.unregister();
