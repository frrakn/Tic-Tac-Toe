$(document).ready(function()
{
    //creates array to match display
    var rawBoxes = $(".clickbox").get();
    var boxes = [];
    for(var i = 0; i < 3; i++)
    {
        if(!boxes[i])
            boxes[i] = [];
        for(var j = 0; j < 3; j++)
        {
            boxes[i][j] = rawBoxes[i*3+j];
        }
    }
    
    //specifies turn, even = X, odd = O
    var turn = 0;
    
    //defines winner
    var checkWinner = function checkWinner()
    {
        
    };
    
	$(".clickbox").hover(function()
	{
	    if($(this).hasClass("clickbox"))
		    $(this).addClass("clickbox-hover");
	},
	function()
	{
        $(this).removeClass("clickbox-hover");
    });
    
    $(".clickbox").click(function()
    {
        $(this).addClass("clickbox-clicked");
        $(this).removeClass("clickbox");
    });
});
