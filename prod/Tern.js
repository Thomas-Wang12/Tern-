if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Tern'.");
}
var Tern = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var ensureNotNull = Kotlin.ensureNotNull;
  var numberToInt = Kotlin.numberToInt;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  TicTacToeField.prototype = Object.create(Enum.prototype);
  TicTacToeField.prototype.constructor = TicTacToeField;
  function main$lambda(field) {
    switch (field.name) {
      case 'Cross':
        return 'green';
      case 'Circle':
        return 'blue';
      case 'Empty':
        return 'white';
      default:return Kotlin.noWhenBranchMatched();
    }
  }
  function main$lambda_0(closure$ticTacToe, closure$display, closure$getTicTacToeColor) {
    return function (it) {
      println(it.x.toString() + ' ' + it.y.toString());
      if (it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
        var action = new TicTacToeAction(closure$ticTacToe.v.currentPlayer, it.x, it.y);
        var newTicTacToe = closure$ticTacToe.v.nextState_84fgc1$(action);
        if (newTicTacToe != null)
          closure$ticTacToe.v = newTicTacToe;
        closure$display.display_a10zx7$(closure$ticTacToe.v.board, closure$getTicTacToeColor);
        var winner = closure$ticTacToe.v.findWinner();
        if (winner != null)
          println(winner.toString() + ' has won!');
      }
      return Unit;
    };
  }
  function main(args) {
    var getTicTacToeColor = main$lambda;
    var display = new SquareGridDisplay(getOrCreateCanvas());
    var ticTacToe = {v: new TicTacToeState()};
    display.display_a10zx7$(ticTacToe.v.board, getTicTacToeColor);
    display.registerOnClick_lcdoz6$(main$lambda_0(ticTacToe, display, getTicTacToeColor));
  }
  var canvas;
  function getOrCreateCanvas() {
    var c = canvas;
    if (c != null)
      return c;
    var c2 = initializeCanvas();
    canvas = c2;
    return c2;
  }
  function initializeCanvas() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    ensureNotNull(document.body).appendChild(canvas);
    return canvas;
  }
  function SquareGridDisplay(canvas) {
    this.canvas = canvas;
    var tmp$;
    this.context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    this.fieldSize = 40.0;
    this.gridThickness = 1;
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
  function SquareGridDisplay$registerOnClick$lambda(this$SquareGridDisplay, closure$onClick) {
    return function (it) {
      var tmp$;
      var bla = Kotlin.isType(tmp$ = it, MouseEvent) ? tmp$ : throwCCE();
      var gridPosition = this$SquareGridDisplay.gridCoordsAt_vux9f0$(numberToInt(bla.offsetX), numberToInt(bla.offsetY));
      if (gridPosition != null)
        closure$onClick(gridPosition);
      return Unit;
    };
  }
  SquareGridDisplay.prototype.registerOnClick_lcdoz6$ = function (onClick) {
    this.canvas.addEventListener('click', SquareGridDisplay$registerOnClick$lambda(this, onClick));
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
  SquareGridDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SquareGridDisplay',
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
  _.main_kand9s$ = main;
  Object.defineProperty(_, 'canvas', {
    get: function () {
      return canvas;
    },
    set: function (value) {
      canvas = value;
    }
  });
  _.getOrCreateCanvas = getOrCreateCanvas;
  _.initializeCanvas = initializeCanvas;
  _.SquareGridDisplay = SquareGridDisplay;
  _.Position = Position;
  _.SquareGrid = SquareGrid;
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
  canvas = null;
  main([]);
  Kotlin.defineModule('Tern', _);
  return _;
}(typeof Tern === 'undefined' ? {} : Tern, kotlin);
