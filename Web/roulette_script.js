var arr = [];
var arr_index = 0;
var text_h = 0;

(function($) {
	$.fn.extend({
		roulette: function(options) {
			var defaults = {
					angle: 0,
					angleOffset: -45,
					speed: 5000,
					easing: "easeInOutElastic",
			};
			var opt = $.extend(defaults, options);

			return this.each(function() {
				var o = opt;
				var data = arr;
				var $wrap = $(this);
				var $btnStart = $wrap.find("#btn-start");
				var $roulette = $wrap.find(".roulette");
				var wrapW = $wrap.width();
				var angle = o.angle;
				var angleOffset = o.angleOffset;
				var speed = o.speed;
				var esing = o.easing;
				var itemSize = data.length;
				var itemSelector = "item";
				var labelSelector = "label";
				var d = 360 / itemSize;
				var borderTopWidth = wrapW;
				var borderRightWidth = tanDeg(d);
				for (i = 1; i <= itemSize; i += 1) {
					var idx = i - 1;
					var rt = i * d + angleOffset;
					var itemHTML = $('<div class="' + itemSelector + '">');
					var labelHTML = '';
					labelHTML += '<p class="' + labelSelector + '">';
					labelHTML += '<span class="text" style="font-size:1em">' + data[idx].text + '<\/span>';
					labelHTML += '<\/p>';
					$roulette.append(itemHTML);
					$roulette.children("." + itemSelector).eq(idx).append(labelHTML);
					$roulette.children("." + itemSelector).eq(idx).css({
						"left": wrapW / 2,
						"top": -wrapW / 2,
						"border-top-width": borderTopWidth,
						"border-right-width": borderRightWidth,
						"border-top-color": data[idx].color,
						"transform": "rotate(" + rt + "deg)"
					});
					var textH = parseInt(((2 * Math.PI * wrapW) / d) * text_h);
					$roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
						"height": textH + 'px',
						"line-height": textH + 'px',
						"transform": 'translateX(' + (textH * 1.3) + 'px) translateY(' + (wrapW * -.3) + 'px) rotateZ(' + (90 + d * .5) + 'deg)'
					});
				}
				
				function tanDeg(deg) {
					var rad = deg * Math.PI / 180;
					return wrapW / (1 / Math.tan(rad));
				}
				$btnStart.on("click", function() {
					if(arr_index >=4 && arr_index <= 12)
						rotation();
					else{
						alert('4개 이상 12개 이하의 메뉴를 입력하세요');
					}
				});
				function rotation() {
					var completeA = 360 * r(5, 10) + r(0, 360);	
					$roulette.rotate({
						angle: angle, 
						animateTo: completeA,
						center: ["50%", "50%"],
						easing: $.easing.esing,
						callback: function() {
							var currentA = $(this).getRotateAngle();
							console.log(currentA%360);		        
						},
						duration: speed
					});
				}
			});
		}
});
})(jQuery);

function select_btn(str){
	if(arr_index > 12){
		alert('더 이상 입력할 수 없습니다.');
	}
	else{
		arr[arr_index] = {
				color : "#" + Math.round(Math.random() * 0xffffff).toString(16),
				text : str	
		}
		arr_index++;
		$(function() {
			setting_text_h();
			$('.box-roulette').roulette();
		});
	}
}

function input_btn(){
	if(arr_index < 12){
		var str = document.getElementById("input").value;
		if(str == "")
			alert('메뉴를 입력하세요!');
		else{
			arr[arr_index] = {
				color : "#" + Math.round(Math.random() * 0xffffff).toString(16),
				text : str	
			}
			arr_index++;
			$(function() {
				setting_text_h();
				$('.box-roulette').roulette();
			});
		}
	}
	else{
		alert('더 이상 입력할 수 없습니다.');
	}
}
function delete_btn(){
	var str = document.getElementById("input").value;
	const idx = arr.findIndex(function(item){return item.text == str});
	if(idx > -1){
		arr.splice(idx,1);
		arr_index--;
		$('#roulette').empty();
		$(function() {
			setting_text_h();
			$('.box-roulette').roulette();
		});
	}
}
function clear_btn(){
	arr.splice(0,arr_index);
	arr_index = 0;
	$('#roulette').empty();
}
function setting_text_h(){
	switch (arr_index){
		case 4 :
			text_h = 4.5;
			break;
		case 5 :
			text_h = 3;
			break;
		case 6 :
			text_h = 2;
			break;
		case 7 :
			text_h = 1.5;
			break;
		case 8 :
			text_h = 1;
			break;
		case 9 :
			text_h = 1;
			break;
		case 10 :
			text_h = 0.8;
			break;
		default:
			text_h = 0.5;
	}
	console.log(text_h);
}

function r(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}