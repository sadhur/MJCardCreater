function getCardType(id)
{
    return (id - id % 100) / 100;
}

function getCardSN(id)
{
    return (id % 100 - id % 10) / 10;
}
function initCard(clonedCard, id, type, sn)
{
    clonedCard.attr("id", id);

    if([1,2,3].indexOf(type) != -1)
    {
        clonedCard.html(sn + " " + getTypeName(type, sn));
    }
    else
    {
        clonedCard.html( getTypeName(type, sn));
    }

    return clonedCard;
}
function getTypeName(type, sn)
{
    var map = ["花", "萬", "條", "筒", "字"];
    var mapWind = ["東", "南", "西", "北",  "中", "發", "白"];//風，中發白
    if(type == 4)
    {
        return mapWind[sn-1];
    }

    var mapFlower = ["春", "夏", "秋", "冬",
        "梅", "蘭", "竹", "菊"];
    if(type == 0)
    {
        return mapFlower[sn -1];
    }

    return map[type]
}
function outIDArray(cardlist)//param cardList is jquery object
{
    var arr = [];
    cardlist.each(function()
    {
        arr.push(this.id);
    });
    return arr;
}

function updateCardNum()
{
    $("div.save-area").each(function()
    {
        $(this).find(".card-num").html($(this).find("a.card").length);
    });
}

$(document).ready(function()
{


    var ids =
        [
            110, 111, 112, 113, 120, 121, 122, 123, 130, 131, 132, 133,       //萬
            140, 141, 142, 143, 150, 151, 152, 153, 160, 161, 162, 163,
            170, 171, 172, 173, 180, 181, 182, 183, 190, 191, 192, 193,

            210, 211, 212, 213, 220, 221, 222, 223, 230, 231, 232, 233,        //條
            240, 241, 242, 243, 250, 251, 252, 253, 260, 261, 262, 263,
            270, 271, 272, 273, 280, 281, 282, 283, 290, 291, 292, 293,

            310, 311, 312, 313, 320, 321, 322, 323, 330, 331, 332, 333,        //筒
            340, 341, 342, 343, 350, 351, 352, 353, 360, 361, 362, 363,
            370, 371, 372, 373, 380, 381, 382, 383, 390, 391, 392, 393,

            410, 411, 412, 413, 420, 421, 422, 423, 430, 431, 432, 433, 440, 441, 442, 443,//風，中發白
            450, 451, 452, 453, 460, 461, 462, 463, 470, 471, 472, 473,

            10, 20, 30, 40, 50, 60, 70, 80
        ];

    var mark = $("<span id='mark'></span>");



    //************************************************
    var card = $("a.card").detach();
    for(var i = 0; i < ids.length; i++)
    {
        var id = ids[i];
        var type = getCardType(id);
        var sn = getCardSN(id);
        var c = initCard(card.clone(), id, type, sn);
        c.css("color", ["#ffffff", "#0000ff", "#00ff00", "#ff0000", "#550000"][type]);
//                                  var cl = ["text-warning", "text-error", "text-info", "text-success", "muted"][type];
//                                  c.wrapInner("<span class='"+cl+"'/>");

        c.appendTo($("#cards"));
    }

    $("a.card").draggable();
    $("a.card").bind("dragstart", function(event, ui)
    {
    });

    $("a.card").bind("dragstop", function(event, ui)
    {
        updateCardNum();

    });


    $("a.card").droppable();
    $("a.card").bind("dropover", function(event, ui)
    {
        $(this).css("margin-right", 50);
    });
    $("a.card").bind("dropout", function(event, ui)
    {
        $(this).css("margin-right", "");
    });
    $("a.card").bind("drop", function(event, ui)
    {
        $(this).css("margin-right", "");
        mark.insertAfter(event.target);


    });

    //********************************
    $("#cards").css("margin", 10);
    $("#cards").droppable();
    $("#cards").bind("dropover", function(event, ui)
    {

        mark.appendTo(event.target);

    });
    $("#cards").bind("drop", function(event, ui)
    {

        ui.draggable.css("left", "");
        ui.draggable.css("top", "");

        if($(event.target).has(mark))
        {
            ui.draggable.detach().insertAfter(mark);
        }
        else
        {
            ui.draggable.detach().appendTo(event.target);
        }
    });


    $("#seat1,#seat2, #seat3, #seat4").droppable();
    $("#seat1, #seat2, #seat3, #seat4").bind("dropover", function(event, ui)
    {
        $(event.target).css("background-color", "#00ff00");
        mark.appendTo(event.target);

    });
    $("#seat1, #seat2, #seat3, #seat4").bind("dropout", function(event, ui)
    {
        $(event.target).css("background-color", "");

    });

    $("#seat1, #seat2, #seat3, #seat4").bind("drop", function(event, ui)//dropdeactivate     drop
    {
        $(event.target).css("background-color", "");
        ui.draggable.css("left", "");
        ui.draggable.css("top", "");

        if($(event.target).has(mark))
        {
            ui.draggable.detach().insertAfter(mark);
        }
        else
        {
            ui.draggable.detach().appendTo(event.target);
        }
    });


    $("button.order").click(function ()
    {
        var card_area = $("div.save-area").has(this);
        var cards = card_area.find("a.card");
        cards.detach();

        var arr = [];
        cards.each(function()
        {
            arr.push(this);
        });

        arr.sort(function(a, b)
        {
            return a.id - b.id;
        });

        card_area.append(arr);
    });


    $("button.random").click(function ()
    {
        var card_area = $("div.save-area").has(this);
        var cards = card_area.find("a.card");
        cards.detach();

        var arr = [];
        cards.each(function()
        {
            arr.push(this);
        });

        arr.sort(function(a, b)
        {
            return (Math.round(Math.random()) - 0.5);
        });

        card_area.append(arr);
    });
    //*******************************************************
    //
    $("button#out").click(function()
    {
        var cardListWall = $("#cards > a.card");
        var cardList1 = $("#seat1 > a.card");
        var cardList2 = $("#seat2 > a.card");
        var cardList3 = $("#seat3 > a.card");
        var cardList4 = $("#seat4 > a.card");


        var str =
            outIDArray(cardList1).join(",") + ",<br><br>" +
                outIDArray(cardList2).join(",") + ",<br><br>" +
                outIDArray(cardList3).join(",") + ",<br><br>" +
                outIDArray(cardList4).join(",") + ",<br><br>" +
                outIDArray(cardListWall).join(",") + "<br><br>";

        $("div#id-list").html(str);


    });

});

