var sent = "I am showing all the power of the Visualizer embedded web technology."
var sentSplit = sent.split(" ");

var dragStartX = null;
var dragDeltaX = null;
var cr=162;
var cg=200;
var cb=221;
var rColor=null;
var n = 1;
var c = 1;
$(document).ready(function(){
	
	function randColor(){
		cr=162;
		cg=200;
		cb=221;
		cr = cr + Math.floor((Math.random() * 55) + 1);
		cg = cg + Math.floor((Math.random() * 15) + 1);
		cb = cb + Math.floor((Math.random() * 15) + 1);
		rColor=("rgb("+cr+","+cg+","+cb+")");
		console.log("randColor = "+rColor);
	}
	
	$(".box").each(function(){
		randColor();
		$(this).css("background-color",rColor);
	});
	
function boxFall(){
	console.clear();
	$(".boxAnim").css("top","0px");
	randColor();
	
	$(".boxAnim").css("background-color",rColor);
	console.log("new color = "+$(".boxAnim").css("background-color"));
	$(".boxAnim").css("opacity",1);
	$(".boxAnim").css("color","rgba(0,0,0,0)");
	$(".boxAnim").animate({
		top:"340px",
		opacity:.2},
		200,
		function(){
			
			console.log("complete");
			c=c+1;
			$(".boxAnim").html(sentSplit[c + 1]);
			$(".boxTop").html(sentSplit[c + 1]);
			$(".box1").css("background-color",rColor);
			if (c > sentSplit.length){
				c = 1;
			}
			var bb = 6;
			while (bb > 0){
				var sColor = $(".box"+(bb-1)).css("background-color");
				var sText = $(".box"+(bb - 1)).html();
				$(".box"+bb).css("background-color",sColor);
				$(".box"+bb).html(sText);
				bb = bb-1;
			}
			
		});
}
var animTimer = setInterval(function(){
	boxFall();
	console.log("animate "+c);
	},400);
	if (c > 5){
		clearInterval(animTimer);
	}
});