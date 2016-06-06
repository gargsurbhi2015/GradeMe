(function($) {
 "use strict";
  
 var agrade;
 var currentPoints = 0;
 
 var computeGrade = function()
 {
	 
		var i=1;
		$("ul.input li").each(function(){
		currentPoints = currentPoints + parseFloat( $('#points' + i++).val() );
		});
		
    var currentGrade = "NA";    

    var maxMarks = parseFloat(localStorage.getItem('MaxHomeworkMarks') * parseFloat(localStorage.getItem('sliderHomework') / 100)) +
                   parseFloat(localStorage.getItem('MaxLabMarks') * parseFloat(localStorage.getItem('sliderLabMarks') / 100 ))+
                    parseFloat(localStorage.getItem('MaxProjectMarks') * parseFloat(localStorage.getItem('sliderProjectMarks') / 100)) + 
                    parseFloat(localStorage.getItem('MaxPresentationMarks') * parseFloat(localStorage.getItem('sliderPresentationMarks') / 100)) +
                    parseFloat(localStorage.getItem('MaxMidTermMarks') * parseFloat(localStorage.getItem('sliderMidTermMarks') / 100)) +
                    parseFloat(localStorage.getItem('MaxFinalMarks') * parseFloat(localStorage.getItem('sliderFinalMarks') / 100));
console.log(maxMarks);
//alert(maxMarks);

    var rcvdMarks = parseFloat($('#points1').val()) * parseFloat(localStorage.getItem('sliderHomework') / 100)  + 
                    parseFloat($('#points2').val()) * parseFloat(localStorage.getItem('sliderLabMarks') / 100) +
                    parseFloat($('#points3').val()) * parseFloat(localStorage.getItem('sliderProjectMarks') / 100) +
                    parseFloat($('#points4').val()) * parseFloat(localStorage.getItem('sliderPresentationMarks') / 100) +
                    parseFloat($('#points5').val()) * parseFloat(localStorage.getItem('sliderMidTermMarks') / 100) +
                    parseFloat($('#points6').val()) * parseFloat(localStorage.getItem('sliderFinalMarks') / 100);

console.log(rcvdMarks);
//alert(rcvdMarks);
		
		agrade = parseFloat(rcvdMarks / maxMarks) * 100;
 
    if (agrade >= 90)
    {
        currentGrade = "A";
    }
    else if( agrade >= 80 && agrade <= 89)
    {
        currentGrade = "B";
    }
    else if( agrade >= 70 && agrade <= 79)
    {
      currentGrade = "C";
    }
    else if( agrade >= 60 && agrade <= 69)
    {
      currentGrade = "D";
    }
    else
    {
        currentGrade = "F";
    }
    
    $('#finalgrade').text(currentGrade);

 };
 
 var saveSettings = function()
 {
    try {  

        if(parseFloat($('#sliderFinals').val()) + parseFloat($('#sliderMidTerm').val()) + parseFloat($('#sliderPresen').val()) + parseFloat($('#sliderProj').val()) + parseFloat($('#sliderLab').val()) + parseFloat($('#sliderHw').val()) == 100)
        {
          if(parseFloat($('#MaxPoints1').val()) > 0 && parseFloat($('#MaxPoints2').val()) > 0 && parseFloat($('#MaxPoints3').val()) > 0 && parseFloat($('#MaxPoints4').val()) > 0 && parseFloat($('#MaxPoints5').val()) > 0 && parseFloat($('#MaxPoints6').val()) > 0)
          {
            localStorage.setItem('sliderHomework',$('#sliderHw').val());
            localStorage.setItem('sliderFinalMarks',$('#sliderFinals').val());
            localStorage.setItem('sliderMidTermMarks',$('#sliderMidTerm').val());
            localStorage.setItem('sliderPresentationMarks',$('#sliderPresen').val());
            localStorage.setItem('sliderProjectMarks',$('#sliderProj').val());
            localStorage.setItem('sliderLabMarks',$('#sliderLab').val());

            localStorage.setItem('MaxHomeworkMarks',$('#MaxPoints1').val());
            localStorage.setItem('MaxLabMarks',$('#MaxPoints2').val());
            localStorage.setItem('MaxProjectMarks',$('#MaxPoints3').val());
            localStorage.setItem('MaxPresentationMarks',$('#MaxPoints4').val());
            localStorage.setItem('MaxMidTermMarks',$('#MaxPoints5').val());
            localStorage.setItem('MaxFinalMarks',$('#MaxPoints6').val());  
          }          
          else
          {
            //alert('Please enter all the Max Marks for items on the page');
            $("#popupMarks").popup("open");
            return false;            
          }
        }

        else
        {
          //alert('The Sum of all the Slider values should be 100%.');
          $("#popupBasic").popup("open");
          return false;
        }

        var mPoint;
				var i=1;
				 $("li").each(function(){
					mPoint = parseFloat( $('#MaxPoints' + i++).val() );
					localStorage.setItem('MaxPoints' + i++, mPoint);
        });
        agrade = mPoint;
        window.history.back();
        return true;
    } catch (ex)
    {
        alert('Points must be a decimal value');
    }
 };

 var cancelSettings = function()
 {
    localStorage.clear();
 };
 
var tStart = 100 // Start transition 100px from top
  , tEnd = 500   // End at 500px
  , cStart = [250, 195, 56]  // Gold
  , cEnd = [179, 217, 112]   // Lime
  , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];
 
 // Setup the event handlers
 $( document ).on( "ready", function()
                  {
                  $('#computeGrade').on('click', computeGrade);
                  $('#saveSettings').on('click', saveSettings);
                  $('#cancelSettings').on('click', cancelSettings);
									
									var showmax = [];
									for (var i=1; i<=$("ul.max li").length; i++){
										showmax[i-1] = localStorage.getItem("MaxPoints" + i);
										if (showmax[i-1])
										{
											$('#MaxPoints' + i).val(parseFloat(showmax[i-1]));
										}
									}
                  });

 // Load plugin
 $( document ).on( "deviceready", function(){
                  StatusBar.overlaysWebView( false );
                  StatusBar.backgroundColorByName("gray");
                  });


$(document).on("pageshow",function(){
//alert('Hi');
  if($.mobile.activePage.attr('id') == "grade-page" && localStorage.getItem('MaxHomeworkMarks') > 0)
    {                                    
        $('#points1').attr('max', localStorage.getItem('MaxHomeworkMarks'));        
        $('#points2').attr('max', localStorage.getItem('MaxLabMarks')); 
        $('#points3').attr('max', localStorage.getItem('MaxProjectMarks'));        
        $('#points4').attr('max', localStorage.getItem('MaxPresentationMarks'));        
        $('#points5').attr('max', localStorage.getItem('MaxMidTermMarks'));        
        $('#points6').attr('max', localStorage.getItem('MaxFinalMarks'));  

        $('#points1').attr('min', 0);        
        $('#points2').attr('min', 0); 
        $('#points3').attr('min', 0);        
        $('#points4').attr('min', 0);        
        $('#points5').attr('min', 0);        
        $('#points6').attr('min', 0);        
    }
  });
  

 }

 
 )(jQuery);