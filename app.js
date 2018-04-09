var mysql = require("mysql");
var express = require('express');
var app = express();

var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
var sess;

const crypto = require('crypto');
const secret = 'abcdefg';

app.set('view engine', 'ejs');

var bodyParser = require('body-parser')
var url = bodyParser.urlencoded({ extended: false })

var connection = mysql.createConnection
(
{
    host: "localhost",
    port: 3307,
    database: "fashion",
    user: "root",
    password: "usbw",
}
);

// app.use((req, res, next) => {
//     req.session.userid = 999;
//     req.session.username = 'miaw';    
//     next();
// })

app.get('/',function(req,res){
    res.render('formlogin')
})

app.get('/formregister',function(req,res){
    res.render('formregister')
})

app.post('/register', url, function(req, res)
{
   // console.log(req.body);
    
    var sql = 'SELECT * FROM user WHERE username = ?';
    connection.query(sql, [req.body.username], function (err, register) {

        if (register.length > 0)
        {
            res.render('formlogin', 
            {
                notif:'Username sudah terdaftar !'
            });
        }
        else
        {
            // res.json(req.body)
            const password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');

            //console.log(password);

            connection.query("insert into user set ? ",
            {
                username : req.body.username,
                password : password,
            });

            connection.query("insert into user_data set ? ",
            {
                nama_user : req.body.name,
                email : req.body.email,
                phone : req.body.phonenumber,
            });

            res.redirect('/');
            // console.log(username)
            // console.log(email)
            // console.log(phonenumber)
        }
    });
})



app.get('/formlogin', function(req, res)
{
    res.render('formlogin');
})

app.post('/login', url, function(req, res)
{
    const password = crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex');

    var sql = 'SELECT * FROM user WHERE username = ? and password = ?';
    connection.query(sql, [req.body.username, password], function (err, login) {
    //if (err) throw err;
    //console.log(rows[0].userid);
        if (login.length > 0)
        {
            sess=req.session;
            sess.userid = login[0].id;
            sess.username = login[0].username;

            // res.json({data: login, session: req.session})

            res.redirect('/home');
        }
        else
        {
            res.render('formlogin', 
            {
                notif:'Username atau Password salah !'
            });
        }
    });
    
    //res.end();
})





///////////////////////////////////////////////////////////////////////////////////////////////
//menampilkan data dari databese
app.get('/admin',(req,res)=>
{
connection.query('select*from season',(err,rows,field)=>{
    connection.query('SELECT cs.id, namaseason, nama_category_season FROM season se JOIN category_season cs ON se.id = cs.id_season',(err,rows1,field)=>{ 
        connection.query('SELECT pr.id, namaseason, nama_category_season, nama_product,describ, harga FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season ',(err,rows2,field)=>{connection.query('SELECT wn.id, namaseason, nama_category_season, nama_product,describ, harga,warna_product FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product ' ,(err,warna)=>{connection.query('SELECT sz.id, namaseason, nama_category_season, nama_product,describ, harga,warna_product,size_product,stock FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product join size sz on wn.id=sz.id_warna_product',(err,size)=>{
            if(err) throw err;
            // res.json(rows1)
            res.render('admindashboard',{data:rows, data1:rows1, data2:rows2, warna:warna, size:size});
            //console.log(rows)
                }) 
            })
        })
    
    })
})
});



///////////////////////////////////////////////////////////////////////////////////////////////
//add season
app.post('/inputseason', url ,function(req, res){
connection.query("insert into season set ?", 
{
    namaseason : req.body.season,
})
res.redirect('/admin')
})

//hapus season
app.get('/hapus/:id',url,function (req,res){
connection.query('delete from season where ?', {
    id:req.params.id
})
res.redirect('/admin')
})

///////////////////////////////////////////////////////////////////////////////////////////////
//ambil form edit season
app.get('/editseason/:id', function(req, res)
{
    
    res.render('editseason', 
    {
        id:req.params.id,
        
    });

})
///////////////////////////////////////////////////////////////////////////////////////////////
// mengirim hasil edit season
app.post('/editseason/:id', url, function(req, res){

    connection.query("update season set ? where ? ",
    [
        {
            namaseason : req.body.editseason,
        },
        {
            id : req.params.id,
        }
    ]);

    res.redirect('/admin');
})
//////////////////////////////////////////////////////////////////////////////////////////////
//add category_season
app.post('/inputcategory_season', url ,function(req, res){
    connection.query("insert into category_season set ?", 
    {
        id_season   : req.body.id_season,
        nama_category_season    : req.body.category_season
        
    })
    res.redirect('/admin')
})
//////////////////////////////////////////////////////////////////////////////////////////////

//ambil form edit category season
app.get('/editcategoryseason/:id', function(req, res)
{
    
    res.render('editcategoryseason', 
    {
        id:req.params.id,
        
    });

})
///////////////////////////////////////////////////////////////////////////////////////////////
// mengirim hasil edit category season
app.post('/editcategoryseason/:id', url, function(req, res){

    connection.query("update category_season set ? where ? ",
    [
        {
            nama_category_season : req.body.editcategoryseason,
        },
        {
            id : req.params.id,
        }
    ]);

    res.redirect('/admin');
})

//hapus category season
app.get('/hapus/:id',url,function (req,res){
    connection.query('delete from category_season where ?', {
        id:req.params.id
    })
    res.redirect('/admin')
    })


//////////////////////////////////////////////////////////////////////////////////////////////
//add product
app.post('/inputproduct',url,(req,res)=>{
    connection.query('insert into product set ?',{
        id_category_season  : req.body.id_category_season,
        nama_product    : req.body.nama_product,
        harga   : req.body.harga,
        describ : req.body.describ
    })
    res.redirect('/admin')
})
//ambil form edit product
app.get('/editproduct/:id', function(req, res)
{
    
    res.render('editproduct', 
    {
        id:req.params.id,
        
    });

})
///////////////////////////////////////////////////////////////////////////////////////////////
// mengirim hasil edit product
app.post('/editproduct/:id', url, function(req, res){

    connection.query("update product set ? where ? ",
    [
        {
            nama_product : req.body.namaproduct,
            describ:req.body.describ,
            harga:req.body.harga,

        },
        {
            id : req.params.id,
        }
    ]);

    res.redirect('/admin');
})
//delete product
app.get('/delete_category/:id',function(req,res){
    connection.query('delete from product where ?',{
        id:req.params.id
        
    })
    res.redirect('/admin')
    })

//add warna
app.post('/inputwarna',url,(req,res)=>{
    connection.query('insert into warna set ?',{
        id_product:req.body.id_product,
        warna_product:req.body.warna_product
    })
    res.redirect('/admin')
})

//ambil form edit warna
app.get('/editwarna/:id', function(req, res)
{
    
    res.render('editwarna', 
    {
        id:req.params.id,
        
    });

})
///////////////////////////////////////////////////////////////////////////////////////////////
// mengirim hasil edit warna
app.post('/editwarna/:id', url, function(req, res){

    connection.query("update warna set ? where ? ",
    [
        {
            warna_product : req.body.warna,

        },
        {
            id : req.params.id,
        }
    ]);

    res.redirect('/admin');
})
//delete warna
app.get('/delete_category/:id',function(req,res){
    connection.query('delete from warna where ?',{
        id:req.params.id
        
    })
    res.redirect('/admin')
    })

//add size
app.post('/inputsize',url,(req,res)=>{
    connection.query('insert into size set ?',{
        id_warna_product:req.body.sizestock,
        size_product:req.body.size,
        stock:req.body.stock

    })
    res.redirect('/admin')
})
//ambil form edit warna
app.get('/editsize/:id', function(req, res)
{
    
    res.render('editsize', 
    {
        id:req.params.id,
        
    });

})

//hapus size
app.get('/hapus/:id',url,function (req,res){
    connection.query('delete from size where ?', {
        id:req.params.id,
    })
    res.redirect('/admin')
    })
///////////////////////////////////////////////////////////////////////////////////////////////
// mengirim hasil edit size
app.post('/editsize/:id', url, function(req, res){

    connection.query("update size set ? where ? ",
    [
        {
            size_product : req.body.size,
            stock:req.body.stock

        },
        {
            id : req.params.id,
        }
    ]);


    res.redirect('/admin');
})




////////////////////////////////////////////////////////////////////////////////////////////////////////

//home user
app.get('/home',(req,res)=>{
    sess=req.session;
    if (sess.userid==null)
    {
        res.redirect('/');
    }
    else{
        connection.query('select*from season',(err,season)=>{
            res.render('client/home',
            {
                season:season,
                username:sess.username
            })   
        })
    }
})
//ses category user
app.get('/seasoncategory/:id',(req,res)=>{
    sess=req.session;
    if (sess.userid==null)
    {
        res.redirect('/')
    }else
    {
        connection.query('SELECT cs.id, namaseason, nama_category_season FROM season se JOIN category_season cs ON se.id = cs.id_season where se.id=?', [req.params.id],(err,ses_category)=>{
            res.render('client/seasoncategory',{ses_category:ses_category})
            
        })
    }
})

//product user
app.get('/product/:id',(req,res)=>{
    sess=req.session;
    if (sess.userid==null)
    {
        res.redirect('/')
    }else{
        connection.query('SELECT pr.id, namaseason, nama_category_season, nama_product,describ, harga FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season where cs.id=?',[req.params.id],(err,product)=>{
            res.render('client/product',{product:product})
            //console.log(product)
        })
    } 
})


// WARNA PRODUK
app.get('/warnaproduk/:id',function(req,res){
    sess=req.session;
    if (sess.userid==null){
        res.redirect('/')
    }else{
        connection.query('select wn.id,namaseason, nama_category_season, nama_product,describ, harga,warna_product FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product where id_product=?',[req.params.id],function(err,warna){
            res.render('client/warna',{warna:warna})  
            //res.json(warna);
        })
    }
 })

 //ukuran dan stock
 
app.get('/sizestock/:id',function(req,res){
    sess=req.session;
    if (sess.userid==null){
        res.redirect('/')
    }else{
        connection.query('select sz.id,namaseason, nama_category_season, nama_product,describ, harga,warna_product,size_product,stock FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product join size sz on wn.id = sz.id_warna_product where id_warna_product =?',[req.params.id],function(err,size){
        
            res.render('client/sizestock',{size:size})
            //res.json(size)
        })
    }
    
})
 
//detail produk
app.get('/detail/:id',function(req,res){
    sess=req.session;
    if (sess.userid==null){
        res.redirect('/')
    }else{
        connection.query('select sz.id,namaseason, nama_category_season, nama_product,describ, harga,warna_product,size_product,stock FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product join size sz on wn.id = sz.id_warna_product where sz.id =  ?',[req.params.id],function(err,detail){
            res.render('client/detail',{detail:detail})
            //res.json(detail)     
            })
    }
   
 })

 //chart
//  app.post('/cart',url,function(req,res){
//     connection.query('insert into cart set ?',{
//         user_id : req.session.userid,
//         id_product_size : req.body.id,
//         quantity:req.body.inputbeli,
//         price:req.body.harga
//     })
//     res.redirect('/cart')
//  })
// app.get('/chart/',function(req,res){
//         connection.query('select sz.id,namaseason, nama_category_season, nama_product,describ, harga,warna_product,size_product,stock FROM season se JOIN category_season cs ON se.id = cs.id_season join product pr on cs.id = pr.id_category_season join warna wn on pr.id = wn.id_product join size sz on wn.id = sz.id_warna_product join chart cr on sz.id=cr.id_product_size join user us on us.id=cr_user_id?',function(err,chart){
//             res.render('client/chart',{chart:chart})
//         })
//     })

// app.get("/cart", function(req,res)
// {
//     if (req.session.username == null)
//     {
//         res.redirect("/")
//     }
//     else
//     {
//         connection.query("SELECT * FROM cart where ?",
//         {
//             id : req.session.userid
//         },
//         function(err,rows)
//         {
//             if (err) throw err;

//             res.render("client/cart",{cart:rows, sesi : req.session.user_nama})
//         })
//     }
// })

app.post("/cart", url, function(req,res)
{
    res.json(req.body)
    // if (req.session.username == null)
    // {
    //     res.redirect("/")
    // }
    // else
    // {
    //     connection.query("SELECT id, size_product, id_warna_product FROM size where ?",
    //     {
    //         id : req.body.size_product
    //     },
    //     function(err,rows1)
    //     {
    //         connection.query("SELECT warna_product, id_product FROM warna where ?",
    //         {
    //             id : rows1[0].id_warna_product
    //         },
    //         function(err,rows2)
    //         {
    //             connection.query("SELECT nama_product, harga FROM product where ?",
    //             {
    //                 id : rows2[0].id_product
    //             },
    //             function(err,rows3)
    //             {
    //                 res.json({rows1, rows2, rows3})
    //                 // connection.query("INSERT cart set ?",
    //                 // {
    //                 //     user_id : req.session.id,
    //                 //     id_product_size : req.body.size_product,
    //                 //     quantity:req.body.inputbeli,
    //                 //     price:req.body.harga
    //                 // })
    //                 // res.redirect("/cart");
    //             })
    //         })
    //     })
    // }
 
})






app.listen(3000);

