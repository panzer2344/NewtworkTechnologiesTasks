$(document).ready(() => {
    $('#makeOrder').click(() => {
        $.post("/makeOrder", {
            "hs" : getCheckedIndex("hs"),
            "rs" : getCheckedIndex("rs"),
            "cs" : getCheckedIndex("cs")
        }).done((data) => {
            let response = jQuery.parseJSON(data);
            /*$('#hs').text(JSON.stringify(response["hs"]));
            $('#rs').text(JSON.stringify(response["rs"]));
            $('#cs').text(JSON.stringify(response["cs"]));*/
            $('#time').text(JSON.stringify(response["time"]));
            $('#data').attr("hidden", false);
            $('#prices').attr("hidden", true);
        });
    });
});

function getCheckedIndex(name){
    let index = -1;
    $('input[name=' + name + ']').each((i)=> {
        if ($('input[name=' + name + ']')[i].checked) {
            index = i;
        }
    });
    return index !== -1 ? index : "default";
}

function renderTimeTable(time){
    time.forEach((value, index, array) => {})
}