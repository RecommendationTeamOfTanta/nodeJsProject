
function drawAddProduct() {
    FillLists();
    var addProductView = '<h1>Add Product</h1><br />';
    addProductView += '<form role="form" onload="FillLists();" class="add-product-form col-md-6">';
    addProductView += '<div class="form-group ">';
    addProductView += '<label for="product-name">product name:</label>';
    addProductView += '<input type="text" class="form-control" id="product-name">';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="product-quantity">Quantity: </label>';
    addProductView += ' <input type="text" class="form-control" id="product-quantity">';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="product-price">Price:</label>';
    addProductView += '<input type="text" class="form-control" id="product-price">';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="product-desc">Description:</label>';
    addProductView += '<textarea class="form-control" id="product-desc" cols="30" rows="3"></textarea>';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="catlista">Category:</label>';
    addProductView += '<div id="catlista"></div>';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="brandlista">Brand:</label>';
    addProductView += '<div id="brandlista"></div>';
    addProductView += '</div>';
    addProductView += '<div class="form-group">';
    addProductView += '<label for="photo-upload">photo:</label>';
    addProductView += '<input type="file" id="photo-upload" multiple />';
    addProductView += '</div>';
    addProductView += '<button id="btn-add-product" onclick="AddProductAjax();" type="button" class="btn btn-success col-md-offset-5">Add Product</button>';
    addProductView += '</form>';
    $('#content').html(addProductView);
}

function drawManageBrands(brands) {
    var manageHtml = '<h1>Manage Brands</h1><br />';
    manageHtml += '<table class="table" id="mok" border="1" style="border:dashed">';
    manageHtml += '<tr class="alert alert-danger">';
    manageHtml += '<th>Brand Name</th>';
    manageHtml += '<th>Description</th>';
    manageHtml += '<th>Photo</th>';
    manageHtml += '<th>Manage</th>';
    manageHtml += '</tr>';
    for (var i = 0; i < brands.length; i++) {
        manageHtml += '<tr class="alert alert-success">';
        manageHtml += '<td>' + brands[i].name + '</td>';
        manageHtml += '<td>' + brands[i].description + '</td>';
        manageHtml += '<td><img class="img-circle" src="' + brands[i].photo + '" width="100" height="50"/></td>';
        manageHtml += '<td><a class="btn btn-danger del-brand" data-bid="' + brands[i].id + '"  onclick="DeleteBrand();">Delete</a></td>';
    }

    $('#content').html(manageHtml);
}

function drawManageCats(cats) {
    var manageHtml = '<h1>Manage Categories</h1><br />';
    manageHtml += '<table class="table" id="cat-manage-tbl" border="1" style="border:dashed">';
    manageHtml += '<tr class="alert alert-danger">';
    manageHtml += '<th>Category Name</th>';
    manageHtml += '<th>Description</th>';
    manageHtml += '<th>Manage</th>';
    manageHtml += '</tr>';
    for (var i = 0; i < cats.length; i++) {
        manageHtml += '<tr class="alert alert-success">';
        manageHtml += '<td>' + cats[i].name + '</td>';
        manageHtml += '<td>' + cats[i].desc + '</td>';
        manageHtml += '<td><a class="btn btn-danger del-cat" data-cid="' + cats[i].id + '"  onclick="DeleteCat();">Delete</a></td>';
    }

    $('#content').html(manageHtml);
}

function drawManageProducts(products) {
    var manageHtml = '<h1>Manage products</h1><br />';
    manageHtml += '<table class="table" id="mok" border="1" style="border:dashed">';
    manageHtml += '<tr class="alert alert-danger">';
    manageHtml += '<th>Product Name</th>';
    manageHtml += '<th>Quantity</th>';
    manageHtml += '<th>Price</th>';
    manageHtml += '<th>Photo</th>';
    manageHtml += '<th>Manage</th>';
    manageHtml += '</tr>';
    for (var i = 0; i < products.length; i++) {
        manageHtml += '<tr class="alert alert-success">';
        manageHtml += '<td>' + products[i].name + '</td>';
        manageHtml += '<td>' + products[i].quantity + '</td>';
        manageHtml += '<td>' + products[i].price + '</td>';
        manageHtml += '<td><img class="img-circle" src="' + products[i].p_photo + '" width="100" height="50"/></td>';
        manageHtml += '<td><a class="btn btn-danger del-btn" data-pid="' + products[i].id + '" id="' + products[i].id + '" onclick="DeleteProduct();">Delete</a></td>';
    }

    $('#content').html(manageHtml);
}
function drawAddCategory() {
    var addCategory = '<h1>Add Category</h1><br />';
    addCategory += '<form role="form" class="add-Category-form col-md-6">';
    addCategory += '<div class="form-group ">';
    addCategory += '<label for="category-name">Category name:</label>';
    addCategory += '<input type="text" class="form-control" id="category-name">';
    addCategory += '</div>';
    addCategory += '<div class="form-group">';
    addCategory += '<label for="cat-desc">Description:</label>';
    addCategory += '<textarea class="form-control" id="cat-desc" cols="30" rows="3"></textarea>';
    addCategory += '</div>';
    addCategory += '<button type="button" id="btn-add-category" class="btn btn-success" onclick="AddCategAjax();">Add Category</button>';
    addCategory += '</form>';
    $('#content').html(addCategory);

}

function drawAddBrand() {
    var addBrand = '<h1>Add Brand</h1><br />';
    addBrand += '<form role="form" class="add-brand-form col-md-6">';
    addBrand += '<div class="form-group ">';
    addBrand += '<label for="Brand-name">Bradn name:</label>';
    addBrand += '<input type="text" class="form-control" id="Brand-name">';
    addBrand += '</div>';
    addBrand += '<div class="form-group">';
    addBrand += '<label for="Brand-desc">Description:</label>';
    addBrand += '<textarea class="form-control" id="brand-desc" cols="30" rows="3"></textarea>';
    addBrand += '</div>';
    addBrand += '<div class="form-group">';
    addBrand += '<label for="brand-photo-upload">photo:</label>';
    addBrand += '<input type="file" id="brand-photo-upload" multiple />';
    addBrand += '</div>';
    addBrand += '<button type="button" id="btn-add-brand" class="btn btn-success" onclick="AddBrancAjax();">Add Brand</button>';
    addBrand += '</form>';
    $('#content').html(addBrand);

}

function AddCategAjax() {
    catName = $('#category-name').val();
    catDesc = $('#cat-desc').val();

    $.ajax({
        url: 'services.asmx/AddCategory',
        type: 'POST',
        data: { cat_name: catName, cat_desc: catDesc },
        success: function (data) {
            if (data === 'true') {

                $("#alert-brand-fail").fadeIn('slow');
                $("#alert-brand-fail").fadeOut(5000)
            }
            else if (data === 'false') {
                $("#alert-brand").fadeIn('slow');
                $("#alert-brand").fadeOut(5000)
            }

        },

        error: function (data) {
            //  alert('success')
        }
    });

}

// add new brand
function AddBrancAjax() {
    var data = new FormData();
    var files = $("#brand-photo-upload").get(0).files;
    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("brandPhoto", files[0]);
    }
    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: 'services.asmx/uploadBrandPhoto',
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (photo, textStatus) {


        brandName = $('#Brand-name').val();
        brandDesc = $('#brand-desc').val();

        $.ajax({
            url: 'services.asmx/AddBrand',
            type: 'POST',
            data: { brand_name: brandName, brand_desc: brandDesc,brand_photo:photo },
            success: function (data) {

                if (data === 'true') {

                    $("#alert-brand-fail").fadeIn('slow');
                    $("#alert-brand-fail").fadeOut(5000)
                }
                else if (data === 'false') {
                    $("#alert-brand").fadeIn('slow');
                    $("#alert-brand").fadeOut(5000)
                }
            },

            error: function (data) {
                //  alert('success')
            }
        });
    })
}




//add new product
function AddProductAjax() {
    var data = new FormData();
    var files = $("#photo-upload").get(0).files;
    // Add the uploaded image content to the form data collection
    if (files.length > 0) {
        data.append("productPhoto", files[0]);
    }
   
    // Make Ajax request with the contentType = false, and procesDate = false
    var ajaxRequest = $.ajax({
        type: "POST",
        url: 'services.asmx/uploadPhoto',
        contentType: false,
        processData: false,
        data: data
    });

    ajaxRequest.done(function (photo, textStatus) {
        var product = {
            name: $('#product-name').val(),
            quantity: $('#product-quantity').val(),
            price: $('#product-price').val(),
            specifications: $('#product-desc').val(),
            prod_cat: $('#cat-id').val(),
            prod_brand: $('#brand-id').val(),
            p_photo: photo

        };

        $.ajax({
            url: 'services.asmx/AddProduct',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: '{ product:' + JSON.stringify(product) + '}',
            success: function (data) {
                $("#alert-brand").fadeIn('slow');
                $("#alert-brand").fadeOut(5000)
            },
            error: function (data) {
                $("#alert-brand-fail").fadeIn('slow');
                $("#alert-brand-fail").fadeOut(5000)
            }


        })

    });


}

//fill the categories dropdownlist
function FillCatLista(cats) {
    var content = '<select id="cat-id">';
    for (var i = 0; i < cats.length; i++) {
        content += '<option value="' + cats[i].id + '">' + cats[i].name + '</option>';
    }
    content += '</select>';
    $('#catlista').html(content);
}

//fill the brands dropdown list
function FillBrandLista(brands) {
    var cont = '<select id="brand-id">';
    for (var i = 0; i < brands.length; i++) {
        cont += '<option value="' + brands[i].id + '">' + brands[i].name + '</option>';
    }
    cont += '</select>';
    $('#brandlista').html(cont);
}

// fill categories and brands dropdown lists
function FillLists() {
    $.ajax({
        url: 'services.asmx/GetAllCats',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            FillCatLista(data);
        },

        error: function (data) {
            //  alert('success')
        }
    });

    $.ajax({
        url: 'services.asmx/GetAllBrands',
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            FillBrandLista(data)
        },

        error: function (data) {
            //  alert('success')
        }
    });
}

$(document).ready(function () {

    $('#add-product').on('click', function () {
        drawAddProduct();
    });

    $('#add-category').on('click', function () {
        drawAddCategory();
    });

    $('#add-brand').on('click', function () {
        drawAddBrand();
    });

    // manage products
    $('#manage-prod').on('click', function () {
        //$("#LoadingImage").show();

        //$.ajax({
        //    url: 'services.asmx/GetAllProducts',
        //    type: 'POST',
        //    dataType: 'json',
        //    data: { Page: String('all') },
        //    success: function (products) {
        //        $("#LoadingImage").hide();
        //        drawManageProducts(products);
        //    },

        //    error: function (data) {
        //        alert('error on manage-prod')
        //        //  alert('success')
        //    }
        //});
        alert('ok');

        rates = [];
        rates.push({
            userId: "576c0ade504af7a01fd69da2",
            rest_id:"576c0d2a65d394e027a1507b",
            resturantVote: 4
        });

        var data = {
            name: "from admin",
            description: "sha3by",
            photo: "photoooooooooooo",
            location: "medanElSa3a",
            mobile: "0101020102102",
            workingHours: {
                startAt: "10PM",
                endAt: "1AM"
            },
            rates:rates
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/eissa',
            success: function (data) {
                alert('success')
            }
        });
    });


    // manage brands
    $('#manage-brand').on('click', function () {
        $("#LoadingImage").show();

        $.ajax({
            url: 'services.asmx/GetAllBrands',
            type: 'POST',
            dataType: 'json',
            success: function (brands) {
                $("#LoadingImage").hide();
                drawManageBrands(brands);
            },

            error: function (data) {
                alert('erroror')
                //  alert('success')
            }
        });
    });

    // manage categories
    $('#manage-cat').on('click', function () {
        $("#LoadingImage").show();

        $.ajax({
            url: 'services.asmx/GetAllCats',
            type: 'POST',
            dataType: 'json',
            success: function (cats) {
                $("#LoadingImage").hide();
                drawManageCats(cats);
            },

            error: function (data) {
                alert('erroror')
                //  alert('success')
            }
        });
    });

});


function DeleteProduct() {
    if (confirm("Are you sure?")) {
        var anchor = $(event.currentTarget);
        pid = anchor.closest(".del-btn").data("pid");
        $.ajax({
            url: 'services.asmx/DeleteProduct',
            type: "POST",
            data: { p_id: pid },
            success: function (data) {
                $("#manage-prod").trigger("click");
            },
            error: function (err) {

            },
            complete: function () {
                //$(".loading").hide();
            }
        });
    }
    return false;

}

function DeleteBrand() {
    if (confirm("Are you sure?")) {
        var anchor = $(event.currentTarget);
        bid = anchor.closest(".del-brand").data("bid");
        $.ajax({
            url: 'services.asmx/DeleteBrand',
            type: "POST",
            data: { b_id: bid },
            success: function (data) {
                $("#manage-brand").trigger("click");
            },
            error: function (err) {

            },
            complete: function () {
                //$(".loading").hide();
            }
        });
    }
    return false;

}

function DeleteCat() {
    if (confirm("Are you sure?")) {
        var anchor = $(event.currentTarget);
        cid = anchor.closest(".del-cat").data("cid");
        $.ajax({
            url: 'services.asmx/DeleteCat',
            type: "POST",
            data: { c_id: cid },
            success: function (data) {
                $("#manage-cat").trigger("click");
            },
            error: function (err) {

            },
            complete: function () {
                //$(".loading").hide();
            }
        });
    }
    return false;

}