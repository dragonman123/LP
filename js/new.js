/*Author -- Aalekh Jain && Aman Rai*/
/*Linear Programming*/
/*This code is a property of EnhanceEdu, IIIT-Hyderabad*/

var arrayPoint=[];

$(document).ready(function(){
	$("#compositeFunction").hide();
})
var miny = 0, maxy=0;
var flag=0;
var m,n;
var yString;
var flag1=0;
var flag2=0;
var A=[] //A contains the coefficients of the first line
var B=[] //B contains the coefficients of the second line

function drawChart(){
	//Drawing the chart with the values in the array, A and B.
	//For the first time, array B is empty and only array A is used
	//Second time, both Array A and B are used
	var chartData = {
		"graphset":[
		{
			"type":"area", //To shade the area under the lines
			"scale-x":{
				"zooming":true, //Zooming feature
				"values":"0:10:1" //Set the x axis from 1 unit to 10 unit
			},
			"scale-y":{
				"zooming":true,
				"values": yString, //Y string contains y axis scale, processed earlier
			},

			"chart":{
				"margin-bottom":50 //Set the margin-bottom
			},
			"series":[

			{ "values": A,
			"background-color": "red", //For the first graph, color under the lines is red
			"line-color":"black"},
			{"values":B,
			"background-color": "blue", //For the second graph, color under the lines is blue
			"line-color":"black",},
			],
		}
		]
	}
	zingchart.render({
		id:'chartDiv', //ID of our chart is ChartDiv
		height:350, //Basic setting of height and width
		width:600,
		data:chartData //Obtain the values from the above object chartData
	});
};
function fillArray(array,a,b,c){
	var count=0;
	var y;
	for(var x=0;x<=10;x++){
		y=(c-(a*x))/b;	//Solving for y
		array[count++] = y; //Storing the values in the array
		if(y<miny && y>=0){
			miny=y; //Finding the minimum positive value for y
		}
		if(y>maxy && y>=0){
			maxy=y; //Finding the maximum positive values for y
		}
	}
	//Below part ensures that max axis of y is set to 10 or less than that.
	maxy = parseInt(maxy) + 1;
	if(maxy > 10){
		maxy=10;
	}
	//Set the scale for y axis
	yString = miny.toString() + ":" + maxy.toString() + ":" + "1";
	//Finally draw the Chart
	drawChart();
}
function getValue(a,b,c){
	//This function retrives the values from the input boxes that appears in the beginning
	var an=$("#input" + a).val();
	var bn=$("#input" + b).val();
	var cn=$("#input" + c).val();
	//Returning values as object
	return {
		f: an,
		s: bn,
		t: cn
	}
}

function myFunc(a,b,c,decision){
	//Decision == 0 for the first line
	if(decision==0){
		flag1=1; //To ensure that first line is applied
		var newObject = getValue(a,b,c);
		a1=newObject.f;
		b1=newObject.s;
		c1=newObject.t;
		fillArray(A,a1,b1,c1); //Fill the values in the array A
		$("#inputList1").fadeOut(1000, function() { $("#inputList1").remove(); });
		//Finally fade the boxes and apply button once applied 
	}
	else{
		//Else decision == 1 for the second line
		newObject = getValue(a,b,c);
		flag2=1;
		a2=newObject.f;
		b2=newObject.s;
		c2=newObject.t;
		fillArray(B,a2,b2,c2); //Fill the values in the Array B
		$("#inputList2").fadeOut(1000, function() { $("#inputList2").remove(); });
		//Finally face the boxes and apply button once applied
	}
	if(flag1==1 && flag2==1){
		//If both the lines are drawn, then proceed further
		$("#compositeFunction").fadeIn(1000, function() { 
			$(".inputValues").remove(); //Remove completely the inputvalues
			$("#compositeFunction").show(); //Show Objective function input boxes and buttons
		});
		setTimeout(function() {
			console.log(a1,b1,c1,a2,b2,c2);
			$("#button3").click(function(){
				//if the objective function is ax + by, then m=a and n=b
				m=parseInt($("#input7").val());
				n=parseInt($("#input8").val());
				console.log(a1,b1,c1,a2,b2,c2);
				calculateMax(a1,b1,c1,a2,b2,c2);
			});
		}, 1000);
	}
}

function calcMin (a,b,m){
	//Here a and b are the intercepts, and m is the coefficient of the objective function
	a = Math.min(a,b); //Finding the minimum intercept
	return {
		val: m*a, //Put the value of the intercept in the objective function
		intercept: a //The intercept
	}
}

function calculateMax(a1,b1,c1,a2,b2,c2){
	var x=0, y=0;
	if( (a1*b2) == (a2*b1)){
		// alert("Inconsistent Equations"); //If the 
		// return ;
	}
	else{
		x=((c1*b2)-(c2*b1))/((a1*b2)-(a2*b1)); 
		y=((c2*a1)-(c1*a2))/((a1*b2)-(a2*b1));
	}
	if(x>0 && y>0) arrayPoint[3]=m*x+n*y;
	else arrayPoint[3]=0;

	//First point correspond to the origin
	arrayPoint[0]=0;
	
	//Calculate for the x intercept
	var tempDecision = calcMin(c1/a1, c2/a2, m);
	arrayPoint[1] = tempDecision.val;
	xIntercept = tempDecision.intercept;

	//Calculate for the y intercept
	tempDecision = calcMin(c1/b1, c2/b2, n);
	arrayPoint[2] = tempDecision.val;
	yIntercept = tempDecision.intercept;

	//Handle the time for the animation
	var timeDuration =1000;
	var delay=2000;

	//Show the first paragraph
	setTimeout(function(){
		$("#paragraph1").html("The value of the function at (" + xIntercept.toFixed(2) + ',' + '0' + ') is '   + arrayPoint[1].toFixed(2));
		$("#paragraph1").animate({width:'toggle'},1000);
	}, timeDuration);
	timeDuration+=delay;

	//Show the second paragraph
	setTimeout(function(){
		$("#paragraph2").html("The value of the function at (" + '0' + ',' + yIntercept.toFixed(2) + ') is '   + arrayPoint[2].toFixed(2));
		$("#paragraph2").animate({width:'toggle'},1000);
	}, timeDuration);

	timeDuration+=delay;

	if(x >0 && y>0){
		//If the intersection point exists, then show the last paragraph
		setTimeout(function(){
			$("#paragraph3").html("The value of the function at (" + x.toFixed(2) + ',' + y.toFixed(2) + ') is '   + arrayPoint[3].toFixed(2));
			$("#paragraph3").animate({width:'toggle'},1000);
		}, timeDuration);
	}

	//Finally show the maximum value after sorting
	setTimeout(function(){
		var maximumNum =  Math.max.apply(Math, arrayPoint);
		// arrayPoint.sort(function(a,b){ return (a-b)});
		$("#paragraphMain").html("Hence the maximum value of the function is "  + maximumNum.toFixed(2));
		$("#paragraphMain").fadeToggle("slow", "linear");
	},timeDuration + delay);
}