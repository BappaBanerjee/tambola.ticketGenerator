
let col1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let col2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
let col3 = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
let col4 = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
let col5 = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
let col6 = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
let col7 = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69]
let col8 = [70, 71, 72, 73, 74, 75, 76, 77, 78, 79]
let col9 = [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]

let columns = [col1, col2, col3, col4, col5, col6, col7, col8, col9]

let Node = Array(6).fill(0).map(() => Array(3)
    .fill(null)
    .map(() => Array(9).fill(0)))

function generateTambolaTicket() {
    const rows = 3;
    const cols = 9;

    const sets = Array(6).fill(0).map(() => Array(cols)
        .fill(null)
        .map(() => Array()))
    // Generate random numbers for each column
    for (let i = 0; i < 9; i++) {
        let list = columns[i];
        for (let j = 0; j < 6; j++) {
            let randIndex = Math.floor(Math.random() * (list.length - 1));
            let randNum = list[randIndex];
            sets[j][i].push(randNum);
            list.splice(randIndex, 1)
        }
    }

    let lastCol = columns[8];
    let randNumIndex = getRand(0, lastCol.length - 1);
    let randNum = lastCol[randNumIndex];
    let randSetIndex = getRand(0, sets.length - 1);
    let randSet = sets[randSetIndex][8];
    randSet.push(randNum);
    lastCol.splice(randNumIndex, 1);

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
        for (let size = 2; size > 0; size--) {
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
        for (let size = 1; size > 0; size--) {
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
    // console.log(Node);
    // console.log(columns)
    return Node;
}


function getRowCount(ticketNumber, rowNumber) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (Node[ticketNumber][rowNumber][i] != 0)
            count++;
    }
    return count;
}

function getNumberOfElementsInSet(set) {
    let count = 0;
    set.forEach(element => count += element.length)
    return count;
}

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate a Tambola ticket
// const ticket = generateTambolaTicket();

module.exports = {
    generateTambolaTicket
}