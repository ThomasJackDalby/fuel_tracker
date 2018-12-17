const datastore = require("./data/datastore.js");

datastore.initialise()
    .then(() => {
        let refuel = {
            milage: 30000,
            pricePerLitre: 1,
            totalCost: 10,
            location: "Somewhere",
            date: new Date(),
        }
        for (let i = 0; i < 100; i++) {
            refuel.milage += Math.round(Math.random() * 200 + 200)
            refuel.pricePerLitre = Math.round(Math.random() * 40 + 100) / 100;
            refuel.totalCost = Math.round(Math.random() * 100 + 3000) / 100;
            refuel.amount = Math.round(refuel.totalCost / refuel.pricePerLitre, 3);
            refuel.date = new Date(refuel.date.setTime(refuel.date.getTime() + 1 * 86400000));
            datastore.createRefuel(refuel);
        }
    });
