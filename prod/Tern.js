if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Tern'.");
}
var Tern = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var numberToInt = Kotlin.numberToInt;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var toString = Kotlin.toString;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  TicTacToeField.prototype = Object.create(Enum.prototype);
  TicTacToeField.prototype.constructor = TicTacToeField;
  function main$lambda(closure$game, closure$canvas, closure$infoArea) {
    return function (it) {
      var tmp$;
      (tmp$ = closure$game.v) != null ? (tmp$.end(), Unit) : null;
      closure$game.v = new TicTacToeDisplay(closure$canvas, closure$infoArea);
      return Unit;
    };
  }
  function main$lambda_0(closure$game, closure$canvas, closure$infoArea) {
    return function (it) {
      var tmp$;
      (tmp$ = closure$game.v) != null ? (tmp$.end(), Unit) : null;
      closure$game.v = new VirusDisplay(closure$canvas, closure$infoArea);
      return Unit;
    };
  }
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var ticTacToeButton = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    ticTacToeButton.textContent = 'Tic Tac Toe';
    ensureNotNull(document.body).appendChild(ticTacToeButton);
    var virusButton = Kotlin.isType(tmp$_0 = document.createElement('button'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    virusButton.textContent = 'Virus';
    ensureNotNull(document.body).appendChild(virusButton);
    var infoArea = Kotlin.isType(tmp$_1 = document.createElement('div'), HTMLDivElement) ? tmp$_1 : throwCCE();
    ensureNotNull(document.body).appendChild(infoArea);
    var canvas = Kotlin.isType(tmp$_2 = document.createElement('canvas'), HTMLCanvasElement) ? tmp$_2 : throwCCE();
    var context = Kotlin.isType(tmp$_3 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_3 : throwCCE();
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    ensureNotNull(document.body).appendChild(canvas);
    var game = {v: null};
    ticTacToeButton.addEventListener('click', main$lambda(game, canvas, infoArea));
    virusButton.addEventListener('click', main$lambda_0(game, canvas, infoArea));
  }
  function GameDisplay() {
  }
  GameDisplay.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'GameDisplay',
    interfaces: []
  };
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  Position.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Position',
    interfaces: []
  };
  Position.prototype.component1 = function () {
    return this.x;
  };
  Position.prototype.component2 = function () {
    return this.y;
  };
  Position.prototype.copy_vux9f0$ = function (x, y) {
    return new Position(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Position.prototype.toString = function () {
    return 'Position(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Position.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Position.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function SquareGrid(width, height, init, fields) {
    if (fields === void 0) {
      var size = Kotlin.imul(width, height);
      var list = ArrayList_init(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(init(index % width, index / width | 0));
      }
      fields = list;
    }
    this.width = width;
    this.height = height;
    this.init = init;
    this.fields = fields;
  }
  SquareGrid.prototype.get_vux9f0$ = function (x, y) {
    return this.fields.get_za3lpa$(x + Kotlin.imul(this.width, y) | 0);
  };
  SquareGrid.prototype.set_vq7693$ = function (x, y, value) {
    this.fields.set_wxm5ur$(x + Kotlin.imul(this.width, y) | 0, value);
  };
  SquareGrid.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SquareGrid',
    interfaces: []
  };
  SquareGrid.prototype.component1 = function () {
    return this.width;
  };
  SquareGrid.prototype.component2 = function () {
    return this.height;
  };
  SquareGrid.prototype.component3 = function () {
    return this.init;
  };
  SquareGrid.prototype.component4 = function () {
    return this.fields;
  };
  SquareGrid.prototype.copy_urw29u$ = function (width, height, init, fields) {
    return new SquareGrid(width === void 0 ? this.width : width, height === void 0 ? this.height : height, init === void 0 ? this.init : init, fields === void 0 ? this.fields : fields);
  };
  SquareGrid.prototype.toString = function () {
    return 'SquareGrid(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', init=' + Kotlin.toString(this.init)) + (', fields=' + Kotlin.toString(this.fields)) + ')';
  };
  SquareGrid.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.init) | 0;
    result = result * 31 + Kotlin.hashCode(this.fields) | 0;
    return result;
  };
  SquareGrid.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.init, other.init) && Kotlin.equals(this.fields, other.fields)))));
  };
  function SquareGridDisplay(canvas) {
    this.canvas = canvas;
    var tmp$;
    this.context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    this.fieldSize = 40.0;
    this.gridThickness = 1;
    this.onClick = null;
    this.clickListener = SquareGridDisplay$clickListener$lambda(this);
    this.canvas.addEventListener('click', this.clickListener);
  }
  SquareGridDisplay.prototype.display_a10zx7$ = function (grid, fillStyle, draw) {
    if (draw === void 0)
      draw = null;
    var tmp$, tmp$_0;
    this.context.fillStyle = 'black';
    if (this.gridThickness > 0)
      this.context.fillRect(0.0, 0.0, grid.height * (this.fieldSize + this.gridThickness) + this.gridThickness, grid.width * (this.fieldSize + this.gridThickness) + this.gridThickness);
    tmp$ = grid.height;
    for (var y = 0; y < tmp$; y++) {
      tmp$_0 = grid.width;
      for (var x = 0; x < tmp$_0; x++) {
        this.context.fillStyle = fillStyle(grid.get_vux9f0$(x, y));
        this.context.fillRect(this.gridThickness + x * (this.fieldSize + this.gridThickness), this.gridThickness + y * (this.fieldSize + this.gridThickness), this.fieldSize, this.fieldSize);
        if (draw != null) {
          this.context.save();
          this.context.translate(this.gridThickness + x * (this.fieldSize + this.gridThickness), this.gridThickness + y * (this.fieldSize + this.gridThickness));
          draw(this.context, this.fieldSize, grid.get_vux9f0$(x, y), x, y);
          this.context.restore();
        }
      }
    }
  };
  SquareGridDisplay.prototype.end = function () {
    var tmp$;
    this.canvas.removeEventListener('click', this.clickListener);
    var context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    context.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
  };
  SquareGridDisplay.prototype.gridCoordsAt_vux9f0$ = function (canvasX, canvasY) {
    var localX = canvasX % (this.fieldSize + this.gridThickness);
    var localY = canvasY % (this.fieldSize + this.gridThickness);
    if (localX < this.gridThickness || localY < this.gridThickness)
      return null;
    var gridX = numberToInt(canvasX / (this.fieldSize + this.gridThickness));
    var gridY = numberToInt(canvasY / (this.fieldSize + this.gridThickness));
    return new Position(gridX, gridY);
  };
  function SquareGridDisplay$clickListener$lambda(this$SquareGridDisplay) {
    return function (event) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = event, MouseEvent) ? tmp$ : throwCCE();
      var gridPosition = this$SquareGridDisplay.gridCoordsAt_vux9f0$(numberToInt(event.offsetX), numberToInt(event.offsetY));
      if (gridPosition != null)
        (tmp$_0 = this$SquareGridDisplay.onClick) != null ? tmp$_0(gridPosition) : null;
      return Unit;
    };
  }
  SquareGridDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SquareGridDisplay',
    interfaces: []
  };
  function TicTacToeState(board, currentPlayer) {
    if (board === void 0)
      board = new SquareGrid(3, 3, TicTacToeState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = TicTacToeField$Cross_getInstance();
    this.board = board;
    this.currentPlayer = currentPlayer;
  }
  TicTacToeState.prototype.isLegal_eukm6g$ = function (action) {
    if (action.piece !== this.currentPlayer)
      return false;
    if (this.board.get_vux9f0$(action.x, action.y) !== TicTacToeField$Empty_getInstance())
      return false;
    return true;
  };
  TicTacToeState.prototype.nextState_84fgc1$ = function (action, skipLegalCheck) {
    if (skipLegalCheck === void 0)
      skipLegalCheck = false;
    if (!skipLegalCheck)
      if (!this.isLegal_eukm6g$(action))
        return null;
    var newBoard = this.board.copy_urw29u$();
    newBoard.set_vq7693$(action.x, action.y, action.piece);
    return new TicTacToeState(newBoard, this.currentPlayer === TicTacToeField$Cross_getInstance() ? TicTacToeField$Circle_getInstance() : TicTacToeField$Cross_getInstance());
  };
  TicTacToeState.prototype.findWinner = function () {
    if (this.hasPieceWon_0(TicTacToeField$Cross_getInstance()))
      return TicTacToeField$Cross_getInstance();
    else if (this.hasPieceWon_0(TicTacToeField$Circle_getInstance()))
      return TicTacToeField$Circle_getInstance();
    return null;
  };
  TicTacToeState.prototype.hasPieceWon_0 = function (piece) {
    if (this.board.get_vux9f0$(0, 0) === piece && this.board.get_vux9f0$(0, 1) === piece && this.board.get_vux9f0$(0, 2) === piece || (this.board.get_vux9f0$(1, 0) === piece && this.board.get_vux9f0$(1, 1) === piece && this.board.get_vux9f0$(1, 2) === piece) || (this.board.get_vux9f0$(2, 0) === piece && this.board.get_vux9f0$(2, 1) === piece && this.board.get_vux9f0$(2, 2) === piece))
      return true;
    if (this.board.get_vux9f0$(0, 0) === piece && this.board.get_vux9f0$(1, 0) === piece && this.board.get_vux9f0$(2, 0) === piece || (this.board.get_vux9f0$(0, 1) === piece && this.board.get_vux9f0$(1, 1) === piece && this.board.get_vux9f0$(2, 1) === piece) || (this.board.get_vux9f0$(0, 2) === piece && this.board.get_vux9f0$(1, 2) === piece && this.board.get_vux9f0$(2, 2) === piece))
      return true;
    if (this.board.get_vux9f0$(0, 0) === piece && this.board.get_vux9f0$(1, 1) === piece && this.board.get_vux9f0$(2, 2) === piece || (this.board.get_vux9f0$(0, 2) === piece && this.board.get_vux9f0$(1, 1) === piece && this.board.get_vux9f0$(2, 0) === piece))
      return true;
    return false;
  };
  function TicTacToeState_init$lambda(f, f_0) {
    return TicTacToeField$Empty_getInstance();
  }
  TicTacToeState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeState',
    interfaces: []
  };
  TicTacToeState.prototype.component1 = function () {
    return this.board;
  };
  TicTacToeState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  TicTacToeState.prototype.copy_e9e4pj$ = function (board, currentPlayer) {
    return new TicTacToeState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer);
  };
  TicTacToeState.prototype.toString = function () {
    return 'TicTacToeState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + ')';
  };
  TicTacToeState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    return result;
  };
  TicTacToeState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer)))));
  };
  function TicTacToeAction(piece, x, y) {
    this.piece = piece;
    this.x = x;
    this.y = y;
  }
  TicTacToeAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeAction',
    interfaces: []
  };
  TicTacToeAction.prototype.component1 = function () {
    return this.piece;
  };
  TicTacToeAction.prototype.component2 = function () {
    return this.x;
  };
  TicTacToeAction.prototype.component3 = function () {
    return this.y;
  };
  TicTacToeAction.prototype.copy_wqtaiw$ = function (piece, x, y) {
    return new TicTacToeAction(piece === void 0 ? this.piece : piece, x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  TicTacToeAction.prototype.toString = function () {
    return 'TicTacToeAction(piece=' + Kotlin.toString(this.piece) + (', x=' + Kotlin.toString(this.x)) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  TicTacToeAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.piece) | 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  TicTacToeAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.piece, other.piece) && Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function TicTacToeField(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TicTacToeField_initFields() {
    TicTacToeField_initFields = function () {
    };
    TicTacToeField$Cross_instance = new TicTacToeField('Cross', 0);
    TicTacToeField$Circle_instance = new TicTacToeField('Circle', 1);
    TicTacToeField$Empty_instance = new TicTacToeField('Empty', 2);
  }
  var TicTacToeField$Cross_instance;
  function TicTacToeField$Cross_getInstance() {
    TicTacToeField_initFields();
    return TicTacToeField$Cross_instance;
  }
  var TicTacToeField$Circle_instance;
  function TicTacToeField$Circle_getInstance() {
    TicTacToeField_initFields();
    return TicTacToeField$Circle_instance;
  }
  var TicTacToeField$Empty_instance;
  function TicTacToeField$Empty_getInstance() {
    TicTacToeField_initFields();
    return TicTacToeField$Empty_instance;
  }
  TicTacToeField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeField',
    interfaces: [Enum]
  };
  function TicTacToeField$values() {
    return [TicTacToeField$Cross_getInstance(), TicTacToeField$Circle_getInstance(), TicTacToeField$Empty_getInstance()];
  }
  TicTacToeField.values = TicTacToeField$values;
  function TicTacToeField$valueOf(name) {
    switch (name) {
      case 'Cross':
        return TicTacToeField$Cross_getInstance();
      case 'Circle':
        return TicTacToeField$Circle_getInstance();
      case 'Empty':
        return TicTacToeField$Empty_getInstance();
      default:throwISE('No enum constant TicTacToeField.' + name);
    }
  }
  TicTacToeField.valueOf_61zpoe$ = TicTacToeField$valueOf;
  function TicTacToeDisplay(canvas, infoArea) {
    this.canvas = canvas;
    this.infoArea = infoArea;
    this.game = new TicTacToeState();
    this.squareDisplay = new SquareGridDisplay(this.canvas);
    var getColor = TicTacToeDisplay_init$lambda;
    var draw = TicTacToeDisplay_init$lambda_0;
    this.squareDisplay.display_a10zx7$(this.game.board, getColor, draw);
    this.infoArea.textContent = 'Current player: ' + this.game.currentPlayer.toString();
    this.squareDisplay.onClick = TicTacToeDisplay_init$lambda_1(this, getColor, draw);
  }
  TicTacToeDisplay.prototype.end = function () {
    this.squareDisplay.end();
  };
  function TicTacToeDisplay_init$lambda(field) {
    return 'white';
  }
  function TicTacToeDisplay_init$lambda_0(context, fieldSize, field, x, y) {
    context.fillStyle = 'black';
    context.font = fieldSize.toString() + 'px arial';
    context.textBaseline = 'top';
    switch (field.name) {
      case 'Cross':
        context.fillText('X', 0.0, 0.0);
        break;
      case 'Circle':
        context.fillText('O', 0.0, 0.0);
        break;
    }
    return Unit;
  }
  function TicTacToeDisplay_init$lambda_1(this$TicTacToeDisplay, closure$getColor, closure$draw) {
    return function (it) {
      if (it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
        var action = new TicTacToeAction(this$TicTacToeDisplay.game.currentPlayer, it.x, it.y);
        var newTicTacToe = this$TicTacToeDisplay.game.nextState_84fgc1$(action);
        if (newTicTacToe != null)
          this$TicTacToeDisplay.game = newTicTacToe;
        this$TicTacToeDisplay.squareDisplay.display_a10zx7$(this$TicTacToeDisplay.game.board, closure$getColor, closure$draw);
        var winner = this$TicTacToeDisplay.game.findWinner();
        if (winner != null)
          this$TicTacToeDisplay.infoArea.textContent = winner.toString() + ' has won!';
        else
          this$TicTacToeDisplay.infoArea.textContent = 'Current player: ' + this$TicTacToeDisplay.game.currentPlayer.toString();
      }
      return Unit;
    };
  }
  TicTacToeDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeDisplay',
    interfaces: [GameDisplay]
  };
  function VirusState(width, height, playerCount, board, currentPlayer) {
    if (width === void 0)
      width = 5;
    if (height === void 0)
      height = 5;
    if (playerCount === void 0)
      playerCount = 2;
    if (board === void 0)
      board = new SquareGrid(width, height, VirusState_init$lambda(playerCount, height));
    if (currentPlayer === void 0)
      currentPlayer = 1;
    this.width = width;
    this.height = height;
    this.playerCount = playerCount;
    this.board = board;
    this.currentPlayer = currentPlayer;
  }
  VirusState.prototype.isLegal_4meavh$ = function (action) {
    if (!this.isWithinBoard_0(action.source) || !this.isWithinBoard_0(action.destination))
      return false;
    if (this.board.get_vux9f0$(action.source.x, action.source.y) !== this.currentPlayer)
      return false;
    if (this.board.get_vux9f0$(action.destination.x, action.destination.y) !== 0)
      return false;
    if (abs(action.source.x - action.destination.x | 0) > 2 || abs(action.source.y - action.destination.y | 0) > 2)
      return false;
    return true;
  };
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  VirusState.prototype.nextState_ulwrck$ = function (action, skipLegalCheck) {
    if (skipLegalCheck === void 0)
      skipLegalCheck = false;
    if (!skipLegalCheck)
      if (!this.isLegal_4meavh$(action))
        return null;
    var newBoard = this.board.copy_urw29u$();
    if (abs(action.source.x - action.destination.x | 0) > 1 || abs(action.source.y - action.destination.y | 0) > 1)
      newBoard.set_vq7693$(action.source.x, action.source.y, 0);
    newBoard.set_vq7693$(action.destination.x, action.destination.y, this.currentPlayer);
    this.switchSurroundings_0(action.destination, newBoard);
    var movablePlayers = this.findMovablePlayers_0(newBoard);
    var nextPlayer = this.currentPlayer + 1 | 0;
    var destination = ArrayList_init_0();
    var tmp$;
    tmp$ = movablePlayers.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element)
        destination.add_11rb$(element);
    }
    if (destination.isEmpty()) {
      nextPlayer = 0;
    }
     else {
      if (nextPlayer > this.playerCount)
        nextPlayer = 1;
      while (!movablePlayers.get_za3lpa$(nextPlayer)) {
        nextPlayer = nextPlayer + 1 | 0;
        if (nextPlayer > this.playerCount)
          nextPlayer = 1;
      }
    }
    return new VirusState(void 0, void 0, void 0, newBoard, nextPlayer);
  };
  VirusState.prototype.findWinner = function () {
    var tmp$, tmp$_0;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(0);
    }
    var pieces = list;
    tmp$ = this.board.fields.iterator();
    while (tmp$.hasNext()) {
      var field = tmp$.next();
      pieces.set_wxm5ur$(field, pieces.get_za3lpa$(field) + 1 | 0);
    }
    var movablePlayers = this.findMovablePlayers_0(this.board);
    var destination = ArrayList_init_0();
    var tmp$_1;
    tmp$_1 = movablePlayers.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      if (element)
        destination.add_11rb$(element);
    }
    if (destination.size > 1)
      return null;
    var indexOfLast$result;
    indexOfLast$break: do {
      var iterator = movablePlayers.listIterator_za3lpa$(movablePlayers.size);
      while (iterator.hasPrevious()) {
        if (iterator.previous()) {
          indexOfLast$result = iterator.nextIndex();
          break indexOfLast$break;
        }
      }
      indexOfLast$result = -1;
    }
     while (false);
    var lastPlayer = indexOfLast$result;
    if (lastPlayer > 0)
      pieces.set_wxm5ur$(lastPlayer, pieces.get_za3lpa$(lastPlayer) + pieces.get_za3lpa$(0) | 0);
    var max = 0;
    var winner = 0;
    tmp$_0 = this.playerCount;
    for (var i = 1; i <= tmp$_0; i++) {
      if (pieces.get_za3lpa$(i) > max) {
        max = pieces.get_za3lpa$(i);
        winner = i;
      }
    }
    return winner;
  };
  var Math_0 = Math;
  VirusState.prototype.findMovablePlayers_0 = function (board) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(false);
    }
    var movablePlayers = list;
    tmp$ = this.width;
    loop: for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.height;
      for (var j = 0; j < tmp$_0; j++) {
        if (board.get_vux9f0$(i, j) !== 0)
          continue;
        var b = i - 2 | 0;
        tmp$_1 = Math_0.max(0, b);
        var a = this.width;
        var b_0 = i + 3 | 0;
        tmp$_2 = Math_0.min(a, b_0);
        for (var n = tmp$_1; n < tmp$_2; n++) {
          var b_1 = j - 2 | 0;
          tmp$_3 = Math_0.max(0, b_1);
          var a_0 = this.height;
          var b_2 = j + 3 | 0;
          tmp$_4 = Math_0.min(a_0, b_2);
          for (var m = tmp$_3; m < tmp$_4; m++) {
            if (board.get_vux9f0$(n, m) > 0)
              movablePlayers.set_wxm5ur$(board.get_vux9f0$(n, m), true);
            var destination = ArrayList_init_0();
            var tmp$_5;
            tmp$_5 = movablePlayers.iterator();
            while (tmp$_5.hasNext()) {
              var element = tmp$_5.next();
              if (element)
                destination.add_11rb$(element);
            }
            if (destination.size === this.playerCount)
              break loop;
          }
        }
      }
    }
    return movablePlayers;
  };
  VirusState.prototype.isWithinBoard_0 = function (position) {
    if (position.x < 0 || position.y < 0)
      return false;
    if (position.x >= this.width || position.y >= this.height)
      return false;
    return true;
  };
  VirusState.prototype.switchSurroundings_0 = function (position, board) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var b = position.x - 1 | 0;
    tmp$ = Math_0.max(0, b);
    var a = this.width - 1 | 0;
    var b_0 = position.x + 1 | 0;
    tmp$_0 = Math_0.min(a, b_0);
    for (var n = tmp$; n <= tmp$_0; n++) {
      var b_1 = position.y - 1 | 0;
      tmp$_1 = Math_0.max(0, b_1);
      var a_0 = this.height - 1 | 0;
      var b_2 = position.y + 1 | 0;
      tmp$_2 = Math_0.min(a_0, b_2);
      for (var m = tmp$_1; m <= tmp$_2; m++) {
        if (board.get_vux9f0$(n, m) !== 0)
          board.set_vq7693$(n, m, this.currentPlayer);
      }
    }
  };
  function VirusState_init$lambda(closure$playerCount, closure$height) {
    return function (x, y) {
      if (x === 0 && y === 0) {
        switch (closure$playerCount) {
          case 2:
            return 1;
          case 3:
            return 1;
          case 4:
            return 1;
          default:return 1;
        }
      }
       else if (x === 0 && y === (closure$height - 1 | 0)) {
        switch (closure$playerCount) {
          case 2:
            return 2;
          case 3:
            return 2;
          case 4:
            return 2;
          default:return 0;
        }
      }
       else if (x === (closure$height - 1 | 0) && y === 0) {
        switch (closure$playerCount) {
          case 2:
            return 2;
          case 3:
            return 3;
          case 4:
            return 3;
          default:return 0;
        }
      }
       else if (x === (closure$height - 1 | 0) && y === (closure$height - 1 | 0)) {
        switch (closure$playerCount) {
          case 2:
            return 1;
          case 3:
            return 0;
          case 4:
            return 4;
          default:return 0;
        }
      }
       else
        return 0;
    };
  }
  VirusState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusState',
    interfaces: []
  };
  VirusState.prototype.component1 = function () {
    return this.width;
  };
  VirusState.prototype.component2 = function () {
    return this.height;
  };
  VirusState.prototype.component3 = function () {
    return this.playerCount;
  };
  VirusState.prototype.component4 = function () {
    return this.board;
  };
  VirusState.prototype.component5 = function () {
    return this.currentPlayer;
  };
  VirusState.prototype.copy_jj468x$ = function (width, height, playerCount, board, currentPlayer) {
    return new VirusState(width === void 0 ? this.width : width, height === void 0 ? this.height : height, playerCount === void 0 ? this.playerCount : playerCount, board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer);
  };
  VirusState.prototype.toString = function () {
    return 'VirusState(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', playerCount=' + Kotlin.toString(this.playerCount)) + (', board=' + Kotlin.toString(this.board)) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + ')';
  };
  VirusState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.playerCount) | 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    return result;
  };
  VirusState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.playerCount, other.playerCount) && Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer)))));
  };
  function VirusAction(source, destination) {
    this.source = source;
    this.destination = destination;
  }
  VirusAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusAction',
    interfaces: []
  };
  VirusAction.prototype.component1 = function () {
    return this.source;
  };
  VirusAction.prototype.component2 = function () {
    return this.destination;
  };
  VirusAction.prototype.copy_vwqnnw$ = function (source, destination) {
    return new VirusAction(source === void 0 ? this.source : source, destination === void 0 ? this.destination : destination);
  };
  VirusAction.prototype.toString = function () {
    return 'VirusAction(source=' + Kotlin.toString(this.source) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  VirusAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  VirusAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.source, other.source) && Kotlin.equals(this.destination, other.destination)))));
  };
  function VirusDisplay(canvas, infoArea) {
    this.canvas = canvas;
    this.infoArea = infoArea;
    this.players = mutableListOf(['Player 1', 'Player 2']);
    this.game = new VirusState();
    this.squareDisplay = new SquareGridDisplay(this.canvas);
    var getColor = VirusDisplay_init$lambda;
    this.squareDisplay.display_a10zx7$(this.game.board, getColor);
    this.infoArea.textContent = 'Current player: ' + this.players.get_za3lpa$(this.game.currentPlayer - 1 | 0);
    var sourcePosition = {v: null};
    this.squareDisplay.onClick = VirusDisplay_init$lambda_0(this, sourcePosition, getColor);
  }
  VirusDisplay.prototype.end = function () {
    this.squareDisplay.end();
  };
  function VirusDisplay_init$lambda(piece) {
    switch (piece) {
      case 0:
        return 'white';
      case 1:
        return 'yellow';
      case 2:
        return 'red';
      default:return 'green';
    }
  }
  function VirusDisplay_init$lambda_0(this$VirusDisplay, closure$sourcePosition, closure$getColor) {
    return function (it) {
      if (it.x >= 0 && it.y >= 0 && it.x < this$VirusDisplay.game.width && it.y < this$VirusDisplay.game.height) {
        var source = closure$sourcePosition.v;
        if (source == null) {
          closure$sourcePosition.v = new Position(it.x, it.y);
          println('source' + toString(closure$sourcePosition.v));
        }
         else {
          closure$sourcePosition.v = null;
          var action = new VirusAction(source, new Position(it.x, it.y));
          println('destination' + toString(new Position(it.x, it.y)));
          var newState = this$VirusDisplay.game.nextState_ulwrck$(action);
          if (newState != null)
            this$VirusDisplay.game = newState;
          this$VirusDisplay.squareDisplay.display_a10zx7$(this$VirusDisplay.game.board, closure$getColor);
          var winner = this$VirusDisplay.game.findWinner();
          if (winner != null)
            this$VirusDisplay.infoArea.textContent = this$VirusDisplay.players.get_za3lpa$(winner - 1 | 0) + ' has won!';
          else
            this$VirusDisplay.infoArea.textContent = 'Current player: ' + this$VirusDisplay.players.get_za3lpa$(this$VirusDisplay.game.currentPlayer - 1 | 0);
        }
      }
      return Unit;
    };
  }
  VirusDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusDisplay',
    interfaces: [GameDisplay]
  };
  _.main_kand9s$ = main;
  _.GameDisplay = GameDisplay;
  _.Position = Position;
  _.SquareGrid = SquareGrid;
  _.SquareGridDisplay = SquareGridDisplay;
  _.TicTacToeState = TicTacToeState;
  _.TicTacToeAction = TicTacToeAction;
  Object.defineProperty(TicTacToeField, 'Cross', {
    get: TicTacToeField$Cross_getInstance
  });
  Object.defineProperty(TicTacToeField, 'Circle', {
    get: TicTacToeField$Circle_getInstance
  });
  Object.defineProperty(TicTacToeField, 'Empty', {
    get: TicTacToeField$Empty_getInstance
  });
  _.TicTacToeField = TicTacToeField;
  _.TicTacToeDisplay = TicTacToeDisplay;
  _.VirusState = VirusState;
  _.VirusAction = VirusAction;
  _.VirusDisplay = VirusDisplay;
  main([]);
  Kotlin.defineModule('Tern', _);
  return _;
}(typeof Tern === 'undefined' ? {} : Tern, kotlin);
