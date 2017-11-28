var getListDomain = (function getListDomain(){

    var listSite =  fetch('/api/domain', {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                    })
                    .then((response) => response.json())
                    .then((responseJSON) => {
                            addOptionSite(responseJSON, document.querySelector('#list-domain-send-noti'));
                            $("#list-webpushid-send-noti").val(responseJSON[0]['webpushid']);
                            return (responseJSON);
                    });

}());

//load icon image with domain
//function loadIcon()

function addOptionSite(objectJson, selectListDomain){
//    var selectListSite = selectListSite;
    var x;
    for(x in objectJson){
        var opt = document.createElement('option');
        opt.value = objectJson[x]._id;
        opt.text = objectJson[x].site;
        selectListDomain.appendChild(opt);
    }
}

$( "#pushNotification" ).on( "click", pushNotification );

function pushNotification() {
    var pushData = $('#formPushNotification').serializeArray();
    var result = { };
    $.each(pushData, function() {
        result[this.name] = this.value;
    });
    result["domain_name"] = $('#list-domain-send-noti option:selected').text();

    fetch('/api/pushChrome', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(result),
    })
//    .then(function(response) { 
////        return response.json()
//        return response
//    })
//    .then(function() {   
//        return fetch('/api/save_history',{
//            method: 'post',
//            headers: {
//                'Content-type': 'application/json'
//            },
//            body: JSON.stringify(result)
//        })
//    });
}

//submit form upload icon
$('#btnuploadicon').on('click', function(){ 
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
        dataType : 'json',  

        success: function(jsonData){
            console.log(jsonData);
            if(jsonData.code == true){
                $('#uploaddone').val(1);
            }
        }
    }); 
});

//change image icon when 