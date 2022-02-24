"use strict";

$(function () {
	let items = {
		tanks: [[220, .03], [370, .05], [530, .10], [710, .06], [900, .07]],
		fencers: [[160, .05], [310, .06], [440, .07], [600, .08], [810, .09]],
		tricksters: [[130, .09], [180, .09], [240, .04], [450, .08], [690, .04]],
		fighters: [[120, .04], [230, .09], [450, .09], [600, .09], [770, .03]],
		healers: [[10, .10], [50, .10], [90, .10], [130, .10], [180, .10]],
		throwers: [[80, .07], [110, .07], [150, .10], [200, .07], [250, .07]],
		shooters: [[0, .00], [40, .10], [70, .04], [130, .07], [180, .09]],
		cultists: [[90, .05], [170, .06], [240, .07], [350, .08], [490, .09]],
		mages: [[10, .07], [40, .10], [60, .04], [650, .06], [110, .08]],
		eggheads: [[110, .06], [140, .06], [210, .10], [280, .10], [700, .06]]
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
			fat = $("input[name=fat]").is(":checked") ? 1.3 : 1,
			bear = $("input[name=bear]").is(":checked") ? 1.3 : 1,
			fit = $("input[name=fit]").is(":checked") ? 1.1 : 1,
			flat_e = parseInt($("input[name=flat_e]").val(), 10) || 0,
			percent_e = parseInt($("input[name=percent_e]").val(), 10) || 0;
		if (level < 1) level = 1;
		else if (level > 5) level = 5;
		let newbie_hp = level === 5 ? 250 : 70 + 30 * (level - 1);
		ctx.drawImage(img, 0, 0);
		let fontSize = 16;
		ctx.font = fontSize + "px fantasy";
		
		let i = 0;
		$.each(items, function(itemClass, itemsClass){
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
			++ i;
		});
	}
	
	$("input").on("input", function(){
		calc();
	});
});