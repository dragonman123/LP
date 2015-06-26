// These are the test values
// var A=[3,2.4,1.8,1.2,0.6,0] // A is the line with max x intercept
// var B=[4,2,0]; // else B
var flag=0;
var arrayPoint=[];

$(document).ready(function(){
	$("#compositeFunction").hide();
})

var miny=0, maxy=0;
var yString;
var flag1=0;
var flag2=0;
var A=[] //A is the line with the max x intercept
var B=[] //else B

function drawChart(){
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
	// if(flag1==1 && flag2==1){
		maxy = parseInt(maxy) + 1;
		if(maxy > 10){
			maxy=10;
		}
		yString = miny.toString() + ":" + maxy.toString() + ":" + "1";
		drawChart();
	// }

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

function myFunc(a,b,c,decision){
	if(decision==0){
		flag1=1;
		var newObject = getValue(a,b,c);
		a1=newObject.f;
		b1=newObject.s;
		c1=newObject.t;
		fillArray(A,a1,b1,c1);
		$("#inputList1").fadeOut(1000, function() { $("#inputList1").remove(); });
	}
	else{
		newObject = getValue(a,b,c);
		flag2=1;
		a2=newObject.f;
		b2=newObject.s;
		c2=newObject.t;
		fillArray(B,a2,b2,c2);
		$("#inputList2").fadeOut(1000, function() { $("#inputList2").remove(); });

	}
	if(flag1==1 && flag2==1){
		$("#compositeFunction").fadeIn(1000, function() { 
			$(".inputValues").remove();
			$("#compositeFunction").show();
		});
		setTimeout(function() {
			console.log(a1,b1,c1,a2,b2,c2);
			$("#button3").click(function(){
				m=parseInt($("#input7").val());
				n=parseInt($("#input8").val());
				console.log(a1,b1,c1,a2,b2,c2);
				calculateMax(a1,b1,c1,a2,b2,c2);
			});
		}, 1000);
	}
}


function calcMin (a,b,m){
	a = Math.min(a,b);
	return {
		val: m*a,
		intercept: a
	}
}

function calculateMax(a1,b1,c1,a2,b2,c2){
	if( (a1*b2) == (a2*b1)){
		alert("Inconsistent Equations");
		return ;
	}
	x=((c1*b2)-(c2*b1))/((a1*b2)-(a2*b1)); 
	y=((c2*a1)-(c1*a2))/((a1*b2)-(a2*b1));
	if(x>=0 && y>=0) arrayPoint[3]=m*x+n*y;
	else arrayPoint[3]=0;

	arrayPoint[0]=0;
	
	//Calculate for the x intercept
	var tempDecision = calcMin(c1/a1, c2/a2, m);
	arrayPoint[1] = tempDecision.val;
	xIntercept = tempDecision.intercept;

	//Calculate for the y intercept
	tempDecision = calcMin(c1/b1, c2/b2, n);
	arrayPoint[2] = tempDecision.val;
	yIntercept = tempDecision.intercept;

	var timeDuration =1000;
	var delay=2000;

	setTimeout(function(){
		$("#paragraph1").html("The value of the function at (" + xIntercept.toFixed(2) + ',' + '0' + ') is '   + arrayPoint[1].toFixed(2));
		$("#paragraph1").animate({width:'toggle'},1000);
	}, timeDuration);
	timeDuration+=delay;

	setTimeout(function(){
		$("#paragraph2").html("The value of the function at (" + '0' + ',' + yIntercept.toFixed(2) + ') is '   + arrayPoint[2].toFixed(2));
		$("#paragraph2").animate({width:'toggle'},1000);
	}, timeDuration);

	timeDuration+=delay;

	if(x >=0 && y>=0){
		setTimeout(function(){
			$("#paragraph3").html("The value of the function at (" + x.toFixed(2) + ',' + y.toFixed(2) + ') is '   + arrayPoint[3].toFixed(2));
			$("#paragraph3").animate({width:'toggle'},1000);
		}, timeDuration);
	}

	$("#paragraphMain").html("Hence the maximum value of the function is "  + arrayPoint[3].toFixed(2));
	arrayPoint.sort(function(a,b){ return (a-b)});

	setTimeout(function(){
		$("#paragraphMain").fadeToggle("slow", "linear");
	},timeDuration + delay);
}