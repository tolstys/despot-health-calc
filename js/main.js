"use strict";

$(function () {
	let items = {
		tanks: [[250, .03], [500, .05], [650, .10], [900, .06], [1050, .07]],
		fencers: [[160, .05], [310, .06], [440, .07], [600, .08], [810, .09]],
		tricksters: [[100, .09], [160, .09], [200, .04], [380, .09], [500, .04]],
		fighters: [[120, .06], [230, .07], [450, .09], [600, .09], [770, .03]],
		healers: [[50, .10], [90, .10], [180, .10], [360, .10], [450, .10]],
		throwers: [[80, .07], [110, .07], [150, .10], [180, .07], [220, .07]],
		shooters: [[0, .00], [40, .10], [70, .04], [130, .07], [180, .09]],
		cultists: [[100, .05], [200, .06], [300, .07], [400, .08], [500, .09]],
		mages: [[30, .07], [40, .10], [60, .04], [110, .08], [800, .06]],
		eggheads: [[110, .06], [140, .06], [210, .10], [280, .10], [700, .10]],
		newbies: [[70, 0], [100, 0], [150, 0], [200, 0], [250, 0]],
		summons: [
			[[1313, 2626, 3939], [300], [600], [2000]],
			[[300, 500, 900], [4500], [7000], [10000]]
		],
	};
	let img = new Image(684, 334);
	img.onload = calc;
	img.src = 'img/items.png';

	let canvas = document.getElementById("items"),
		ctx = canvas.getContext("2d");

	function calc() {
		let level = parseInt($("input[name=level]").val(), 10) || 1,
			flat = parseInt($("input[name=flat]").val(), 10) || 0,
			percent = parseInt($("input[name=percent]").val(), 10) || 0,
			bonus = parseInt($("input[name=bonus]").val(), 10) || 0,
			fat = $("input[name=fat]").is(":checked") ? 1.25 : 1,
			bear = $("input[name=bear]").is(":checked") ? 1.3 : 1,
			fit = $("input[name=fit]").is(":checked") ? 1.1 : 1,
			flat_e = parseInt($("input[name=flat_e]").val(), 10) || 0,
			percent_e = parseInt($("input[name=percent_e]").val(), 10) || 0,
			summons = parseInt($("input[name=summons]").val(), 10) || 0;
		if (level < 1) level = 1;
		else if (level > 5) level = 5;
		let newbie_hp = items.newbies[level - 1][0];
		
		ctx.drawImage(img, 0, 0);
		let fontSize = 16;
		ctx.font = fontSize + "px fantasy";
		
		let mega = 0;
		let i = 0;
		$.each(items, function(itemClass, itemsClass){
			if (itemClass === 'newbies') {
				$.each(itemsClass, function(j, item){
					let hp = (item[0] + flat + flat_e) * (percent / 100 + 1) * fit * (percent_e / 100 + 1);
					hp = parseInt(hp, 10);
					let coords = [76 + i * 56, 43 + j * 55, 123 + i * 56, 93 + j * 55];
					var width = ctx.measureText(hp).width;
					ctx.fillStyle = "rgba(20, 15, 20, 0.8)";
					ctx.fillRect(+coords[0] + (47 - width) / 2 - 6, +coords[1] + 58 - fontSize, width + 12, fontSize + 4);
					ctx.fillStyle = "rgba(76, 175, 80, 0.9)";
					ctx.fillText(hp, +coords[0] + (47 - width) / 2, +coords[1] + 58);
					mega += parseInt($("input[name='lvl_" + (j + 1) + "']").val(), 10) * hp;
				});
			} else if (itemClass === 'summons') {
				$.each(itemsClass, function(j, items){
					$.each(items, function(k, item){
						let hp = (level <= item.length ? item[level - 1] : item[item.length - 1]) * (summons / 100 + 1) * fit;
						hp = parseInt(hp, 10);
						let coords = [160 + j * 31 + (i + j) * 56, 30 + k * 75, 123 + (i + j) * 56];
						var width = ctx.measureText(hp).width;
						ctx.fillStyle = "rgba(20, 15, 20, 0.8)";
						ctx.fillRect(+coords[0] + (47 - width) / 2 - 6, +coords[1] + 58 - fontSize, width + 12, fontSize + 4);
						ctx.fillStyle = "rgba(76, 175, 80, 0.9)";
						ctx.fillText(hp, +coords[0] + (47 - width) / 2, +coords[1] + 58);
					});
				});
			} else {
				$.each(itemsClass, function(j, item){
					let hp = (item[0] * Math.pow(item[1] + 1, level - 1) + newbie_hp + flat + bonus + flat_e) * (percent / 100 + 1) * fat * fit * (percent_e / 100 + 1);
					if (itemClass === "cultists") hp *= bear;
					hp = parseInt(hp, 10);
					let coords = [76 + i * 56, 43 + j * 55, 123 + i * 56, 93 + j * 55];
					var width = ctx.measureText(hp).width;
					ctx.fillStyle = "rgba(20, 15, 20, 0.8)";
					ctx.fillRect(+coords[0] + (47 - width) / 2 - 6, +coords[1] + 58 - fontSize, width + 12, fontSize + 4);
					ctx.fillStyle = "rgba(76, 175, 80, 0.9)";
					ctx.fillText(hp, +coords[0] + (47 - width) / 2, +coords[1] + 58);
				});
			}
			++ i;
		});
		mega *= (summons / 100 + 1);
		var coords = [701, 268];
		var width = ctx.measureText(mega).width;
		ctx.fillStyle = "rgba(20, 15, 20, 0.8)";
		ctx.fillRect(+coords[0] + (47 - width) / 2 - 6, +coords[1] + 58 - fontSize, width + 12, fontSize + 4);
		ctx.fillStyle = "rgba(76, 175, 80, 0.9)";
		ctx.fillText(mega, +coords[0] + (47 - width) / 2, +coords[1] + 58);
	}
	
	$("input").on("input", function(){
		calc();
	});
});