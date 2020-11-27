import React from 'react'
import './MovieTable.css'

function build (myprops) { 
    console.log("run buildtable");
    let tableTitles = buildHeaderTables(myprops.columnsName);
    /*if (tableTitles != null){
        buildTables(myprops.search, tableTitles);
    }*/
}


function buildTables(jsonObject, table) {
    for (let currentObject of jsonObject) {
        let trn = document.createElement("tr");
        table.append(trn);
        for (let currentProperty in currentObject) {
            console.log ("create current prop " +currentProperty);    
            let td = document.createElement("td");
            td.classList.add("backGray");
            td.innerHTML = `${currentObject[currentProperty]}`;
            td.addEventListener("click", gestisciClick);
            trn.append(td);
        }
    }
}

function buildHeaderTables(columns) {
    console.log( "buildHeaderTables ENTER ", columns);

    /*
    //find my element
    let movieTableRoot = document.getElementById('movieTableId')

    //Create table
    
    let table = document.createElement('table');
    movieTableRoot.append(table);

    let tr = document.createElement("tr");
    table.append(tr);

    let myyRefHeder = columns;
    // console.log( "buildHeaderTables ", columns);

    //Create Header
    for (let currentProp of myyRefHeder) {
        console.log("create current prop in header" + currentProp);
        let thTable = document.createElement('th');
        thTable.classList.add("backGreen");
        thTable.innerHTML = `${currentProp}`;
        tr.append(thTable);
    }
    return table;
    */
}

function gestisciClick(e) {
    console.log(e);
    if (e.type === "click") {
        console.log(e.target.nodeName);
        let targetId = e.target.nodeName.substring(0, 2);
        if (targetId === "TD") {

            if (e.target.classList.contains("backGray")) {
                e.target.className = "backRed";
                if (e.target.classList.contains("backRed")) {
                    console.log("Set to red");
                }
            } else {
                e.target.className = "backGray";
                if (e.target.classList.contains("backGray")) {
                    console.log("Set to Gray");
                }
            }

            console.log("click on TD");
        } else {
            console.log("Non hai fatto click su un TD")
        }
    } else {
        console.log("it is not a click");
    }
}


const MovieTable = (props) => {
  return (
    <div className='mainMovieTable' id="movieTableId">
        <h1>MOVIES FOUND</h1>
        { /*build(props) */}
        {console.log("MovieTable")}
    </div>
  )
}

export default MovieTable
