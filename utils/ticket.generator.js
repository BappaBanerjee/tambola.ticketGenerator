let columns = [
    addCol(1, 9),
    addCol(10, 10),
    addCol(20, 10),
    addCol(30, 10),
    addCol(40, 10),
    addCol(50, 10),
    addCol(60, 10),
    addCol(70, 10),
    addCol(80, 11),
];
let Node = Array(6).fill(0).map(() => Array(3)
    .fill(null)
    .map(() => Array(9).fill(0)))

function addCol(startFrom, count) {
    return Array.from({ length: count }, (_, index) => startFrom + index);
}

function generateTambolaTicket() {
    const rows = 3;
    const cols = 9;

    const sets = Array(6).fill(0).map(() => Array(cols)
        .fill(null)
        .map(() => Array()))

    // assigning elements to each set for each column
    for (let i = 0; i < 9; i++) {
        let list = columns[i];
        for (let j = 0; j < 6; j++) {
            let randIndex = Math.floor(Math.random() * (list.length - 1));
            let randNum = list[randIndex];
            sets[j][i].push(randNum);
            list.splice(randIndex, 1)
        }
    }

    // assign element from last column to random set
    let lastCol = columns[8];
    let randNumIndex = getRand(0, lastCol.length - 1);
    let randNum = lastCol[randNumIndex];
    let randSetIndex = getRand(0, sets.length - 1);
    let randSet = sets[randSetIndex][8];
    randSet.push(randNum);
    lastCol.splice(randNumIndex, 1);

    // 3 passes over the remaining columns
    for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < 9; i++) {
            let col = columns[i];
            if (col.length == 0)
                continue;
            let randNumIndex_p = getRand(0, col.length - 1);
            let randNum_p = col[randNumIndex_p];
            let vacantSetFound = false;
            while (!vacantSetFound) {
                let randSetIndex_p = getRand(0, sets.length - 1);
                let randSet_p = sets[randSetIndex_p];
                if (getNumberOfElementsInSet(randSet_p) == 15 || randSet_p[i].length == 2)
                    continue;
                vacantSetFound = true;
                randSet_p[i].push(randNum_p);
                col.splice(randNumIndex_p, 1);
            }
        }
    }

    // one more pass over the remaining columns
    for (let i = 0; i < 9; i++) {
        let col = columns[i];
        if (col.length == 0)
            continue;
        let randNumIndex_p = getRand(0, col.length - 1);
        let randNum_p = col[randNumIndex_p];
        let vacantSetFound = false;
        while (!vacantSetFound) {
            let randSetIndex_p = getRand(0, sets.length - 1);
            let randSet_p = sets[randSetIndex_p];
            if (getNumberOfElementsInSet(randSet_p) == 15 || randSet_p[i].length == 3)
                continue;
            vacantSetFound = true;
            randSet_p[i].push(randNum_p);
            col.splice(randNumIndex_p, 1);
        }
    }
    // sort the internal sets
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 9; j++) {
            sets[i][j].sort();
        }
    }

    //filling col with 0's in random position
    for (let curIndex = 0; curIndex < 6; curIndex++) {
        let currSet = sets[curIndex];
        for(let i=0;i<currSet.length;i++){
            while(currSet[i].length < 3){
                let randIndex = getRand(0,2);
                currSet[i].splice(randIndex, 0, 0);
            }
        }
    }
  
    // got the sets - need to arrange in tickets now
    for (let setIndex = 0; setIndex < 6; setIndex++) {
        let currSet = sets[setIndex];
        //fill the first row
        for (let size = 3; size > 0; size--) {
            if (getRowCount(setIndex, 0) == 5)
                break;
            for (let colIndex = 0; colIndex < 9; colIndex++) {
                if (getRowCount(setIndex, 0) == 5)
                    break;
                if (Node[setIndex][0][colIndex] != 0)
                    continue;

                let currSetCol = currSet[colIndex];
                
                if (currSetCol.length != size)
                    continue;
                Node[setIndex][0][colIndex] = currSetCol[0];
                currSetCol.splice(0, 1);
            }
        }
        //fill the second row
        for (let size = 3; size > 0; size--) {
            if (getRowCount(setIndex, 1) == 5)
                break;
            for (let colIndex = 0; colIndex < 9; colIndex++) {
                if (getRowCount(setIndex, 1) == 5)
                    break;
                if (Node[setIndex][1][colIndex] != 0)
                    continue;

                let currSetCol = currSet[colIndex];
                if (currSetCol.length != size)
                    continue;
                Node[setIndex][1][colIndex] = currSetCol[0];
                currSetCol.splice(0, 1);
            }
        }

        
        //fill the third row
        for (let size = 3; size > 0; size--) {
            if (getRowCount(setIndex, 2) == 5)
                break;
            for (let colIndex = 0; colIndex < 9; colIndex++) {
                if (getRowCount(setIndex, 2) == 5)
                    break;
                if (Node[setIndex][2][colIndex] != 0)
                    continue;

                let currSetCol = currSet[colIndex];
                if (currSetCol.length != size)
                    continue;

                Node[setIndex][2][colIndex] = currSetCol[0];
                currSetCol.splice(0, 1);
            }
        }
    }
    return Node;
}

//function to get the row count
function getRowCount(ticketNumber, rowNumber) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (Node[ticketNumber][rowNumber][i] != 0)
            count++;
    }
    return count;
}

//function to get the number of element in the ticket
function getNumberOfElementsInSet(set) {
    let count = 0;
    set.forEach(element => count += element.length)
    return count;
}

//function to get the random number
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    generateTambolaTicket
}