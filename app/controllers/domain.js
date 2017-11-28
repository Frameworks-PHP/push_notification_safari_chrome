
exports.getdomain = function (req, res) {
    var db = req.app.get('db');
    var collection = db.collection('site');
    collection.find({}).toArray(
            function (err, result) {
                if (err)
                    return res.status(201).json({
                        error: "No sites!",
                        success: false
                    });
                res.status(200).json(result);
            }
    );
}
