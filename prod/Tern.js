if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Tern'.");
}
var Tern = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var equals = Kotlin.equals;
  var Unit = Kotlin.kotlin.Unit;
  var toString = Kotlin.toString;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var numberToInt = Kotlin.numberToInt;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  ChessPieceType.prototype = Object.create(Enum.prototype);
  ChessPieceType.prototype.constructor = ChessPieceType;
  ChessPlayer.prototype = Object.create(Enum.prototype);
  ChessPlayer.prototype.constructor = ChessPlayer;
  TicTacToe.prototype = Object.create(BoardGame.prototype);
  TicTacToe.prototype.constructor = TicTacToe;
  TicTacToePiece.prototype = Object.create(Enum.prototype);
  TicTacToePiece.prototype.constructor = TicTacToePiece;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function BoardGame() {
    this.players = LinkedHashMap_init();
    this.winner = null;
  }
  var Map = Kotlin.kotlin.collections.Map;
  BoardGame.prototype.performAction_11rd$ = function (action) {
    var tmp$;
    if (!this.state.isLegal_11rc$(action))
      return false;
    this.state = Kotlin.isType(tmp$ = this.state.nextState_11rc$(action), BoardGameState) ? tmp$ : throwCCE();
    var $receiver = this.players;
    var key = this.state.findWinner();
    var tmp$_0;
    this.winner = (Kotlin.isType(tmp$_0 = $receiver, Map) ? tmp$_0 : throwCCE()).get_11rb$(key);
    return true;
  };
  BoardGame.prototype.currentPlayer = function () {
    return this.players.get_11rb$(this.state.currentPlayer);
  };
  BoardGame.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BoardGame',
    interfaces: []
  };
  function BoardGameState() {
  }
  BoardGameState.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'BoardGameState',
    interfaces: []
  };
  function ChessState(board, currentPlayer) {
    if (board === void 0)
      board = new SquareGrid(8, 8, ChessState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = ChessPlayer$White_getInstance();
    this.board = board;
    this.currentPlayer = currentPlayer;
  }
  ChessState.prototype.isLegal_t6cjbe$ = function (action) {
    var tmp$;
    tmp$ = this.board.get_dfplqh$(action.source);
    if (tmp$ == null) {
      return false;
    }
    var piece = tmp$;
    if (piece.player !== this.currentPlayer)
      return false;
    return piece.isLegal_xm7weo$(this.board, action);
  };
  ChessState.prototype.nextState_sg5dg1$ = function (action, skipLegalCheck) {
    if (skipLegalCheck === void 0)
      skipLegalCheck = false;
    var tmp$, tmp$_0;
    if (!skipLegalCheck)
      if (!this.isLegal_t6cjbe$(action))
        return null;
    var newBoard = this.board.copy_urw29u$();
    var newPiece = Kotlin.isType(tmp$_0 = (tmp$ = this.board.get_dfplqh$(action.source)) != null ? tmp$.copy_9wx23a$(void 0, void 0, true) : null, ChessPiece) ? tmp$_0 : throwCCE();
    if (newPiece.type === ChessPieceType$Pawn_getInstance()) {
      if (action.destination.y === 0 && newPiece.player === ChessPlayer$Black_getInstance() || (action.destination.y === (this.board.height - 1 | 0) && newPiece.player === ChessPlayer$White_getInstance()))
        newPiece = newPiece.copy_9wx23a$(ChessPieceType$Queen_getInstance());
    }
    if (newPiece.type === ChessPieceType$King_getInstance() && abs(action.source.x - action.destination.x | 0) === 2) {
      this.moveCastlingRook_0(action);
    }
    newBoard.set_39d550$(action.destination, newPiece);
    newBoard.set_39d550$(action.source, null);
    return new ChessState(newBoard, this.currentPlayer === ChessPlayer$White_getInstance() ? ChessPlayer$Black_getInstance() : ChessPlayer$White_getInstance());
  };
  ChessState.prototype.findWinner = function () {
    return null;
  };
  ChessState.prototype.moveCastlingRook_0 = function (action) {
    if (action.destination.x < 4) {
      this.board.set_vq7693$(action.destination.x + 1 | 0, action.source.y, this.board.get_vux9f0$(0, action.source.y));
      this.board.set_vq7693$(0, action.source.y, null);
    }
     else {
      this.board.set_vq7693$(action.destination.x - 1 | 0, action.source.y, this.board.get_vux9f0$(this.board.width - 1 | 0, action.source.y));
      this.board.set_vq7693$(this.board.width - 1 | 0, action.source.y, null);
    }
  };
  function ChessState_init$lambda(x, y) {
    switch (y) {
      case 0:
        switch (x) {
          case 0:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$White_getInstance());
          case 1:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$White_getInstance());
          case 2:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$White_getInstance());
          case 3:
            return new ChessPiece(ChessPieceType$Queen_getInstance(), ChessPlayer$White_getInstance());
          case 4:
            return new ChessPiece(ChessPieceType$King_getInstance(), ChessPlayer$White_getInstance());
          case 5:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$White_getInstance());
          case 6:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$White_getInstance());
          case 7:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$White_getInstance());
          default:return null;
        }

      case 1:
        return new ChessPiece(ChessPieceType$Pawn_getInstance(), ChessPlayer$White_getInstance());
      case 6:
        return new ChessPiece(ChessPieceType$Pawn_getInstance(), ChessPlayer$Black_getInstance());
      case 7:
        switch (x) {
          case 0:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$Black_getInstance());
          case 1:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$Black_getInstance());
          case 2:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$Black_getInstance());
          case 3:
            return new ChessPiece(ChessPieceType$Queen_getInstance(), ChessPlayer$Black_getInstance());
          case 4:
            return new ChessPiece(ChessPieceType$King_getInstance(), ChessPlayer$Black_getInstance());
          case 5:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$Black_getInstance());
          case 6:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$Black_getInstance());
          case 7:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$Black_getInstance());
          default:return null;
        }

      default:return null;
    }
  }
  ChessState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessState',
    interfaces: []
  };
  ChessState.prototype.component1 = function () {
    return this.board;
  };
  ChessState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  ChessState.prototype.copy_u6lhfp$ = function (board, currentPlayer) {
    return new ChessState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer);
  };
  ChessState.prototype.toString = function () {
    return 'ChessState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + ')';
  };
  ChessState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    return result;
  };
  ChessState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer)))));
  };
  function ChessAction(source, destination) {
    this.source = source;
    this.destination = destination;
  }
  ChessAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessAction',
    interfaces: []
  };
  ChessAction.prototype.component1 = function () {
    return this.source;
  };
  ChessAction.prototype.component2 = function () {
    return this.destination;
  };
  ChessAction.prototype.copy_vwqnnw$ = function (source, destination) {
    return new ChessAction(source === void 0 ? this.source : source, destination === void 0 ? this.destination : destination);
  };
  ChessAction.prototype.toString = function () {
    return 'ChessAction(source=' + Kotlin.toString(this.source) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  ChessAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  ChessAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.source, other.source) && Kotlin.equals(this.destination, other.destination)))));
  };
  function ChessPieceType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ChessPieceType_initFields() {
    ChessPieceType_initFields = function () {
    };
    ChessPieceType$King_instance = new ChessPieceType('King', 0);
    ChessPieceType$Queen_instance = new ChessPieceType('Queen', 1);
    ChessPieceType$Bishop_instance = new ChessPieceType('Bishop', 2);
    ChessPieceType$Knight_instance = new ChessPieceType('Knight', 3);
    ChessPieceType$Rook_instance = new ChessPieceType('Rook', 4);
    ChessPieceType$Pawn_instance = new ChessPieceType('Pawn', 5);
  }
  var ChessPieceType$King_instance;
  function ChessPieceType$King_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$King_instance;
  }
  var ChessPieceType$Queen_instance;
  function ChessPieceType$Queen_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Queen_instance;
  }
  var ChessPieceType$Bishop_instance;
  function ChessPieceType$Bishop_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Bishop_instance;
  }
  var ChessPieceType$Knight_instance;
  function ChessPieceType$Knight_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Knight_instance;
  }
  var ChessPieceType$Rook_instance;
  function ChessPieceType$Rook_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Rook_instance;
  }
  var ChessPieceType$Pawn_instance;
  function ChessPieceType$Pawn_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Pawn_instance;
  }
  ChessPieceType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPieceType',
    interfaces: [Enum]
  };
  function ChessPieceType$values() {
    return [ChessPieceType$King_getInstance(), ChessPieceType$Queen_getInstance(), ChessPieceType$Bishop_getInstance(), ChessPieceType$Knight_getInstance(), ChessPieceType$Rook_getInstance(), ChessPieceType$Pawn_getInstance()];
  }
  ChessPieceType.values = ChessPieceType$values;
  function ChessPieceType$valueOf(name) {
    switch (name) {
      case 'King':
        return ChessPieceType$King_getInstance();
      case 'Queen':
        return ChessPieceType$Queen_getInstance();
      case 'Bishop':
        return ChessPieceType$Bishop_getInstance();
      case 'Knight':
        return ChessPieceType$Knight_getInstance();
      case 'Rook':
        return ChessPieceType$Rook_getInstance();
      case 'Pawn':
        return ChessPieceType$Pawn_getInstance();
      default:throwISE('No enum constant ChessPieceType.' + name);
    }
  }
  ChessPieceType.valueOf_61zpoe$ = ChessPieceType$valueOf;
  function ChessPlayer(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ChessPlayer_initFields() {
    ChessPlayer_initFields = function () {
    };
    ChessPlayer$White_instance = new ChessPlayer('White', 0);
    ChessPlayer$Black_instance = new ChessPlayer('Black', 1);
  }
  var ChessPlayer$White_instance;
  function ChessPlayer$White_getInstance() {
    ChessPlayer_initFields();
    return ChessPlayer$White_instance;
  }
  var ChessPlayer$Black_instance;
  function ChessPlayer$Black_getInstance() {
    ChessPlayer_initFields();
    return ChessPlayer$Black_instance;
  }
  ChessPlayer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPlayer',
    interfaces: [Enum]
  };
  function ChessPlayer$values() {
    return [ChessPlayer$White_getInstance(), ChessPlayer$Black_getInstance()];
  }
  ChessPlayer.values = ChessPlayer$values;
  function ChessPlayer$valueOf(name) {
    switch (name) {
      case 'White':
        return ChessPlayer$White_getInstance();
      case 'Black':
        return ChessPlayer$Black_getInstance();
      default:throwISE('No enum constant ChessPlayer.' + name);
    }
  }
  ChessPlayer.valueOf_61zpoe$ = ChessPlayer$valueOf;
  function ChessDisplay(canvas, infoArea) {
    this.canvas = canvas;
    this.infoArea = infoArea;
    this.game = new ChessState();
    this.squareDisplay = new SquareGridDisplay(this.canvas);
    var getColor = ChessDisplay_init$lambda;
    var draw = ChessDisplay_init$lambda_0;
    this.squareDisplay.display_macai1$(this.game.board, getColor, draw);
    this.infoArea.textContent = 'Current player: ' + this.game.currentPlayer.toString();
    var sourcePosition = {v: null};
    this.squareDisplay.onClick = ChessDisplay_init$lambda_1(sourcePosition, this, getColor, draw);
  }
  ChessDisplay.prototype.end = function () {
    this.squareDisplay.end();
  };
  function ChessDisplay_init$lambda(f, x, y) {
    return (x % 2 === 0 ? y % 2 === 0 : y % 2 === 1) ? 'white' : 'grey';
  }
  function ChessDisplay_init$lambda_0(context, fieldSize, piece, x, y) {
    var tmp$;
    context.fillStyle = 'black';
    context.font = fieldSize.toString() + 'px arial';
    context.textBaseline = 'top';
    var isBlack = equals(piece != null ? piece.player : null, ChessPlayer$Black_getInstance());
    tmp$ = piece != null ? piece.type : null;
    if (equals(tmp$, ChessPieceType$King_getInstance()))
      context.fillText(isBlack ? '\u265A' : '\u2654', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Queen_getInstance()))
      context.fillText(isBlack ? '\u265B' : '\u2655', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Knight_getInstance()))
      context.fillText(isBlack ? '\u265E' : '\u2658', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Rook_getInstance()))
      context.fillText(isBlack ? '\u265C' : '\u2656', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Bishop_getInstance()))
      context.fillText(isBlack ? '\u265D' : '\u2657', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Pawn_getInstance()))
      context.fillText(isBlack ? '\u265F' : '\u2659', 0.0, 0.0);
    return Unit;
  }
  function ChessDisplay_init$lambda_1(closure$sourcePosition, this$ChessDisplay, closure$getColor, closure$draw) {
    return function (it) {
      if (it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
        var source = closure$sourcePosition.v;
        if (source == null) {
          closure$sourcePosition.v = new Position(it.x, it.y);
          println('source' + toString(closure$sourcePosition.v));
        }
         else {
          closure$sourcePosition.v = null;
          var action = new ChessAction(source, new Position(it.x, it.y));
          println('destination' + toString(new Position(it.x, it.y)));
          var newState = this$ChessDisplay.game.nextState_sg5dg1$(action);
          if (newState != null)
            this$ChessDisplay.game = newState;
          this$ChessDisplay.squareDisplay.display_macai1$(this$ChessDisplay.game.board, closure$getColor, closure$draw);
          var winner = this$ChessDisplay.game.findWinner();
          if (winner != null)
            this$ChessDisplay.infoArea.textContent = winner.toString() + ' has won!';
          else
            this$ChessDisplay.infoArea.textContent = 'Current player: ' + this$ChessDisplay.game.currentPlayer.toString();
        }
      }
      return Unit;
    };
  }
  ChessDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessDisplay',
    interfaces: [GameDisplay]
  };
  function ChessPiece(type, player, hasMoved) {
    if (hasMoved === void 0)
      hasMoved = false;
    this.type = type;
    this.player = player;
    this.hasMoved = hasMoved;
  }
  ChessPiece.prototype.isLegal_xm7weo$ = function (board, action) {
    var tmp$;
    switch (this.type.name) {
      case 'King':
        tmp$ = this.isKingMoveLegal_0(board, action);
        break;
      case 'Queen':
        tmp$ = this.isQueenMoveLegal_0(board, action);
        break;
      case 'Bishop':
        tmp$ = this.isBishopMoveLegal_0(board, action);
        break;
      case 'Knight':
        tmp$ = this.isKnightMoveLegal_0(board, action);
        break;
      case 'Rook':
        tmp$ = this.isRookMoveLegal_0(board, action);
        break;
      case 'Pawn':
        tmp$ = this.isPawnMoveLegal_0(board, action);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  ChessPiece.prototype.isKingMoveLegal_0 = function (board, action) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (abs(action.source.x - action.destination.x | 0) <= 1 && abs(action.source.y - action.destination.y | 0) <= 1)
      return true;
    if (this.hasMoved || this.isInCheck_0(board, action.source))
      return false;
    if (this.player === ChessPlayer$White_getInstance()) {
      if ((action.source.x - action.destination.x | 0) === 2 && action.source.y === action.destination.y) {
        var cornerPiece = board.get_vux9f0$(0, 0);
        if (cornerPiece == null || cornerPiece.player !== ChessPlayer$White_getInstance() || cornerPiece.type !== ChessPieceType$Rook_getInstance() || cornerPiece.hasMoved)
          return false;
        tmp$ = action.source.x - 1 | 0;
        tmp$_0 = action.destination.x + 1 | 0;
        for (var i = tmp$; i >= tmp$_0; i--)
          if (board.get_vux9f0$(i, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x - 1 | 0), action.source))
          return false;
        return true;
      }
       else if ((action.source.x - action.destination.x | 0) === -2 && action.source.y === action.destination.y) {
        var cornerPiece_0 = board.get_vux9f0$(board.width - 1 | 0, 0);
        if (cornerPiece_0 == null || cornerPiece_0.player !== ChessPlayer$White_getInstance() || cornerPiece_0.type !== ChessPieceType$Rook_getInstance() || cornerPiece_0.hasMoved)
          return false;
        tmp$_1 = action.source.x + 1 | 0;
        tmp$_2 = action.destination.x;
        for (var i_0 = tmp$_1; i_0 < tmp$_2; i_0++)
          if (board.get_vux9f0$(i_0, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x + 1 | 0), action.source))
          return false;
        return true;
      }
    }
     else {
      if ((action.source.x - action.destination.x | 0) === 2 && action.source.y === action.destination.y) {
        var cornerPiece_1 = board.get_vux9f0$(0, board.height - 1 | 0);
        if (cornerPiece_1 == null || cornerPiece_1.player !== ChessPlayer$Black_getInstance() || cornerPiece_1.type !== ChessPieceType$Rook_getInstance() || cornerPiece_1.hasMoved)
          return false;
        tmp$_3 = action.source.x - 1 | 0;
        tmp$_4 = action.destination.x + 1 | 0;
        for (var i_1 = tmp$_3; i_1 >= tmp$_4; i_1--)
          if (board.get_vux9f0$(i_1, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x - 1 | 0), action.source))
          return false;
        return true;
      }
       else if ((action.source.x - action.destination.x | 0) === -2 && action.source.y === action.destination.y) {
        var cornerPiece_2 = board.get_vux9f0$(board.width - 1 | 0, board.height - 1 | 0);
        if (cornerPiece_2 == null || cornerPiece_2.player !== ChessPlayer$Black_getInstance() || cornerPiece_2.type !== ChessPieceType$Rook_getInstance() || cornerPiece_2.hasMoved)
          return false;
        tmp$_5 = action.source.x + 1 | 0;
        tmp$_6 = action.destination.x;
        for (var i_2 = tmp$_5; i_2 < tmp$_6; i_2++)
          if (board.get_vux9f0$(i_2, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x + 1 | 0), action.source))
          return false;
        return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.isQueenMoveLegal_0 = function (board, action) {
    if (this.isBishopMoveLegal_0(board, action) || this.isRookMoveLegal_0(board, action))
      return true;
    return false;
  };
  ChessPiece.prototype.isBishopMoveLegal_0 = function (board, action) {
    if (abs(action.source.x - action.destination.x | 0) !== abs(action.source.y - action.destination.y | 0))
      return false;
    if ((action.source.x - action.destination.x | 0) > 0 && (action.source.y - action.destination.y | 0) > 0) {
      var tilesBetween = new Position(action.source.x - 1 | 0, action.source.y - 1 | 0);
      while (!(tilesBetween != null ? tilesBetween.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween) != null)
          return false;
        tilesBetween = new Position(tilesBetween.x - 1 | 0, tilesBetween.y - 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) > 0 && (action.source.y - action.destination.y | 0) < 0) {
      var tilesBetween_0 = new Position(action.source.x - 1 | 0, action.source.y + 1 | 0);
      while (!(tilesBetween_0 != null ? tilesBetween_0.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_0) != null)
          return false;
        tilesBetween_0 = new Position(tilesBetween_0.x - 1 | 0, tilesBetween_0.y + 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) < 0 && (action.source.y - action.destination.y | 0) < 0) {
      var tilesBetween_1 = new Position(action.source.x + 1 | 0, action.source.y + 1 | 0);
      while (!(tilesBetween_1 != null ? tilesBetween_1.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_1) != null)
          return false;
        tilesBetween_1 = new Position(tilesBetween_1.x + 1 | 0, tilesBetween_1.y + 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) < 0 && (action.source.y - action.destination.y | 0) > 0) {
      var tilesBetween_2 = new Position(action.source.x + 1 | 0, action.source.y - 1 | 0);
      while (!(tilesBetween_2 != null ? tilesBetween_2.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_2) != null)
          return false;
        tilesBetween_2 = new Position(tilesBetween_2.x + 1 | 0, tilesBetween_2.y - 1 | 0);
      }
    }
    return true;
  };
  ChessPiece.prototype.isKnightMoveLegal_0 = function (board, action) {
    if (abs(action.source.x - action.destination.x | 0) === 2 && abs(action.source.y - action.destination.y | 0) === 1 || (abs(action.source.x - action.destination.x | 0) === 1 && abs(action.source.y - action.destination.y | 0) === 2))
      return true;
    return false;
  };
  ChessPiece.prototype.isRookMoveLegal_0 = function (board, action) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (!(action.source.x === action.destination.x || action.source.y === action.destination.y))
      return false;
    if ((action.source.x - action.destination.x | 0) < 0) {
      tmp$ = action.source.x + 1 | 0;
      tmp$_0 = action.destination.x;
      for (var i = tmp$; i < tmp$_0; i++)
        if (board.get_vux9f0$(i, action.source.y) != null)
          return false;
    }
     else if ((action.source.x - action.destination.x | 0) > 0) {
      tmp$_1 = action.source.x - 1 | 0;
      tmp$_2 = action.destination.x + 1 | 0;
      for (var i_0 = tmp$_1; i_0 >= tmp$_2; i_0--)
        if (board.get_vux9f0$(i_0, action.source.y) != null)
          return false;
    }
     else if ((action.source.y - action.destination.y | 0) < 0) {
      tmp$_3 = action.source.y + 1 | 0;
      tmp$_4 = action.destination.y;
      for (var i_1 = tmp$_3; i_1 < tmp$_4; i_1++)
        if (board.get_vux9f0$(action.source.x, i_1) != null)
          return false;
    }
     else if ((action.source.y - action.destination.y | 0) > 0) {
      tmp$_5 = action.source.y - 1 | 0;
      tmp$_6 = action.destination.y + 1 | 0;
      for (var i_2 = tmp$_5; i_2 >= tmp$_6; i_2--)
        if (board.get_vux9f0$(action.source.x, i_2) != null)
          return false;
    }
    return true;
  };
  ChessPiece.prototype.isPawnMoveLegal_0 = function (board, action) {
    var stepDirection = this.player === ChessPlayer$White_getInstance() ? 1 : -1;
    if (action.source.x === action.destination.x && (action.source.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) == null)
        return true;
    if (abs(action.source.x - action.destination.x | 0) === 1 && (action.source.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) != null)
        return true;
    if (!this.hasMoved) {
      if (action.source.x === action.destination.x && (action.source.y + (2 * stepDirection | 0) | 0) === action.destination.y) {
        var tileBetween = new Position(action.source.x, action.source.y + stepDirection | 0);
        if (board.get_dfplqh$(action.destination) == null && board.get_dfplqh$(tileBetween) == null)
          return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.isIntermediatePositionSafe_0 = function (board, intermediatePosition, originalPosition) {
    board.set_39d550$(intermediatePosition, this);
    board.set_39d550$(originalPosition, null);
    if (this.isInCheck_0(board, intermediatePosition)) {
      board.set_39d550$(intermediatePosition, null);
      board.set_39d550$(originalPosition, this);
      return false;
    }
    board.set_39d550$(intermediatePosition, null);
    board.set_39d550$(originalPosition, this);
    return true;
  };
  ChessPiece.prototype.isInCheck_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = board.height;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = board.width;
      for (var j = 0; j < tmp$_0; j++) {
        tmp$_1 = board.get_vux9f0$(i, j);
        if (tmp$_1 == null) {
          continue;
        }
        var piece = tmp$_1;
        if (piece.player !== this.player && piece.type !== ChessPieceType$King_getInstance())
          if (piece.isLegal_xm7weo$(board, new ChessAction(new Position(i, j), position)))
            return true;
      }
    }
    return false;
  };
  ChessPiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPiece',
    interfaces: []
  };
  ChessPiece.prototype.component1 = function () {
    return this.type;
  };
  ChessPiece.prototype.component2 = function () {
    return this.player;
  };
  ChessPiece.prototype.component3 = function () {
    return this.hasMoved;
  };
  ChessPiece.prototype.copy_9wx23a$ = function (type, player, hasMoved) {
    return new ChessPiece(type === void 0 ? this.type : type, player === void 0 ? this.player : player, hasMoved === void 0 ? this.hasMoved : hasMoved);
  };
  ChessPiece.prototype.toString = function () {
    return 'ChessPiece(type=' + Kotlin.toString(this.type) + (', player=' + Kotlin.toString(this.player)) + (', hasMoved=' + Kotlin.toString(this.hasMoved)) + ')';
  };
  ChessPiece.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.player) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasMoved) | 0;
    return result;
  };
  ChessPiece.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.player, other.player) && Kotlin.equals(this.hasMoved, other.hasMoved)))));
  };
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
  function main$lambda_1(closure$game, closure$canvas, closure$infoArea) {
    return function (it) {
      var tmp$;
      (tmp$ = closure$game.v) != null ? (tmp$.end(), Unit) : null;
      closure$game.v = new ChessDisplay(closure$canvas, closure$infoArea);
      return Unit;
    };
  }
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var ticTacToeButton = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    ticTacToeButton.textContent = 'Tic Tac Toe';
    ensureNotNull(document.body).appendChild(ticTacToeButton);
    var virusButton = Kotlin.isType(tmp$_0 = document.createElement('button'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    virusButton.textContent = 'Virus';
    ensureNotNull(document.body).appendChild(virusButton);
    var chessButton = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    chessButton.textContent = 'Chess';
    ensureNotNull(document.body).appendChild(chessButton);
    var infoArea = Kotlin.isType(tmp$_2 = document.createElement('div'), HTMLDivElement) ? tmp$_2 : throwCCE();
    ensureNotNull(document.body).appendChild(infoArea);
    var canvas = Kotlin.isType(tmp$_3 = document.createElement('canvas'), HTMLCanvasElement) ? tmp$_3 : throwCCE();
    var context = Kotlin.isType(tmp$_4 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_4 : throwCCE();
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    ensureNotNull(document.body).appendChild(canvas);
    var game = {v: null};
    ticTacToeButton.addEventListener('click', main$lambda(game, canvas, infoArea));
    virusButton.addEventListener('click', main$lambda_0(game, canvas, infoArea));
    chessButton.addEventListener('click', main$lambda_1(game, canvas, infoArea));
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
  SquareGrid.prototype.get_dfplqh$ = function (position) {
    return this.fields.get_za3lpa$(position.x + Kotlin.imul(this.width, position.y) | 0);
  };
  SquareGrid.prototype.set_vq7693$ = function (x, y, value) {
    this.fields.set_wxm5ur$(x + Kotlin.imul(this.width, y) | 0, value);
  };
  SquareGrid.prototype.set_39d550$ = function (position, value) {
    this.fields.set_wxm5ur$(position.x + Kotlin.imul(this.width, position.y) | 0, value);
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
  SquareGridDisplay.prototype.display_macai1$ = function (grid, fillStyle, draw) {
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
        this.context.fillStyle = fillStyle(grid.get_vux9f0$(x, y), x, y);
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
  function TicTacToe(state) {
    if (state === void 0)
      state = new TicTacToeState();
    BoardGame.call(this);
    this.state_lbl02z$_0 = state;
  }
  Object.defineProperty(TicTacToe.prototype, 'state', {
    get: function () {
      return this.state_lbl02z$_0;
    },
    set: function (state) {
      this.state_lbl02z$_0 = state;
    }
  });
  TicTacToe.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToe',
    interfaces: [BoardGame]
  };
  function TicTacToeState(board, currentPlayer, players) {
    if (board === void 0)
      board = new SquareGrid(3, 3, TicTacToeState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = TicTacToePiece$Cross_getInstance();
    if (players === void 0)
      players = listOf([TicTacToePiece$Cross_getInstance(), TicTacToePiece$Circle_getInstance()]);
    this.board_pqdyqb$_0 = board;
    this.currentPlayer_itk6nz$_0 = currentPlayer;
    this.players_f3gykn$_0 = players;
  }
  Object.defineProperty(TicTacToeState.prototype, 'board', {
    get: function () {
      return this.board_pqdyqb$_0;
    }
  });
  Object.defineProperty(TicTacToeState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_itk6nz$_0;
    }
  });
  Object.defineProperty(TicTacToeState.prototype, 'players', {
    get: function () {
      return this.players_f3gykn$_0;
    }
  });
  TicTacToeState.prototype.isLegal_11rc$ = function (action) {
    if (action.piece !== this.currentPlayer)
      return false;
    if (this.board.get_vux9f0$(action.x, action.y) != null)
      return false;
    return true;
  };
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  TicTacToeState.prototype.possibleActions = function () {
    var actions = ArrayList_init_0();
    for (var i = 0; i <= 2; i++) {
      for (var j = 0; j <= 2; j++)
        if (this.board.get_vux9f0$(i, j) == null)
          actions.add_11rb$(new TicTacToeAction(this.currentPlayer, i, j));
    }
    return toList(actions);
  };
  TicTacToeState.prototype.nextState_11rc$ = function (action) {
    var newBoard = this.board.copy_urw29u$();
    newBoard.set_vq7693$(action.x, action.y, action.piece);
    return new TicTacToeState(newBoard, this.currentPlayer === TicTacToePiece$Cross_getInstance() ? TicTacToePiece$Circle_getInstance() : TicTacToePiece$Cross_getInstance());
  };
  TicTacToeState.prototype.findWinner = function () {
    if (this.hasPieceWon_0(TicTacToePiece$Cross_getInstance()))
      return TicTacToePiece$Cross_getInstance();
    else if (this.hasPieceWon_0(TicTacToePiece$Circle_getInstance()))
      return TicTacToePiece$Circle_getInstance();
    return null;
  };
  TicTacToeState.prototype.hasPieceWon_0 = function (piece) {
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(0, 1), piece) && equals(this.board.get_vux9f0$(0, 2), piece) || (equals(this.board.get_vux9f0$(1, 0), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(1, 2), piece)) || (equals(this.board.get_vux9f0$(2, 0), piece) && equals(this.board.get_vux9f0$(2, 1), piece) && equals(this.board.get_vux9f0$(2, 2), piece)))
      return true;
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(1, 0), piece) && equals(this.board.get_vux9f0$(2, 0), piece) || (equals(this.board.get_vux9f0$(0, 1), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 1), piece)) || (equals(this.board.get_vux9f0$(0, 2), piece) && equals(this.board.get_vux9f0$(1, 2), piece) && equals(this.board.get_vux9f0$(2, 2), piece)))
      return true;
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 2), piece) || (equals(this.board.get_vux9f0$(0, 2), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 0), piece)))
      return true;
    return false;
  };
  function TicTacToeState_init$lambda(f, f_0) {
    return null;
  }
  TicTacToeState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeState',
    interfaces: [BoardGameState]
  };
  TicTacToeState.prototype.component1 = function () {
    return this.board;
  };
  TicTacToeState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  TicTacToeState.prototype.component3 = function () {
    return this.players;
  };
  TicTacToeState.prototype.copy_lnjj55$ = function (board, currentPlayer, players) {
    return new TicTacToeState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  TicTacToeState.prototype.toString = function () {
    return 'TicTacToeState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  TicTacToeState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  TicTacToeState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
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
  TicTacToeAction.prototype.copy_esb5v0$ = function (piece, x, y) {
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
  function TicTacToePiece(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TicTacToePiece_initFields() {
    TicTacToePiece_initFields = function () {
    };
    TicTacToePiece$Cross_instance = new TicTacToePiece('Cross', 0);
    TicTacToePiece$Circle_instance = new TicTacToePiece('Circle', 1);
  }
  var TicTacToePiece$Cross_instance;
  function TicTacToePiece$Cross_getInstance() {
    TicTacToePiece_initFields();
    return TicTacToePiece$Cross_instance;
  }
  var TicTacToePiece$Circle_instance;
  function TicTacToePiece$Circle_getInstance() {
    TicTacToePiece_initFields();
    return TicTacToePiece$Circle_instance;
  }
  TicTacToePiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToePiece',
    interfaces: [Enum]
  };
  function TicTacToePiece$values() {
    return [TicTacToePiece$Cross_getInstance(), TicTacToePiece$Circle_getInstance()];
  }
  TicTacToePiece.values = TicTacToePiece$values;
  function TicTacToePiece$valueOf(name) {
    switch (name) {
      case 'Cross':
        return TicTacToePiece$Cross_getInstance();
      case 'Circle':
        return TicTacToePiece$Circle_getInstance();
      default:throwISE('No enum constant TicTacToePiece.' + name);
    }
  }
  TicTacToePiece.valueOf_61zpoe$ = TicTacToePiece$valueOf;
  function TicTacToeDisplay(canvas, infoArea) {
    this.canvas = canvas;
    this.infoArea = infoArea;
    this.game = new TicTacToe();
    this.squareDisplay = new SquareGridDisplay(this.canvas);
    this.aiDelay = 10;
    this.players = LinkedHashMap_init();
    this.getColor = TicTacToeDisplay$getColor$lambda;
    this.draw = TicTacToeDisplay$draw$lambda;
    var $receiver = this.game.players;
    var key = TicTacToePiece$Cross_getInstance();
    $receiver.put_xwzc9p$(key, 'Cross');
    var $receiver_0 = this.players;
    var value = new Player();
    $receiver_0.put_xwzc9p$('Cross', value);
    var $receiver_1 = this.game.players;
    var key_0 = TicTacToePiece$Circle_getInstance();
    $receiver_1.put_xwzc9p$(key_0, 'Circle');
    var $receiver_2 = this.players;
    var value_0 = new TicTacToeAIRandom('Circle');
    $receiver_2.put_xwzc9p$('Circle', value_0);
    this.updateDisplay_pdl1vj$(null);
    this.squareDisplay.onClick = TicTacToeDisplay_init$lambda(this);
  }
  TicTacToeDisplay.prototype.performAction_eukm6g$ = function (action) {
    this.game.performAction_11rd$(action);
    this.updateDisplay_pdl1vj$(this.game.winner);
    if (this.game.winner != null)
      return;
    var $receiver = this.players;
    var key = this.game.currentPlayer();
    var tmp$;
    this.awaitActionFrom_s8jyv4$((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key));
  };
  TicTacToeDisplay.prototype.updateDisplay_pdl1vj$ = function (winner) {
    if (winner != null)
      this.infoArea.textContent = winner + ' has won!';
    else
      this.infoArea.textContent = 'Current player: ' + this.game.currentPlayer();
    this.squareDisplay.display_macai1$(this.game.state.board, this.getColor, this.draw);
  };
  TicTacToeDisplay.prototype.awaitActionFrom_s8jyv4$ = function (player) {
    if (Kotlin.isType(player, TicTacToeAI))
      this.performAction_eukm6g$(player.requestAction_11rb$(this.game.state));
  };
  TicTacToeDisplay.prototype.end = function () {
    this.squareDisplay.end();
  };
  function TicTacToeDisplay$getColor$lambda(f, f_0, f_1) {
    return 'white';
  }
  function TicTacToeDisplay$draw$lambda(context, fieldSize, piece, x, y) {
    context.fillStyle = 'black';
    context.font = fieldSize.toString() + 'px arial';
    context.textBaseline = 'top';
    if (equals(piece, TicTacToePiece$Cross_getInstance()))
      context.fillText('X', 0.0, 0.0);
    else if (equals(piece, TicTacToePiece$Circle_getInstance()))
      context.fillText('O', 0.0, 0.0);
    return Unit;
  }
  function TicTacToeDisplay_init$lambda(this$TicTacToeDisplay) {
    return function (it) {
      if (it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
        this$TicTacToeDisplay.performAction_eukm6g$(new TicTacToeAction(this$TicTacToeDisplay.game.state.currentPlayer, it.x, it.y));
      }
      return Unit;
    };
  }
  TicTacToeDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeDisplay',
    interfaces: [GameDisplay]
  };
  function Player() {
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function AIPlayer() {
  }
  AIPlayer.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AIPlayer',
    interfaces: []
  };
  function TicTacToeAI() {
  }
  TicTacToeAI.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'TicTacToeAI',
    interfaces: [AIPlayer]
  };
  function TicTacToeAIRandom(name) {
    this.name_6bxo0e$_0 = name;
  }
  Object.defineProperty(TicTacToeAIRandom.prototype, 'name', {
    get: function () {
      return this.name_6bxo0e$_0;
    }
  });
  var Random = Kotlin.kotlin.random.Random;
  var random = Kotlin.kotlin.ranges.random_xmiyix$;
  TicTacToeAIRandom.prototype.requestAction_11rb$ = function (state) {
    var actions = state.possibleActions();
    return actions.get_za3lpa$(random(until(0, actions.size), Random.Default));
  };
  TicTacToeAIRandom.prototype.endGame_iuyhfk$ = function (state, won) {
  };
  TicTacToeAIRandom.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeAIRandom',
    interfaces: [TicTacToeAI]
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
    this.squareDisplay.display_macai1$(this.game.board, getColor);
    this.infoArea.textContent = 'Current player: ' + this.players.get_za3lpa$(this.game.currentPlayer - 1 | 0);
    var sourcePosition = {v: null};
    this.squareDisplay.onClick = VirusDisplay_init$lambda_0(this, sourcePosition, getColor);
  }
  VirusDisplay.prototype.end = function () {
    this.squareDisplay.end();
  };
  function VirusDisplay_init$lambda(piece, f, f_0) {
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
          this$VirusDisplay.squareDisplay.display_macai1$(this$VirusDisplay.game.board, closure$getColor);
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
  _.BoardGame = BoardGame;
  _.BoardGameState = BoardGameState;
  _.ChessState = ChessState;
  _.ChessAction = ChessAction;
  Object.defineProperty(ChessPieceType, 'King', {
    get: ChessPieceType$King_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Queen', {
    get: ChessPieceType$Queen_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Bishop', {
    get: ChessPieceType$Bishop_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Knight', {
    get: ChessPieceType$Knight_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Rook', {
    get: ChessPieceType$Rook_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Pawn', {
    get: ChessPieceType$Pawn_getInstance
  });
  _.ChessPieceType = ChessPieceType;
  Object.defineProperty(ChessPlayer, 'White', {
    get: ChessPlayer$White_getInstance
  });
  Object.defineProperty(ChessPlayer, 'Black', {
    get: ChessPlayer$Black_getInstance
  });
  _.ChessPlayer = ChessPlayer;
  _.ChessDisplay = ChessDisplay;
  _.ChessPiece = ChessPiece;
  _.main_kand9s$ = main;
  _.GameDisplay = GameDisplay;
  _.Position = Position;
  _.SquareGrid = SquareGrid;
  _.SquareGridDisplay = SquareGridDisplay;
  _.TicTacToe = TicTacToe;
  _.TicTacToeState = TicTacToeState;
  _.TicTacToeAction = TicTacToeAction;
  Object.defineProperty(TicTacToePiece, 'Cross', {
    get: TicTacToePiece$Cross_getInstance
  });
  Object.defineProperty(TicTacToePiece, 'Circle', {
    get: TicTacToePiece$Circle_getInstance
  });
  _.TicTacToePiece = TicTacToePiece;
  _.TicTacToeDisplay = TicTacToeDisplay;
  _.Player = Player;
  _.AIPlayer = AIPlayer;
  _.TicTacToeAI = TicTacToeAI;
  _.TicTacToeAIRandom = TicTacToeAIRandom;
  _.VirusState = VirusState;
  _.VirusAction = VirusAction;
  _.VirusDisplay = VirusDisplay;
  main([]);
  Kotlin.defineModule('Tern', _);
  return _;
}(typeof Tern === 'undefined' ? {} : Tern, kotlin);
