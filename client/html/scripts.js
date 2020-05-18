var itemName = null;
var itemAmount = null;
var itemIdname = null;
var dataType = null;
var elements = [];
var invStyle = null;
var sItem = null;

$(document).ready(function() {

    setTheme();
    $(".container").show();
    $(".style-1").hide();
    $(".style-2").show();
    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.show == true) {
            dataType = item.dataType;
            $(".inv_e_label").html("Mochila");

            invStyle = item.style

            if (item.style == 1) {
                $(".style-1").hide();
                $(".style-2").show();
                $(".style-2 .inv_e_weight .label_1").html(item.p_i_weight + "/" + item.p_i_maxWeight + " kg");

                var tryIt = (item.p_i_weight / item.p_i_maxWeight) * 100
                $(".style-2 .inv_e_weight .progress_1").css("width", tryIt + "%");
            } else {
                $(".style-2").hide();
                $(".style-1").show();
                $(".inv_e_weight .label_1").html(item.p_i_weight + "/" + item.p_i_maxWeight + " kg");
                $(".inv_d_weight .label_1").html(item.i_weight + "/" + item.i_maxWeight + " kg");

                var tryIt = (item.p_i_weight / item.p_i_maxWeight) * 100
                var tryIt2 = (item.i_weight / item.i_maxWeight) * 100
                $(".style-1 .inv_e_weight .progress_1").css("width", tryIt + "%");
                $(".style-1 .inv_d_weight .progress_1").css("width", tryIt2 + "%");
            }


            if (dataType[2] >= 3) {
                $("#sendme").html("COLOCAR");
                $("#sendme2").html("RETIRAR");
                $(".inv_d_label").html("Bau");
                $(".inv_d_weight_l").html("Bau");
            } else if (dataType[2] == 2) {
                $("#sendme").html("COLOCAR");
                $("#sendme2").html("RETIRAR");
                $(".inv_d_label .label_1").html("Porta Malas");
                $(".inv_d_weight_l").html("Porta Malas");
            } else {
                $("#sendme").html("Enviar");
            }
            open();
        }
        if (item.show == false) {
            close();
        }

        if (item.pinventory) {
            $(".inv_esquerda_items").empty();
            item.pinventory.forEach(element => {
                $(".inv_esquerda_items").append(`

<div class="dropdown">
  <button class="dropbtn"><div class="inner-pitems" onmouseover="selectItem(this)" data-name="${element.name}" data-amount="${element.amount}" data-idname="${element.idname}" data-itemWeight="${element.item_peso}" style="background-image: url('assets/icons/${element.icon}'); background-size: 80px 80px;">
            <p class="amount">${element.amount} <span class="peso">${element.item_peso}Kg</span></p>
            
            <p class="name">${element.name}</p>
          </div></button>
  <div class="dropdown-content">
    <a onclick="useItem()">Usar</a>
    <a onclick="dropItem()">Dropar</a>
    <a  onclick="giveItem()" id="sendme3">Dar</a>
  </div>
</div>
        `);
            });
        }

        if (item.inventory && dataType[2] > 1) {
            $(".inv_direita_items").empty();
            item.inventory.forEach(element => {
                $(".inv_direita_items").append(`
			<div class="inner-items" onmouseover="selectItem(this)" data-name="${element.name}" data-amount="${element.amount}" data-idname="${element.idname}" data-itemWeight="${element.item_peso}" style="background-image: url('assets/icons/${element.icon}'); background-size: 80px 80px;">
			<p class="amount">${element.amount} <span class="peso">${element.item_peso}Kg</span></p>

			<p class="name">${element.name}</p>
			</div>
			`);
            });
        }

        if (item.inventory && dataType[2] == 1) {
            $(".eq_items").empty();
            item.inventory.forEach(element => {
                $(".eq_items").append(`
			<div class="inner-items" data-name="${element.name}" data-amount="${element.amount}" data-idname="${element.idname}" data-itemWeight="${element.item_peso}" style="background-image: url('assets/icons/${element.icon}'); background-size: 80px 80px;">
			</div>
			`);
            });
        }


        if (item.notification == true) {
            Swal.fire(
                item.title,
                item.message,
                item.type
            )
        }

    });
    document.onkeyup = function(data) {
        if (data.which == 27) {
            $.post('http://vrp_craft/close', JSON.stringify({}));
        }
    };
    $(".btnClose").click(function() {
        $.post('http://vrp_craft/close', JSON.stringify({}));
    });

    var dragAndDrop = {

        limit: 3,
        count: 0,

        init: function() {
            this.dragula();
            this.drake();
        },

        drake: function() {
            this.dragula.on('drop', this.dropped.bind(this));
        },

        dragula: function() {
            this.dragula = dragula([document.querySelector('#container1'), document.querySelector('#container2'), document.querySelector('#container3')], {
                moves: this.canMove.bind(this),
                copy: true,
            });
        },

        canMove: function() {
            return this.count < this.limit;
        },

        dropped: function(el) {
            this.count++;
        }

    };
    dragAndDrop.init();



    let one = document.querySelector('#container1')
    let two = document.querySelector('#container2')
    let three = document.querySelector('#container3')
    var drake = dragula([one, two, three])

    drake.on('drag', function(el, source) {})
    drake.on('drop', function(el, target) {
        //ao dropar o item 


    })
});






function open() {
    $(".container").fadeIn();
    clearSelectedItem();
}

function close() {
    $(".container").fadeOut();
    clearSelectedItem();
}



function setTheme() {
    if (configs.theme.primary_color && configs.theme.secondary_color) {
        let primary_color = `--primary-color: ${configs.theme.primary_color}; `;
        let secondary_color = `--secondary-color: ${configs.theme.secondary_color}; `;
        $(":root").attr("style", primary_color + secondary_color);
    }
}

function clearSelectedItem() {
    itemName = null;
    itemAmount = null;
    itemIdname = null;
    $(sItem).css("background-color", "rgba(0,0,0,.2)");
    $(sItem).removeClass("pulse");
}