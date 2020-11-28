import React from 'react'
import './MovieTable.css'

function build (myprops) { 
    console.log("run buildtable", myprops);
    let tableTitles = document.getElementById('tableId')
    if (tableTitles === null){
        tableTitles = buildHeaderTables(myprops.columnsName);
    }

    if (myprops.search.Title !== undefined){
        if (tableTitles != null){
            console.log("myprops.search is ", myprops.search.Title);
            // buildTables(myprops.search, tableTitles);
        }
    } else{
        let tempArray = myprops.search;
        let bHasProp = false;
        bHasProp = tempArray.hasOwnProperty('Search')
        if ((tempArray !== null) && (tempArray !== undefined) && 
            (tempArray.lenght !== 0) && (bHasProp === true)){
            console.log(tempArray)
            let searchArray = tempArray.Search[0];
            if (searchArray !== null){
                console.log("myprops.search is Iterable");
                buildTables(myprops.search.Search, tableTitles);
            } else {
                console.log("myprops.search.Search[0] is NULL");
            }
        }else{
            console.log("myprops.search is NULL or undef", tempArray);
        }
    }
}


function buildTables(jsonObject, table) {
    for (let currentObject of jsonObject) {
        console.log ("create current object " +currentObject);  
        let trn = document.createElement("tr");
        table.append(trn);
        for (let currentProperty in currentObject) {
            // console.log ("create current prop " +currentProperty);    
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
    let h1 = document.getElementById('myHeaderId')
    if (h1 === null){
        h1 = document.createElement("H1");   // Create a <H1> element
        h1.innerHTML = "MOVIES FOUND"
        h1.id = 'myHeaderId'
    } else {
        console.log ("H1 already build", h1)
    }
    
    //find my element
    let startTagTable = document.getElementById('movieTableId')
    startTagTable.append(h1);
    
    let movieTableRoot = h1

    //Create table
    
    let table = document.createElement('table');
    movieTableRoot.append(table);
    table.id = 'tableId'

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
    <div className='mainMovieTable'>
        {console.log("props: ", props)}
        {build(props)}
        {/*console.log("MovieTable")*/}
    </div>
  )
}

export default MovieTable
