const express = require("express");
const app = express();
app.use(express.json()); // middleware required for using post, put, delete 

// assignment ->
// get -> display the candies
// post -> send some type of candies
// put -> replace a type of candy with another type
// delete -> remove completely some types of candies

let candies = [
    {
        type: "mango",
        quantity: 30
    },
    {
        type: "orange",
        quantity: 80
    },
    {
        type: "cherry",
        quantity: 56
    },
    {
        type: "cola",
        quantity: 100
    }
];


app.get("/", (req, res) => {
    let totalCandies = 0, totalCandyTypes = 0;
    for (let candy of candies) {
        totalCandyTypes++;
        totalCandies += candy.quantity;
    }
    res.json({
        totalCandies,
        totalCandyTypes,
        candies
    });
});

app.post("/", (req, res) => {
    const newCandies = req.body.newCandies;
    for (const newCandy of newCandies) {
        candies.push(newCandy);
    }
    res.json({
        msg: "New candies were added to the shop"
    });
});

app.put("/", (req, res) => {
    const prevCandy = req.body.prevCandy;
    const newCandy = req.body.newCandy;
    let ind = -1;
    for (let i = 0; i < candies.length; i++) {
        if (candies[i].type === prevCandy) {
            ind = i;
            break;
        }
    }
    if (ind === -1) {
        res.status(404).send("Bad Request. No such candy found to be replaced with"); // status code along with its msg in the body
    } else {
        candies[ind].type = newCandy;
        res.json({
            msg: "Some candies were replaced in the shop"
        });
    }
});

app.delete("/", (req, res) => {
    const candiesToDelete = req.body.candies;
    const leftoverCandies = candies.filter((candy) => {
        let toRemove = false;
        for (let i = 0; i < candiesToDelete.length; i++) {
            if (candy.type === candiesToDelete[i]) { toRemove = true; break; }
        }
        if (!toRemove) return candy;
    });
    candies = leftoverCandies;
    res.json({
        msg: "Some candies were removed from the shop"
    });
});

app.listen(3000);

// for .gitignore
// post ->
// {
//     "newCandies": [
//         {
//             "type": "watermelon",
//             "quantity": 14
//         },
//         {
//             "type": "banana",
//             "quantity": 23
//         },
//         {
//             "type": "blueberry",
//             "quantity": 89
//         }
//     ]
// }

// put ->
// {
//     "prevCandy": "watermelon",
//     "newCandy": "litchi"
// }

// delete ->
// {
//     "candies": [
//         "cherry",
//         "mango"
//     ]
// } 