// Import React, { Component } from "react";
import React, { useState, useEffect } from 'react';
import './MovieTable.css'
// import PopUp from './PopUp'

const colToUseInAnySearch = 4;
const colExpectedInAnySearch = 5;
const colExpectedInTitleSearch = 7;
const gIdPos = 2 // id position in any table
const titleFieldMask = {
    Actors: true,
    Awards: false,
    BoxOffice: false,
    Country: true,
    DVD: false,
    Director: true,
    Genre: true,
    Language: false,
    Metascore: false,
    Plot: false,
    Poster: false,
    Production: false,
    Rated: false,
    Ratings: false,
    Released: false,
    Runtime: true,
    Title: true,
    Type: false,
    Website: false,
    Writer: true,
    Year: true,
    imdbID: true,
    imdbRating: false,
    imdbVotes: false
};

function isAvailable(titleProp){
    console.log("title prop", titleProp);
    let bRetVal = false;
    if (titleFieldMask[titleProp] === true){
        bRetVal = true;
    } //
    return bRetVal;
}

function build (myprops) { 
    let bRetVal = false;
    let colToShow = 0;
    let rowToShow = myprops.rowToShow;

    console.log("run buildtable: rowToShow", myprops.rowToShow);

    let tableTitles = document.getElementById('tableId')
    if (tableTitles === null){
        console.log("MOVIETABLE - table not existing")    
    } else{
        // It exists. First remove it 
        tableTitles.innerHTML='';
        tableTitles.remove();
    }

    if (myprops.columnsName.length === colExpectedInAnySearch ){
        colToShow = colToUseInAnySearch
        tableTitles = buildHeaderTables(myprops.columnsName, colToShow);
        bRetVal = true;
    } else {
        if (myprops.columnsName.length === colExpectedInTitleSearch){
            let colAllowed = 0
            let colAllowedString=[];
            for (let anyprop in  titleFieldMask){
                // console.log ("MOVIETABLE prop evaluated ", titleFieldMask[anyprop]);
                if (titleFieldMask[anyprop] === true){
                    colAllowed++;
                    colAllowedString.push(anyprop);
                    console.log ("MOVIETABLE Allowed prop ", anyprop);
                } // else
            } // end for count allowed coloums
            console.log ("MOVIE TABLE allowed prop:", colAllowed);
            let colToPass = [];
            /*
            if (colAllowed > colExpectedInTitleSearch){
                colToPass = colAllowedString;
            } else{
                colToPass = myprops.columnsName;
            }
            */
            colToPass = myprops.columnsName;
            colToShow = colToPass.length;
            tableTitles = buildHeaderTables(colToPass, colToShow);
            bRetVal = true;
        }else{
            console.log("MOVIETABLE - numeber of colomns not expected: ", myprops.columnsName.length);
            bRetVal = false;
        }
    }     

    if (bRetVal === true){
        if (myprops.search.Title !== undefined){
            if (tableTitles != null){
                console.log("myprops.search is ", myprops.search);                
                buildTables( myprops, tableTitles,colToShow, rowToShow, true);
            }
        } else{
            let tempArray = myprops.search;
            let bHasProp = false;
            bHasProp = tempArray.hasOwnProperty('Search')
            if ((tempArray !== null) && (tempArray !== undefined) && 
                (tempArray.lenght !== 0) && (bHasProp === true)){
                // console.log(tempArray)
                let searchArray = tempArray.Search[0];
                if (searchArray !== null){
                    console.log("myprops.search is Iterable");
                    buildTables(myprops.search.Search, tableTitles,colToShow, rowToShow, false);
                } else {
                    console.log("myprops.search.Search[0] is NULL");
                }
            }else{
                console.log("myprops.search is NULL or undef", tempArray);
            }
        }
    } else{
        console.log(" MOVIETABLE - EXIT from build");
    }
}

function buildTables(myprops, table,colToRepresent, rowToShow, flag) {
    let jsonObject = 0;
    if (flag === true){
        jsonObject = myprops.search 
    } else {
        jsonObject = myprops;
    }
    
    console.log("BUILD TABLES ENTER: ", jsonObject);
    // console.log("BUILD TABLES json lenght", jsonObject.length);
    let rowCount = 0

    if (jsonObject.length !== undefined){
        console.log("BUILD TABLES is jsonObject");
    for (let currentObject of jsonObject) {
        if (rowCount < rowToShow){
            // console.log ("create current object " +currentObject);  
            let trn = document.createElement("tr");
            table.append(trn);
            let colCount = 0
            for (let currentProperty in currentObject) {
                if (colCount < colToRepresent){
                    // console.log ("create current prop " +currentProperty);    
                    let td = document.createElement("td");
                    td.id = 'tdID_' + rowCount + colCount;
                    td.classList.add("backGray");
                    td.innerHTML = `${currentObject[currentProperty]}`;
                    td.addEventListener("click", gestisciClick);
                    trn.append(td);
                    colCount++;
                } // else
            } // end for cycle columns
            rowCount++;
        } //else
    } // end for cycle rows
    } else {
    //There is only on row in title search - always
    console.log("BUILD TABLES is NOT jsonObject");
    let colCount = 0
    let trn = document.createElement("tr");
    table.append(trn);         
    if (colCount < colToRepresent){
        for (let currentProperty of myprops.columnsName) {
            if (isAvailable(currentProperty) === true){
                console.log ("create current object " +currentProperty,jsonObject[currentProperty]);  
                let td = document.createElement("td");
                td.id = 'tdID_' + colCount;
                td.classList.add("backGray");
                td.innerHTML = `${jsonObject[currentProperty]}`;
                td.addEventListener("click", gestisciClick);
                trn.append(td);
                colCount++;
            } else {
                console.log('this prop is not available:', currentProperty)
            }                    
        } // end for cycle colomns
    } // else

}
}

function buildHeaderTables(columns, toRepresent) {
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
    // console.log( "buildHeaderTables ", toRepresent);

    //Create Header
    let colCounter = 0
    for (let currentProp of myyRefHeder) {
        if (colCounter < toRepresent){
            console.log("create current prop in header" + currentProp);
            let thTable = document.createElement('th');
            thTable.classList.add("backGreen");
            thTable.innerHTML = `${currentProp}`;
            tr.append(thTable);
            colCounter++;
        } // 
    }
    return table;
}

function gestisciClick(e) {
    let idToFind = 0;
    console.log("Position is: ",e.path[0].cellIndex);
    if (e.path[0].cellIndex === gIdPos){
        // It is the right position 
        console.log("ID is:", e.target.outerText)
    } else {
        // we have to move in the DOM 
        idToFind = document.getElementById("tdID_2");
        if (idToFind !== null){
            // it is a single row table
            console.log("ID is:", idToFind.outerText);
        } else {
            // It is a multi-row table
            let idToParse = e.target.id.substring(5, 6); // i extract the row
            let idToSearch = "tdID_" + idToParse + gIdPos;            
            // console.log('idToParse',idToParse);
            // console.log('idToSearch',idToSearch);
            idToFind = document.getElementById(idToSearch);
            console.log("ID is:", idToFind.outerText); 
            // Here start the new query to be used to form the pop up
        }
    }
    //console.log(e);
   
    if (e.type === "click") {
        // console.log(e.target.nodeName);
        console.log(e.target);
        let targetId = e.target.nodeName.substring(0, 2);
        if (targetId === "TD") {
            managePopUp();
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

function managePopUp(){
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    /*
    window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    }
    */
}

function MovieTable(props) {
    const [seen, setSeen] = useState(false);

    // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
     // seen = !seen
     console.log("POPUP", seen);
  });

    return (
        <div className='mainMovieTable'>
            {console.log("props: ", props)}
            {build(props)}
            {/*
            <div className="btn" onClick={() =>setSeen(!seen)}>
                <button>New User?</button>
            </div>
            {seen ? <PopUp toggle={() =>setSeen(!seen)} /> : null}
            */}
        </div>
    );
}


export default MovieTable
