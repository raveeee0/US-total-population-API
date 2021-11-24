const Population = require("../model/population");

exports.getData = async (req, res, next) => {
    // Get query parameters
    const queryParams = req.query;

    // Whitelist of the possible query parameters 
    const rangeQuery = ["year1", "year2"];

    // Type of the query
    let query = "";


    // Verify whiteList of query strings //

    // Check if no parameters are passed in
    if (Object.keys(queryParams).length === 0)
        query = "regular";
    else
        // Check if the parameters passed are valid
        for (const key in queryParams)
            if (!queryParams.hasOwnProperty(key) || rangeQuery.indexOf(key) == -1) {
                query = "irregular";
                break;
            } else
                query = "byYears";


    // Handle different cases depending on query parameters //

    if (query === "regular")
        // Handling a regular query with no parameters
        try {
            let dataset = Population.fetchAll();
            res.status(200).json(dataset);
        } catch (err) {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        }

    // Handling a query with valid parameters
    else if (query === "byYears")

        try {
            //Check if input is in a valid format with regexp
            let reg = /^\d+$/;
            if (!reg.test(queryParams.year1) || !reg.test(queryParams.year2)) {
                let err = new Error("Invalid value of the parameters");
                err.statusCode = 400;
                throw err;
            }
            // Parse the years into numbers
            let year1 = parseInt(queryParams.year1),
                year2 = parseInt(queryParams.year2);

            // Check if years selected are cointained in the dataset
            if (year1 < 1960 || year2 > 2020) {
                let err = new Error("Some of the years of the range are not cointained in the dataset.");
                err.statusCode = 404;
                throw err;


            } else if (year1 > year2) { // Check if years makes sense...
                let err = new Error("The initial year of the range cannot be greater than the final year.");
                err.statusCode = 400;
                throw err;
            }

            // Retrieve data from model and send json to end user
            let dataset = Population.getByRange(year1, year2);
            res.status(200).json(dataset);

            // Catch error if any
        } catch (err) {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        }

    else if (query === "irregular") { // Handling a query with invalid parameters
        let err = new Error("Invalid parameters");
        err.statusCode = 400;
        next(err);

    } else { // Internal Server Error
        let err = new Error();
        err.statusCode = 500;
        next(err);
    }
}


exports.getByYear = async (req, res, next) => {

    //Check if input is in a valid format with regexp
    let reg = /^\d+$/;
    if (!reg.test(req.params.year)) {
        let err = new Error("Invalid value of the paramter");
        err.statusCode = 400;
        next(err);
    }
    // Parse the year into a number
    let year = parseInt(req.params.year);


    // Check if the year selected is cointained in the dataset
    if (year < 1960 || year > 2020) {
        let err = new Error("The year is not cointained in the dataset.");
        err.statusCode = 404;
        next(err);
    }

    // Retrieve and send the requested data
    try {
        let dataset = await Population.getByYear(year);
        res.status(200).json(dataset);
    } catch (err) {
        if (!err.statusCode)
            err.statusCode = 500;
        next(err);
    }
}