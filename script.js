const game = (()=>
{



  const board = (()=>
  {
    let player = 0;
    let gameArr = new Array(9).fill("");
    const checkDraw = ()=>
    {
      return gameArr.filter((place)=>place=="").length === 0;
    }
    const checkWinCondition = ()=>
    {
      for(let i = 0; i < 3; i++)
      {
        if(gameArr[i*3] == gameArr[i*3 + 1] && gameArr[i*3] == gameArr[i*3 + 2] && gameArr[i*3]!="")
        {
          return true;
        }
      }
      if ((gameArr[4] != "") && ((gameArr[0] == gameArr[4] && gameArr[4] == gameArr[8]) || (gameArr[2] == gameArr[4] && gameArr[4] == gameArr[6])))
      {
        return true;
      }
      return false;
    };
    const addMark = (i)=>
    {
      let ret;
      if(player == 0)
      {
        ret = "O";
        player = 1;
      }
      else {
        ret = "X";
        player = 0;
      }
      gameArr[i] = ret;
      return ret;
    };
    const reset = ()=>
    {
      player = 0;
      gameArr.fill("");
    };
    return {
      reset,
      addMark,
      checkWinCondition,
      checkDraw
    };
  })();

  const displayController=(()=>
  {
    const resetBtn = document.querySelector("button");
    const squares = document.querySelectorAll(".square");
    const msg = document.querySelector("h1");
    const listeners = new Array(9);
    const disableSquares = function()
    {
      for(let i = 0; i < 9; i++)
      {
        squares[i].removeEventListener("click", listeners[i]);
      }
    };

    const addMark = (num) =>
    {
      return function(){
        console.log(num);
        if(squares[num].textContent != "")
        {
          return;
        }
        let mark = board.addMark(num);
        squares[num].textContent = mark;
        let result = board.checkWinCondition();
        if(result == true)
        {
          msg.textContent = `${mark} wins`;
          disableSquares();
        }else if(board.checkDraw())
        {
          msg.textContent = "It's a draw";
          disableSquares();
        }
      };
    };



    const enableSquares = ()=>
    {

      for(let i = 0; i < 9; i++)
      {
        squares[i].addEventListener("click", listeners[i]);
      }
    };

    const init = () => {
      for(let i = 0; i < 9; i++)
      {
        listeners[i] = addMark(i);
      }
      enableSquares();
      resetBtn.addEventListener("click", ()=>
      {
        board.reset();
        enableSquares();
        squares.forEach(square=>{square.textContent=""});
        msg.textContent = "";
      });
    };
    return {"init" : init};
  })();
  return displayController.init;
})();

game();
