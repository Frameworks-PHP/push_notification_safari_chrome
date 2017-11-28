// Date range filter

$(document).ready(function () {
    var oTable;
    getData();
    function getData() {
        $.ajax({
            url: "/api/load_history_chrome",
            dataType: 'json',
            method: "GET",
            bRetrieve: true,
            bDestroy: true,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
            },
            success: function (data, textStatus, jqXHR) {
                findDate(data);
            }
        });

    }

    function findDate(data) {
        var oTable = $('#data_table').dataTable({
            "aaData": data,
            aoColumns: [
                {
                    sTitle: "Date Push",
                    mData: "date"
                },
                {
                    sTitle: "Domain",
                    mData: "sitename",
                },
                {
                    sTitle: "Title",
                    mData: "title"
                },
                {
                    sTitle: "Body",
                    mData: "body",
                },
                {
                    sTitle: "Icon",
                    mData: "icon",
                },
                {
                    sTitle: "Image",
                    mData: "image",
                },
                {
                    sTitle: "URL",
                    mData: "url",
                }
            ],
            oLanguage: {
                "sSearch": "Filter Data"
            },
            iDisplayLength: -1,
            bProcessing: true,
            bPaginate: true,
            bJQueryUI: false,
            bAutoWidth: false,
            bSort: false,
            bRetrieve: true,
            bDestroy: true,
            sPaginationType: "full_numbers"
        });

        $("#datepicker_from").datepicker({
            showOn: "button",
            buttonImageOnly: false,
            "onSelect": function (date) {
//                datetime = date+" 00:00:00";
                minDateFilter = new Date(date).getTime();
                oTable.fnDraw();
            }
        }).keyup(function () {
            minDateFilter = new Date(this.value).getTime();
            oTable.fnDraw();
        });

        $("#datepicker_to").datepicker({
            showOn: "button",
            buttonImageOnly: false,
            "onSelect": function (date) {
                maxDateFilter = new Date(date).getTime();
                oTable.fnDraw();
            }
        }).keyup(function () {
            maxDateFilter = new Date(this.value).getTime();
            oTable.fnDraw();
        });
    }

    minDateFilter = "";
    maxDateFilter = "";

    $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, aData, iDataIndex) {
                if (typeof aData._date == 'undefined') {
                    aData._date = new Date(aData[0]).getTime();
                }

                if (minDateFilter && !isNaN(minDateFilter)) {
                    if (aData._date < minDateFilter) {
                        return false;
                    }
                }

                if (maxDateFilter && !isNaN(maxDateFilter)) {
                    if (aData._date > maxDateFilter) {
                        return false;
                    }
                }

                return true;
            }
    );
});