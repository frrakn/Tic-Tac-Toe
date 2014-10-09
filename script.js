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
     
    //handler for win, takes in coordinates for three boxes
    //(0,0) square at top left
    //(r1, c1, r2, c2, r3, c3) => (r1, c1), (r2, c2), (r3, c3)
    var winHandler = function winHandler(r1, c1, r2, c2, r3, c3)
    {
        for(var i = 0; i < boxes.length; i++)
        {
            for(var j = 0; j < boxes.length; j++)
            {
                $(boxes[i][j]).addClass("clickbox-clicked");
            }
        }
        $(boxes[r1][c1]).addClass("selected");
        $(boxes[r2][c2]).addClass("selected");
        $(boxes[r3][c3]).addClass("selected");
    };    
    
    //helper function for checkWinner
    var checkWinnerHelper = function checkWinnerHelper(player)
    {
        //check rows
        for(var i = 0; i < boxes.length; i++)
        {
            var win = true;
            for(var j = 0; j < boxes[0].length; j++)
            {
                win = win && $(boxes[i][j]).hasClass(player);
            }
            
            if(win)
            {
                winHandler(i, 0, i, 1, i, 2);
                return;
            }
        }
        
        //check columns
        for(var i = 0; i < boxes.length; i++)
        {
            var win = true;
            for(var j = 0; j < boxes[0].length; j++)
            {
                win = win && $(boxes[j][i]).hasClass(player);
            }
            
            if(win)
            {
                winHandler(0, i, 1, i, 2, i);
                return;
            }
        }
        
        //check diagonals
        if($(boxes[0][0]).hasClass(player)&&$(boxes[1][1]).hasClass(player)&&(boxes[2][2]).hasClass(player))
        {
            winHandler(0, 0, 1, 1, 2, 2);
            return;
        }
        
        if($(boxes[2][0]).hasClass(player)&&$(boxes[1][1]).hasClass(player)&&(boxes[0][2]).hasClass(player))
        {
            winHandler(2, 0, 1, 1, 0, 2);
            return;
        }
    };
    
    //tests for winner
    var checkWinner = function checkWinner()
    {
        //check whose turn
        if(turn % 2 === 0)
        {
            //currently X's turn, so O must have just went
            checkWinnerHelper("oclicked");
        }
        else
        {
            //currently O's turn, so X must have just went
            checkWinnerHelper("xclicked");
        }
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
    
    //click handler
    $(".clickbox").click(function()
    {
        if($(this).hasClass("clickbox-clicked"))
        {
            //do nothing?
        }
        //must've not been clicked before
        else
        {
            //check whose turn it was
            var xturn = turn % 2;
            
            //X turn
            if(xturn === 0)
            {
                $(this).addClass("clickbox-clicked");
                $(this).addClass("xclicked");
                $(this).removeClass("clickbox");
                turn++;
            }
            
            //Y turn
            else
            {
                $(this).addClass("clickbox-clicked");
                $(this).addClass("oclicked");
                $(this).removeClass("clickbox");
                turn++;
            }
            
            //check for wins
            if(turn > 4)
                checkWinner();
        }
    });
});
