// These are the test values
// var A=[3,2.4,1.8,1.2,0.6,0] // A is the line with max x intercept
// var B=[4,2,0]; // else B
$(document).ready(function(){
	$("#compositeFunction").hide();
})

var miny=0, maxy=0;
var yString;
var flag1=0;
var flag2=0;

$(function () {
	// inputHolderWidth();
});

var A=[] //A is the line with the max x intercept
var B=[] //else B

function drawChart(){
	// alert(yString);
	var chartData = {
		"graphset":[
		{
			"type":"area",
			"scale-x":{
				"zooming":true,
				"values":"0:10:1"
			},
			"scale-y":{
				"zooming":true,
				"values": yString,
			},

			"chart":{
				"margin-bottom":50
			},
			"series":[

			{ "values": A,
			"background-color": "red",
			"line-color":"black"},
			{"values":B,
			"background-color": "blue",
			"line-color":"black",},
			],
		}
		]
	}
	zingchart.render({
		id:'chartDiv',
		height:350,
		width:600,
		data:chartData
	});
};
function fillArray(array,a,b,c){
	var count=0;
	var y;
	for(var x=0;x<=10;x++){
		y=(c-(a*x))/b;	
		array[count++] = y;
		if(y<miny && y>=0){
			miny=y;
		}
		if(y>maxy && y>=0){
			maxy=y;
		}
	}
	if(flag1==1 && flag2==1){
		maxy = parseInt(maxy) + 1;
		if(maxy > 10){
			maxy=10;
		}
		yString = miny.toString() + ":" + maxy.toString() + ":" + "1";
		drawChart();
	}

}
var m,n;
function getValue(a,b,c){
	var an=$("#input" + a).val();
	var bn=$("#input" + b).val();
	var cn=$("#input" + c).val();
	// alert("Returning " + a1 + "-" + b1 + "-" + c1);
	return {
		f: an,
		s: bn,
		t: cn
	}

}

function myFunc(a,b,c){
	flag1=1;
	var newObject = getValue(a,b,c);
	a1=newObject.f;
	b1=newObject.s;
	c1=newObject.t;
	fillArray(A,a1,b1,c1);
	a=4;
	b=5;
	c=6;
	newObject = getValue(a,b,c);
	flag2=1;
	a2=newObject.f;
	b2=newObject.s;
	c2=newObject.t;
	fillArray(B,a2,b2,c2);

	console.log(a1,b1,c1,a2,b2,c2);
	$(".inputValues").remove();
	$("#compositeFunction").show();
	// $("#compositeFunction").append('<button id="button2" class="buttons" onclick="location.reload(true)">Reset</button>');

	$("#button3").click(function(){
		// alert("Hello")
		m=parseInt($("#input7").val());
		n=parseInt($("#input8").val());
		console.log(a1,b1,c1,a2,b2,c2);
		calculateMax(a1,b1,c1,a2,b2,c2);
	});
}


var arrayPoint=[];
function calculateMax(a1,b1,c1,a2,b2,c2){
	if( (a1*b2) == (a2*b1)){
		alert("Inconsistent Equations");
		return ;
	}
	x=((c1*b2)-(c2*b1))/((a1*b2)-(a2*b1)); 
	y=((c2*a1)-(c1*a2))/((a1*b2)-(a2*b1));
	// c=parseInt($('#input7').val());
	// d=parseInt($('#input8').val());
	if(x>=0 && y>=0)
	{ 
		arrayPoint[3]=m*x+n*y;
	//	alert("HEELOI i"); 
}
else
	arrayPoint[3]=0;
arrayPoint[0]=0;
if(c1/a1 > c2/a2)
	{
		arrayPoint[1]=m*(c2/a2);
		xIntercept=c2/a2;
	}
else

	{
		arrayPoint[1]=m*(c1/a1);
		xIntercept=c1/a1;
	}
console.log(c1/a1);
console.log(c2/a2);
console.log("X and y are " + x + " and " + y);
if(c1/b1 > c2/b2)
	{
		arrayPoint[2]=n*(c2/b2);
		yIntercept=c2/b2;
	}
else

	{
		arrayPoint[2]=n*(c1/b1);
		yIntercept=c1/b1;
	}
console.log(c1/b1);
console.log(c2/b2);
// console.log(arrayPoint);
$("#paragraph1").html("Hence the function value at " + xIntercept + ',' + '0' + 'is'   + arrayPoint[1]);
$("#paragraph1").animate({width:'toggle'},1000);
$("#paragraph2").html("Hence the the function value at " + '0' + ',' + yIntercept + 'is'   + arrayPoint[2]);
$("#paragraph2").animate({width:'toggle'},1000);
$("#paragraph3").html("Hence the the function value at " + x + ',' + y + 'is'   + arrayPoint[3]);
$("#paragraph3").animate({width:'toggle'},1000);
setTimeout(function(){
	arrayPoint.sort(function(a,b){ return (a-b)});
console.log(arrayPoint)
$("#paragraph").html("Hence the max is "  + arrayPoint[3]);
$("#paragraph").animate({width:'toggle'},1000);
},4000);



}
