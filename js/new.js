// These are the test values
// var A=[3,2.4,1.8,1.2,0.6,0] // A is the line with max x intercept
// var B=[4,2,0]; // else B

var gcount=0;
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
				"margin-bottom":100
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
		height:400,
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
	gcount++;
	if(gcount==2){
		maxy = parseInt(maxy) + 1;
		if(maxy > 10){
			maxy=10;
		}
		yString = miny.toString() + ":" + maxy.toString() + ":" + "1";
		drawChart();
	}

}

function myFunc(a,b,c){
		flag1=1;
		a=$("#input" + a).val();
		b=$("#input" + b).val();
		c=$("#input" + c).val();
		fillArray(A,a,b,c);
		a+=3;
		b+=3;
		c+=3;
		a=$("#input" + a).val();
		b=$("#input" + b).val();
		c=$("#input" + c).val();
		flag2=1;
		fillArray(B,a,b,c);

	//Driver function to establish arrays A and B
	//First the A array.
	/*a=$("#input1").val()
	b=$("#input2").val()
	c=$("#input3").val()
	console.log(a);
*/
}