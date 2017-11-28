//load icon image with domain
//function loadIcon()

var certP12file = '';
var certPushfile = '';
var iconfile = '';

function addOptionSite(objectJson, selectListDomain) {
//    var selectListSite = selectListSite;
    var x;
    for (x in objectJson) {
        var opt = document.createElement('option');
        opt.value = objectJson[x]._id;
        opt.text = objectJson[x].site;
        selectListDomain.appendChild(opt);
    }
}

$("#saveDomainNotification").on("click", saveNotification);

function saveNotification() {
    var saveData = $('#formSaveDomain').serializeArray();
    var result = {};
    $.each(saveData, function () {
        result[this.name] = this.value;
    });
    if (certP12file == "" || $('#uploaddonecertP12').val() != '1') {
        alert("certP12 file can't empty");
        return false;
    }
    if (certPushfile == "" || $('#uploaddonecertPush').val() != '1') {
        alert("certPush file can't empty");
        return false;
    }
    if (iconfile == "" || $('#uploaddone').val() != '1') {
        alert("icon file can't empty");
        return false;
    }
    result["certP12file"] = certP12file;
    result["certPushfile"] = certPushfile;
    result["iconfile"] = iconfile;

    fetch('/api/EditSite', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(result),
    }).then((response) => response.json())
            .then((responseJSON) => {
                alert(responseJSON.message);
            })
}

//submit form upload icon
$('#btnuploadicon').on('click', function () {
    var data = new FormData();

    data.append('domain', $("#list-domain-send-noti option:selected").text());
    data.append('file', $('#fileuploadicon').prop('files')[0]);

    // append other variables to data if you want: data.append('field_name_x', field_value_x);
    $.ajax({
        type: 'POST',
        processData: false, // important
        contentType: false, // important
        data: data,
        url: "/uploadIcon",
        dataType: 'json',
        success: function (jsonData) {
            console.log(jsonData);
            if (jsonData.code == true) {
                $('#uploaddone').val(1);
                iconfile = jsonData.filename;
            }
        }
    });
});

$('#btnuploadcertP12').on('click', function () {
    if ($("#notification-domain").val().replace(/^\s+|\s+$/g, "").length == 0) {
        alert("Domain can't empty");
        return false;
    }
    var data = new FormData();

    data.append('domain', $("#notification-domain").val());
    data.append('file', $('#fileuploadcertP12').prop('files')[0]);

    // append other variables to data if you want: data.append('field_name_x', field_value_x);
    $.ajax({
        type: 'POST',
        processData: false, // important
        contentType: false, // important
        data: data,
        url: "/uploadcert",
        dataType: 'json',
        success: function (jsonData) {
            console.log(jsonData);
            if (jsonData.code == true) {
                $('#uploaddonecertP12').val(1);
                certP12file = jsonData.filename;
            }
        }
    });
});

$('#btnuploadcertPush').on('click', function () {
    if ($("#notification-domain").val().replace(/^\s+|\s+$/g, "").length == 0) {
        alert("Domain can't empty");
        return false;
    }
    var data = new FormData();

    data.append('domain', $("#notification-domain").val());
    data.append('file', $('#fileuploadcertPush').prop('files')[0]);

    // append other variables to data if you want: data.append('field_name_x', field_value_x);
    $.ajax({
        type: 'POST',
        processData: false, // important
        contentType: false, // important
        data: data,
        url: "/uploadcert",
        dataType: 'json',
        success: function (jsonData) {
            console.log(jsonData);
            if (jsonData.code == true) {
                $('#uploaddonecertPush').val(1);
                certPushfile = jsonData.filename;
            }
        }
    });
});

