const Post = require("../models/Post");

function saveCover1 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover1 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover2 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover2 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover3 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover3 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover4 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover4 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover5 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover5 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover6 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover6 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover7 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover7 =new Buffer.from( cover.data, "base64")
    }
}
function saveCover8 (product , coverencoded) {
    if(coverencoded == null) return
    const cover = JSON.parse(coverencoded)
    if(cover != null) {
        product.prodCover8 =new Buffer.from( cover.data, "base64")
    }
}


module.exports.addPost = async (req ,res ) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    const pst =  new Post({
        content : req.body.newPost,
        date : today,
        prodCover1 : req.body.prodCover1,
        prodCover2 : req.body.prodCover2,
        prodCover3 : req.body.prodCover3,
        prodCover4 : req.body.prodCover4,
        prodCover5 : req.body.prodCover5,
        prodCover6 : req.body.prodCover6,
        prodCover7 : req.body.prodCover7,
        prodCover8 : req.body.prodCover8,
    })
    
    if(req.body.prodCover1) saveCover1(pst ,req.body.prodCover1);
    if(req.body.prodCover2) saveCover2(pst ,req.body.prodCover2);
    if(req.body.prodCover3) saveCover3(pst ,req.body.prodCover3);
    if(req.body.prodCover4) saveCover4(pst ,req.body.prodCover4);
    if(req.body.prodCover5) saveCover5(pst ,req.body.prodCover5);
    if(req.body.prodCover6) saveCover6(pst ,req.body.prodCover6);
    if(req.body.prodCover7) saveCover7(pst ,req.body.prodCover7);
    if(req.body.prodCover8) saveCover8(pst ,req.body.prodCover8);
    
    
    pst.save()
    .then(product => {
        res.redirect("/blog")
    })
    .catch (err => {
        console.log(err)
    })
}
