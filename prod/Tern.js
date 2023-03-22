if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Tern'.");
}
if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'Tern'.");
}
var Tern = function (_, Kotlin, $module$kotlinx_coroutines_core) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var getCallableRef = Kotlin.getCallableRef;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var throwCCE = Kotlin.throwCCE;
  var sum = Kotlin.kotlin.collections.sum_plj8ka$;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var min = Kotlin.kotlin.collections.min_exjks8$;
  var Random = Kotlin.kotlin.random.Random_za3lpa$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var numberToInt = Kotlin.numberToInt;
  var random = Kotlin.kotlin.collections.random_iscd7z$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var random_0 = Kotlin.kotlin.ranges.random_xmiyix$;
  var toString = Kotlin.toString;
  var trimMargin = Kotlin.kotlin.text.trimMargin_rjktp$;
  var Unit = Kotlin.kotlin.Unit;
  var L100 = Kotlin.Long.fromInt(100);
  var contains = Kotlin.kotlin.collections.contains_2ws7j4$;
  var filterNotNull = Kotlin.kotlin.collections.filterNotNull_m3lr2h$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var wrapFunction = Kotlin.wrapFunction;
  var listOf_0 = Kotlin.kotlin.collections.listOf_mh5how$;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.intrinsics.COROUTINE_SUSPENDED;
  var CoroutineImpl = Kotlin.kotlin.coroutines.CoroutineImpl;
  var get_isActive = $module$kotlinx_coroutines_core.kotlinx.coroutines.get_isActive_e9pf1l$;
  var coroutines = $module$kotlinx_coroutines_core.kotlinx.coroutines;
  var delay = $module$kotlinx_coroutines_core.kotlinx.coroutines.delay_s8cxhz$;
  var withContext = $module$kotlinx_coroutines_core.kotlinx.coroutines.withContext_i5cbzn$;
  var L4000 = Kotlin.Long.fromInt(4000);
  var launch = $module$kotlinx_coroutines_core.kotlinx.coroutines.launch_s496o7$;
  var L200 = Kotlin.Long.fromInt(200);
  var promise = $module$kotlinx_coroutines_core.kotlinx.coroutines.promise_pda6u4$;
  var CompletableDeferred = $module$kotlinx_coroutines_core.kotlinx.coroutines.CompletableDeferred_xptg6w$;
  var max = Kotlin.kotlin.collections.max_exjks8$;
  Alys.prototype = Object.create(BoardGame.prototype);
  Alys.prototype.constructor = Alys;
  AlysSasEnd.prototype = Object.create(StateActionState.prototype);
  AlysSasEnd.prototype.constructor = AlysSasEnd;
  AlysSasStandard.prototype = Object.create(StateActionState.prototype);
  AlysSasStandard.prototype.constructor = AlysSasStandard;
  AlysSasBuild.prototype = Object.create(AlysSasStandard.prototype);
  AlysSasBuild.prototype.constructor = AlysSasBuild;
  AlysSasMove.prototype = Object.create(AlysSasStandard.prototype);
  AlysSasMove.prototype.constructor = AlysSasMove;
  AlysSasHire.prototype = Object.create(AlysSasMove.prototype);
  AlysSasHire.prototype.constructor = AlysSasHire;
  AlysType.prototype = Object.create(Enum.prototype);
  AlysType.prototype.constructor = AlysType;
  SimpleAlysAIType.prototype = Object.create(PlayerType.prototype);
  SimpleAlysAIType.prototype.constructor = SimpleAlysAIType;
  AlysDisplay.prototype = Object.create(GameDisplay.prototype);
  AlysDisplay.prototype.constructor = AlysDisplay;
  StandardStateActionState.prototype = Object.create(StateActionState.prototype);
  StandardStateActionState.prototype.constructor = StandardStateActionState;
  Success.prototype = Object.create(Result.prototype);
  Success.prototype.constructor = Success;
  Failure.prototype = Object.create(Result.prototype);
  Failure.prototype.constructor = Failure;
  Chess.prototype = Object.create(BoardGame.prototype);
  Chess.prototype.constructor = Chess;
  ChessSas.prototype = Object.create(StateActionState.prototype);
  ChessSas.prototype.constructor = ChessSas;
  ChessPieceType.prototype = Object.create(Enum.prototype);
  ChessPieceType.prototype.constructor = ChessPieceType;
  ChessPlayer.prototype = Object.create(Enum.prototype);
  ChessPlayer.prototype.constructor = ChessPlayer;
  ChessDisplay.prototype = Object.create(GameDisplay.prototype);
  ChessDisplay.prototype.constructor = ChessDisplay;
  HumanType.prototype = Object.create(PlayerType.prototype);
  HumanType.prototype.constructor = HumanType;
  RandomAIType.prototype = Object.create(PlayerType.prototype);
  RandomAIType.prototype.constructor = RandomAIType;
  TicTacToe.prototype = Object.create(BoardGame.prototype);
  TicTacToe.prototype.constructor = TicTacToe;
  TicTacToePiece.prototype = Object.create(Enum.prototype);
  TicTacToePiece.prototype.constructor = TicTacToePiece;
  TicTacToeDisplay.prototype = Object.create(GameDisplay.prototype);
  TicTacToeDisplay.prototype.constructor = TicTacToeDisplay;
  Virus.prototype = Object.create(BoardGame.prototype);
  Virus.prototype.constructor = Virus;
  SimpleVirusAIType.prototype = Object.create(PlayerType.prototype);
  SimpleVirusAIType.prototype.constructor = SimpleVirusAIType;
  VirusDisplay.prototype = Object.create(GameDisplay.prototype);
  VirusDisplay.prototype.constructor = VirusDisplay;
  function Alys(state) {
    Alys$Companion_getInstance();
    if (state === void 0)
      state = new AlysState();
    BoardGame.call(this);
    this.state_6qhq6m$_0 = state;
    this.actionTypes_el83hc$_0 = listOf([new ActionType('build fort', Alys$actionTypes$lambda, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasBuild$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer($receiver);
    }), getCallableRef('originAndDestinationMustBeDifferent', function ($receiver) {
      return originAndDestinationMustBeDifferent($receiver);
    }), getCallableRef('originAndDestinationMustConnected', function ($receiver) {
      return originAndDestinationMustConnected($receiver);
    }), getCallableRef('destinationMustBeCurrentPlayer', function ($receiver) {
      return destinationMustBeCurrentPlayer($receiver);
    }), getCallableRef('destinationMustBeEmpty', function ($receiver) {
      return destinationMustBeEmpty($receiver);
    }), getCallableRef('subtractMoney', function ($receiver) {
      return subtractMoney($receiver);
    }), getCallableRef('placePiece', function ($receiver) {
      return placePiece($receiver);
    })])), new ActionType('hire and move soldier', Alys$actionTypes$lambda_0, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasHire$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer($receiver);
    }), getCallableRef('originAndDestinationMustBeDifferent', function ($receiver) {
      return originAndDestinationMustBeDifferent($receiver);
    }), getCallableRef('originAndDestinationMustConnected', function ($receiver) {
      return originAndDestinationMustConnected($receiver);
    }), getCallableRef('subtractMoneyForSoldier', function ($receiver) {
      return subtractMoneyForSoldier($receiver);
    }), getCallableRef('destinationMustNotBeFortOrTown', function ($receiver) {
      return destinationMustNotBeFortOrTown($receiver);
    }), getCallableRef('destinationMustNotBeFullyUpgradedSoldier', function ($receiver) {
      return destinationMustNotBeFullyUpgradedSoldier($receiver);
    }), getCallableRef('placeOrUpgradePiece', function ($receiver) {
      return placeOrUpgradePiece($receiver);
    }), getCallableRef('removeOriginalPiece', function ($receiver) {
      return removeOriginalPiece($receiver);
    })])), new ActionType('hire soldier and invade', Alys$actionTypes$lambda_1, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasHire$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer($receiver);
    }), getCallableRef('originAndDestinationMustBeDifferent', function ($receiver) {
      return originAndDestinationMustBeDifferent($receiver);
    }), getCallableRef('originAndDestinationMustConnected', function ($receiver) {
      return originAndDestinationMustConnected($receiver);
    }), getCallableRef('subtractMoneyForSoldier', function ($receiver) {
      return subtractMoneyForSoldier($receiver);
    }), getCallableRef('pieceMustBeStronger', function ($receiver) {
      return pieceMustBeStronger($receiver);
    }), getCallableRef('invadeDestination', function ($receiver) {
      return invadeDestination($receiver);
    }), getCallableRef('removeOriginalPiece', function ($receiver) {
      return removeOriginalPiece($receiver);
    }), getCallableRef('fixSplitAreas', function ($receiver) {
      return fixSplitAreas($receiver);
    }), getCallableRef('fixMergedAreas', function ($receiver) {
      return fixMergedAreas($receiver);
    })])), new ActionType('move soldier', Alys$actionTypes$lambda_2, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasMove$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer($receiver);
    }), getCallableRef('originAndDestinationMustBeDifferent', function ($receiver) {
      return originAndDestinationMustBeDifferent($receiver);
    }), getCallableRef('originAndDestinationMustConnected', function ($receiver) {
      return originAndDestinationMustConnected($receiver);
    }), getCallableRef('pieceMustBeSoldier', function ($receiver) {
      return pieceMustBeSoldier($receiver);
    }), getCallableRef('pieceMustNotHaveMoved', function ($receiver) {
      return pieceMustNotHaveMoved($receiver);
    }), getCallableRef('destinationMustNotBeFortOrTown', function ($receiver) {
      return destinationMustNotBeFortOrTown($receiver);
    }), getCallableRef('destinationMustNotBeFullyUpgradedSoldier', function ($receiver) {
      return destinationMustNotBeFullyUpgradedSoldier($receiver);
    }), getCallableRef('placeOrUpgradePiece', function ($receiver) {
      return placeOrUpgradePiece($receiver);
    }), getCallableRef('removeOriginalPiece', function ($receiver) {
      return removeOriginalPiece($receiver);
    })])), new ActionType('invade', Alys$actionTypes$lambda_3, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasMove$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer($receiver);
    }), getCallableRef('originAndDestinationMustBeDifferent', function ($receiver) {
      return originAndDestinationMustBeDifferent($receiver);
    }), getCallableRef('originAndDestinationMustConnected', function ($receiver) {
      return originAndDestinationMustConnected($receiver);
    }), getCallableRef('pieceMustBeSoldier', function ($receiver) {
      return pieceMustBeSoldier($receiver);
    }), getCallableRef('pieceMustNotHaveMoved', function ($receiver) {
      return pieceMustNotHaveMoved($receiver);
    }), getCallableRef('pieceMustBeStronger', function ($receiver) {
      return pieceMustBeStronger($receiver);
    }), getCallableRef('invadeDestination', function ($receiver) {
      return invadeDestination($receiver);
    }), getCallableRef('removeOriginalPiece', function ($receiver) {
      return removeOriginalPiece($receiver);
    }), getCallableRef('fixSplitAreas', function ($receiver) {
      return fixSplitAreas($receiver);
    }), getCallableRef('fixMergedAreas', function ($receiver) {
      return fixMergedAreas($receiver);
    })])), new ActionType('end turn', Alys$actionTypes$lambda_4, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_yvp4zf$(oldState, action, newState);
    }.bind(null, AlysSasEnd$Companion_getInstance())), listOf([getCallableRef('changeCurrentPlayer', function ($receiver) {
      return changeCurrentPlayer($receiver);
    }), getCallableRef('incrementRound', function ($receiver) {
      return incrementRound($receiver);
    }), getCallableRef('gainIncome', function ($receiver) {
      return gainIncome($receiver);
    }), getCallableRef('spreadTrees', function ($receiver) {
      return spreadTrees($receiver);
    }), getCallableRef('spreadCoastTrees', function ($receiver) {
      return spreadCoastTrees($receiver);
    }), getCallableRef('overgrowGraves', function ($receiver) {
      return overgrowGraves($receiver);
    }), getCallableRef('killLoneSoldiers', function ($receiver) {
      return killLoneSoldiers($receiver);
    }), getCallableRef('subtractUpkeep', function ($receiver) {
      return subtractUpkeep($receiver);
    })]))]);
  }
  Object.defineProperty(Alys.prototype, 'state', {
    get: function () {
      return this.state_6qhq6m$_0;
    },
    set: function (state) {
      this.state_6qhq6m$_0 = state;
    }
  });
  Alys.prototype.copyState = function () {
    return new AlysState(this.state.width, this.state.height, this.state.playerCount, this.state.board.copy_urw29u$(), this.state.currentPlayer, this.state.players, this.state.round);
  };
  Object.defineProperty(Alys.prototype, 'actionTypes', {
    get: function () {
      return this.actionTypes_el83hc$_0;
    }
  });
  function Alys$Companion() {
    Alys$Companion_instance = this;
  }
  Alys$Companion.prototype.priceOf_xryge9$ = function (type) {
    var tmp$;
    switch (type.name) {
      case 'Soldier':
        tmp$ = 10;
        break;
      case 'Fort':
        tmp$ = 15;
        break;
      default:tmp$ = 0;
        break;
    }
    return tmp$;
  };
  Alys$Companion.prototype.upkeepFor_ibj32h$ = function (piece) {
    if (piece.type !== AlysType$Soldier_getInstance())
      return 0;
    return this.upkeepFor_za3lpa$(piece.strength);
  };
  Alys$Companion.prototype.upkeepFor_za3lpa$ = function (strength) {
    var tmp$;
    switch (strength) {
      case 1:
        tmp$ = 2;
        break;
      case 2:
        tmp$ = 6;
        break;
      case 3:
        tmp$ = 18;
        break;
      case 4:
        tmp$ = 45;
        break;
      default:tmp$ = 0;
        break;
    }
    return tmp$;
  };
  Alys$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Alys$Companion_instance = null;
  function Alys$Companion_getInstance() {
    if (Alys$Companion_instance === null) {
      new Alys$Companion();
    }
    return Alys$Companion_instance;
  }
  Alys.prototype.newGame_qt1dr2$ = function (width, height, seed) {
    if (width === void 0)
      width = 19;
    if (height === void 0)
      height = 20;
    if (seed === void 0)
      seed = 1;
    var creator = new AlysBoardCreator(width, height, seed);
    creator.generateLand();
    creator.fillBoard_za3lpa$(this.players.size);
    this.state = new AlysState(width, height, this.players.size, creator.board, 1, toList(new IntRange(1, this.players.size)));
  };
  function Alys$actionTypes$lambda(f, action) {
    return Kotlin.isType(action, AlysCreateAction) && action.type === AlysType$Fort_getInstance();
  }
  function Alys$actionTypes$lambda_0(state, action) {
    var tmp$;
    return Kotlin.isType(action, AlysCreateAction) && action.type === AlysType$Soldier_getInstance() && ((tmp$ = state.board.get_dfplqh$(action.destination)) != null ? tmp$.player : null) === state.currentPlayer;
  }
  function Alys$actionTypes$lambda_1(state, action) {
    var tmp$;
    return Kotlin.isType(action, AlysCreateAction) && action.type === AlysType$Soldier_getInstance() && ((tmp$ = state.board.get_dfplqh$(action.destination)) != null ? tmp$.player : null) !== state.currentPlayer;
  }
  function Alys$actionTypes$lambda_2(state, action) {
    var tmp$;
    return Kotlin.isType(action, AlysMoveAction) && ((tmp$ = state.board.get_dfplqh$(action.destination)) != null ? tmp$.player : null) === state.currentPlayer;
  }
  function Alys$actionTypes$lambda_3(state, action) {
    var tmp$;
    return Kotlin.isType(action, AlysMoveAction) && ((tmp$ = state.board.get_dfplqh$(action.destination)) != null ? tmp$.player : null) !== state.currentPlayer;
  }
  function Alys$actionTypes$lambda_4(f, action) {
    return Kotlin.isType(action, AlysEndTurnAction);
  }
  Alys.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Alys',
    interfaces: [BoardGame]
  };
  function originAndDestinationMustBeDifferent($receiver) {
    var tmp$;
    return Result$Companion_getInstance().check_ivxn3r$('origin and destination must be different', !((tmp$ = $receiver.origin.position) != null ? tmp$.equals($receiver.destination.position) : null));
  }
  function originAndDestinationMustConnected($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('origin and destination must connected', $receiver.oldState.isConnected_vwqnnw$($receiver.origin.position, $receiver.destination.position));
  }
  function originMustBeCurrentPlayer($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('origin must be current player', $receiver.origin.field.player === $receiver.oldState.currentPlayer);
  }
  function destinationMustBeCurrentPlayer($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('destination must be current player', $receiver.destination.field.player === $receiver.oldState.currentPlayer);
  }
  function destinationMustBeEmpty($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('destination must be empty', $receiver.destination.field.piece == null && $receiver.destination.field.treasury == null);
  }
  function destinationMustNotBeFortOrTown($receiver) {
    var tmp$;
    return Result$Companion_getInstance().check_ivxn3r$('destination must not be fort or town', !equals((tmp$ = $receiver.destination.field.piece) != null ? tmp$.type : null, AlysType$Fort_getInstance()) && $receiver.destination.field.treasury == null);
  }
  function destinationMustNotBeFullyUpgradedSoldier($receiver) {
    var tmp$;
    return Result$Companion_getInstance().check_ivxn3r$('destination must not be fully upgraded soldier', !(equals((tmp$ = $receiver.destination.field.piece) != null ? tmp$.type : null, AlysType$Soldier_getInstance()) && $receiver.destination.field.piece.strength === 4));
  }
  function pieceMustNotHaveMoved($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('piece must not have moved', !$receiver.piece.hasMoved);
  }
  function pieceMustBeSoldier($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('piece must be soldier', $receiver.piece.type === AlysType$Soldier_getInstance());
  }
  function pieceMustBeStronger($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('piece must be stronger', $receiver.piece.strength > $receiver.oldState.totalDefenseOf_qx8qel$($receiver.destination));
  }
  var Math_0 = Math;
  function placeOrUpgradePiece($receiver) {
    var destinationPiece = $receiver.destination.field.piece;
    if (destinationPiece == null)
      $receiver.newState.board.set_39d550$($receiver.destination.position, $receiver.destination.field.copy_jcygvj$(void 0, $receiver.piece.copy_thel6g$()));
    else if (destinationPiece.type === AlysType$Soldier_getInstance()) {
      var tmp$ = $receiver.newState.board;
      var tmp$_0 = $receiver.destination.position;
      var tmp$_1 = $receiver.destination.field;
      var tmp$_2 = void 0;
      var tmp$_3 = void 0;
      var b = destinationPiece.strength + $receiver.piece.strength | 0;
      tmp$.set_39d550$(tmp$_0, tmp$_1.copy_jcygvj$(tmp$_2, destinationPiece.copy_thel6g$(tmp$_3, Math_0.min(4, b))));
    }
     else
      $receiver.newState.board.set_39d550$($receiver.destination.position, $receiver.destination.field.copy_jcygvj$(void 0, $receiver.piece.copy_thel6g$(void 0, void 0, true)));
    return Result$Companion_getInstance().success();
  }
  function removeOriginalPiece($receiver) {
    var tmp$;
    $receiver.newState.board.set_39d550$($receiver.origin.position, (tmp$ = $receiver.newState.board.get_dfplqh$($receiver.origin.position)) != null ? tmp$.copy_jcygvj$(void 0, null) : null);
    return Result$Companion_getInstance().success();
  }
  function invadeDestination($receiver) {
    $receiver.newState.board.set_39d550$($receiver.destination.position, new AlysField($receiver.oldState.currentPlayer, $receiver.piece.copy_thel6g$(void 0, void 0, true)));
    return Result$Companion_getInstance().success();
  }
  var Collection = Kotlin.kotlin.collections.Collection;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Random_0 = Kotlin.kotlin.random.Random;
  function fixSplitAreas($receiver) {
    var tmp$;
    tmp$ = $receiver.newState.adjacentFields_dfplqh$($receiver.destination.position).iterator();
    loop_label: while (tmp$.hasNext()) {
      var place = tmp$.next();
      var area = $receiver.newState.connectedPositions_dfplqh$(place.position);
      if (area.size === 1) {
        $receiver.newState.board.set_39d550$(place.position, place.field.copy_jcygvj$(void 0, void 0, null));
        continue loop_label;
      }
      var any$result;
      any$break: do {
        var tmp$_0;
        if (Kotlin.isType(area, Collection) && area.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = area.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (element.field.treasury != null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        continue loop_label;
      var destination = ArrayList_init();
      var tmp$_1;
      tmp$_1 = area.iterator();
      while (tmp$_1.hasNext()) {
        var element_0 = tmp$_1.next();
        var tmp$_2, tmp$_3;
        if (!equals((tmp$_2 = element_0.field.piece) != null ? tmp$_2.type : null, AlysType$Soldier_getInstance()) && !equals((tmp$_3 = element_0.field.piece) != null ? tmp$_3.type : null, AlysType$Fort_getInstance()))
          destination.add_11rb$(element_0);
      }
      var emptyArea = destination;
      var newBase = emptyArea.isEmpty() ? random(area, Random_0.Default) : random(emptyArea, Random_0.Default);
      $receiver.newState.board.set_39d550$(newBase.position, new AlysField(newBase.field.player, void 0, 0));
    }
    return Result$Companion_getInstance().success();
  }
  function fixMergedAreas($receiver) {
    var tmp$, tmp$_0;
    var area = $receiver.newState.connectedPositions_dfplqh$($receiver.destination.position);
    var destination = ArrayList_init();
    var tmp$_1;
    tmp$_1 = area.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      if (element.field.treasury != null)
        destination.add_11rb$(element);
    }
    var bases = destination;
    var tmp$_2;
    var sum = 0;
    tmp$_2 = bases.iterator();
    while (tmp$_2.hasNext()) {
      var element_0 = tmp$_2.next();
      var tmp$_3;
      sum = sum + ((tmp$_3 = element_0.field.treasury) != null ? tmp$_3 : 0) | 0;
    }
    var treasury = sum;
    var maxBy$result;
    maxBy$break: do {
      var iterator = bases.iterator();
      if (!iterator.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator.next();
      var tmp$_4;
      var maxValue = (tmp$_4 = maxElem.field.treasury) != null ? tmp$_4 : 0;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var tmp$_5;
        var v = (tmp$_5 = e.field.treasury) != null ? tmp$_5 : 0;
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    tmp$ = maxBy$result;
    if (tmp$ == null) {
      return new Failure("There was no base? This shouldn't happen");
    }
    var biggestBase = tmp$;
    tmp$_0 = bases.iterator();
    while (tmp$_0.hasNext()) {
      var base = tmp$_0.next();
      $receiver.newState.board.set_39d550$(base.position, base.field.copy_jcygvj$(void 0, void 0, null));
    }
    $receiver.newState.board.set_39d550$(biggestBase.position, biggestBase.field.copy_jcygvj$(void 0, void 0, treasury));
    return Result$Companion_getInstance().success();
  }
  function subtractMoney($receiver) {
    if ($receiver.treasury < Alys$Companion_getInstance().priceOf_xryge9$($receiver.type))
      return new Failure('not enough money');
    $receiver.newState.board.set_39d550$($receiver.origin.position, $receiver.origin.field.copy_jcygvj$(void 0, void 0, $receiver.treasury - Alys$Companion_getInstance().priceOf_xryge9$($receiver.type) | 0));
    return Result$Companion_getInstance().success();
  }
  function subtractMoneyForSoldier($receiver) {
    if ($receiver.treasury < Alys$Companion_getInstance().priceOf_xryge9$(AlysType$Soldier_getInstance()))
      return new Failure('not enough money');
    $receiver.newState.board.set_39d550$($receiver.origin.position, $receiver.origin.field.copy_jcygvj$(void 0, void 0, $receiver.treasury - Alys$Companion_getInstance().priceOf_xryge9$(AlysType$Soldier_getInstance()) | 0));
    return Result$Companion_getInstance().success();
  }
  function placePiece($receiver) {
    $receiver.newState.board.set_39d550$($receiver.destination.position, $receiver.destination.field.copy_jcygvj$(void 0, new AlysPiece($receiver.type)));
    return Result$Companion_getInstance().success();
  }
  function changeCurrentPlayer($receiver) {
    $receiver.newState.currentPlayer = $receiver.player;
    return Result$Companion_getInstance().success();
  }
  function incrementRound($receiver) {
    if ($receiver.newState.currentPlayer < $receiver.oldState.currentPlayer)
      $receiver.newState.round = $receiver.oldState.round + 1 | 0;
    return Result$Companion_getInstance().success();
  }
  function gainIncome($receiver) {
    var tmp$, tmp$_0;
    tmp$ = $receiver.bases.iterator();
    while (tmp$.hasNext()) {
      var base = tmp$.next();
      var treasury = (typeof (tmp$_0 = base.field.treasury) === 'number' ? tmp$_0 : throwCCE()) + $receiver.oldState.incomeFor_dfplqh$(base.position) | 0;
      $receiver.newState.board.set_39d550$(base.position, base.field.copy_jcygvj$(void 0, void 0, treasury));
    }
    return Result$Companion_getInstance().success();
  }
  function spreadTrees($receiver) {
    var tmp$, tmp$_0;
    var newTrees = ArrayList_init();
    tmp$ = $receiver.playerArea.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      if (place.field.piece == null && place.field.treasury == null) {
        var $receiver_0 = $receiver.oldState.adjacentFields_dfplqh$(place.position);
        var destination = ArrayList_init();
        var tmp$_1;
        tmp$_1 = $receiver_0.iterator();
        while (tmp$_1.hasNext()) {
          var element = tmp$_1.next();
          var tmp$_2;
          if (equals((tmp$_2 = element.field.piece) != null ? tmp$_2.type : null, AlysType$Tree_getInstance()))
            destination.add_11rb$(element);
        }
        if (destination.size > 1)
          newTrees.add_11rb$(place.position);
      }
    }
    tmp$_0 = newTrees.iterator();
    while (tmp$_0.hasNext()) {
      var position = tmp$_0.next();
      $receiver.newState.board.set_39d550$(position, new AlysField($receiver.player, new AlysPiece(AlysType$Tree_getInstance())));
    }
    return Result$Companion_getInstance().success();
  }
  function spreadCoastTrees($receiver) {
    var tmp$, tmp$_0;
    var newTrees = ArrayList_init();
    tmp$ = $receiver.playerArea.iterator();
    loop_label: while (tmp$.hasNext()) {
      var place = tmp$.next();
      if (place.field.piece == null && place.field.treasury == null) {
        var adjacents = $receiver.oldState.adjacentFields_dfplqh$(place.position);
        var tmp$_1 = adjacents.size < 6;
        if (tmp$_1) {
          var any$result;
          any$break: do {
            var tmp$_2;
            if (Kotlin.isType(adjacents, Collection) && adjacents.isEmpty()) {
              any$result = false;
              break any$break;
            }
            tmp$_2 = adjacents.iterator();
            while (tmp$_2.hasNext()) {
              var element = tmp$_2.next();
              var tmp$_3;
              if (equals((tmp$_3 = element.field.piece) != null ? tmp$_3.type : null, AlysType$CoastTree_getInstance())) {
                any$result = true;
                break any$break;
              }
            }
            any$result = false;
          }
           while (false);
          tmp$_1 = any$result;
        }
        if (tmp$_1)
          newTrees.add_11rb$(place.position);
      }
    }
    tmp$_0 = newTrees.iterator();
    while (tmp$_0.hasNext()) {
      var position = tmp$_0.next();
      $receiver.newState.board.set_39d550$(position, new AlysField($receiver.player, new AlysPiece(AlysType$CoastTree_getInstance())));
    }
    return Result$Companion_getInstance().success();
  }
  function overgrowGraves($receiver) {
    var tmp$;
    var $receiver_0 = $receiver.playerArea;
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver_0.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1;
      if (equals((tmp$_1 = element.field.piece) != null ? tmp$_1.type : null, AlysType$Grave_getInstance()))
        destination.add_11rb$(element);
    }
    tmp$ = destination.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      if ($receiver.oldState.adjacentFields_dfplqh$(place.position).size < 6)
        $receiver.newState.board.set_39d550$(place.position, new AlysField($receiver.player, new AlysPiece(AlysType$CoastTree_getInstance())));
      else
        $receiver.newState.board.set_39d550$(place.position, new AlysField($receiver.player, new AlysPiece(AlysType$Tree_getInstance())));
    }
    return Result$Companion_getInstance().success();
  }
  function killLoneSoldiers($receiver) {
    var tmp$;
    var $receiver_0 = $receiver.playerArea;
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver_0.iterator();
    loop_label: while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1;
      var tmp$_2 = equals((tmp$_1 = element.field.piece) != null ? tmp$_1.type : null, AlysType$Soldier_getInstance());
      if (tmp$_2) {
        var $receiver_1 = $receiver.oldState.adjacentFields_dfplqh$(element.position);
        var none$result;
        none$break: do {
          var tmp$_3;
          if (Kotlin.isType($receiver_1, Collection) && $receiver_1.isEmpty()) {
            none$result = true;
            break none$break;
          }
          tmp$_3 = $receiver_1.iterator();
          while (tmp$_3.hasNext()) {
            var element_0 = tmp$_3.next();
            if (element_0.field.player === $receiver.player) {
              none$result = false;
              break none$break;
            }
          }
          none$result = true;
        }
         while (false);
        tmp$_2 = none$result;
      }
      if (tmp$_2)
        destination.add_11rb$(element);
    }
    tmp$ = destination.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      $receiver.newState.board.set_39d550$(place.position, new AlysField($receiver.player, new AlysPiece(AlysType$Grave_getInstance())));
    }
    return Result$Companion_getInstance().success();
  }
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function subtractUpkeep($receiver) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    tmp$ = $receiver.bases.iterator();
    while (tmp$.hasNext()) {
      var base = tmp$.next();
      var area = $receiver.oldState.connectedPositions_dfplqh$(base.position);
      var tmp$_7 = typeof (tmp$_0 = base.field.treasury) === 'number' ? tmp$_0 : throwCCE();
      var destination = ArrayList_init();
      var tmp$_8;
      tmp$_8 = area.iterator();
      while (tmp$_8.hasNext()) {
        var element = tmp$_8.next();
        var tmp$_9, tmp$_10;
        if (!equals((tmp$_9 = element.field.piece) != null ? tmp$_9.type : null, AlysType$Tree_getInstance()) && !equals((tmp$_10 = element.field.piece) != null ? tmp$_10.type : null, AlysType$CoastTree_getInstance()))
          destination.add_11rb$(element);
      }
      var treasury = tmp$_7 + destination.size | 0;
      var destination_0 = ArrayList_init();
      var tmp$_11;
      tmp$_11 = area.iterator();
      while (tmp$_11.hasNext()) {
        var element_0 = tmp$_11.next();
        var tmp$_12;
        if (equals((tmp$_12 = element_0.field.piece) != null ? tmp$_12.type : null, AlysType$Soldier_getInstance()))
          destination_0.add_11rb$(element_0);
      }
      var soldiers = destination_0;
      tmp$_1 = soldiers.iterator();
      while (tmp$_1.hasNext()) {
        var soldier = tmp$_1.next();
        tmp$_5 = soldier.position;
        tmp$_4 = soldier.field;
        tmp$_3 = (tmp$_2 = soldier.field.piece) != null ? tmp$_2.copy_thel6g$(void 0, void 0, false) : null;
        $receiver.newState.board.set_39d550$(tmp$_5, tmp$_4.copy_jcygvj$(void 0, tmp$_3));
      }
      var destination_1 = ArrayList_init_0(collectionSizeOrDefault(soldiers, 10));
      var tmp$_13;
      tmp$_13 = soldiers.iterator();
      while (tmp$_13.hasNext()) {
        var item = tmp$_13.next();
        var tmp$_14;
        destination_1.add_11rb$(Alys$Companion_getInstance().upkeepFor_ibj32h$(Kotlin.isType(tmp$_14 = item.field.piece, AlysPiece) ? tmp$_14 : throwCCE()));
      }
      var upkeep = sum(destination_1);
      if (upkeep <= treasury)
        $receiver.newState.board.set_39d550$(base.position, base.field.copy_jcygvj$(void 0, void 0, treasury - upkeep | 0));
      else {
        tmp$_6 = soldiers.iterator();
        while (tmp$_6.hasNext()) {
          var soldier_0 = tmp$_6.next();
          $receiver.newState.board.set_39d550$(soldier_0.position, new AlysField($receiver.player, new AlysPiece(AlysType$Grave_getInstance())));
        }
      }
    }
    return Result$Companion_getInstance().success();
  }
  function AlysSasEnd(playerArea, bases, player, oldState, newState) {
    AlysSasEnd$Companion_getInstance();
    StateActionState.call(this, oldState, newState);
    this.playerArea = playerArea;
    this.bases = bases;
    this.player = player;
  }
  function AlysSasEnd$Companion() {
    AlysSasEnd$Companion_instance = this;
  }
  AlysSasEnd$Companion.prototype.readyAction_yvp4zf$ = function (oldState, action, newState) {
    var tmp$;
    Kotlin.isType(tmp$ = action, AlysEndTurnAction) ? tmp$ : throwCCE();
    var nextPlayer = {v: oldState.currentPlayer + 1 | 0};
    if (nextPlayer.v > oldState.playerCount)
      nextPlayer.v = 1;
    var $receiver = oldState.board.positionedFields();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1;
      if (((tmp$_1 = element.field) != null ? tmp$_1.player : null) === nextPlayer.v)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_2;
    tmp$_2 = destination.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      var tmp$_3;
      destination_0.add_11rb$(new PositionedField(item.position, Kotlin.isType(tmp$_3 = item.field, AlysField) ? tmp$_3 : throwCCE()));
    }
    var playerArea = destination_0;
    var destination_1 = ArrayList_init();
    var tmp$_4;
    tmp$_4 = playerArea.iterator();
    while (tmp$_4.hasNext()) {
      var element_0 = tmp$_4.next();
      if (element_0.field.treasury != null)
        destination_1.add_11rb$(element_0);
    }
    var bases = destination_1;
    return new Success(new AlysSasEnd(playerArea, bases, nextPlayer.v, oldState, newState));
  };
  AlysSasEnd$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysSasEnd$Companion_instance = null;
  function AlysSasEnd$Companion_getInstance() {
    if (AlysSasEnd$Companion_instance === null) {
      new AlysSasEnd$Companion();
    }
    return AlysSasEnd$Companion_instance;
  }
  AlysSasEnd.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysSasEnd',
    interfaces: [StateActionState]
  };
  function AlysSasBuild(treasury, type, base) {
    AlysSasBuild$Companion_getInstance();
    AlysSasStandard_init(base, this);
    this.treasury = treasury;
    this.type = type;
  }
  function AlysSasBuild$Companion() {
    AlysSasBuild$Companion_instance = this;
  }
  AlysSasBuild$Companion.prototype.readyAction_yvp4zf$ = function (oldState, action, newState) {
    var tmp$, tmp$_0;
    Kotlin.isType(tmp$ = action, AlysCreateAction) ? tmp$ : throwCCE();
    var $this = AlysSasStandard$Companion_getInstance().readyAction_veqbws$(oldState, action.origin, action.destination, newState);
    var tmp$_1;
    var tmp$_2;
    if (Kotlin.isType($this, Failure)) {
      return new Failure($this.error);
    }
     else
      tmp$_2 = (Kotlin.isType(tmp$_1 = $this, Success) ? tmp$_1 : throwCCE()).value;
    var base = tmp$_2;
    tmp$_0 = base.origin.field.treasury;
    if (tmp$_0 == null) {
      return new Failure("origin isn't a base");
    }
    var treasury = tmp$_0;
    return new Success(new AlysSasBuild(treasury, action.type, base));
  };
  AlysSasBuild$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysSasBuild$Companion_instance = null;
  function AlysSasBuild$Companion_getInstance() {
    if (AlysSasBuild$Companion_instance === null) {
      new AlysSasBuild$Companion();
    }
    return AlysSasBuild$Companion_instance;
  }
  AlysSasBuild.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysSasBuild',
    interfaces: [AlysSasStandard]
  };
  function AlysSasHire(piece, treasury, base) {
    AlysSasHire$Companion_getInstance();
    AlysSasMove.call(this, piece, base);
    this.piece_o2u42u$_0 = piece;
    this.treasury = treasury;
  }
  Object.defineProperty(AlysSasHire.prototype, 'piece', {
    get: function () {
      return this.piece_o2u42u$_0;
    }
  });
  function AlysSasHire$Companion() {
    AlysSasHire$Companion_instance = this;
  }
  AlysSasHire$Companion.prototype.readyAction_yvp4zf$ = function (oldState, action, newState) {
    var tmp$, tmp$_0;
    Kotlin.isType(tmp$ = action, AlysCreateAction) ? tmp$ : throwCCE();
    var $this = AlysSasStandard$Companion_getInstance().readyAction_veqbws$(oldState, action.origin, action.destination, newState);
    var tmp$_1;
    var tmp$_2;
    if (Kotlin.isType($this, Failure)) {
      return new Failure($this.error);
    }
     else
      tmp$_2 = (Kotlin.isType(tmp$_1 = $this, Success) ? tmp$_1 : throwCCE()).value;
    var base = tmp$_2;
    tmp$_0 = base.origin.field.treasury;
    if (tmp$_0 == null) {
      return new Failure("origin isn't a base");
    }
    var treasury = tmp$_0;
    return new Success(new AlysSasHire(new AlysPiece(AlysType$Soldier_getInstance()), treasury, base));
  };
  AlysSasHire$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysSasHire$Companion_instance = null;
  function AlysSasHire$Companion_getInstance() {
    if (AlysSasHire$Companion_instance === null) {
      new AlysSasHire$Companion();
    }
    return AlysSasHire$Companion_instance;
  }
  AlysSasHire.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysSasHire',
    interfaces: [AlysSasMove]
  };
  function AlysSasMove(piece, base) {
    AlysSasMove$Companion_getInstance();
    AlysSasStandard_init(base, this);
    this.piece_kjjxd5$_0 = piece;
  }
  Object.defineProperty(AlysSasMove.prototype, 'piece', {
    get: function () {
      return this.piece_kjjxd5$_0;
    }
  });
  function AlysSasMove$Companion() {
    AlysSasMove$Companion_instance = this;
  }
  AlysSasMove$Companion.prototype.readyAction_yvp4zf$ = function (oldState, action, newState) {
    var tmp$, tmp$_0;
    Kotlin.isType(tmp$ = action, AlysMoveAction) ? tmp$ : throwCCE();
    var $this = AlysSasStandard$Companion_getInstance().readyAction_veqbws$(oldState, action.origin, action.destination, newState);
    var tmp$_1;
    var tmp$_2;
    if (Kotlin.isType($this, Failure)) {
      return new Failure($this.error);
    }
     else
      tmp$_2 = (Kotlin.isType(tmp$_1 = $this, Success) ? tmp$_1 : throwCCE()).value;
    var base = tmp$_2;
    tmp$_0 = base.origin.field.piece;
    if (tmp$_0 == null) {
      return new Failure("origin doesn't have a piece");
    }
    var piece = tmp$_0;
    return new Success(new AlysSasMove(piece, base));
  };
  AlysSasMove$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysSasMove$Companion_instance = null;
  function AlysSasMove$Companion_getInstance() {
    if (AlysSasMove$Companion_instance === null) {
      new AlysSasMove$Companion();
    }
    return AlysSasMove$Companion_instance;
  }
  AlysSasMove.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysSasMove',
    interfaces: [AlysSasStandard]
  };
  function AlysSasStandard(origin, destination, oldState, newState) {
    AlysSasStandard$Companion_getInstance();
    StateActionState.call(this, oldState, newState);
    this.origin = origin;
    this.destination = destination;
  }
  function AlysSasStandard$Companion() {
    AlysSasStandard$Companion_instance = this;
  }
  AlysSasStandard$Companion.prototype.readyAction_veqbws$ = function (oldState, origin, destination, newState) {
    var tmp$, tmp$_0;
    tmp$ = oldState.board.get_dfplqh$(origin);
    if (tmp$ == null) {
      return new Failure('origin is empty');
    }
    var originField = tmp$;
    tmp$_0 = oldState.board.get_dfplqh$(destination);
    if (tmp$_0 == null) {
      return new Failure('destination is empty');
    }
    var destinationField = tmp$_0;
    return new Success(new AlysSasStandard(new PositionedField(origin, originField), new PositionedField(destination, destinationField), oldState, newState));
  };
  AlysSasStandard$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysSasStandard$Companion_instance = null;
  function AlysSasStandard$Companion_getInstance() {
    if (AlysSasStandard$Companion_instance === null) {
      new AlysSasStandard$Companion();
    }
    return AlysSasStandard$Companion_instance;
  }
  AlysSasStandard.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysSasStandard',
    interfaces: [StateActionState]
  };
  function AlysSasStandard_init(base, $this) {
    $this = $this || Object.create(AlysSasStandard.prototype);
    AlysSasStandard.call($this, base.origin, base.destination, base.oldState, base.newState);
    return $this;
  }
  function AlysField(player, piece, treasury) {
    if (piece === void 0)
      piece = null;
    if (treasury === void 0)
      treasury = null;
    this.player = player;
    this.piece = piece;
    this.treasury = treasury;
  }
  AlysField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysField',
    interfaces: []
  };
  AlysField.prototype.component1 = function () {
    return this.player;
  };
  AlysField.prototype.component2 = function () {
    return this.piece;
  };
  AlysField.prototype.component3 = function () {
    return this.treasury;
  };
  AlysField.prototype.copy_jcygvj$ = function (player, piece, treasury) {
    return new AlysField(player === void 0 ? this.player : player, piece === void 0 ? this.piece : piece, treasury === void 0 ? this.treasury : treasury);
  };
  AlysField.prototype.toString = function () {
    return 'AlysField(player=' + Kotlin.toString(this.player) + (', piece=' + Kotlin.toString(this.piece)) + (', treasury=' + Kotlin.toString(this.treasury)) + ')';
  };
  AlysField.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.player) | 0;
    result = result * 31 + Kotlin.hashCode(this.piece) | 0;
    result = result * 31 + Kotlin.hashCode(this.treasury) | 0;
    return result;
  };
  AlysField.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.player, other.player) && Kotlin.equals(this.piece, other.piece) && Kotlin.equals(this.treasury, other.treasury)))));
  };
  function AlysPiece(type, strength, hasMoved) {
    if (strength === void 0)
      strength = 1;
    if (hasMoved === void 0)
      hasMoved = false;
    this.type = type;
    this.strength = strength;
    this.hasMoved = hasMoved;
  }
  AlysPiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysPiece',
    interfaces: []
  };
  AlysPiece.prototype.component1 = function () {
    return this.type;
  };
  AlysPiece.prototype.component2 = function () {
    return this.strength;
  };
  AlysPiece.prototype.component3 = function () {
    return this.hasMoved;
  };
  AlysPiece.prototype.copy_thel6g$ = function (type, strength, hasMoved) {
    return new AlysPiece(type === void 0 ? this.type : type, strength === void 0 ? this.strength : strength, hasMoved === void 0 ? this.hasMoved : hasMoved);
  };
  AlysPiece.prototype.toString = function () {
    return 'AlysPiece(type=' + Kotlin.toString(this.type) + (', strength=' + Kotlin.toString(this.strength)) + (', hasMoved=' + Kotlin.toString(this.hasMoved)) + ')';
  };
  AlysPiece.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.strength) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasMoved) | 0;
    return result;
  };
  AlysPiece.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.strength, other.strength) && Kotlin.equals(this.hasMoved, other.hasMoved)))));
  };
  function AlysType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function AlysType_initFields() {
    AlysType_initFields = function () {
    };
    AlysType$Fort_instance = new AlysType('Fort', 0);
    AlysType$Soldier_instance = new AlysType('Soldier', 1);
    AlysType$Grave_instance = new AlysType('Grave', 2);
    AlysType$Tree_instance = new AlysType('Tree', 3);
    AlysType$CoastTree_instance = new AlysType('CoastTree', 4);
  }
  var AlysType$Fort_instance;
  function AlysType$Fort_getInstance() {
    AlysType_initFields();
    return AlysType$Fort_instance;
  }
  var AlysType$Soldier_instance;
  function AlysType$Soldier_getInstance() {
    AlysType_initFields();
    return AlysType$Soldier_instance;
  }
  var AlysType$Grave_instance;
  function AlysType$Grave_getInstance() {
    AlysType_initFields();
    return AlysType$Grave_instance;
  }
  var AlysType$Tree_instance;
  function AlysType$Tree_getInstance() {
    AlysType_initFields();
    return AlysType$Tree_instance;
  }
  var AlysType$CoastTree_instance;
  function AlysType$CoastTree_getInstance() {
    AlysType_initFields();
    return AlysType$CoastTree_instance;
  }
  AlysType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysType',
    interfaces: [Enum]
  };
  function AlysType$values() {
    return [AlysType$Fort_getInstance(), AlysType$Soldier_getInstance(), AlysType$Grave_getInstance(), AlysType$Tree_getInstance(), AlysType$CoastTree_getInstance()];
  }
  AlysType.values = AlysType$values;
  function AlysType$valueOf(name) {
    switch (name) {
      case 'Fort':
        return AlysType$Fort_getInstance();
      case 'Soldier':
        return AlysType$Soldier_getInstance();
      case 'Grave':
        return AlysType$Grave_getInstance();
      case 'Tree':
        return AlysType$Tree_getInstance();
      case 'CoastTree':
        return AlysType$CoastTree_getInstance();
      default:throwISE('No enum constant AlysType.' + name);
    }
  }
  AlysType.valueOf_61zpoe$ = AlysType$valueOf;
  function AlysAction() {
  }
  AlysAction.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AlysAction',
    interfaces: []
  };
  function AlysMoveAction(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }
  AlysMoveAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysMoveAction',
    interfaces: [AlysAction]
  };
  AlysMoveAction.prototype.component1 = function () {
    return this.origin;
  };
  AlysMoveAction.prototype.component2 = function () {
    return this.destination;
  };
  AlysMoveAction.prototype.copy_vwqnnw$ = function (origin, destination) {
    return new AlysMoveAction(origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  AlysMoveAction.prototype.toString = function () {
    return 'AlysMoveAction(origin=' + Kotlin.toString(this.origin) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  AlysMoveAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  AlysMoveAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
  };
  function AlysCreateAction(type, origin, destination) {
    this.type = type;
    this.origin = origin;
    this.destination = destination;
  }
  AlysCreateAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysCreateAction',
    interfaces: [AlysAction]
  };
  AlysCreateAction.prototype.component1 = function () {
    return this.type;
  };
  AlysCreateAction.prototype.component2 = function () {
    return this.origin;
  };
  AlysCreateAction.prototype.component3 = function () {
    return this.destination;
  };
  AlysCreateAction.prototype.copy_yn4ggv$ = function (type, origin, destination) {
    return new AlysCreateAction(type === void 0 ? this.type : type, origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  AlysCreateAction.prototype.toString = function () {
    return 'AlysCreateAction(type=' + Kotlin.toString(this.type) + (', origin=' + Kotlin.toString(this.origin)) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  AlysCreateAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  AlysCreateAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
  };
  function AlysEndTurnAction() {
  }
  AlysEndTurnAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysEndTurnAction',
    interfaces: [AlysAction]
  };
  function SimpleAlysAIType() {
    PlayerType.call(this, 'CPU - Medium');
  }
  SimpleAlysAIType.prototype.isOfType_afkf1m$ = function (player) {
    return Kotlin.isType(player.controller, SimpleAIController);
  };
  SimpleAlysAIType.prototype.getController = function () {
    return new SimpleAIController(getCallableRef('alysUtility', function (state, action) {
      return alysUtility(state, action);
    }));
  };
  SimpleAlysAIType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SimpleAlysAIType',
    interfaces: [PlayerType]
  };
  function alysUtility(state, action) {
    if (Kotlin.isType(action, AlysEndTurnAction))
      return 0;
    if (Kotlin.isType(action, AlysMoveAction))
      return utilityFor(state, action);
    if (Kotlin.isType(action, AlysCreateAction))
      return utilityFor_0(state, action);
    return 1;
  }
  function utilityFor(state, action) {
    var tmp$, tmp$_0;
    var destination = Kotlin.isType(tmp$ = state.board.get_dfplqh$(action.destination), AlysField) ? tmp$ : throwCCE();
    if (destination.piece != null) {
      if (destination.player === state.currentPlayer) {
        switch (destination.piece.type.name) {
          case 'Soldier':
            tmp$_0 = isUpgradeWanted(state, new PositionedField(action.destination, destination)) ? 10 : -1;
            break;
          case 'Tree':
            tmp$_0 = 3;
            break;
          case 'CoastTree':
            tmp$_0 = 10;
            break;
          default:tmp$_0 = 1;
            break;
        }
      }
       else {
        switch (destination.piece.type.name) {
          case 'Soldier':
            tmp$_0 = 5;
            break;
          case 'CoastTree':
            tmp$_0 = 9;
            break;
          case 'Fort':
            tmp$_0 = 5;
            break;
          default:tmp$_0 = 1;
            break;
        }
      }
      return tmp$_0;
    }
    return 0;
  }
  function isUpgradeWanted(state, place) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$_0 = (tmp$ = place.field.piece) != null ? tmp$.strength : null;
    if (tmp$_0 == null) {
      return false;
    }
    var strength = tmp$_0;
    if (place.field.piece.hasMoved)
      return false;
    var area = state.connectedPositions_dfplqh$(place.position);
    if (!canAffordUpgrade(state, area, strength))
      return false;
    var $receiver = state.neighbouringPositions_wmyzew$(area);
    var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var item = tmp$_2.next();
      destination.add_11rb$(state.totalDefenseOf_qx8qel$(item));
    }
    tmp$_1 = min(destination);
    if (tmp$_1 == null) {
      return false;
    }
    var smallestDefense = tmp$_1;
    if (strength <= smallestDefense)
      return true;
    return false;
  }
  var mapNotNullTo$lambda = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  function canAffordUpgrade(state, area, strength) {
    var tmp$, tmp$_0;
    var oldUpkeep = Alys$Companion_getInstance().upkeepFor_za3lpa$(strength);
    var newUpkeep = Alys$Companion_getInstance().upkeepFor_za3lpa$(strength + 1 | 0);
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_1;
      tmp$_1 = area.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        if (element.field.treasury != null) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    tmp$ = firstOrNull$result;
    if (tmp$ == null) {
      return false;
    }
    var base = tmp$;
    var income = state.incomeFor_dfplqh$(base.position);
    var tmp$_2 = newUpkeep - oldUpkeep - 2;
    var destination = ArrayList_init();
    var tmp$_3;
    tmp$_3 = area.iterator();
    while (tmp$_3.hasNext()) {
      var element_0 = tmp$_3.next();
      var tmp$_0_0;
      if ((tmp$_0_0 = element_0.field.piece) != null) {
        destination.add_11rb$(tmp$_0_0);
      }
    }
    var tmp$_4;
    var sum = 0;
    tmp$_4 = destination.iterator();
    while (tmp$_4.hasNext()) {
      var element_1 = tmp$_4.next();
      sum = sum + Alys$Companion_getInstance().upkeepFor_ibj32h$(element_1) | 0;
    }
    var totalUpkeep = tmp$_2 + sum | 0;
    return (income + ((tmp$_0 = base.field.treasury) != null ? tmp$_0 : 0) | 0) >= totalUpkeep;
  }
  function utilityFor_0(state, action) {
    if (action.type === AlysType$Soldier_getInstance())
      return utilityFor(state, new AlysMoveAction(action.origin, action.destination));
    var adjacents = state.adjacentFields_dfplqh$(action.destination);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = adjacents.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element.field.player === state.currentPlayer)
        destination.add_11rb$(element);
    }
    var any$result;
    any$break: do {
      var tmp$_0;
      if (Kotlin.isType(destination, Collection) && destination.isEmpty()) {
        any$result = false;
        break any$break;
      }
      tmp$_0 = destination.iterator();
      while (tmp$_0.hasNext()) {
        var element_0 = tmp$_0.next();
        var tmp$_1;
        if (equals((tmp$_1 = element_0.field.piece) != null ? tmp$_1.type : null, AlysType$Fort_getInstance())) {
          any$result = true;
          break any$break;
        }
      }
      any$result = false;
    }
     while (false);
    var fortNearby = any$result;
    if (fortNearby)
      return -1;
    var any$result_0;
    any$break: do {
      var tmp$_2;
      if (Kotlin.isType(adjacents, Collection) && adjacents.isEmpty()) {
        any$result_0 = false;
        break any$break;
      }
      tmp$_2 = adjacents.iterator();
      while (tmp$_2.hasNext()) {
        var element_1 = tmp$_2.next();
        if (element_1.field.player !== state.currentPlayer) {
          any$result_0 = true;
          break any$break;
        }
      }
      any$result_0 = false;
    }
     while (false);
    var tmp$_3 = any$result_0;
    if (!tmp$_3) {
      var $receiver = state.neighbouringPositions_wmyzew$(adjacents);
      var any$result_1;
      any$break: do {
        var tmp$_4;
        if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
          any$result_1 = false;
          break any$break;
        }
        tmp$_4 = $receiver.iterator();
        while (tmp$_4.hasNext()) {
          var element_2 = tmp$_4.next();
          if (element_2.field.player !== state.currentPlayer) {
            any$result_1 = true;
            break any$break;
          }
        }
        any$result_1 = false;
      }
       while (false);
      tmp$_3 = any$result_1;
    }
    var enemyNearby = tmp$_3;
    return enemyNearby ? 3 : -1;
  }
  function AlysBoardCreator(width, height, seed) {
    this.seed = seed;
    this.board = new Grid(width, height, AlysBoardCreator$board$lambda);
    this.numberOfCenters = 4;
    this.landFraction = 0.75;
  }
  AlysBoardCreator.prototype.generateLand = function () {
    var tmp$;
    var random_0 = Random(this.seed);
    var remainingPositions = toMutableList(this.board.positions());
    var centers = this.generateCenters_0(remainingPositions, random_0);
    var createdFields = toMutableList(centers);
    var fieldsToCreate = numberToInt(this.board.fields.size * this.landFraction);
    loop_label: while (createdFields.size < fieldsToCreate) {
      var position = random(remainingPositions, random_0);
      var $receiver = position.adjacentHexes();
      var any$result;
      any$break: do {
        var tmp$_0;
        var adjCount = 0;
        if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (createdFields.contains_11rb$(element)) {
            adjCount++;
          }
        }
        if(adjCount >= 6) {
          any$result = true;
        } else if(adjCount >= 2 && Math.random() < 0.6) {
          any$result = true;
        } else if(adjCount >= 1 && Math.random() < 0.8) {
          any$result = true;
        } else {
          any$result = false;
        }
      }
       while (false);
      if (any$result) {
        createdFields.add_11rb$(position);
        remainingPositions.remove_11rb$(position);
      }
    }
    tmp$ = createdFields.iterator();
    while (tmp$.hasNext()) {
      var position_0 = tmp$.next();
      this.board.set_39d550$(position_0, new AlysField(0));
    }
  };
  AlysBoardCreator.prototype.generateCenters_0 = function (remainingPositions, random) {
    var tmp$;
    var centers = ArrayList_init();
    tmp$ = this.numberOfCenters;
    for (var i = 1; i <= tmp$; i++) {
      var index = random_0(until(0, remainingPositions.size), random);
      centers.add_11rb$(remainingPositions.removeAt_za3lpa$(index));
    }
    return centers;
  };
  AlysBoardCreator.prototype.fillBoard_za3lpa$ = function (playerCount) {
    var tmp$;
    var state = new AlysState(void 0, void 0, void 0, this.board);
    var random_1 = Random(this.seed);
    var $receiver = this.board.positionedFields();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.field != null)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination_0.add_11rb$(item.position);
    }
    var remainingPositions = toMutableList(destination_0);
    var averageFields = 1 + (remainingPositions.size / playerCount | 0) | 0;
    var count = 0;
    while (remainingPositions.size > 0) {
      for (var player = 1; player <= playerCount; player++) {
        if (count > 0.7 * (averageFields + averageFields * player / playerCount))
          continue;
        if (remainingPositions.size === 0)
          break;
        var index = random_0(until(0, remainingPositions.size), random_1);
        this.board.set_39d550$(remainingPositions.removeAt_za3lpa$(index), new AlysField(player));
      }
      count = count + 1 | 0;
    }
    var examinedArea = ArrayList_init();
    tmp$ = this.board.positions().iterator();
    loop_label: while (tmp$.hasNext()) {
      var position = tmp$.next();
      var any$result;
      any$break: do {
        var tmp$_2;
        if (Kotlin.isType(examinedArea, Collection) && examinedArea.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_2 = examinedArea.iterator();
        while (tmp$_2.hasNext()) {
          var element_0 = tmp$_2.next();
          var tmp$_3;
          if ((tmp$_3 = element_0.position) != null ? tmp$_3.equals(position) : null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        continue loop_label;
      var area = state.connectedPositions_dfplqh$(position);
      examinedArea.addAll_brywnq$(area);
      if (area.size < 2)
        continue loop_label;
      var base = random(area, random_1);
      var tmp$_4 = this.board;
      var tmp$_5 = base.position;
      var tmp$_6 = base.field;
      var tmp$_7 = void 0;
      var tmp$_8 = void 0;
      var destination_1 = ArrayList_init();
      var tmp$_9;
      tmp$_9 = area.iterator();
      while (tmp$_9.hasNext()) {
        var element_1 = tmp$_9.next();
        if (element_1.field.piece == null)
          destination_1.add_11rb$(element_1);
      }
      tmp$_4.set_39d550$(tmp$_5, tmp$_6.copy_jcygvj$(tmp$_7, tmp$_8, destination_1.size * 5 | 0));
    }
    var $receiver_0 = this.board.positionedFields();
    var destination_2 = ArrayList_init();
    var tmp$_10;
    tmp$_10 = $receiver_0.iterator();
    while (tmp$_10.hasNext()) {
      var element_2 = tmp$_10.next();
      if (element_2.field != null && element_2.field.piece == null && element_2.field.treasury == null)
        destination_2.add_11rb$(element_2);
    }
    var destination_3 = ArrayList_init_0(collectionSizeOrDefault(destination_2, 10));
    var tmp$_11;
    tmp$_11 = destination_2.iterator();
    while (tmp$_11.hasNext()) {
      var item_0 = tmp$_11.next();
      var tmp$_12;
      destination_3.add_11rb$(new PositionedField(item_0.position, Kotlin.isType(tmp$_12 = item_0.field, AlysField) ? tmp$_12 : throwCCE()));
    }
    var freeFields = toMutableList(destination_3);
    var trees = freeFields.size / 10 | 0;
    for (var i = 1; i <= trees; i++) {
      var bla = random(freeFields, random_1);
      freeFields.remove_11rb$(bla);
      var piece = state.adjacentFields_dfplqh$(bla.position).size < 5 ? new AlysPiece(AlysType$CoastTree_getInstance()) : new AlysPiece(AlysType$Tree_getInstance());
      this.board.set_39d550$(bla.position, bla.field.copy_jcygvj$(void 0, piece));
    }
  };
  function AlysBoardCreator$board$lambda(f, f_0) {
    return null;
  }
  AlysBoardCreator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysBoardCreator',
    interfaces: []
  };
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  function AlysDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
    GameDisplay.call(this, canvasContainer, playerArea, gameAreaTop, gameAreaRight);
    this.game_6mofcn$_0 = new Alys();
    this.originPosition_0 = null;
    this.buildType_0 = null;
    this.previousStates_0 = ArrayList_init();
    this.selectedArea_0 = emptyList();
    this.playerTypes_ftta0d$_0 = listOf([new HumanType(), new RandomAIType(), new SimpleAlysAIType()]);
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.fortButton_0 = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    this.soldierButton_0 = Kotlin.isType(tmp$_0 = document.createElement('button'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    this.undoButton_0 = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    this.endTurnButton_0 = Kotlin.isType(tmp$_2 = document.createElement('button'), HTMLButtonElement) ? tmp$_2 : throwCCE();
    this.statusArea_0 = Kotlin.isType(tmp$_3 = document.createElement('div'), HTMLDivElement) ? tmp$_3 : throwCCE();
    this.images_0 = LinkedHashMap_init();
    this.ruleArea_0 = new RuleArea(trimMargin('Alys is a game about conquering an island.\n\t\t\t|<img src="assets/B.png" /> <img src="assets/S1.png" />\n\t\t\t|You expand your territory by recruiting soldiers in town and using them to take new fields. Towns, forts and soldiers all protect the fields next to them, which means you need stronger soldiers to take them.\n\t\t\t|<img src="assets/F.png" /> <img src="assets/T.png" />\n\t\t\t|Towns collect money from the surrounding area every turn, and allow you to buy soldier and forts. Forts provide more protection than towns, so higher rank soldiers are needed to take them. Soldiers are upgraded by moving onto each other.\n\t\t'), listOf([new RuleSection('Gameplay', trimMargin('<img src="assets/BR.png" /> <img src="assets/S1R.png" />\n\t\t\t\t\t\t\t|Flags indicate when towns or soldiers are ready to do something. Clicking on an area with a town that has a flag will let you create soldiers and forts. With a town selected, you\'ll be able to press the buttons above the map.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|<img src="assets/F.png" />\n\t\t\t\t\t\t\t|Press the "Build Fort" button and select an empty field in the highlighted area to build a fort there.\n\t\t\t\t\t\t\t|<img src="assets/S1.png" /> <img src="assets/S2.png" />\n\t\t\t\t\t\t\t|Press the "Hire Soldier" button and select a field in or next to the highlighted area to place a soldier there. You can also click an existing soldier with a flag to give it orders.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|A soldier can be placed on any field in your own area, other than on forts or towns, and on any enemy field whose defense it is strong enough to beat. Placing one soldier onto another create an upgraded soldier.\n\t\t\t\t\t\t')), new RuleSection('Towns', trimMargin('<img src="assets/B.png" /> <img src="assets/BR.png" />\n\t\t\t\t\t\t\t|Towns are the centers of your areas. Each area consisting of at least two fields will have a town, which collects the money you gain from the area. You can see those details in the top right corner.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|At the beginning of every turn, the town\'s treasury grows by one per field in its area, except those that are overgrown. Then the upkeep for soldiers in the area is paid. If there\'s not enough money to pay your soldiers, they\'ll die and leave a grave.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|When two areas with a town each are connected, the town with the smaller treasury transfers its money to the other and disappears.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|A town protects the fields you own next to it, so a soldier of at least Veteran rank is needed to take it. When a town is destroyed, its treasury is lost.\n\t\t\t\t\t\t')), new RuleSection('Soldiers', trimMargin('<img src="assets/S1.png" /> <img src="assets/S2.png" /> <img src="assets/S3.png" /> <img src="assets/S4.png" />\n\t\t\t\t\t\t\t|Soldiers are used to conquer the enemies\' fields. They can move to any field neighbouring the area they are in. Like towns, soldiers protect the fields around them. Soldiers come in four ranks. Stronger soldiers beat weaker soldiers, but cost more upkeep.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|Upgrade a soldier by moving another soldier onto it.\n\t\t\t\t\t\t\t|<img src="assets/S1.png" /> <img src="assets/S1R.png" />\n\t\t\t\t\t\t\t|Recruits (upkeep 2) are only able to take undefended fields.\n\t\t\t\t\t\t\t|<img src="assets/S2.png" /> <img src="assets/S2R.png" />\n\t\t\t\t\t\t\t|Veterans (upkeep 6) can take fields defended by towns and recruits.\n\t\t\t\t\t\t\t|<img src="assets/S3.png" /> <img src="assets/S3R.png" />\n\t\t\t\t\t\t\t|Knights (upkeep 18) can take fields defended by forts and lower rank soldiers.\n\t\t\t\t\t\t\t|<img src="assets/S4.png" /> <img src="assets/S4R.png" />\n\t\t\t\t\t\t\t|Generals (upkeep 45) can take any field.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|Soldiers can generally only do one thing per turn, but are able to move freely between your empty fields.\n\t\t\t\t\t\t')), new RuleSection('Other details', trimMargin('<img src="assets/F.png" />\n\t\t\t\t\t\t\t|Fort defend and area and cost no upkeep. Only a soldier of at least Knight rank can destroy it.\n\t\t\t\t\t\t\t|<img src="assets/T.png" /> <img src="assets/C.png" />\n\t\t\t\t\t\t\t|Some fields are overgrown by trees or bushes. Overgrown fields provide no money to the town in the area, but can be removed by soldiers\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|Whenever an empty field is adjacent to two trees, the trees will spread to that area. Bushes only grow on coastal fields, and spread to adjacent empty coastal fields. Try not to get overwhelmed.\n\t\t\t\t\t\t\t|<img src="assets/G.png" />\n\t\t\t\t\t\t\t|Graves are left by soldiers when their upkeep wasn\'t paid. The following turn they\'ll overgrow and turn into trees or bushes, depending on whether they\'re near the coast or not.\n\t\t\t\t\t\t\t|\n\t\t\t\t\t\t\t|The game is won when there are no enemy towns left.\n\t\t\t\t\t\t'))]));
    this.getColor_vm40yk$_0 = AlysDisplay$getColor$lambda(this);
    this.draw_6lbnvp$_0 = AlysDisplay$draw$lambda(this);
    this.addImage_0('S1');
    this.addImage_0('S1R');
    this.addImage_0('S2');
    this.addImage_0('S2R');
    this.addImage_0('S3');
    this.addImage_0('S3R');
    this.addImage_0('S4');
    this.addImage_0('S4R');
    this.addImage_0('B');
    this.addImage_0('BR');
    this.addImage_0('F');
    this.addImage_0('T');
    this.addImage_0('C');
    this.addImage_0('G');
    this.aiDelay = L100;
    this.gridDisplay.gridColor = '#7df';
    this.gridDisplay.outerBorder = 15.0;
    this.statusArea_0.className = 'status-area';
    this.statusArea_0.textContent = 'Nothing selected';
    this.fortButton_0.textContent = 'Build fort (15)';
    this.soldierButton_0.textContent = 'Hire soldier (10)';
    this.undoButton_0.textContent = 'Undo';
    this.endTurnButton_0.textContent = 'End turn';
    this.fortButton_0.addEventListener('click', getCallableRef('buildFort', function ($receiver, event) {
      return $receiver.buildFort_0(event), Unit;
    }.bind(null, this)));
    this.soldierButton_0.addEventListener('click', getCallableRef('hireSoldier', function ($receiver, event) {
      return $receiver.hireSoldier_0(event), Unit;
    }.bind(null, this)));
    this.undoButton_0.addEventListener('click', getCallableRef('undo', function ($receiver, event) {
      return $receiver.undo_0(event), Unit;
    }.bind(null, this)));
    this.endTurnButton_0.addEventListener('click', getCallableRef('endTurn', function ($receiver, event) {
      return $receiver.endTurn_0(event), Unit;
    }.bind(null, this)));
    this.players.add_11rb$(new Player('Player 1', 'yellow', new HumanController()));
    this.players.add_11rb$(new Player('Player 2', 'orange', new SimpleAIController()));
    this.players.add_11rb$(new Player('Player 3', 'red', new SimpleAIController()));
    this.players.add_11rb$(new Player('Player 4', 'blue', new SimpleAIController()));
    this.players.add_11rb$(new Player('Player 5', 'black', new SimpleAIController()));
    this.players.add_11rb$(new Player('Player 6', 'green', new SimpleAIController()));
    this.gridDisplay.onClick = AlysDisplay_init$lambda(this);
    this.onCompleteAction_1nmxi3$_0 = AlysDisplay$onCompleteAction$lambda(this);
    this.onShowGame_59dkf9$_0 = AlysDisplay$onShowGame$lambda(this, gameAreaTop, gameAreaRight);
  }
  Object.defineProperty(AlysDisplay.prototype, 'game', {
    get: function () {
      return this.game_6mofcn$_0;
    },
    set: function (game) {
      this.game_6mofcn$_0 = game;
    }
  });
  Object.defineProperty(AlysDisplay.prototype, 'playerTypes', {
    get: function () {
      return this.playerTypes_ftta0d$_0;
    }
  });
  Object.defineProperty(AlysDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_vm40yk$_0;
    }
  });
  Object.defineProperty(AlysDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_6lbnvp$_0;
    }
  });
  AlysDisplay.prototype.soldierImage_0 = function (piece, showReady) {
    var tmp$;
    var flag = piece.hasMoved || !showReady ? '' : 'R';
    switch (piece.strength) {
      case 1:
        tmp$ = 'S1' + flag;
        break;
      case 2:
        tmp$ = 'S2' + flag;
        break;
      case 3:
        tmp$ = 'S3' + flag;
        break;
      case 4:
        tmp$ = 'S4' + flag;
        break;
      default:tmp$ = 'S1' + flag;
        break;
    }
    return tmp$;
  };
  AlysDisplay.prototype.addImage_0 = function (name) {
    var tmp$, tmp$_0;
    var $receiver = this.images_0;
    var value = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    $receiver.put_xwzc9p$(name, value);
    (tmp$_0 = this.images_0.get_11rb$(name)) != null ? (tmp$_0.src = 'assets/' + name + '.png') : null;
  };
  AlysDisplay.prototype.resize_0 = function () {
    var scale = window.devicePixelRatio;
    var size = numberToInt((this.canvas.width / scale - this.gridDisplay.outerBorder * 2) / this.game.state.width - 1);
    this.gridDisplay.fieldSize = size % 2 === 0 ? size - 1 | 0 : size;
    this.gridDisplay.showHexagons();
  };
  Object.defineProperty(AlysDisplay.prototype, 'onCompleteAction', {
    get: function () {
      return this.onCompleteAction_1nmxi3$_0;
    }
  });
  AlysDisplay.prototype.selectField_0 = function (position) {
    this.originPosition_0 = position;
    if (position != null) {
      var $receiver = this.game.state.connectedPositions_dfplqh$(position);
      var destination = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
      var tmp$;
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        destination.add_11rb$(item.position);
      }
      this.selectedArea_0 = destination;
    }
     else {
      this.selectedArea_0 = emptyList();
      this.buildType_0 = null;
    }
    this.updateDisplay();
  };
  Object.defineProperty(AlysDisplay.prototype, 'onShowGame', {
    get: function () {
      return this.onShowGame_59dkf9$_0;
    }
  });
  AlysDisplay.prototype.startNewGame = function () {
    var tmp$;
    this.game = new Alys();
    tmp$ = this.players.size;
    for (var i = 1; i <= tmp$; i++) {
      var $receiver = this.game.players;
      var value = this.players.get_za3lpa$(i - 1 | 0);
      $receiver.put_xwzc9p$(i, value);
    }
    this.game.newGame_qt1dr2$(void 0, void 0, random_0(new IntRange(0, 100000), Random_0.Default));
  };
  var mapNotNullTo$lambda_0 = wrapFunction(function () {
    return function (closure$transform, closure$destination) {
      return function (element) {
        var tmp$;
        if ((tmp$ = closure$transform(element)) != null) {
          closure$destination.add_11rb$(tmp$);
        }
        return Unit;
      };
    };
  });
  AlysDisplay.prototype.updateDisplay = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var winner = this.game.winner;
    if (winner != null) {
      this.messageLine.textContent = winner.name + ' has won after ' + toString(this.game.state.round) + ' rounds!';
      this.messageLine.className = 'message-line';
    }
     else {
      this.turnLine.textContent = 'Current player: ' + ((tmp$ = this.game.currentPlayer()) != null ? tmp$.name : null);
    }
    var origin = this.originPosition_0;
    var selectedField = origin != null ? this.game.state.board.get_dfplqh$(origin) : null;
    if ((selectedField != null ? selectedField.treasury : null) != null) {
      tmp$_1 = this.statusArea_0;
      var tmp$_4 = 'Treasury: ' + toString(selectedField.treasury) + '\nExpected income: ' + toString(this.game.state.incomeFor_dfplqh$(Kotlin.isType(tmp$_0 = origin, Position) ? tmp$_0 : throwCCE())) + '\nUpkeep: ';
      var $receiver = this.game.state.connectedPositions_dfplqh$(origin);
      var destination = ArrayList_init();
      var tmp$_5;
      tmp$_5 = $receiver.iterator();
      while (tmp$_5.hasNext()) {
        var element = tmp$_5.next();
        var tmp$_0_0;
        if ((tmp$_0_0 = element.field.piece) != null) {
          destination.add_11rb$(tmp$_0_0);
        }
      }
      var tmp$_6;
      var sum = 0;
      tmp$_6 = destination.iterator();
      while (tmp$_6.hasNext()) {
        var element_0 = tmp$_6.next();
        sum = sum + Alys$Companion_getInstance().upkeepFor_ibj32h$(element_0) | 0;
      }
      tmp$_1.textContent = tmp$_4 + toString(sum);
      if (equals(this.buildType_0, AlysType$Soldier_getInstance())) {
        tmp$_2 = this.statusArea_0;
        tmp$_2.textContent = tmp$_2.textContent + '\nCurrently hiring soldier';
      }
      if (equals(this.buildType_0, AlysType$Fort_getInstance())) {
        tmp$_3 = this.statusArea_0;
        tmp$_3.textContent = tmp$_3.textContent + '\nCurrently building fort';
      }
    }
     else {
      this.statusArea_0.textContent = 'No town selected';
    }
    this.gridDisplay.display_31tjs9$(this.game.state.board, this.getColor, this.draw);
    this.updateButtons_0();
  };
  AlysDisplay.prototype.updateButtons_0 = function () {
    var tmp$;
    var source = this.originPosition_0;
    var base = source != null ? this.game.state.board.get_dfplqh$(source) : null;
    if ((base != null ? base.treasury : null) != null) {
      this.fortButton_0.disabled = equals(this.buildType_0, AlysType$Fort_getInstance()) || base.treasury < 15;
      this.soldierButton_0.disabled = equals(this.buildType_0, AlysType$Soldier_getInstance()) || base.treasury < 10;
    }
     else {
      this.fortButton_0.disabled = true;
      this.soldierButton_0.disabled = true;
    }
    if (((tmp$ = this.previousState) != null ? tmp$.currentPlayer : null) !== this.game.state.currentPlayer)
      this.previousStates_0.clear();
    this.undoButton_0.disabled = this.previousStates_0.isEmpty();
  };
  AlysDisplay.prototype.hireSoldier_0 = function (event) {
    var tmp$;
    this.buildType_0 = AlysType$Soldier_getInstance();
    this.updateButtons_0();
    tmp$ = this.statusArea_0;
    tmp$.textContent = tmp$.textContent + '\nCurrently hiring soldier';
  };
  AlysDisplay.prototype.buildFort_0 = function (event) {
    var tmp$;
    this.buildType_0 = AlysType$Fort_getInstance();
    this.updateButtons_0();
    tmp$ = this.statusArea_0;
    tmp$.textContent = tmp$.textContent + '\nCurrently building fort';
  };
  AlysDisplay.prototype.undo_0 = function (event) {
    this.game.state = this.previousStates_0.removeAt_za3lpa$(this.previousStates_0.size - 1 | 0);
    this.updateDisplay();
  };
  AlysDisplay.prototype.endTurn_0 = function (event) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$_1 = Kotlin.isType(tmp$_0 = (tmp$ = this.game.currentPlayer()) != null ? tmp$.controller : null, HumanController) ? tmp$_0 : null;
    if (tmp$_1 == null) {
      return;
    }
    var playerController = tmp$_1;
    playerController.performAction_11rc$(new AlysEndTurnAction());
  };
  function AlysDisplay$getColor$lambda(this$AlysDisplay) {
    return function (f, x, y) {
      var tmp$;
      var origin = this$AlysDisplay.originPosition_0;
      if (origin != null && origin.x === x && origin.y === y)
        return 'white';
      tmp$ = this$AlysDisplay.game.state.board.get_vux9f0$(x, y);
      if (tmp$ == null) {
        return 'transparent';
      }
      var piece = tmp$;
      var player = this$AlysDisplay.game.players.get_11rb$(piece.player);
      if (player != null)
        return player.color;
      return 'white';
    };
  }
  function AlysDisplay$draw$lambda(this$AlysDisplay) {
    return function (context, fieldSize, field, x, y) {
      var tmp$, tmp$_0, tmp$_1;
      if (field == null)
        return;
      context.lineWidth = 2.0;
      if (this$AlysDisplay.selectedArea_0.contains_11rb$(new Position(x, y))) {
        context.strokeStyle = 'white';
        context.stroke(this$AlysDisplay.gridDisplay.hexPathOffset);
      }
      tmp$_0 = (tmp$ = field.piece) != null ? tmp$.type : null;
      if (equals(tmp$_0, AlysType$Fort_getInstance()))
        tmp$_1 = 'F';
      else if (equals(tmp$_0, AlysType$Soldier_getInstance()))
        tmp$_1 = this$AlysDisplay.soldierImage_0(field.piece, field.player === this$AlysDisplay.game.state.currentPlayer);
      else if (equals(tmp$_0, AlysType$Tree_getInstance()))
        tmp$_1 = 'T';
      else if (equals(tmp$_0, AlysType$CoastTree_getInstance()))
        tmp$_1 = 'C';
      else if (equals(tmp$_0, AlysType$Grave_getInstance()))
        tmp$_1 = 'G';
      else
        tmp$_1 = field.treasury != null && field.treasury >= 10 && field.player === this$AlysDisplay.game.state.currentPlayer ? 'BR' : field.treasury != null ? 'B' : null;
      var image = tmp$_1;
      if (image != null)
        context.drawImage(this$AlysDisplay.images_0.get_11rb$(image), 0.0, 0.0, fieldSize, fieldSize);
      return Unit;
    };
  }
  function AlysDisplay_init$lambda(this$AlysDisplay) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11;
      if (Kotlin.isType(this$AlysDisplay.game.currentPlayer(), Player) && this$AlysDisplay.game.state.board.isWithinBounds_dfplqh$(it)) {
        var origin = this$AlysDisplay.originPosition_0;
        if (origin == null) {
          tmp$ = this$AlysDisplay.game.state.board.get_dfplqh$(it);
          if (tmp$ == null) {
            return;
          }
          var selectedField = tmp$;
          if (selectedField.player !== this$AlysDisplay.game.state.currentPlayer)
            return;
          if (equals((tmp$_0 = selectedField.piece) != null ? tmp$_0.type : null, AlysType$Soldier_getInstance())) {
            if (selectedField.piece.hasMoved)
              return;
            this$AlysDisplay.selectField_0(it);
            return;
          }
          var selectedArea = this$AlysDisplay.game.state.connectedPositions_dfplqh$(it);
          var firstOrNull$result;
          firstOrNull$break: do {
            var tmp$_12;
            tmp$_12 = selectedArea.iterator();
            while (tmp$_12.hasNext()) {
              var element = tmp$_12.next();
              if (element.field.treasury != null) {
                firstOrNull$result = element;
                break firstOrNull$break;
              }
            }
            firstOrNull$result = null;
          }
           while (false);
          tmp$_2 = (tmp$_1 = firstOrNull$result) != null ? tmp$_1.position : null;
          this$AlysDisplay.selectField_0(tmp$_2);
          this$AlysDisplay.updateDisplay();
        }
         else {
          if (equals(origin, it)) {
            this$AlysDisplay.selectField_0(null);
            return;
          }
          var sourceField = this$AlysDisplay.game.state.board.get_dfplqh$(origin);
          var type = this$AlysDisplay.buildType_0;
          var destination = this$AlysDisplay.game.state.board.get_dfplqh$(it);
          if (equals((tmp$_3 = sourceField != null ? sourceField.piece : null) != null ? tmp$_3.type : null, AlysType$Soldier_getInstance()) && (destination != null ? destination.treasury : null) != null && destination.player === sourceField.player) {
            this$AlysDisplay.selectField_0(it);
            return;
          }
           else if (equals((tmp$_4 = sourceField != null ? sourceField.piece : null) != null ? tmp$_4.type : null, AlysType$Soldier_getInstance())) {
            tmp$_7 = Kotlin.isType(tmp$_6 = (tmp$_5 = this$AlysDisplay.game.currentPlayer()) != null ? tmp$_5.controller : null, HumanController) ? tmp$_6 : null;
            if (tmp$_7 == null) {
              return;
            }
            var playerController = tmp$_7;
            playerController.performAction_11rc$(new AlysMoveAction(origin, it));
          }
           else if (type != null) {
            tmp$_10 = Kotlin.isType(tmp$_9 = (tmp$_8 = this$AlysDisplay.game.currentPlayer()) != null ? tmp$_8.controller : null, HumanController) ? tmp$_9 : null;
            if (tmp$_10 == null) {
              return;
            }
            var playerController_0 = tmp$_10;
            playerController_0.performAction_11rc$(new AlysCreateAction(type, origin, it));
          }
           else if ((sourceField != null ? sourceField.treasury : null) != null) {
            if ((destination != null ? destination.player : null) === this$AlysDisplay.game.state.currentPlayer && (destination.treasury != null || equals((tmp$_11 = destination.piece) != null ? tmp$_11.type : null, AlysType$Soldier_getInstance()))) {
              this$AlysDisplay.selectField_0(it);
              return;
            }
          }
        }
      }
      return Unit;
    };
  }
  function AlysDisplay$onCompleteAction$lambda(this$AlysDisplay) {
    return function (success) {
      if (success) {
        this$AlysDisplay.selectField_0(null);
        var state = this$AlysDisplay.previousState;
        if (state != null)
          this$AlysDisplay.previousStates_0.add_11rb$(state);
      }
      return Unit;
    };
  }
  function AlysDisplay$onShowGame$lambda(this$AlysDisplay, closure$gameAreaTop, closure$gameAreaRight) {
    return function () {
      var tmp$;
      var context = Kotlin.isType(tmp$ = this$AlysDisplay.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
      context.imageSmoothingEnabled = false;
      closure$gameAreaTop.appendChild(this$AlysDisplay.undoButton_0);
      closure$gameAreaTop.appendChild(this$AlysDisplay.soldierButton_0);
      closure$gameAreaTop.appendChild(this$AlysDisplay.fortButton_0);
      closure$gameAreaTop.appendChild(this$AlysDisplay.endTurnButton_0);
      closure$gameAreaRight.appendChild(this$AlysDisplay.statusArea_0);
      this$AlysDisplay.ruleArea_0.showRules_lt8gi4$(closure$gameAreaRight);
      this$AlysDisplay.resize_0();
      return Unit;
    };
  }
  AlysDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysDisplay',
    interfaces: [GameDisplay]
  };
  function AlysState(width, height, playerCount, board, currentPlayer, players, round) {
    if (width === void 0)
      width = 10;
    if (height === void 0)
      height = 10;
    if (playerCount === void 0)
      playerCount = 4;
    if (board === void 0)
      board = new Grid(width, height, AlysState_init$lambda(playerCount));
    if (currentPlayer === void 0)
      currentPlayer = 1;
    if (players === void 0)
      players = toList(new IntRange(1, playerCount));
    if (round === void 0)
      round = 0;
    this.width = width;
    this.height = height;
    this.playerCount = playerCount;
    this.board_312tuy$_0 = board;
    this.currentPlayer_yz191a$_0 = currentPlayer;
    this.players_4wz3pm$_0 = players;
    this.round = round;
  }
  Object.defineProperty(AlysState.prototype, 'board', {
    get: function () {
      return this.board_312tuy$_0;
    }
  });
  Object.defineProperty(AlysState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_yz191a$_0;
    },
    set: function (currentPlayer) {
      this.currentPlayer_yz191a$_0 = currentPlayer;
    }
  });
  Object.defineProperty(AlysState.prototype, 'players', {
    get: function () {
      return this.players_4wz3pm$_0;
    }
  });
  AlysState.prototype.possibleActions = function () {
    var tmp$;
    var actions = ArrayList_init();
    actions.add_11rb$(new AlysEndTurnAction());
    var $receiver = this.board.positions();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1, tmp$_2;
      if (((tmp$_1 = this.board.get_dfplqh$(element)) != null ? tmp$_1.player : null) === this.currentPlayer && ((tmp$_2 = this.board.get_dfplqh$(element)) != null ? tmp$_2.treasury : null) != null)
        destination.add_11rb$(element);
    }
    var bases = destination;
    tmp$ = bases.iterator();
    while (tmp$.hasNext()) {
      var base = tmp$.next();
      actions.addAll_brywnq$(this.possibleActionsFor_0(base));
    }
    return toList(actions);
  };
  AlysState.prototype.possibleActionsFor_0 = function (basePosition) {
    var tmp$, tmp$_0;
    var actions = ArrayList_init();
    var base = Kotlin.isType(tmp$ = this.board.get_dfplqh$(basePosition), AlysField) ? tmp$ : throwCCE();
    var area = this.connectedPositions_dfplqh$(basePosition);
    actions.addAll_brywnq$(this.possibleCreateActionsFor_0(basePosition, typeof (tmp$_0 = base.treasury) === 'number' ? tmp$_0 : throwCCE(), area));
    actions.addAll_brywnq$(this.possibleMoveActionsFor_0(area));
    return actions;
  };
  AlysState.prototype.possibleCreateActionsFor_0 = function (basePosition, treasury, area) {
    var tmp$;
    var actions = ArrayList_init();
    if (treasury >= Alys$Companion_getInstance().priceOf_xryge9$(AlysType$Fort_getInstance())) {
      var destination = ArrayList_init();
      var tmp$_0;
      tmp$_0 = area.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        if (element.field.piece == null && element.field.treasury == null)
          destination.add_11rb$(element);
      }
      tmp$ = destination.iterator();
      while (tmp$.hasNext()) {
        var place = tmp$.next();
        actions.add_11rb$(new AlysCreateAction(AlysType$Fort_getInstance(), basePosition, place.position));
      }
    }
    if (treasury >= Alys$Companion_getInstance().priceOf_xryge9$(AlysType$Soldier_getInstance())) {
      var tmp$_1 = new PositionedField(basePosition, new AlysField(0, new AlysPiece(AlysType$Soldier_getInstance(), 1)));
      var destination_0 = ArrayList_init();
      var tmp$_2;
      tmp$_2 = area.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
        var tmp$_3;
        if (equals((tmp$_3 = element_0.field.piece) != null ? tmp$_3.type : null, AlysType$Soldier_getInstance()))
          destination_0.add_11rb$(element_0);
      }
      var $receiver = this.possibleMoveActionsFor_1(tmp$_1, destination_0, area, this.neighbouringPositions_wmyzew$(area));
      var destination_1 = ArrayList_init_0(collectionSizeOrDefault($receiver, 10));
      var tmp$_4;
      tmp$_4 = $receiver.iterator();
      while (tmp$_4.hasNext()) {
        var item = tmp$_4.next();
        var tmp$_5 = destination_1.add_11rb$;
        var tmp$_6;
        Kotlin.isType(tmp$_6 = item, AlysMoveAction) ? tmp$_6 : throwCCE();
        tmp$_5.call(destination_1, new AlysCreateAction(AlysType$Soldier_getInstance(), item.origin, item.destination));
      }
      actions.addAll_brywnq$(destination_1);
    }
    return actions;
  };
  AlysState.prototype.possibleMoveActionsFor_0 = function (area) {
    var tmp$;
    var actions = ArrayList_init();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = area.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      var tmp$_1;
      if (equals((tmp$_1 = element.field.piece) != null ? tmp$_1.type : null, AlysType$Soldier_getInstance()))
        destination.add_11rb$(element);
    }
    var soldiers = destination;
    var destination_0 = ArrayList_init();
    var tmp$_2;
    tmp$_2 = soldiers.iterator();
    while (tmp$_2.hasNext()) {
      var element_0 = tmp$_2.next();
      var tmp$_3;
      if (!(Kotlin.isType(tmp$_3 = element_0.field.piece, AlysPiece) ? tmp$_3 : throwCCE()).hasMoved)
        destination_0.add_11rb$(element_0);
    }
    tmp$ = destination_0.iterator();
    while (tmp$.hasNext()) {
      var soldier = tmp$.next();
      var destination_1 = ArrayList_init();
      var tmp$_4;
      tmp$_4 = soldiers.iterator();
      while (tmp$_4.hasNext()) {
        var element_1 = tmp$_4.next();
        if (!(element_1 != null ? element_1.equals(soldier) : null))
          destination_1.add_11rb$(element_1);
      }
      actions.addAll_brywnq$(this.possibleMoveActionsFor_1(soldier, destination_1, area, this.neighbouringPositions_wmyzew$(area)));
    }
    return actions;
  };
  AlysState.prototype.possibleMoveActionsFor_1 = function (soldier, otherSoldiers, area, neighbouringArea) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var actions = ArrayList_init();
    if (((tmp$ = soldier.field.piece) != null ? tmp$.strength : null) === 1) {
      var destination = ArrayList_init();
      var tmp$_3;
      tmp$_3 = otherSoldiers.iterator();
      while (tmp$_3.hasNext()) {
        var element = tmp$_3.next();
        var tmp$_4, tmp$_5;
        if ((typeof (tmp$_5 = (tmp$_4 = element.field.piece) != null ? tmp$_4.strength : null) === 'number' ? tmp$_5 : throwCCE()) < 4)
          destination.add_11rb$(element);
      }
      tmp$_0 = destination.iterator();
      while (tmp$_0.hasNext()) {
        var otherSoldier = tmp$_0.next();
        actions.add_11rb$(new AlysMoveAction(soldier.position, otherSoldier.position));
      }
    }
    var destination_0 = ArrayList_init();
    var tmp$_6;
    tmp$_6 = area.iterator();
    while (tmp$_6.hasNext()) {
      var element_0 = tmp$_6.next();
      var tmp$_7;
      if (contains(listOf([AlysType$Tree_getInstance(), AlysType$Grave_getInstance(), AlysType$CoastTree_getInstance()]), (tmp$_7 = element_0.field.piece) != null ? tmp$_7.type : null))
        destination_0.add_11rb$(element_0);
    }
    tmp$_1 = destination_0.iterator();
    while (tmp$_1.hasNext()) {
      var field = tmp$_1.next();
      actions.add_11rb$(new AlysMoveAction(soldier.position, field.position));
    }
    var destination_1 = ArrayList_init();
    var tmp$_8;
    tmp$_8 = neighbouringArea.iterator();
    while (tmp$_8.hasNext()) {
      var element_1 = tmp$_8.next();
      var tmp$_9, tmp$_10;
      if (this.totalDefenseOf_qx8qel$(element_1) < (typeof (tmp$_10 = (tmp$_9 = soldier.field.piece) != null ? tmp$_9.strength : null) === 'number' ? tmp$_10 : throwCCE()))
        destination_1.add_11rb$(element_1);
    }
    tmp$_2 = destination_1.iterator();
    while (tmp$_2.hasNext()) {
      var field_0 = tmp$_2.next();
      actions.add_11rb$(new AlysMoveAction(soldier.position, field_0.position));
    }
    return actions;
  };
  AlysState.prototype.findWinner = function () {
    var tmp$;
    var remainingPlayer = null;
    tmp$ = filterNotNull(this.board.fields).iterator();
    while (tmp$.hasNext()) {
      var field = tmp$.next();
      if (field.treasury == null)
        continue;
      var player = field.player;
      if (remainingPlayer == null)
        remainingPlayer = player;
      else if (remainingPlayer !== player)
        return null;
    }
    return remainingPlayer;
  };
  AlysState.prototype.defenseOf_i615cl$ = function (field) {
    var tmp$, tmp$_0;
    if (equals((tmp$ = field.piece) != null ? tmp$.type : null, AlysType$Soldier_getInstance())) {
      var a = field.piece.strength;
      return Math_0.min(a, 3);
    }
    if (equals((tmp$_0 = field.piece) != null ? tmp$_0.type : null, AlysType$Fort_getInstance()))
      return 2;
    if (field.treasury != null)
      return 1;
    return 0;
  };
  AlysState.prototype.totalDefenseOf_qx8qel$ = function (place) {
    var tmp$;
    var defense = this.defenseOf_i615cl$(place.field);
    var $receiver = this.adjacentFields_dfplqh$(place.position);
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.field.player === place.field.player)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination_0.add_11rb$(this.defenseOf_i615cl$(item.field));
    }
    var defenses = destination_0;
    tmp$ = defenses.iterator();
    while (tmp$.hasNext()) {
      var def = tmp$.next();
      if (def > defense)
        defense = def;
    }
    return defense;
  };
  AlysState.prototype.isConnected_vwqnnw$ = function (origin, destination) {
    var tmp$;
    var area = this.connectedPositions_dfplqh$(origin);
    tmp$ = destination.adjacentHexes().iterator();
    loop_label: while (tmp$.hasNext()) {
      var pos = tmp$.next();
      var any$result;
      any$break: do {
        var tmp$_0;
        if (Kotlin.isType(area, Collection) && area.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = area.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          var tmp$_1;
          if ((tmp$_1 = element.position) != null ? tmp$_1.equals(pos) : null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        return true;
    }
    return false;
  };
  AlysState.prototype.connectedPositions_dfplqh$ = function (origin) {
    var tmp$;
    tmp$ = this.board.get_dfplqh$(origin);
    if (tmp$ == null) {
      return emptyList();
    }
    var base = tmp$;
    var front = mutableListOf([origin]);
    var connected = mutableListOf([origin]);
    while (!front.isEmpty()) {
      var nextPosition = front.removeAt_za3lpa$(0);
      var $receiver = nextPosition.adjacentHexes();
      var destination = ArrayList_init();
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var tmp$_1;
        if (this.board.isWithinBounds_dfplqh$(element) && ((tmp$_1 = this.board.get_dfplqh$(element)) != null ? tmp$_1.player : null) === base.player)
          destination.add_11rb$(element);
      }
      var destination_0 = ArrayList_init();
      var tmp$_2;
      tmp$_2 = destination.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
        if (!connected.contains_11rb$(element_0))
          destination_0.add_11rb$(element_0);
      }
      var newConnected = destination_0;
      connected.addAll_brywnq$(newConnected);
      front.addAll_brywnq$(newConnected);
    }
    var destination_1 = ArrayList_init_0(collectionSizeOrDefault(connected, 10));
    var tmp$_3;
    tmp$_3 = connected.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      var tmp$_4;
      destination_1.add_11rb$(new PositionedField(item, Kotlin.isType(tmp$_4 = this.board.get_dfplqh$(item), AlysField) ? tmp$_4 : throwCCE()));
    }
    return destination_1;
  };
  AlysState.prototype.neighbouringPositions_wmyzew$ = function (area) {
    var tmp$;
    var neighbours = ArrayList_init();
    tmp$ = area.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      var $receiver = this.adjacentFields_dfplqh$(place.position);
      var destination = ArrayList_init();
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      loop_label: while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var all$result;
        all$break: do {
          var tmp$_1;
          if (Kotlin.isType(neighbours, Collection) && neighbours.isEmpty()) {
            all$result = true;
            break all$break;
          }
          tmp$_1 = neighbours.iterator();
          while (tmp$_1.hasNext()) {
            var element_0 = tmp$_1.next();
            var tmp$_2;
            if (!!((tmp$_2 = element_0.position) != null ? tmp$_2.equals(element.position) : null)) {
              all$result = false;
              break all$break;
            }
          }
          all$result = true;
        }
         while (false);
        if (all$result)
          destination.add_11rb$(element);
      }
      var destination_0 = ArrayList_init();
      var tmp$_3;
      tmp$_3 = destination.iterator();
      loop_label: while (tmp$_3.hasNext()) {
        var element_1 = tmp$_3.next();
        var all$result_0;
        all$break: do {
          var tmp$_4;
          if (Kotlin.isType(area, Collection) && area.isEmpty()) {
            all$result_0 = true;
            break all$break;
          }
          tmp$_4 = area.iterator();
          while (tmp$_4.hasNext()) {
            var element_2 = tmp$_4.next();
            var tmp$_5;
            if (!!((tmp$_5 = element_2.position) != null ? tmp$_5.equals(element_1.position) : null)) {
              all$result_0 = false;
              break all$break;
            }
          }
          all$result_0 = true;
        }
         while (false);
        if (all$result_0)
          destination_0.add_11rb$(element_1);
      }
      neighbours.addAll_brywnq$(destination_0);
    }
    return neighbours;
  };
  AlysState.prototype.adjacentFields_dfplqh$ = function (position) {
    var $receiver = position.adjacentHexes();
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (this.board.isWithinBounds_dfplqh$(element) && this.board.get_dfplqh$(element) != null)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_0;
    tmp$_0 = destination.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      var tmp$_1;
      destination_0.add_11rb$(new PositionedField(item, Kotlin.isType(tmp$_1 = this.board.get_dfplqh$(item), AlysField) ? tmp$_1 : throwCCE()));
    }
    return destination_0;
  };
  AlysState.prototype.incomeFor_dfplqh$ = function (basePosition) {
    var $receiver = this.connectedPositions_dfplqh$(basePosition);
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var tmp$_0, tmp$_1;
      if (!equals((tmp$_0 = element.field.piece) != null ? tmp$_0.type : null, AlysType$Tree_getInstance()) && !equals((tmp$_1 = element.field.piece) != null ? tmp$_1.type : null, AlysType$CoastTree_getInstance()))
        destination.add_11rb$(element);
    }
    return destination.size;
  };
  function AlysState_init$lambda(closure$playerCount) {
    return function (x, y) {
      return new AlysField(random_0(new IntRange(1, closure$playerCount), Random_0.Default));
    };
  }
  AlysState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysState',
    interfaces: [AIPlayable, BoardGameState]
  };
  AlysState.prototype.component1 = function () {
    return this.width;
  };
  AlysState.prototype.component2 = function () {
    return this.height;
  };
  AlysState.prototype.component3 = function () {
    return this.playerCount;
  };
  AlysState.prototype.component4 = function () {
    return this.board;
  };
  AlysState.prototype.component5 = function () {
    return this.currentPlayer;
  };
  AlysState.prototype.component6 = function () {
    return this.players;
  };
  AlysState.prototype.component7 = function () {
    return this.round;
  };
  AlysState.prototype.copy_plq8x$ = function (width, height, playerCount, board, currentPlayer, players, round) {
    return new AlysState(width === void 0 ? this.width : width, height === void 0 ? this.height : height, playerCount === void 0 ? this.playerCount : playerCount, board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players, round === void 0 ? this.round : round);
  };
  AlysState.prototype.toString = function () {
    return 'AlysState(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', playerCount=' + Kotlin.toString(this.playerCount)) + (', board=' + Kotlin.toString(this.board)) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + (', round=' + Kotlin.toString(this.round)) + ')';
  };
  AlysState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.playerCount) | 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    result = result * 31 + Kotlin.hashCode(this.round) | 0;
    return result;
  };
  AlysState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.playerCount, other.playerCount) && Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players) && Kotlin.equals(this.round, other.round)))));
  };
  function BoardGame() {
    this.players = LinkedHashMap_init();
    this.winner = null;
  }
  var Map = Kotlin.kotlin.collections.Map;
  BoardGame.prototype.performAction_11rd$ = function (action) {
    var $this = this.nextState_11rd$(action);
    var tmp$;
    var tmp$_0;
    if (Kotlin.isType($this, Failure)) {
      return $this;
    }
     else
      tmp$_0 = (Kotlin.isType(tmp$ = $this, Success) ? tmp$ : throwCCE()).value;
    this.state = tmp$_0;
    var $receiver = this.players;
    var key = this.state.findWinner();
    var tmp$_1;
    this.winner = (Kotlin.isType(tmp$_1 = $receiver, Map) ? tmp$_1 : throwCCE()).get_11rb$(key);
    return Result$Companion_getInstance().success();
  };
  BoardGame.prototype.nextState_11rd$ = function (action) {
    var tmp$, tmp$_0;
    var $receiver = this.actionTypes;
    var firstOrNull$result;
    firstOrNull$break: do {
      var tmp$_1;
      tmp$_1 = $receiver.iterator();
      while (tmp$_1.hasNext()) {
        var element = tmp$_1.next();
        if (element.shouldPerform(this.state, action)) {
          firstOrNull$result = element;
          break firstOrNull$break;
        }
      }
      firstOrNull$result = null;
    }
     while (false);
    tmp$ = firstOrNull$result;
    if (tmp$ == null) {
      return Result$Companion_getInstance().failure_ytbaoo$("Couldn't recognise action");
    }
    var actionType = Kotlin.isType(tmp$_0 = tmp$, ActionType) ? tmp$_0 : throwCCE();
    var newState = this.copyState();
    var $this = actionType.readyAction(this.state, action, newState);
    var tmp$_2;
    var tmp$_3;
    if (Kotlin.isType($this, Failure)) {
      return Result$Companion_getInstance().failure_ytbaoo$("Couldn't " + actionType.description + ' - ' + $this.error);
    }
     else
      tmp$_3 = (Kotlin.isType(tmp$_2 = $this, Success) ? tmp$_2 : throwCCE()).value;
    var sas = tmp$_3;
    var $this_0 = actionType.perform_w94i8l$(sas);
    if (Kotlin.isType($this_0, Failure)) {
      return Result$Companion_getInstance().failure_ytbaoo$("Couldn't " + actionType.description + ' - ' + $this_0.error);
    }
     else
      Kotlin.isType($this_0, Success) || throwCCE();
    return new Success(newState);
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
  function StateActionState(oldState, newState) {
    this.oldState = oldState;
    this.newState = newState;
  }
  StateActionState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StateActionState',
    interfaces: []
  };
  function StandardStateActionState(oldState, action, newState) {
    StateActionState.call(this, oldState, newState);
    this.action = action;
  }
  StandardStateActionState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StandardStateActionState',
    interfaces: [StateActionState]
  };
  function ActionType(description, shouldPerform, readyAction, updateSteps) {
    this.description = description;
    this.shouldPerform = shouldPerform;
    this.readyAction = readyAction;
    this.updateSteps = updateSteps;
  }
  ActionType.prototype.perform_w94i8l$ = function (sas) {
    var tmp$;
    tmp$ = this.updateSteps.iterator();
    while (tmp$.hasNext()) {
      var step = tmp$.next();
      var $this = step(sas);
      if (Kotlin.isType($this, Failure)) {
        return $this;
      }
       else
        Kotlin.isType($this, Success) || throwCCE();
    }
    return Result$Companion_getInstance().success();
  };
  ActionType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ActionType',
    interfaces: []
  };
  function Result() {
    Result$Companion_getInstance();
  }
  function Result$Companion() {
    Result$Companion_instance = this;
  }
  Result$Companion.prototype.success = function () {
    return new Success(null);
  };
  Result$Companion.prototype.failure_ytbaoo$ = function (error) {
    return new Failure(error);
  };
  Result$Companion.prototype.check_ivxn3r$ = function (error, result) {
    if (result)
      return new Success(null);
    return new Failure(error);
  };
  Result$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Result$Companion_instance = null;
  function Result$Companion_getInstance() {
    if (Result$Companion_instance === null) {
      new Result$Companion();
    }
    return Result$Companion_instance;
  }
  Result.prototype.onFailure_g6hfr8$ = defineInlineFunction('Tern.Result.onFailure_g6hfr8$', wrapFunction(function () {
    var Failure = _.Failure;
    var Success = _.Success;
    var throwCCE = Kotlin.throwCCE;
    return function (callback) {
      var tmp$;
      return Kotlin.isType(this, Failure) ? callback(this) : (Kotlin.isType(tmp$ = this, Success) ? tmp$ : throwCCE()).value;
    };
  }));
  Result.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Result',
    interfaces: []
  };
  function Success(value) {
    Result.call(this);
    this.value = value;
  }
  Success.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Success',
    interfaces: [Result]
  };
  function Failure(error) {
    Result.call(this);
    this.error = error;
  }
  Failure.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Failure',
    interfaces: [Result]
  };
  function Rule(description, isLegal) {
    this.description = description;
    this.isLegal = isLegal;
  }
  Rule.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Rule',
    interfaces: []
  };
  function Chess(state) {
    if (state === void 0)
      state = new ChessState();
    BoardGame.call(this);
    this.state_vr5uhj$_0 = state;
    this.actionTypes_i4pxc5$_0 = listOf_0(new ActionType('move piece', Chess$actionTypes$lambda, getCallableRef('readyAction', function ($receiver, oldState, action, newState) {
      return $receiver.readyAction_mh9kn2$(oldState, action, newState);
    }.bind(null, ChessSas$Companion_getInstance())), listOf([getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer_0($receiver);
    }), getCallableRef('destinationMustBeEmptyOrEnemy', function ($receiver) {
      return destinationMustBeEmptyOrEnemy($receiver);
    }), getCallableRef('moveMustBeLegal', function ($receiver) {
      return moveMustBeLegal($receiver);
    }), getCallableRef('movePiece', function ($receiver) {
      return movePiece($receiver);
    }), getCallableRef('switchPlayer', function ($receiver) {
      return switchPlayer($receiver);
    }), getCallableRef('kingMustNotBeInCheck', function ($receiver) {
      return kingMustNotBeInCheck($receiver);
    })])));
  }
  Object.defineProperty(Chess.prototype, 'state', {
    get: function () {
      return this.state_vr5uhj$_0;
    },
    set: function (state) {
      this.state_vr5uhj$_0 = state;
    }
  });
  Chess.prototype.copyState = function () {
    return new ChessState(this.state.board.copy_urw29u$(), this.state.currentPlayer, this.state.players);
  };
  Object.defineProperty(Chess.prototype, 'actionTypes', {
    get: function () {
      return this.actionTypes_i4pxc5$_0;
    }
  });
  function Chess$actionTypes$lambda(f, f_0) {
    return true;
  }
  Chess.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Chess',
    interfaces: [BoardGame]
  };
  function originMustBeCurrentPlayer_0($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('must move own piece', $receiver.piece.player === $receiver.oldState.currentPlayer);
  }
  function destinationMustBeEmptyOrEnemy($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('destination must be empty or enemy', $receiver.destination.field == null || $receiver.destination.field.player !== $receiver.oldState.currentPlayer);
  }
  function moveMustBeLegal($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('move must be legal', $receiver.piece.isLegal_w8obu5$($receiver.oldState.board, $receiver.action));
  }
  function kingMustNotBeInCheck($receiver) {
    var $receiver_0 = $receiver.newState.board.fields;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$;
      var index = 0;
      tmp$ = $receiver_0.iterator();
      while (tmp$.hasNext()) {
        var item = tmp$.next();
        if (equals(item != null ? item.type : null, ChessPieceType$King_getInstance()) && item.player === $receiver.oldState.currentPlayer) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var index_0 = indexOfFirst$result;
    var position = new Position(index_0 % 8, index_0 / 8 | 0);
    return Result$Companion_getInstance().check_ivxn3r$('king must not be in check', !ChessPiece$Companion_getInstance().isInCheck_wzxs7i$($receiver.newState.board, position));
  }
  function movePiece($receiver) {
    var newPiece = $receiver.piece.copy_9wx23a$(void 0, void 0, true);
    if (newPiece.type === ChessPieceType$Pawn_getInstance() && ($receiver.action.destination.y === 0 && newPiece.player === ChessPlayer$Black_getInstance() || ($receiver.action.destination.y === ($receiver.oldState.board.height - 1 | 0) && newPiece.player === ChessPlayer$White_getInstance())))
      newPiece = newPiece.copy_9wx23a$(ChessPieceType$Queen_getInstance());
    if (newPiece.type === ChessPieceType$King_getInstance() && abs($receiver.action.origin.x - $receiver.action.destination.x | 0) === 2)
      moveCastlingRook($receiver.action, $receiver.newState);
    $receiver.newState.board.set_39d550$($receiver.action.destination, newPiece);
    $receiver.newState.board.set_39d550$($receiver.action.origin, null);
    return Result$Companion_getInstance().success();
  }
  function moveCastlingRook(action, state) {
    if (action.destination.x < 4) {
      state.board.set_vq7693$(action.destination.x + 1 | 0, action.origin.y, state.board.get_vux9f0$(0, action.origin.y));
      state.board.set_vq7693$(0, action.origin.y, null);
    }
     else {
      state.board.set_vq7693$(action.destination.x - 1 | 0, action.origin.y, state.board.get_vux9f0$(state.board.width - 1 | 0, action.origin.y));
      state.board.set_vq7693$(state.board.width - 1 | 0, action.origin.y, null);
    }
  }
  function switchPlayer($receiver) {
    $receiver.newState.currentPlayer = $receiver.oldState.currentPlayer === ChessPlayer$White_getInstance() ? ChessPlayer$Black_getInstance() : ChessPlayer$White_getInstance();
    return Result$Companion_getInstance().success();
  }
  function ChessSas(piece, destination, action, oldState, newState) {
    ChessSas$Companion_getInstance();
    StateActionState.call(this, oldState, newState);
    this.piece = piece;
    this.destination = destination;
    this.action = action;
  }
  function ChessSas$Companion() {
    ChessSas$Companion_instance = this;
  }
  ChessSas$Companion.prototype.readyAction_mh9kn2$ = function (oldState, action, newState) {
    var tmp$;
    tmp$ = oldState.board.get_dfplqh$(action.origin);
    if (tmp$ == null) {
      return new Failure('must move a piece');
    }
    var originField = tmp$;
    return new Success(new ChessSas(originField, new PositionedField(action.destination, oldState.board.get_dfplqh$(action.destination)), action, oldState, newState));
  };
  ChessSas$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var ChessSas$Companion_instance = null;
  function ChessSas$Companion_getInstance() {
    if (ChessSas$Companion_instance === null) {
      new ChessSas$Companion();
    }
    return ChessSas$Companion_instance;
  }
  ChessSas.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessSas',
    interfaces: [StateActionState]
  };
  function ChessAction(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }
  ChessAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessAction',
    interfaces: []
  };
  ChessAction.prototype.component1 = function () {
    return this.origin;
  };
  ChessAction.prototype.component2 = function () {
    return this.destination;
  };
  ChessAction.prototype.copy_vwqnnw$ = function (origin, destination) {
    return new ChessAction(origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  ChessAction.prototype.toString = function () {
    return 'ChessAction(origin=' + Kotlin.toString(this.origin) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  ChessAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  ChessAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
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
  function ChessDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
    GameDisplay.call(this, canvasContainer, playerArea, gameAreaTop, gameAreaRight);
    this.game_vohlt0$_0 = new Chess();
    this.playerTypes_tldf02$_0 = listOf([new HumanType(), new RandomAIType()]);
    this.sourcePosition = null;
    this.getColor_tn0utd$_0 = ChessDisplay$getColor$lambda(this);
    this.draw_vpud9y$_0 = ChessDisplay$draw$lambda;
    this.players.add_11rb$(new Player('White', 'white', new HumanController()));
    this.players.add_11rb$(new Player('Black', 'black', new RandomAIController()));
    this.maxPlayers = 2;
    this.newPlayerButton.disabled = true;
    this.startNewGame();
    this.gridDisplay.onClick = ChessDisplay_init$lambda(this);
  }
  Object.defineProperty(ChessDisplay.prototype, 'game', {
    get: function () {
      return this.game_vohlt0$_0;
    },
    set: function (game) {
      this.game_vohlt0$_0 = game;
    }
  });
  Object.defineProperty(ChessDisplay.prototype, 'playerTypes', {
    get: function () {
      return this.playerTypes_tldf02$_0;
    }
  });
  Object.defineProperty(ChessDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_tn0utd$_0;
    }
  });
  Object.defineProperty(ChessDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_vpud9y$_0;
    }
  });
  ChessDisplay.prototype.startNewGame = function () {
    this.game = new Chess();
    var $receiver = this.game.players;
    var key = ChessPlayer$White_getInstance();
    var value = this.players.get_za3lpa$(0);
    $receiver.put_xwzc9p$(key, value);
    var $receiver_0 = this.game.players;
    var key_0 = ChessPlayer$Black_getInstance();
    var value_0 = this.players.get_za3lpa$(1);
    $receiver_0.put_xwzc9p$(key_0, value_0);
  };
  function ChessDisplay$getColor$lambda(this$ChessDisplay) {
    return function (f, x, y) {
      var source = this$ChessDisplay.sourcePosition;
      if (source != null && source.x === x && source.y === y) {
        return 'darkgrey';
      }
      if (x % 2 === 0 ? y % 2 === 0 : y % 2 === 1)
        return 'white';
      else
        return 'grey';
    };
  }
  function ChessDisplay$draw$lambda(context, fieldSize, piece, f, f_0) {
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
  function ChessDisplay_init$lambda(this$ChessDisplay) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      if (Kotlin.isType(this$ChessDisplay.game.currentPlayer(), Player) && it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
        var source = this$ChessDisplay.sourcePosition;
        if (source == null) {
          this$ChessDisplay.sourcePosition = new Position(it.x, it.y);
          this$ChessDisplay.updateDisplay();
        }
         else {
          this$ChessDisplay.sourcePosition = null;
          tmp$_1 = Kotlin.isType(tmp$_0 = (tmp$ = this$ChessDisplay.game.currentPlayer()) != null ? tmp$.controller : null, HumanController) ? tmp$_0 : null;
          if (tmp$_1 == null) {
            return;
          }
          var playerController = tmp$_1;
          playerController.performAction_11rc$(new ChessAction(source, new Position(it.x, it.y)));
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
    ChessPiece$Companion_getInstance();
    if (hasMoved === void 0)
      hasMoved = false;
    this.type = type;
    this.player = player;
    this.hasMoved = hasMoved;
  }
  ChessPiece.prototype.isLegal_w8obu5$ = function (board, action) {
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
    if (abs(action.origin.x - action.destination.x | 0) <= 1 && abs(action.origin.y - action.destination.y | 0) <= 1)
      return true;
    if (this.hasMoved || ChessPiece$Companion_getInstance().isInCheck_wzxs7i$(board, action.origin))
      return false;
    if (this.player === ChessPlayer$White_getInstance()) {
      if ((action.origin.x - action.destination.x | 0) === 2 && action.origin.y === action.destination.y) {
        var cornerPiece = board.get_vux9f0$(0, 0);
        if (cornerPiece == null || cornerPiece.player !== ChessPlayer$White_getInstance() || cornerPiece.type !== ChessPieceType$Rook_getInstance() || cornerPiece.hasMoved)
          return false;
        tmp$ = action.origin.x - 1 | 0;
        tmp$_0 = action.destination.x + 1 | 0;
        for (var i = tmp$; i >= tmp$_0; i--)
          if (board.get_vux9f0$(i, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.origin.copy_vux9f0$(action.origin.x - 1 | 0), action.origin))
          return false;
        return true;
      }
       else if ((action.origin.x - action.destination.x | 0) === -2 && action.origin.y === action.destination.y) {
        var cornerPiece_0 = board.get_vux9f0$(board.width - 1 | 0, 0);
        if (cornerPiece_0 == null || cornerPiece_0.player !== ChessPlayer$White_getInstance() || cornerPiece_0.type !== ChessPieceType$Rook_getInstance() || cornerPiece_0.hasMoved)
          return false;
        tmp$_1 = action.origin.x + 1 | 0;
        tmp$_2 = action.destination.x;
        for (var i_0 = tmp$_1; i_0 < tmp$_2; i_0++)
          if (board.get_vux9f0$(i_0, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.origin.copy_vux9f0$(action.origin.x + 1 | 0), action.origin))
          return false;
        return true;
      }
    }
     else {
      if ((action.origin.x - action.destination.x | 0) === 2 && action.origin.y === action.destination.y) {
        var cornerPiece_1 = board.get_vux9f0$(0, board.height - 1 | 0);
        if (cornerPiece_1 == null || cornerPiece_1.player !== ChessPlayer$Black_getInstance() || cornerPiece_1.type !== ChessPieceType$Rook_getInstance() || cornerPiece_1.hasMoved)
          return false;
        tmp$_3 = action.origin.x - 1 | 0;
        tmp$_4 = action.destination.x + 1 | 0;
        for (var i_1 = tmp$_3; i_1 >= tmp$_4; i_1--)
          if (board.get_vux9f0$(i_1, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.origin.copy_vux9f0$(action.origin.x - 1 | 0), action.origin))
          return false;
        return true;
      }
       else if ((action.origin.x - action.destination.x | 0) === -2 && action.origin.y === action.destination.y) {
        var cornerPiece_2 = board.get_vux9f0$(board.width - 1 | 0, board.height - 1 | 0);
        if (cornerPiece_2 == null || cornerPiece_2.player !== ChessPlayer$Black_getInstance() || cornerPiece_2.type !== ChessPieceType$Rook_getInstance() || cornerPiece_2.hasMoved)
          return false;
        tmp$_5 = action.origin.x + 1 | 0;
        tmp$_6 = action.destination.x;
        for (var i_2 = tmp$_5; i_2 < tmp$_6; i_2++)
          if (board.get_vux9f0$(i_2, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.origin.copy_vux9f0$(action.origin.x + 1 | 0), action.origin))
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
    if (abs(action.origin.x - action.destination.x | 0) !== abs(action.origin.y - action.destination.y | 0))
      return false;
    if ((action.origin.x - action.destination.x | 0) > 0 && (action.origin.y - action.destination.y | 0) > 0) {
      var tilesBetween = new Position(action.origin.x - 1 | 0, action.origin.y - 1 | 0);
      while (!(tilesBetween != null ? tilesBetween.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween) != null)
          return false;
        tilesBetween = new Position(tilesBetween.x - 1 | 0, tilesBetween.y - 1 | 0);
      }
    }
     else if ((action.origin.x - action.destination.x | 0) > 0 && (action.origin.y - action.destination.y | 0) < 0) {
      var tilesBetween_0 = new Position(action.origin.x - 1 | 0, action.origin.y + 1 | 0);
      while (!(tilesBetween_0 != null ? tilesBetween_0.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_0) != null)
          return false;
        tilesBetween_0 = new Position(tilesBetween_0.x - 1 | 0, tilesBetween_0.y + 1 | 0);
      }
    }
     else if ((action.origin.x - action.destination.x | 0) < 0 && (action.origin.y - action.destination.y | 0) < 0) {
      var tilesBetween_1 = new Position(action.origin.x + 1 | 0, action.origin.y + 1 | 0);
      while (!(tilesBetween_1 != null ? tilesBetween_1.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_1) != null)
          return false;
        tilesBetween_1 = new Position(tilesBetween_1.x + 1 | 0, tilesBetween_1.y + 1 | 0);
      }
    }
     else if ((action.origin.x - action.destination.x | 0) < 0 && (action.origin.y - action.destination.y | 0) > 0) {
      var tilesBetween_2 = new Position(action.origin.x + 1 | 0, action.origin.y - 1 | 0);
      while (!(tilesBetween_2 != null ? tilesBetween_2.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_2) != null)
          return false;
        tilesBetween_2 = new Position(tilesBetween_2.x + 1 | 0, tilesBetween_2.y - 1 | 0);
      }
    }
    return true;
  };
  ChessPiece.prototype.isKnightMoveLegal_0 = function (board, action) {
    if (abs(action.origin.x - action.destination.x | 0) === 2 && abs(action.origin.y - action.destination.y | 0) === 1 || (abs(action.origin.x - action.destination.x | 0) === 1 && abs(action.origin.y - action.destination.y | 0) === 2))
      return true;
    return false;
  };
  ChessPiece.prototype.isRookMoveLegal_0 = function (board, action) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (!(action.origin.x === action.destination.x || action.origin.y === action.destination.y))
      return false;
    if ((action.origin.x - action.destination.x | 0) < 0) {
      tmp$ = action.origin.x + 1 | 0;
      tmp$_0 = action.destination.x;
      for (var i = tmp$; i < tmp$_0; i++)
        if (board.get_vux9f0$(i, action.origin.y) != null)
          return false;
    }
     else if ((action.origin.x - action.destination.x | 0) > 0) {
      tmp$_1 = action.origin.x - 1 | 0;
      tmp$_2 = action.destination.x + 1 | 0;
      for (var i_0 = tmp$_1; i_0 >= tmp$_2; i_0--)
        if (board.get_vux9f0$(i_0, action.origin.y) != null)
          return false;
    }
     else if ((action.origin.y - action.destination.y | 0) < 0) {
      tmp$_3 = action.origin.y + 1 | 0;
      tmp$_4 = action.destination.y;
      for (var i_1 = tmp$_3; i_1 < tmp$_4; i_1++)
        if (board.get_vux9f0$(action.origin.x, i_1) != null)
          return false;
    }
     else if ((action.origin.y - action.destination.y | 0) > 0) {
      tmp$_5 = action.origin.y - 1 | 0;
      tmp$_6 = action.destination.y + 1 | 0;
      for (var i_2 = tmp$_5; i_2 >= tmp$_6; i_2--)
        if (board.get_vux9f0$(action.origin.x, i_2) != null)
          return false;
    }
    return true;
  };
  ChessPiece.prototype.isPawnMoveLegal_0 = function (board, action) {
    var stepDirection = this.player === ChessPlayer$White_getInstance() ? 1 : -1;
    if (action.origin.x === action.destination.x && (action.origin.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) == null)
        return true;
    if (abs(action.origin.x - action.destination.x | 0) === 1 && (action.origin.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) != null)
        return true;
    if (!this.hasMoved) {
      if (action.origin.x === action.destination.x && (action.origin.y + (2 * stepDirection | 0) | 0) === action.destination.y) {
        var tileBetween = new Position(action.origin.x, action.origin.y + stepDirection | 0);
        if (board.get_dfplqh$(action.destination) == null && board.get_dfplqh$(tileBetween) == null)
          return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.isIntermediatePositionSafe_0 = function (board, intermediatePosition, originalPosition) {
    board.set_39d550$(intermediatePosition, this);
    board.set_39d550$(originalPosition, null);
    if (ChessPiece$Companion_getInstance().isInCheck_wzxs7i$(board, intermediatePosition)) {
      board.set_39d550$(intermediatePosition, null);
      board.set_39d550$(originalPosition, this);
      return false;
    }
    board.set_39d550$(intermediatePosition, null);
    board.set_39d550$(originalPosition, this);
    return true;
  };
  function ChessPiece$Companion() {
    ChessPiece$Companion_instance = this;
  }
  ChessPiece$Companion.prototype.isInCheck_wzxs7i$ = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = board.height;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = board.width;
      for (var j = 0; j < tmp$_0; j++) {
        tmp$_1 = board.get_vux9f0$(i, j);
        if (tmp$_1 == null) {
          continue;
        }
        var piece = tmp$_1;
        if (!equals(piece.player, (tmp$_2 = board.get_dfplqh$(position)) != null ? tmp$_2.player : null) && piece.type !== ChessPieceType$King_getInstance())
          if (piece.isLegal_w8obu5$(board, new ChessAction(new Position(i, j), position)))
            return true;
      }
    }
    return false;
  };
  ChessPiece$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var ChessPiece$Companion_instance = null;
  function ChessPiece$Companion_getInstance() {
    if (ChessPiece$Companion_instance === null) {
      new ChessPiece$Companion();
    }
    return ChessPiece$Companion_instance;
  }
  ChessPiece.prototype.possibleMoves_wzxs7i$ = function (board, position) {
    var tmp$;
    switch (this.type.name) {
      case 'King':
        tmp$ = this.possibleKingMoves_0(board, position);
        break;
      case 'Queen':
        tmp$ = this.possibleQueenMoves_0(board, position);
        break;
      case 'Bishop':
        tmp$ = this.possibleBishopMoves_0(board, position);
        break;
      case 'Knight':
        tmp$ = this.possibleKnightMoves_0(board, position);
        break;
      case 'Rook':
        tmp$ = this.possibleRookMoves_0(board, position);
        break;
      case 'Pawn':
        tmp$ = this.possiblePawnMoves_0(board, position);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  ChessPiece.prototype.possibleKingMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var actions = ArrayList_init();
    var b = position.x - 1 | 0;
    tmp$ = Math_0.max(0, b);
    var b_0 = position.x + 1 | 0;
    tmp$_0 = Math_0.min(7, b_0);
    for (var i = tmp$; i <= tmp$_0; i++) {
      var b_1 = position.y - 1 | 0;
      tmp$_1 = Math_0.max(0, b_1);
      var b_2 = position.y + 1 | 0;
      tmp$_2 = Math_0.min(7, b_2);
      for (var j = tmp$_1; j <= tmp$_2; j++) {
        if (!equals((tmp$_3 = board.get_vux9f0$(i, j)) != null ? tmp$_3.player : null, this.player))
          actions.add_11rb$(new ChessAction(position, new Position(i, j)));
      }
    }
    return actions;
  };
  ChessPiece.prototype.possibleQueenMoves_0 = function (board, position) {
    var actions = ArrayList_init();
    actions.addAll_brywnq$(this.possibleBishopMoves_0(board, position));
    actions.addAll_brywnq$(this.possibleRookMoves_0(board, position));
    return actions;
  };
  ChessPiece.prototype.possibleBishopMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var actions = ArrayList_init();
    for (var i = 1; i <= 7; i++) {
      var pos = new Position(position.x + i | 0, position.y + i | 0);
      if (pos.x < 8 && pos.y < 8 && !equals((tmp$ = board.get_dfplqh$(pos)) != null ? tmp$.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos));
      else
        break;
    }
    for (var i_0 = 1; i_0 <= 7; i_0++) {
      var pos_0 = new Position(position.x + i_0 | 0, position.y - i_0 | 0);
      if (pos_0.x < 8 && pos_0.y >= 0 && !equals((tmp$_0 = board.get_dfplqh$(pos_0)) != null ? tmp$_0.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_0));
      else
        break;
    }
    for (var i_1 = 1; i_1 <= 7; i_1++) {
      var pos_1 = new Position(position.x - i_1 | 0, position.y + i_1 | 0);
      if (pos_1.x >= 0 && pos_1.y < 8 && !equals((tmp$_1 = board.get_dfplqh$(pos_1)) != null ? tmp$_1.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_1));
      else
        break;
    }
    for (var i_2 = 1; i_2 <= 7; i_2++) {
      var pos_2 = new Position(position.x - i_2 | 0, position.y - i_2 | 0);
      if (pos_2.x >= 0 && pos_2.y >= 0 && !equals((tmp$_2 = board.get_dfplqh$(pos_2)) != null ? tmp$_2.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_2));
      else
        break;
    }
    return actions;
  };
  ChessPiece.prototype.possibleKnightMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var actions = ArrayList_init();
    var destination = position.add_vux9f0$(1, 2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$ = board.get_dfplqh$(destination)) != null ? tmp$.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(2, 1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_0 = board.get_dfplqh$(destination)) != null ? tmp$_0.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(1, -2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_1 = board.get_dfplqh$(destination)) != null ? tmp$_1.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(2, -1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_2 = board.get_dfplqh$(destination)) != null ? tmp$_2.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-1, 2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_3 = board.get_dfplqh$(destination)) != null ? tmp$_3.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-2, 1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_4 = board.get_dfplqh$(destination)) != null ? tmp$_4.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-1, -2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_5 = board.get_dfplqh$(destination)) != null ? tmp$_5.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-2, -1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_6 = board.get_dfplqh$(destination)) != null ? tmp$_6.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    return actions;
  };
  function ChessPiece$possibleRookMoves$lambda(closure$board, closure$actions, closure$position, this$ChessPiece) {
    return function (pos) {
      var tmp$, tmp$_0;
      if (!closure$board.isWithinBounds_dfplqh$(pos))
        return true;
      if (closure$board.get_dfplqh$(pos) == null)
        closure$actions.add_11rb$(new ChessAction(closure$position, pos));
      else if (equals((tmp$ = closure$board.get_dfplqh$(pos)) != null ? tmp$.player : null, this$ChessPiece.player)) {
        return true;
      }
       else if (!equals((tmp$_0 = closure$board.get_dfplqh$(pos)) != null ? tmp$_0.player : null, this$ChessPiece.player)) {
        closure$actions.add_11rb$(new ChessAction(closure$position, pos));
        return true;
      }
      return false;
    };
  }
  ChessPiece.prototype.possibleRookMoves_0 = function (board, position) {
    var actions = ArrayList_init();
    var addOrBreak = ChessPiece$possibleRookMoves$lambda(board, actions, position, this);
    for (var i = 1; i <= 7; i++)
      if (addOrBreak(new Position(position.x + i | 0, position.y)))
        break;
    for (var i_0 = 1; i_0 <= 7; i_0++)
      if (addOrBreak(new Position(position.x - i_0 | 0, position.y)))
        break;
    for (var i_1 = 1; i_1 <= 7; i_1++)
      if (addOrBreak(new Position(position.x, position.y + i_1 | 0)))
        break;
    for (var i_2 = 1; i_2 <= 7; i_2++)
      if (addOrBreak(new Position(position.x, position.y - i_2 | 0)))
        break;
    return actions;
  };
  ChessPiece.prototype.possiblePawnMoves_0 = function (board, position) {
    var tmp$, tmp$_0;
    var actions = ArrayList_init();
    var direction = this.player === ChessPlayer$Black_getInstance() ? -1 : 1;
    if (board.get_vux9f0$(position.x, position.y + direction | 0) == null)
      actions.add_11rb$(new ChessAction(position, new Position(position.x, position.y + direction | 0)));
    if (!this.hasMoved && board.get_vux9f0$(position.x, position.y + direction | 0) == null && board.get_vux9f0$(position.x, position.y + (direction * 2 | 0) | 0) == null)
      actions.add_11rb$(new ChessAction(position, new Position(position.x, position.y + (direction * 2 | 0) | 0)));
    if (position.x > 0 && board.get_vux9f0$(position.x - 1 | 0, position.y + direction | 0) != null && !equals((tmp$ = board.get_vux9f0$(position.x - 1 | 0, position.y + direction | 0)) != null ? tmp$.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, new Position(position.x - 1 | 0, position.y + direction | 0)));
    if (position.x < 7 && board.get_vux9f0$(position.x + 1 | 0, position.y + direction | 0) != null && !equals((tmp$_0 = board.get_vux9f0$(position.x + 1 | 0, position.y + direction | 0)) != null ? tmp$_0.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, new Position(position.x + 1 | 0, position.y + direction | 0)));
    return actions;
  };
  ChessPiece.prototype.isWithinBoard_0 = function (position) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = position.x;
    if (0 <= tmp$ && tmp$ <= 7) {
      tmp$_0 = position.y;
      tmp$_1 = (0 <= tmp$_0 && tmp$_0 <= 7);
    }
     else
      tmp$_1 = false;
    return tmp$_1;
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
  function ChessState(board, currentPlayer, players) {
    if (board === void 0)
      board = new Grid(8, 8, ChessState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = ChessPlayer$White_getInstance();
    if (players === void 0)
      players = listOf([ChessPlayer$White_getInstance(), ChessPlayer$Black_getInstance()]);
    this.board_mlguen$_0 = board;
    this.currentPlayer_mainy5$_0 = currentPlayer;
    this.players_otp1fp$_0 = players;
  }
  Object.defineProperty(ChessState.prototype, 'board', {
    get: function () {
      return this.board_mlguen$_0;
    }
  });
  Object.defineProperty(ChessState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_mainy5$_0;
    },
    set: function (currentPlayer) {
      this.currentPlayer_mainy5$_0 = currentPlayer;
    }
  });
  Object.defineProperty(ChessState.prototype, 'players', {
    get: function () {
      return this.players_otp1fp$_0;
    }
  });
  ChessState.prototype.possibleActions = function () {
    var actions = ArrayList_init();
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var piece = this.board.get_vux9f0$(i, j);
        if (!equals(piece != null ? piece.player : null, this.currentPlayer))
          continue;
        var $receiver = piece.possibleMoves_wzxs7i$(this.board, new Position(i, j));
        var destination = ArrayList_init();
        var tmp$;
        tmp$ = $receiver.iterator();
        loop_label: while (tmp$.hasNext()) {
          var element = tmp$.next();
          var predicate$result;
          predicate$break: do {
            var $this = ChessSas$Companion_getInstance().readyAction_mh9kn2$(this, element, (new Chess(this)).copyState());
            var tmp$_0;
            var tmp$_1;
            if (Kotlin.isType($this, Failure)) {
              predicate$result = true;
              break predicate$break;
            }
             else
              tmp$_1 = (Kotlin.isType(tmp$_0 = $this, Success) ? tmp$_0 : throwCCE()).value;
            var sas = tmp$_1;
            movePiece(sas);
            predicate$result = Kotlin.isType(kingMustNotBeInCheck(sas), Success);
          }
           while (false);
          if (predicate$result)
            destination.add_11rb$(element);
        }
        actions.addAll_brywnq$(destination);
      }
    }
    return actions;
  };
  ChessState.prototype.findWinner = function () {
    if (!this.possibleActions().isEmpty())
      return null;
    return this.currentPlayer === ChessPlayer$Black_getInstance() ? ChessPlayer$White_getInstance() : ChessPlayer$Black_getInstance();
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
    interfaces: [AIPlayable, BoardGameState]
  };
  ChessState.prototype.component1 = function () {
    return this.board;
  };
  ChessState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  ChessState.prototype.component3 = function () {
    return this.players;
  };
  ChessState.prototype.copy_d7oxyc$ = function (board, currentPlayer, players) {
    return new ChessState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  ChessState.prototype.toString = function () {
    return 'ChessState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  ChessState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  ChessState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  function GameDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
    this.canvasContainer = canvasContainer;
    this.playerArea = playerArea;
    this.gameAreaTop = gameAreaTop;
    this.gameAreaRight = gameAreaRight;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.canvas = Kotlin.isType(tmp$ = document.createElement('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    this.gridDisplay = new GridDisplay(this.canvas);
    this.aiDelay = L200;
    this.players = ArrayList_init();
    this.minPlayers = 2;
    this.maxPlayers = 8;
    this.playerList = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
    this.newGameButton = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    this.newPlayerButton = Kotlin.isType(tmp$_2 = document.createElement('button'), HTMLButtonElement) ? tmp$_2 : throwCCE();
    this.turnLine = Kotlin.isType(tmp$_3 = document.createElement('div'), HTMLDivElement) ? tmp$_3 : throwCCE();
    this.messageLine = Kotlin.isType(tmp$_4 = document.createElement('div'), HTMLDivElement) ? tmp$_4 : throwCCE();
    this.previousState = null;
    this.loopJop = null;
    this.turnLine.className = 'message-line';
    this.messageLine.className = 'message-line';
    this.newGameButton.className = 'new-game';
    this.newGameButton.textContent = 'Start new game';
    this.newGameButton.onclick = GameDisplay_init$lambda(this);
    this.newPlayerButton.textContent = 'Add player';
    this.newPlayerButton.onclick = GameDisplay_init$lambda_0(this);
    launch(coroutines.GlobalScope, void 0, void 0, GameDisplay_init$lambda_1(this));
    this.onShowGame_qijy9e$_0 = null;
    this.onCompleteAction_a7tkmq$_0 = null;
  }
  GameDisplay.prototype.showGame = function () {
    var tmp$;
    this.playerArea.innerHTML = '';
    this.gameAreaTop.innerHTML = '';
    this.gameAreaRight.innerHTML = '';
    this.canvasContainer.innerHTML = '';
    this.canvasContainer.appendChild(this.canvas);
    this.sizeCanvas();
    this.playerArea.appendChild(this.playerList);
    this.playerArea.appendChild(this.newPlayerButton);
    this.playerArea.appendChild(this.newGameButton);
    this.playerArea.appendChild(this.turnLine);
    this.playerArea.appendChild(this.messageLine);
    (tmp$ = this.onShowGame) != null ? tmp$() : null;
    this.updateDisplay();
    this.updatePlayerList();
  };
  Object.defineProperty(GameDisplay.prototype, 'onShowGame', {
    get: function () {
      return this.onShowGame_qijy9e$_0;
    }
  });
  GameDisplay.prototype.sizeCanvas = function () {
    var tmp$, tmp$_0;
    var dpr = window.devicePixelRatio;
    var element = Kotlin.isType(tmp$ = this.canvas.parentElement, HTMLElement) ? tmp$ : throwCCE();
    var a = element.clientWidth;
    var b = window.innerHeight - 40 | 0;
    var styleSize = Math_0.min(a, b);
    var size = numberToInt(styleSize * dpr);
    this.canvas.style.width = styleSize.toString() + 'px';
    this.canvas.style.height = styleSize.toString() + 'px';
    this.canvas.width = size;
    this.canvas.height = size;
    var context = Kotlin.isType(tmp$_0 = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    context.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
    context.scale(dpr, dpr);
  };
  function Coroutine$GameDisplay$turnLoop$lambda(this$GameDisplay_0, closure$controller_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
    this.local$closure$controller = closure$controller_0;
  }
  Coroutine$GameDisplay$turnLoop$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay$turnLoop$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay$turnLoop$lambda.prototype.constructor = Coroutine$GameDisplay$turnLoop$lambda;
  Coroutine$GameDisplay$turnLoop$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = delay(this.local$this$GameDisplay.aiDelay, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.state_0 = 3;
            this.result_0 = this.local$closure$controller.requestAction_11rb$(this.local$this$GameDisplay.game.state, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 3:
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay$turnLoop$lambda(this$GameDisplay_0, closure$controller_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay$turnLoop$lambda(this$GameDisplay_0, closure$controller_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$turnLoop_gkk88$($this, scope_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.$this = $this;
    this.local$controller = void 0;
    this.local$scope = scope_0;
  }
  Coroutine$turnLoop_gkk88$.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$turnLoop_gkk88$.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$turnLoop_gkk88$.prototype.constructor = Coroutine$turnLoop_gkk88$;
  Coroutine$turnLoop_gkk88$.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            var tmp$, tmp$_0;
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            if (this.$this.game.winner != null || !get_isActive(this.local$scope)) {
              this.state_0 = 5;
              continue;
            }

            this.local$controller = (tmp$ = this.$this.game.currentPlayer()) != null ? tmp$.controller : null;
            if (this.local$controller == null) {
              this.$this.messageLine.textContent = 'No current player?';
              return;
            }
             else {
              this.state_0 = 3;
              continue;
            }

          case 3:
            this.state_0 = 4;
            this.result_0 = withContext(coroutines.Dispatchers.Unconfined, GameDisplay$turnLoop$lambda(this.$this, this.local$controller), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 4:
            var action = this.result_0;
            var success = this.$this.performAction_x22ubb$_0(action);
            (tmp$_0 = this.$this.onCompleteAction) != null ? tmp$_0(success) : null;
            this.state_0 = 2;
            continue;
          case 5:
            return;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  GameDisplay.prototype.turnLoop_gkk88$ = function (scope_0, continuation_0, suspended) {
    var instance = new Coroutine$turnLoop_gkk88$(this, scope_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  };
  function Coroutine$GameDisplay$performAction$lambda$lambda(this$GameDisplay_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
  }
  Coroutine$GameDisplay$performAction$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay$performAction$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay$performAction$lambda$lambda.prototype.constructor = Coroutine$GameDisplay$performAction$lambda$lambda;
  Coroutine$GameDisplay$performAction$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = delay(L4000, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            if (equals(this.local$this$GameDisplay.messageLine.className, 'message-line')) {
              return this.local$this$GameDisplay.messageLine.className = 'message-line away', Unit;
            }
             else {
              this.state_0 = 3;
              continue;
            }

          case 3:
            return Unit;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay$performAction$lambda$lambda(this$GameDisplay_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay$performAction$lambda$lambda(this$GameDisplay_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  GameDisplay.prototype.performAction_x22ubb$_0 = function (action) {
    var state = this.game.state;
    var $this = this.game.performAction_11rd$(action);
    if (Kotlin.isType($this, Failure)) {
      this.messageLine.textContent = $this.error;
      this.messageLine.className = 'message-line';
      launch(coroutines.GlobalScope, void 0, void 0, GameDisplay$performAction$lambda$lambda(this));
      this.updateDisplay();
      console.log('Failed action:');
      console.log(action);
      return false;
    }
     else
      Kotlin.isType($this, Success) || throwCCE();
    this.previousState = state;
    this.updateDisplay();
    return true;
  };
  Object.defineProperty(GameDisplay.prototype, 'onCompleteAction', {
    get: function () {
      return this.onCompleteAction_a7tkmq$_0;
    }
  });
  GameDisplay.prototype.updateDisplay = function () {
    var tmp$;
    var winner = this.game.winner;
    if (winner != null) {
      this.messageLine.className = 'message-line';
      this.messageLine.textContent = winner.name + ' has won!';
    }
     else {
      this.turnLine.textContent = 'Current player: ' + ((tmp$ = this.game.currentPlayer()) != null ? tmp$.name : null);
    }
    this.gridDisplay.display_31tjs9$(this.game.state.board, this.getColor, this.draw);
  };
  GameDisplay.prototype.updatePlayerList = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.playerList.innerHTML = '';
    tmp$ = this.players.size;
    for (var i = 0; i < tmp$; i++) {
      var player = this.players.get_za3lpa$(i);
      var playerElement = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
      var playerName = Kotlin.isType(tmp$_1 = document.createElement('input'), HTMLInputElement) ? tmp$_1 : throwCCE();
      var playerType = Kotlin.isType(tmp$_2 = document.createElement('select'), HTMLSelectElement) ? tmp$_2 : throwCCE();
      var playerColor = Kotlin.isType(tmp$_3 = document.createElement('input'), HTMLInputElement) ? tmp$_3 : throwCCE();
      playerElement.append(playerName, playerType, playerColor);
      this.setupNameInput_jb80ym$(player, playerName);
      this.setupTypeSelect_ibh1p2$(player, i, playerType);
      this.setupColorInput_jb80ym$(player, playerColor);
      playerElement.className = 'player';
      playerElement.style.backgroundColor = player.color;
      this.playerList.appendChild(playerElement);
    }
  };
  function Coroutine$GameDisplay$setupTypeSelect$lambda$lambda(this$GameDisplay_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$GameDisplay$setupTypeSelect$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay$setupTypeSelect$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay$setupTypeSelect$lambda$lambda.prototype.constructor = Coroutine$GameDisplay$setupTypeSelect$lambda$lambda;
  Coroutine$GameDisplay$setupTypeSelect$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$this$GameDisplay.turnLoop_gkk88$(this.local$$receiver, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay$setupTypeSelect$lambda$lambda(this$GameDisplay_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay$setupTypeSelect$lambda$lambda(this$GameDisplay_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function GameDisplay$setupTypeSelect$lambda(this$GameDisplay, closure$index, closure$player) {
    return function (event) {
      var tmp$, tmp$_0, tmp$_1;
      var value = (Kotlin.isType(tmp$ = event.target, HTMLSelectElement) ? tmp$ : throwCCE()).value;
      if (equals(value, 'delete')) {
        this$GameDisplay.players.removeAt_za3lpa$(closure$index);
        if (this$GameDisplay.players.size < this$GameDisplay.maxPlayers)
          this$GameDisplay.newPlayerButton.disabled = false;
        this$GameDisplay.updateDisplay();
        this$GameDisplay.updatePlayerList();
        return null;
      }
      var $receiver = this$GameDisplay.playerTypes;
      var firstOrNull$result;
      firstOrNull$break: do {
        var tmp$_2;
        tmp$_2 = $receiver.iterator();
        while (tmp$_2.hasNext()) {
          var element = tmp$_2.next();
          if (equals(element.name, value)) {
            firstOrNull$result = element;
            break firstOrNull$break;
          }
        }
        firstOrNull$result = null;
      }
       while (false);
      var playerType = Kotlin.isType(tmp$_0 = firstOrNull$result, PlayerType) ? tmp$_0 : throwCCE();
      closure$player.controller = playerType.getController();
      (tmp$_1 = this$GameDisplay.loopJop) != null ? (tmp$_1.cancel(), Unit) : null;
      this$GameDisplay.loopJop = launch(coroutines.GlobalScope, void 0, void 0, GameDisplay$setupTypeSelect$lambda$lambda(this$GameDisplay));
      this$GameDisplay.updateDisplay();
      this$GameDisplay.updatePlayerList();
      return null;
    };
  }
  GameDisplay.prototype.setupTypeSelect_ibh1p2$ = function (player, index, element) {
    var tmp$, tmp$_0, tmp$_1;
    element.className = 'player-type';
    tmp$ = this.playerTypes.iterator();
    while (tmp$.hasNext()) {
      var type = tmp$.next();
      var option = Kotlin.isType(tmp$_0 = document.createElement('option'), HTMLOptionElement) ? tmp$_0 : throwCCE();
      option.value = type.name;
      option.text = type.name;
      if (type.isOfType_afkf1m$(player))
        option.selected = true;
      element.appendChild(option);
    }
    if (this.players.size > this.minPlayers) {
      var option_0 = Kotlin.isType(tmp$_1 = document.createElement('option'), HTMLOptionElement) ? tmp$_1 : throwCCE();
      option_0.value = 'delete';
      option_0.text = 'No player';
      element.appendChild(option_0);
    }
    element.onchange = GameDisplay$setupTypeSelect$lambda(this, index, player);
  };
  function GameDisplay$setupNameInput$lambda(closure$player, this$GameDisplay) {
    return function (it) {
      var tmp$;
      closure$player.name = (Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE()).value;
      this$GameDisplay.updateDisplay();
      this$GameDisplay.updatePlayerList();
      return null;
    };
  }
  GameDisplay.prototype.setupNameInput_jb80ym$ = function (player, element) {
    element.className = 'player-name';
    element.value = player.name;
    element.onchange = GameDisplay$setupNameInput$lambda(player, this);
  };
  function GameDisplay$setupColorInput$lambda(closure$player, this$GameDisplay) {
    return function (it) {
      var tmp$;
      closure$player.color = (Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE()).value;
      this$GameDisplay.updateDisplay();
      this$GameDisplay.updatePlayerList();
      return null;
    };
  }
  GameDisplay.prototype.setupColorInput_jb80ym$ = function (player, element) {
    element.className = 'player-color';
    element.value = player.color;
    element.onchange = GameDisplay$setupColorInput$lambda(player, this);
  };
  function Coroutine$GameDisplay_init$lambda$lambda(this$GameDisplay_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$GameDisplay_init$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay_init$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay_init$lambda$lambda.prototype.constructor = Coroutine$GameDisplay_init$lambda$lambda;
  Coroutine$GameDisplay_init$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$this$GameDisplay.turnLoop_gkk88$(this.local$$receiver, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.result_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay_init$lambda$lambda(this$GameDisplay_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay_init$lambda$lambda(this$GameDisplay_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function GameDisplay_init$lambda(this$GameDisplay) {
    return function (it) {
      var tmp$;
      this$GameDisplay.startNewGame();
      this$GameDisplay.messageLine.textContent = '';
      this$GameDisplay.updateDisplay();
      (tmp$ = this$GameDisplay.loopJop) != null ? (tmp$.cancel(), Unit) : null;
      this$GameDisplay.loopJop = launch(coroutines.GlobalScope, void 0, void 0, GameDisplay_init$lambda$lambda(this$GameDisplay));
      return null;
    };
  }
  function GameDisplay_init$lambda_0(this$GameDisplay) {
    return function (it) {
      if (this$GameDisplay.players.size < this$GameDisplay.maxPlayers)
        this$GameDisplay.players.add_11rb$(new Player('Player ' + toString(this$GameDisplay.players.size + 1 | 0), 'blue', this$GameDisplay.playerTypes.get_za3lpa$(0).getController()));
      if (this$GameDisplay.players.size >= this$GameDisplay.maxPlayers)
        this$GameDisplay.newPlayerButton.disabled = true;
      this$GameDisplay.updatePlayerList();
      return Unit;
    };
  }
  function Coroutine$GameDisplay_init$lambda$lambda$lambda($receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
  }
  Coroutine$GameDisplay_init$lambda$lambda$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay_init$lambda$lambda$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay_init$lambda$lambda$lambda.prototype.constructor = Coroutine$GameDisplay_init$lambda$lambda$lambda;
  Coroutine$GameDisplay_init$lambda$lambda$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            return Unit;
          case 1:
            throw this.exception_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay_init$lambda$lambda$lambda($receiver_0, continuation_0, suspended) {
    var instance = new Coroutine$GameDisplay_init$lambda$lambda$lambda($receiver_0, this, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  function GameDisplay_init$lambda$lambda$lambda_0(it) {
    return Unit;
  }
  function Coroutine$GameDisplay_init$lambda$lambda_0(this$GameDisplay_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$GameDisplay_init$lambda$lambda_0.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay_init$lambda$lambda_0.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay_init$lambda$lambda_0.prototype.constructor = Coroutine$GameDisplay_init$lambda$lambda_0;
  Coroutine$GameDisplay_init$lambda$lambda_0.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$this$GameDisplay.turnLoop_gkk88$(this.local$$receiver, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            var bla = promise(this.local$$receiver, void 0, void 0, GameDisplay_init$lambda$lambda$lambda);
            return bla.then(GameDisplay_init$lambda$lambda$lambda_0);
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay_init$lambda$lambda_0(this$GameDisplay_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay_init$lambda$lambda_0(this$GameDisplay_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$GameDisplay_init$lambda(this$GameDisplay_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
  }
  Coroutine$GameDisplay_init$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay_init$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay_init$lambda.prototype.constructor = Coroutine$GameDisplay_init$lambda;
  Coroutine$GameDisplay_init$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$this$GameDisplay.startNewGame();
            this.local$this$GameDisplay.messageLine.textContent = '';
            this.local$this$GameDisplay.updateDisplay();
            return this.local$this$GameDisplay.loopJop = launch(coroutines.GlobalScope, void 0, void 0, GameDisplay_init$lambda$lambda_0(this.local$this$GameDisplay)), Unit;
          case 1:
            throw this.exception_0;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function GameDisplay_init$lambda_1(this$GameDisplay_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay_init$lambda(this$GameDisplay_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  GameDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameDisplay',
    interfaces: []
  };
  function Grid(width, height, init, fields) {
    if (fields === void 0) {
      var size = Kotlin.imul(width, height);
      var list = ArrayList_init_0(size);
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
  Grid.prototype.get_vux9f0$ = function (x, y) {
    return this.fields.get_za3lpa$(x + Kotlin.imul(this.width, y) | 0);
  };
  Grid.prototype.get_dfplqh$ = function (position) {
    return this.fields.get_za3lpa$(position.x + Kotlin.imul(this.width, position.y) | 0);
  };
  Grid.prototype.set_vq7693$ = function (x, y, value) {
    this.fields.set_wxm5ur$(x + Kotlin.imul(this.width, y) | 0, value);
  };
  Grid.prototype.set_39d550$ = function (position, value) {
    this.fields.set_wxm5ur$(position.x + Kotlin.imul(this.width, position.y) | 0, value);
  };
  Grid.prototype.copy_urw29u$ = function (width, height, init, fields) {
    if (width === void 0)
      width = this.width;
    if (height === void 0)
      height = this.height;
    if (init === void 0)
      init = this.init;
    if (fields === void 0)
      fields = toMutableList(this.fields);
    return new Grid(width, height, init, fields);
  };
  Grid.prototype.isWithinBounds_dfplqh$ = function (position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    tmp$ = this.width;
    tmp$_0 = position.x;
    if (0 <= tmp$_0 && tmp$_0 < tmp$) {
      tmp$_1 = this.height;
      tmp$_2 = position.y;
      tmp$_3 = (0 <= tmp$_2 && tmp$_2 < tmp$_1);
    }
     else
      tmp$_3 = false;
    return tmp$_3;
  };
  Grid.prototype.positions = function () {
    var size = this.fields.size;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(new Position(index % this.width, index / this.width | 0));
    }
    return list;
  };
  Grid.prototype.positionedFields = function () {
    var size = this.fields.size;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(new PositionedField(new Position(index % this.width, index / this.width | 0), this.fields.get_za3lpa$(index)));
    }
    return list;
  };
  Grid.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Grid',
    interfaces: []
  };
  function PositionedField(position, field) {
    this.position = position;
    this.field = field;
  }
  PositionedField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PositionedField',
    interfaces: []
  };
  PositionedField.prototype.component1 = function () {
    return this.position;
  };
  PositionedField.prototype.component2 = function () {
    return this.field;
  };
  PositionedField.prototype.copy_39d550$ = function (position, field) {
    return new PositionedField(position === void 0 ? this.position : position, field === void 0 ? this.field : field);
  };
  PositionedField.prototype.toString = function () {
    return 'PositionedField(position=' + Kotlin.toString(this.position) + (', field=' + Kotlin.toString(this.field)) + ')';
  };
  PositionedField.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.position) | 0;
    result = result * 31 + Kotlin.hashCode(this.field) | 0;
    return result;
  };
  PositionedField.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.position, other.position) && Kotlin.equals(this.field, other.field)))));
  };
  function GridDisplay(canvas) {
    this.canvas = canvas;
    var tmp$;
    this.context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    this.hexagonal_0 = false;
    this.fieldSize = 50.0;
    this.gridThickness = 1.0;
    this.gridColor = 'black';
    this.outerBorder = 1.0;
    this.hexPath = new Path2D();
    this.hexPathOffset = new Path2D();
    this.hexDeltaX = 0.0;
    this.hexDeltaY = 0.0;
    this.translateX = 0.0;
    this.onClick = null;
    this.clickListener = GridDisplay$clickListener$lambda(this);
    this.canvas.addEventListener('click', this.clickListener);
  }
  GridDisplay.prototype.display_31tjs9$ = function (grid, fillStyle, draw) {
    if (fillStyle === void 0)
      fillStyle = null;
    if (draw === void 0)
      draw = null;
    var tmp$, tmp$_0, tmp$_1;
    var deltaX = this.hexagonal_0 ? this.hexDeltaX : this.fieldSize + this.gridThickness;
    var deltaY = this.hexagonal_0 ? this.hexDeltaY : this.fieldSize + this.gridThickness;
    var offset = this.hexagonal_0 ? (this.gridThickness + this.fieldSize) / 2 : 0.0;
    var extraY = this.hexagonal_0 ? this.fieldSize / (2 * Math_0.sqrt(3.0)) : 0.0;
    this.translateX = (this.canvas.clientWidth - grid.width * deltaX) / 2;
    this.context.fillStyle = this.gridColor;
    if (this.gridThickness > 0)
      this.context.fillRect(this.translateX + this.gridThickness - this.outerBorder, 0.0 + this.gridThickness - this.outerBorder, grid.height * deltaX - this.gridThickness + this.outerBorder * 2 + offset, grid.width * deltaY - this.gridThickness + this.outerBorder * 2 + extraY);
    tmp$ = grid.height;
    for (var y = 0; y < tmp$; y++) {
      tmp$_0 = grid.width;
      for (var x = 0; x < tmp$_0; x++) {
        this.context.fillStyle = (tmp$_1 = fillStyle != null ? fillStyle(grid.get_vux9f0$(x, y), x, y) : null) != null ? tmp$_1 : 'white';
        if (this.hexagonal_0)
          this.drawHexagon_0(x, y);
        else
          this.drawSquare_0(x, y);
        if (draw != null) {
          this.context.save();
          this.context.translate(x * deltaX + this.translateX + this.gridThickness + (y % 2 === 0 ? offset : 0.0), y * deltaY);
          draw(this.context, this.fieldSize, grid.get_vux9f0$(x, y), x, y);
          this.context.restore();
        }
      }
    }
  };
  GridDisplay.prototype.drawSquare_0 = function (x, y) {
    this.context.fillRect(this.translateX + this.gridThickness + x * (this.fieldSize + this.gridThickness), this.gridThickness + y * (this.fieldSize + this.gridThickness), this.fieldSize, this.fieldSize);
  };
  GridDisplay.prototype.drawHexagon_0 = function (x, y) {
    this.context.save();
    this.context.translate(x * this.hexDeltaX + this.translateX + this.gridThickness, y * this.hexDeltaY);
    this.context.fill(y % 2 === 0 ? this.hexPath : this.hexPathOffset);
    this.context.restore();
  };
  GridDisplay.prototype.showHexagons = function () {
    this.hexagonal_0 = true;
    this.hexDeltaX = this.fieldSize + this.gridThickness;
    this.hexDeltaY = 3 * (this.fieldSize / (2 * Math_0.sqrt(3.0))) + this.gridThickness / Math_0.sqrt(3.0);
    this.hexPath = this.createHexagonPath_0(false);
    this.hexPathOffset = this.createHexagonPath_0(true);
  };
  GridDisplay.prototype.createHexagonPath_0 = function (offset) {
    var halfWidth = this.fieldSize / 2;
    var fourthHeight = this.fieldSize / (2 * Math_0.sqrt(3.0));
    var offsetWidth = offset ? 0.0 : halfWidth + this.gridThickness / 2;
    var path = new Path2D();
    path.moveTo(0.0 + offsetWidth, fourthHeight);
    path.lineTo(halfWidth + offsetWidth, 0.0);
    path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight);
    path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight * 3);
    path.lineTo(halfWidth + offsetWidth, fourthHeight * 4);
    path.lineTo(0.0 + offsetWidth, fourthHeight * 3);
    path.closePath();
    return path;
  };
  GridDisplay.prototype.gridCoordsAt_vux9f0$ = function (canvasX, canvasY) {
    if (this.hexagonal_0)
      return this.hexCoords_0(canvasX - numberToInt(this.translateX) | 0, canvasY);
    return this.squareCoords_0(canvasX - numberToInt(this.translateX) | 0, canvasY);
  };
  GridDisplay.prototype.hexCoords_0 = function (canvasX, canvasY) {
    var tmp$;
    var gridX = numberToInt(canvasX / this.hexDeltaX);
    var gridY = numberToInt(canvasY / this.hexDeltaY);
    var nearestPosition = new Position(gridX, gridY);
    var smallestDistance = this.distanceToHex_0(canvasX, canvasY, nearestPosition);
    tmp$ = nearestPosition.adjacentHexes().iterator();
    while (tmp$.hasNext()) {
      var hex = tmp$.next();
      var distance = this.distanceToHex_0(canvasX, canvasY, hex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestPosition = hex;
      }
    }
    return nearestPosition;
  };
  GridDisplay.prototype.distanceToHex_0 = function (canvasX, canvasY, hex) {
    var baseX = hex.x * this.hexDeltaX + this.hexDeltaX / 2 + (hex.y % 2 === 0 ? this.hexDeltaX / 2 : 0.0);
    var baseY = hex.y * this.hexDeltaY + this.hexDeltaY * 2 / 3;
    return (canvasX - baseX) * (canvasX - baseX) + (canvasY - baseY) * (canvasY - baseY);
  };
  GridDisplay.prototype.squareCoords_0 = function (canvasX, canvasY) {
    var localX = canvasX % (this.fieldSize + this.gridThickness);
    var localY = canvasY % (this.fieldSize + this.gridThickness);
    if (localX < this.gridThickness || localY < this.gridThickness)
      return null;
    var gridX = numberToInt(canvasX / (this.fieldSize + this.gridThickness));
    var gridY = numberToInt(canvasY / (this.fieldSize + this.gridThickness));
    return new Position(gridX, gridY);
  };
  function GridDisplay$clickListener$lambda(this$GridDisplay) {
    return function (event) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = event, MouseEvent) ? tmp$ : throwCCE();
      var gridPosition = this$GridDisplay.gridCoordsAt_vux9f0$(numberToInt(event.offsetX), numberToInt(event.offsetY));
      if (gridPosition != null)
        (tmp$_0 = this$GridDisplay.onClick) != null ? tmp$_0(gridPosition) : null;
      return Unit;
    };
  }
  GridDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GridDisplay',
    interfaces: []
  };
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var header = Kotlin.isType(tmp$ = document.getElementById('header'), HTMLElement) ? tmp$ : throwCCE();
    var navigation = Kotlin.isType(tmp$_0 = document.getElementById('navigation'), HTMLElement) ? tmp$_0 : throwCCE();
    var playerArea = Kotlin.isType(tmp$_1 = document.getElementById('player-area'), HTMLElement) ? tmp$_1 : throwCCE();
    var gameAreaTop = Kotlin.isType(tmp$_2 = document.getElementById('game-area-top'), HTMLElement) ? tmp$_2 : throwCCE();
    var gameAreaRight = Kotlin.isType(tmp$_3 = document.getElementById('game-area-right'), HTMLElement) ? tmp$_3 : throwCCE();
    var canvasContainer = Kotlin.isType(tmp$_4 = document.getElementById('canvas'), HTMLElement) ? tmp$_4 : throwCCE();
    header.textContent = 'Select a game';
    addButton(new AlysDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), 'Alys', navigation, header);
    addButton(new ChessDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), 'Chess', navigation, header);
    addButton(new VirusDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), 'Virus', navigation, header);
    addButton(new TicTacToeDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight), 'Tic Tac Toe', navigation, header);
  }
  function addButton$lambda(closure$name, closure$header, closure$gameDisplay) {
    return function (it) {
      closure$header.textContent = closure$name;
      closure$gameDisplay.showGame();
      return Unit;
    };
  }
  function addButton(gameDisplay, name, navElement, header) {
    var tmp$;
    var button = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    button.textContent = name;
    navElement.appendChild(button);
    button.addEventListener('click', addButton$lambda(name, header, gameDisplay));
  }
  function AIPlayable() {
  }
  AIPlayable.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AIPlayable',
    interfaces: []
  };
  function Player(name, color, controller) {
    if (name === void 0)
      name = 'Player';
    if (color === void 0)
      color = 'blue';
    this.name = name;
    this.color = color;
    this.controller = controller;
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function PlayerController() {
  }
  PlayerController.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'PlayerController',
    interfaces: []
  };
  function HumanController() {
    this.deferred = CompletableDeferred();
  }
  HumanController.prototype.requestAction_11rb$ = function (state, continuation) {
    this.deferred = CompletableDeferred();
    return this.deferred.await(continuation);
  };
  HumanController.prototype.endGame_iuyhfk$ = function (state, won) {
  };
  HumanController.prototype.performAction_11rc$ = function (action) {
    this.deferred.complete_11rb$(action);
  };
  HumanController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HumanController',
    interfaces: [PlayerController]
  };
  function RandomAIController() {
  }
  RandomAIController.prototype.requestAction_11rb$ = function (state, continuation) {
    var actions = state.possibleActions();
    return random(actions, Random_0.Default);
  };
  RandomAIController.prototype.endGame_iuyhfk$ = function (state, won) {
  };
  RandomAIController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RandomAIController',
    interfaces: [PlayerController]
  };
  function SimpleAIController(utility) {
    if (utility === void 0)
      utility = SimpleAIController_init$lambda;
    this.utility = utility;
  }
  var checkIndexOverflow = Kotlin.kotlin.collections.checkIndexOverflow_za3lpa$;
  SimpleAIController.prototype.requestAction_11rb$ = function (state, continuation) {
    var tmp$;
    var actions = state.possibleActions();
    var destination = ArrayList_init_0(collectionSizeOrDefault(actions, 10));
    var tmp$_0;
    tmp$_0 = actions.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination.add_11rb$(this.utility(state, item));
    }
    var utilities = destination;
    var max_0 = (tmp$ = max(utilities)) != null ? tmp$ : random(actions, Random_0.Default);
    var destination_0 = ArrayList_init();
    var tmp$_1, tmp$_0_0;
    var index = 0;
    tmp$_1 = actions.iterator();
    while (tmp$_1.hasNext()) {
      var item_0 = tmp$_1.next();
      if (equals(utilities.get_za3lpa$(checkIndexOverflow((tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0))), max_0))
        destination_0.add_11rb$(item_0);
    }
    return random(destination_0, Random_0.Default);
  };
  SimpleAIController.prototype.endGame_iuyhfk$ = function (state, won) {
  };
  function SimpleAIController_init$lambda(f, f_0) {
    return 1;
  }
  SimpleAIController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SimpleAIController',
    interfaces: [PlayerController]
  };
  function PlayerType(name) {
    this.name = name;
  }
  PlayerType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PlayerType',
    interfaces: []
  };
  function HumanType() {
    PlayerType.call(this, 'Human');
  }
  HumanType.prototype.isOfType_afkf1m$ = function (player) {
    return Kotlin.isType(player.controller, HumanController);
  };
  HumanType.prototype.getController = function () {
    return new HumanController();
  };
  HumanType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'HumanType',
    interfaces: [PlayerType]
  };
  function RandomAIType() {
    PlayerType.call(this, 'CPU - Weak');
  }
  RandomAIType.prototype.isOfType_afkf1m$ = function (player) {
    return Kotlin.isType(player.controller, RandomAIController);
  };
  RandomAIType.prototype.getController = function () {
    return new RandomAIController();
  };
  RandomAIType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RandomAIType',
    interfaces: [PlayerType]
  };
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  Position.prototype.add_vux9f0$ = function (i, j) {
    return new Position(this.x + i | 0, this.y + j | 0);
  };
  Position.prototype.adjacentHexes = function () {
    return listOf([this.hexNW_za3lpa$(), this.hexNE_za3lpa$(), this.hexW_za3lpa$(), this.hexE_za3lpa$(), this.hexSW_za3lpa$(), this.hexSE_za3lpa$()]);
  };
  Position.prototype.hexNW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? -1 : 0) | 0, this.y - distance | 0);
  };
  Position.prototype.hexNE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? 0 : 1) | 0, this.y - distance | 0);
  };
  Position.prototype.hexW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - distance | 0, this.y);
  };
  Position.prototype.hexE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + distance | 0, this.y);
  };
  Position.prototype.hexSW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? -1 : 0) | 0, this.y + distance | 0);
  };
  Position.prototype.hexSE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? 0 : 1) | 0, this.y + distance | 0);
  };
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
  function RuleArea(overview, ruleSections) {
    this.overview = overview;
    this.ruleSections = ruleSections;
  }
  function RuleArea$showRules$lambda(closure$rulesArea) {
    return function (it) {
      if (closure$rulesArea.classList.length > 1)
        closure$rulesArea.className = 'rules-area';
      else
        closure$rulesArea.className = 'rules-area hidden';
      return Unit;
    };
  }
  RuleArea.prototype.showRules_lt8gi4$ = function (container) {
    var tmp$, tmp$_0, tmp$_1;
    var rulesButton = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    var rulesArea = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
    rulesButton.textContent = 'How to play';
    rulesArea.innerHTML = this.overview;
    rulesArea.className = 'rules-area hidden';
    container.appendChild(rulesButton);
    container.appendChild(rulesArea);
    rulesButton.onclick = RuleArea$showRules$lambda(rulesArea);
    tmp$_1 = this.ruleSections.iterator();
    while (tmp$_1.hasNext()) {
      var section = tmp$_1.next();
      section.addToContainer_e0t6x9$(rulesArea);
    }
  };
  RuleArea.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RuleArea',
    interfaces: []
  };
  function RuleSection(name, content) {
    this.name = name;
    this.content = content;
  }
  function RuleSection$addToContainer$lambda(closure$rulesArea) {
    return function (it) {
      if (closure$rulesArea.classList.length > 1)
        closure$rulesArea.className = 'rules-area';
      else
        closure$rulesArea.className = 'rules-area hidden';
      return Unit;
    };
  }
  RuleSection.prototype.addToContainer_e0t6x9$ = function (container) {
    var tmp$, tmp$_0;
    var rulesButton = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    var rulesArea = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
    rulesButton.textContent = this.name;
    rulesArea.className = 'rules-area hidden';
    rulesArea.innerHTML = this.content;
    container.appendChild(rulesButton);
    container.appendChild(rulesArea);
    rulesButton.onclick = RuleSection$addToContainer$lambda(rulesArea);
  };
  RuleSection.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RuleSection',
    interfaces: []
  };
  function TicTacToe(state) {
    if (state === void 0)
      state = new TicTacToeState();
    BoardGame.call(this);
    this.state_lbl02z$_0 = state;
    this.actionTypes_oovv43$_0 = listOf_0(new ActionType('place piece', TicTacToe$actionTypes$lambda, TicTacToe$actionTypes$lambda_0, listOf([getCallableRef('mustPlaceOwnPiece', function ($receiver) {
      return mustPlaceOwnPiece($receiver);
    }), getCallableRef('placePiece', function ($receiver) {
      return placePiece_0($receiver);
    }), getCallableRef('switchPlayer', function ($receiver) {
      return switchPlayer_0($receiver);
    })])));
  }
  Object.defineProperty(TicTacToe.prototype, 'state', {
    get: function () {
      return this.state_lbl02z$_0;
    },
    set: function (state) {
      this.state_lbl02z$_0 = state;
    }
  });
  TicTacToe.prototype.copyState = function () {
    return new TicTacToeState(this.state.board.copy_urw29u$(), this.state.currentPlayer, this.state.players);
  };
  Object.defineProperty(TicTacToe.prototype, 'actionTypes', {
    get: function () {
      return this.actionTypes_oovv43$_0;
    }
  });
  function TicTacToe$actionTypes$lambda(f, f_0) {
    return true;
  }
  function TicTacToe$actionTypes$lambda_0(oldState, action, newState) {
    return new Success(new StandardStateActionState(oldState, action, newState));
  }
  TicTacToe.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToe',
    interfaces: [BoardGame]
  };
  function mustPlaceOwnPiece($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('must place own piece', $receiver.action.piece === $receiver.oldState.currentPlayer);
  }
  function placePiece_0($receiver) {
    if ($receiver.oldState.board.get_vux9f0$($receiver.action.x, $receiver.action.y) != null)
      return new Failure('must place pieces on empty fields');
    $receiver.newState.board.set_vq7693$($receiver.action.x, $receiver.action.y, $receiver.action.piece);
    return Result$Companion_getInstance().success();
  }
  function switchPlayer_0($receiver) {
    $receiver.newState.currentPlayer = $receiver.oldState.currentPlayer === TicTacToePiece$Cross_getInstance() ? TicTacToePiece$Circle_getInstance() : TicTacToePiece$Cross_getInstance();
    return Result$Companion_getInstance().success();
  }
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
  function TicTacToeDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
    GameDisplay.call(this, canvasContainer, playerArea, gameAreaTop, gameAreaRight);
    this.game_p4bo12$_0 = new TicTacToe();
    this.playerTypes_x2bwa8$_0 = listOf([new HumanType(), new RandomAIType()]);
    this.getColor_fajsqn$_0 = null;
    this.draw_p5ofi0$_0 = TicTacToeDisplay$draw$lambda;
    this.players.add_11rb$(new Player('Cross', void 0, new HumanController()));
    this.players.add_11rb$(new Player('Circle', void 0, new RandomAIController()));
    this.gridDisplay.outerBorder = 0.0;
    this.maxPlayers = 2;
    this.newPlayerButton.disabled = true;
    this.startNewGame();
    this.gridDisplay.onClick = TicTacToeDisplay_init$lambda(this);
  }
  Object.defineProperty(TicTacToeDisplay.prototype, 'game', {
    get: function () {
      return this.game_p4bo12$_0;
    },
    set: function (game) {
      this.game_p4bo12$_0 = game;
    }
  });
  Object.defineProperty(TicTacToeDisplay.prototype, 'playerTypes', {
    get: function () {
      return this.playerTypes_x2bwa8$_0;
    }
  });
  Object.defineProperty(TicTacToeDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_fajsqn$_0;
    }
  });
  Object.defineProperty(TicTacToeDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_p5ofi0$_0;
    }
  });
  TicTacToeDisplay.prototype.startNewGame = function () {
    this.game = new TicTacToe();
    var $receiver = this.game.players;
    var key = TicTacToePiece$Cross_getInstance();
    var value = this.players.get_za3lpa$(0);
    $receiver.put_xwzc9p$(key, value);
    var $receiver_0 = this.game.players;
    var key_0 = TicTacToePiece$Circle_getInstance();
    var value_0 = this.players.get_za3lpa$(1);
    $receiver_0.put_xwzc9p$(key_0, value_0);
  };
  function TicTacToeDisplay$draw$lambda(context, fieldSize, piece, f, f_0) {
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
      var tmp$, tmp$_0, tmp$_1;
      if (Kotlin.isType(this$TicTacToeDisplay.game.currentPlayer(), Player) && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
        tmp$_1 = Kotlin.isType(tmp$_0 = (tmp$ = this$TicTacToeDisplay.game.currentPlayer()) != null ? tmp$.controller : null, HumanController) ? tmp$_0 : null;
        if (tmp$_1 == null) {
          return;
        }
        var playerController = tmp$_1;
        playerController.performAction_11rc$(new TicTacToeAction(this$TicTacToeDisplay.game.state.currentPlayer, it.x, it.y));
      }
      return Unit;
    };
  }
  TicTacToeDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeDisplay',
    interfaces: [GameDisplay]
  };
  function TicTacToeState(board, currentPlayer, players) {
    if (board === void 0)
      board = new Grid(3, 3, TicTacToeState_init$lambda);
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
    },
    set: function (currentPlayer) {
      this.currentPlayer_itk6nz$_0 = currentPlayer;
    }
  });
  Object.defineProperty(TicTacToeState.prototype, 'players', {
    get: function () {
      return this.players_f3gykn$_0;
    }
  });
  TicTacToeState.prototype.possibleActions = function () {
    var actions = ArrayList_init();
    for (var i = 0; i <= 2; i++) {
      for (var j = 0; j <= 2; j++)
        if (this.board.get_vux9f0$(i, j) == null)
          actions.add_11rb$(new TicTacToeAction(this.currentPlayer, i, j));
    }
    return toList(actions);
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
    interfaces: [AIPlayable, BoardGameState]
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
  TicTacToeState.prototype.copy_2sqnw4$ = function (board, currentPlayer, players) {
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
  function Virus(state) {
    if (state === void 0)
      state = new VirusState();
    BoardGame.call(this);
    this.state_bleigq$_0 = state;
    this.actionTypes_mgo0fc$_0 = listOf_0(new ActionType('move piece', Virus$actionTypes$lambda, Virus$actionTypes$lambda_0, listOf([getCallableRef('originMustBeWithinBoard', function ($receiver) {
      return originMustBeWithinBoard($receiver);
    }), getCallableRef('originMustBeCurrentPlayer', function ($receiver) {
      return originMustBeCurrentPlayer_1($receiver);
    }), getCallableRef('destinationMustBeWithinBoard', function ($receiver) {
      return destinationMustBeWithinBoard($receiver);
    }), getCallableRef('destinationMustBeEmpty', function ($receiver) {
      return destinationMustBeEmpty_0($receiver);
    }), getCallableRef('mustNotMoveTooFar', function ($receiver) {
      return mustNotMoveTooFar($receiver);
    }), getCallableRef('movePiece', function ($receiver) {
      return movePiece_0($receiver);
    }), getCallableRef('turnNeighbours', function ($receiver) {
      return turnNeighbours($receiver);
    }), getCallableRef('changePlayer', function ($receiver) {
      return changePlayer($receiver);
    })])));
  }
  Object.defineProperty(Virus.prototype, 'state', {
    get: function () {
      return this.state_bleigq$_0;
    },
    set: function (state) {
      this.state_bleigq$_0 = state;
    }
  });
  Virus.prototype.copyState = function () {
    return new VirusState(this.state.width, this.state.height, this.state.playerCount, this.state.board.copy_urw29u$(), this.state.currentPlayer, this.state.players);
  };
  Object.defineProperty(Virus.prototype, 'actionTypes', {
    get: function () {
      return this.actionTypes_mgo0fc$_0;
    }
  });
  function Virus$actionTypes$lambda(f, f_0) {
    return true;
  }
  function Virus$actionTypes$lambda_0(oldState, action, newState) {
    return new Success(new StandardStateActionState(oldState, action, newState));
  }
  Virus.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Virus',
    interfaces: [BoardGame]
  };
  function destinationMustBeWithinBoard($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('destination must be within board', $receiver.oldState.board.isWithinBounds_dfplqh$($receiver.action.destination));
  }
  function originMustBeWithinBoard($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('origin must be within board', $receiver.oldState.board.isWithinBounds_dfplqh$($receiver.action.origin));
  }
  function originMustBeCurrentPlayer_1($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('must move own piece', $receiver.oldState.board.get_dfplqh$($receiver.action.origin) === $receiver.oldState.currentPlayer);
  }
  function destinationMustBeEmpty_0($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('destination must be empty', $receiver.oldState.board.get_dfplqh$($receiver.action.destination) === 0);
  }
  function mustNotMoveTooFar($receiver) {
    return Result$Companion_getInstance().check_ivxn3r$('must not move too far', abs($receiver.action.origin.x - $receiver.action.destination.x | 0) <= 2 && abs($receiver.action.origin.y - $receiver.action.destination.y | 0) <= 2);
  }
  function movePiece_0($receiver) {
    if (abs($receiver.action.origin.x - $receiver.action.destination.x | 0) > 1 || abs($receiver.action.origin.y - $receiver.action.destination.y | 0) > 1)
      $receiver.newState.board.set_vq7693$($receiver.action.origin.x, $receiver.action.origin.y, 0);
    $receiver.newState.board.set_vq7693$($receiver.action.destination.x, $receiver.action.destination.y, $receiver.oldState.currentPlayer);
    return Result$Companion_getInstance().success();
  }
  function turnNeighbours($receiver) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var b = $receiver.action.destination.x - 1 | 0;
    tmp$ = Math_0.max(0, b);
    var a = $receiver.oldState.width - 1 | 0;
    var b_0 = $receiver.action.destination.x + 1 | 0;
    tmp$_0 = Math_0.min(a, b_0);
    for (var n = tmp$; n <= tmp$_0; n++) {
      var b_1 = $receiver.action.destination.y - 1 | 0;
      tmp$_1 = Math_0.max(0, b_1);
      var a_0 = $receiver.oldState.height - 1 | 0;
      var b_2 = $receiver.action.destination.y + 1 | 0;
      tmp$_2 = Math_0.min(a_0, b_2);
      for (var m = tmp$_1; m <= tmp$_2; m++) {
        if ($receiver.newState.board.get_vux9f0$(n, m) !== 0)
          $receiver.newState.board.set_vq7693$(n, m, $receiver.oldState.currentPlayer);
      }
    }
    return Result$Companion_getInstance().success();
  }
  function changePlayer($receiver) {
    var movablePlayers = $receiver.newState.findMovablePlayers();
    var nextPlayer = $receiver.oldState.currentPlayer + 1 | 0;
    var none$result;
    none$break: do {
      var tmp$;
      if (Kotlin.isType(movablePlayers, Collection) && movablePlayers.isEmpty()) {
        none$result = true;
        break none$break;
      }
      tmp$ = movablePlayers.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (element) {
          none$result = false;
          break none$break;
        }
      }
      none$result = true;
    }
     while (false);
    if (none$result) {
      nextPlayer = 0;
    }
     else {
      if (nextPlayer > $receiver.oldState.playerCount)
        nextPlayer = 1;
      while (!movablePlayers.get_za3lpa$(nextPlayer)) {
        nextPlayer = nextPlayer + 1 | 0;
        if (nextPlayer > $receiver.oldState.playerCount)
          nextPlayer = 1;
      }
    }
    $receiver.newState.currentPlayer = nextPlayer;
    return Result$Companion_getInstance().success();
  }
  function VirusAction(origin, destination) {
    this.origin = origin;
    this.destination = destination;
  }
  VirusAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusAction',
    interfaces: []
  };
  VirusAction.prototype.component1 = function () {
    return this.origin;
  };
  VirusAction.prototype.component2 = function () {
    return this.destination;
  };
  VirusAction.prototype.copy_vwqnnw$ = function (origin, destination) {
    return new VirusAction(origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  VirusAction.prototype.toString = function () {
    return 'VirusAction(origin=' + Kotlin.toString(this.origin) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  VirusAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  VirusAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
  };
  function SimpleVirusAIType() {
    PlayerType.call(this, 'CPU - Medium');
  }
  SimpleVirusAIType.prototype.isOfType_afkf1m$ = function (player) {
    return Kotlin.isType(player.controller, SimpleAIController);
  };
  SimpleVirusAIType.prototype.getController = function () {
    return new SimpleAIController(getCallableRef('virusUtility', function (state, action) {
      return virusUtility(state, action);
    }));
  };
  SimpleVirusAIType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SimpleVirusAIType',
    interfaces: [PlayerType]
  };
  function virusUtility(state, action) {
    var $receiver = state.board.fields;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element === state.currentPlayer)
        destination.add_11rb$(element);
    }
    var currentDifference = destination.size;
    var $receiver_0 = state.board.fields;
    var destination_0 = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver_0.iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      if (element_0 !== state.currentPlayer && element_0 !== 0)
        destination_0.add_11rb$(element_0);
    }
    -destination_0.size | 0;
    var $this = (new Virus(state)).nextState_11rd$(action);
    var tmp$_1;
    var tmp$_2;
    if (Kotlin.isType($this, Failure)) {
      return 0;
    }
     else
      tmp$_2 = (Kotlin.isType(tmp$_1 = $this, Success) ? tmp$_1 : throwCCE()).value;
    var nextState = tmp$_2;
    var $receiver_1 = nextState.board.fields;
    var destination_1 = ArrayList_init();
    var tmp$_3;
    tmp$_3 = $receiver_1.iterator();
    while (tmp$_3.hasNext()) {
      var element_1 = tmp$_3.next();
      if (element_1 === state.currentPlayer)
        destination_1.add_11rb$(element_1);
    }
    var nextDifference = destination_1.size;
    var $receiver_2 = nextState.board.fields;
    var destination_2 = ArrayList_init();
    var tmp$_4;
    tmp$_4 = $receiver_2.iterator();
    while (tmp$_4.hasNext()) {
      var element_2 = tmp$_4.next();
      if (element_2 !== state.currentPlayer && element_2 !== 0)
        destination_2.add_11rb$(element_2);
    }
    -destination_2.size | 0;
    return nextDifference - currentDifference | 0;
  }
  function VirusDisplay(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
    GameDisplay.call(this, canvasContainer, playerArea, gameAreaTop, gameAreaRight);
    this.game_rcjipt$_0 = new Virus();
    this.playerTypes_e0ec7f$_0 = listOf([new HumanType(), new RandomAIType(), new SimpleVirusAIType()]);
    this.originPosition = null;
    this.getColor_csj3a4$_0 = VirusDisplay$getColor$lambda(this);
    this.draw_rdwa6r$_0 = VirusDisplay$draw$lambda(this);
    this.players.add_11rb$(new Player('Player 1', 'yellow', new HumanController()));
    this.players.add_11rb$(new Player('Player 2', 'red', new RandomAIController()));
    this.maxPlayers = 4;
    this.startNewGame();
    this.gridDisplay.onClick = VirusDisplay_init$lambda(this);
  }
  Object.defineProperty(VirusDisplay.prototype, 'game', {
    get: function () {
      return this.game_rcjipt$_0;
    },
    set: function (game) {
      this.game_rcjipt$_0 = game;
    }
  });
  Object.defineProperty(VirusDisplay.prototype, 'playerTypes', {
    get: function () {
      return this.playerTypes_e0ec7f$_0;
    }
  });
  Object.defineProperty(VirusDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_csj3a4$_0;
    }
  });
  Object.defineProperty(VirusDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_rdwa6r$_0;
    }
  });
  VirusDisplay.prototype.startNewGame = function () {
    var tmp$;
    this.game = new Virus();
    tmp$ = this.players.size;
    for (var i = 1; i <= tmp$; i++) {
      var $receiver = this.game.players;
      var value = this.players.get_za3lpa$(i - 1 | 0);
      $receiver.put_xwzc9p$(i, value);
    }
    this.game.state = new VirusState(8, 8, this.players.size);
  };
  function VirusDisplay$getColor$lambda(this$VirusDisplay) {
    return function (piece, f, f_0) {
      var player = this$VirusDisplay.game.players.get_11rb$(piece);
      if (player != null)
        return player.color;
      return 'white';
    };
  }
  function VirusDisplay$draw$lambda(this$VirusDisplay) {
    return function (context, fieldSize, f, x, y) {
      var origin = this$VirusDisplay.originPosition;
      if (origin == null || !(origin.x === x && origin.y === y))
        return;
      context.fillStyle = 'white';
      context.fillRect(fieldSize / 4, fieldSize / 4, fieldSize / 2, fieldSize / 2);
      return Unit;
    };
  }
  function VirusDisplay_init$lambda(this$VirusDisplay) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      if (Kotlin.isType(this$VirusDisplay.game.currentPlayer(), Player) && it.x >= 0 && it.y >= 0 && it.x < this$VirusDisplay.game.state.width && it.y < this$VirusDisplay.game.state.height) {
        var origin = this$VirusDisplay.originPosition;
        if (origin == null) {
          this$VirusDisplay.originPosition = new Position(it.x, it.y);
          this$VirusDisplay.updateDisplay();
        }
         else {
          this$VirusDisplay.originPosition = null;
          tmp$_1 = Kotlin.isType(tmp$_0 = (tmp$ = this$VirusDisplay.game.currentPlayer()) != null ? tmp$.controller : null, HumanController) ? tmp$_0 : null;
          if (tmp$_1 == null) {
            return;
          }
          var playerController = tmp$_1;
          playerController.performAction_11rc$(new VirusAction(origin, new Position(it.x, it.y)));
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
  function VirusState(width, height, playerCount, board, currentPlayer, players) {
    if (width === void 0)
      width = 8;
    if (height === void 0)
      height = 8;
    if (playerCount === void 0)
      playerCount = 2;
    if (board === void 0)
      board = new Grid(width, height, VirusState_init$lambda(playerCount, height));
    if (currentPlayer === void 0)
      currentPlayer = 1;
    if (players === void 0)
      players = toList(new IntRange(1, playerCount));
    this.width = width;
    this.height = height;
    this.playerCount = playerCount;
    this.board_8pifzm$_0 = board;
    this.currentPlayer_54tmti$_0 = currentPlayer;
    this.players_h1tl8i$_0 = players;
  }
  Object.defineProperty(VirusState.prototype, 'board', {
    get: function () {
      return this.board_8pifzm$_0;
    }
  });
  Object.defineProperty(VirusState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_54tmti$_0;
    },
    set: function (currentPlayer) {
      this.currentPlayer_54tmti$_0 = currentPlayer;
    }
  });
  Object.defineProperty(VirusState.prototype, 'players', {
    get: function () {
      return this.players_h1tl8i$_0;
    }
  });
  VirusState.prototype.possibleActions = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var actions = ArrayList_init();
    tmp$ = this.width;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.height;
      for (var j = 0; j < tmp$_0; j++) {
        if (this.board.get_vux9f0$(i, j) !== 0)
          continue;
        var exists = false;
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
            if (this.board.get_vux9f0$(n, m) !== this.currentPlayer)
              continue;
            var action = new VirusAction(new Position(n, m), new Position(i, j));
            if (abs(action.origin.x - action.destination.x | 0) > 1 || abs(action.origin.y - action.destination.y | 0) > 1) {
              actions.add_11rb$(action);
            }
             else if (!exists) {
              actions.add_11rb$(action);
              exists = true;
            }
          }
        }
      }
    }
    return toList(actions);
  };
  VirusState.prototype.findWinner = function () {
    var tmp$, tmp$_0;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(0);
    }
    var pieces = list;
    tmp$ = this.board.fields.iterator();
    while (tmp$.hasNext()) {
      var field = tmp$.next();
      pieces.set_wxm5ur$(field, pieces.get_za3lpa$(field) + 1 | 0);
    }
    var movablePlayers = this.findMovablePlayers();
    var destination = ArrayList_init();
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
  VirusState.prototype.findMovablePlayers = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(false);
    }
    var movablePlayers = list;
    tmp$ = this.width;
    loop: for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.height;
      for (var j = 0; j < tmp$_0; j++) {
        if (this.board.get_vux9f0$(i, j) !== 0)
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
            if (this.board.get_vux9f0$(n, m) > 0)
              movablePlayers.set_wxm5ur$(this.board.get_vux9f0$(n, m), true);
            var destination = ArrayList_init();
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
    interfaces: [AIPlayable, BoardGameState]
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
  VirusState.prototype.component6 = function () {
    return this.players;
  };
  VirusState.prototype.copy_r8hqx5$ = function (width, height, playerCount, board, currentPlayer, players) {
    return new VirusState(width === void 0 ? this.width : width, height === void 0 ? this.height : height, playerCount === void 0 ? this.playerCount : playerCount, board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  VirusState.prototype.toString = function () {
    return 'VirusState(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', playerCount=' + Kotlin.toString(this.playerCount)) + (', board=' + Kotlin.toString(this.board)) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  VirusState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.playerCount) | 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  VirusState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.playerCount, other.playerCount) && Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  Object.defineProperty(Alys, 'Companion', {
    get: Alys$Companion_getInstance
  });
  _.Alys = Alys;
  _.originAndDestinationMustBeDifferent_wndlkk$ = originAndDestinationMustBeDifferent;
  _.originAndDestinationMustConnected_wndlkk$ = originAndDestinationMustConnected;
  _.originMustBeCurrentPlayer_wndlkk$ = originMustBeCurrentPlayer;
  _.destinationMustBeCurrentPlayer_wndlkk$ = destinationMustBeCurrentPlayer;
  _.destinationMustBeEmpty_wndlkk$ = destinationMustBeEmpty;
  _.destinationMustNotBeFortOrTown_wndlkk$ = destinationMustNotBeFortOrTown;
  _.destinationMustNotBeFullyUpgradedSoldier_wndlkk$ = destinationMustNotBeFullyUpgradedSoldier;
  _.pieceMustNotHaveMoved_oeo47y$ = pieceMustNotHaveMoved;
  _.pieceMustBeSoldier_oeo47y$ = pieceMustBeSoldier;
  _.pieceMustBeStronger_oeo47y$ = pieceMustBeStronger;
  _.placeOrUpgradePiece_oeo47y$ = placeOrUpgradePiece;
  _.removeOriginalPiece_oeo47y$ = removeOriginalPiece;
  _.invadeDestination_oeo47y$ = invadeDestination;
  _.fixSplitAreas_oeo47y$ = fixSplitAreas;
  _.fixMergedAreas_oeo47y$ = fixMergedAreas;
  _.subtractMoney_ttw5zz$ = subtractMoney;
  _.subtractMoneyForSoldier_obt8d7$ = subtractMoneyForSoldier;
  _.placePiece_ttw5zz$ = placePiece;
  _.changeCurrentPlayer_ukjefo$ = changeCurrentPlayer;
  _.incrementRound_ukjefo$ = incrementRound;
  _.gainIncome_ukjefo$ = gainIncome;
  _.spreadTrees_ukjefo$ = spreadTrees;
  _.spreadCoastTrees_ukjefo$ = spreadCoastTrees;
  _.overgrowGraves_ukjefo$ = overgrowGraves;
  _.killLoneSoldiers_ukjefo$ = killLoneSoldiers;
  _.subtractUpkeep_ukjefo$ = subtractUpkeep;
  Object.defineProperty(AlysSasEnd, 'Companion', {
    get: AlysSasEnd$Companion_getInstance
  });
  _.AlysSasEnd = AlysSasEnd;
  $$importsForInline$$.Tern = _;
  Object.defineProperty(AlysSasBuild, 'Companion', {
    get: AlysSasBuild$Companion_getInstance
  });
  _.AlysSasBuild = AlysSasBuild;
  Object.defineProperty(AlysSasHire, 'Companion', {
    get: AlysSasHire$Companion_getInstance
  });
  _.AlysSasHire = AlysSasHire;
  Object.defineProperty(AlysSasMove, 'Companion', {
    get: AlysSasMove$Companion_getInstance
  });
  _.AlysSasMove = AlysSasMove;
  Object.defineProperty(AlysSasStandard, 'Companion', {
    get: AlysSasStandard$Companion_getInstance
  });
  _.AlysSasStandard_init_3u14nx$ = AlysSasStandard_init;
  _.AlysSasStandard = AlysSasStandard;
  _.AlysField = AlysField;
  _.AlysPiece = AlysPiece;
  Object.defineProperty(AlysType, 'Fort', {
    get: AlysType$Fort_getInstance
  });
  Object.defineProperty(AlysType, 'Soldier', {
    get: AlysType$Soldier_getInstance
  });
  Object.defineProperty(AlysType, 'Grave', {
    get: AlysType$Grave_getInstance
  });
  Object.defineProperty(AlysType, 'Tree', {
    get: AlysType$Tree_getInstance
  });
  Object.defineProperty(AlysType, 'CoastTree', {
    get: AlysType$CoastTree_getInstance
  });
  _.AlysType = AlysType;
  _.AlysAction = AlysAction;
  _.AlysMoveAction = AlysMoveAction;
  _.AlysCreateAction = AlysCreateAction;
  _.AlysEndTurnAction = AlysEndTurnAction;
  _.SimpleAlysAIType = SimpleAlysAIType;
  _.AlysBoardCreator = AlysBoardCreator;
  _.AlysDisplay = AlysDisplay;
  _.AlysState = AlysState;
  _.BoardGame = BoardGame;
  _.BoardGameState = BoardGameState;
  _.StateActionState = StateActionState;
  _.StandardStateActionState = StandardStateActionState;
  _.ActionType = ActionType;
  Object.defineProperty(Result, 'Companion', {
    get: Result$Companion_getInstance
  });
  _.Failure = Failure;
  _.Success = Success;
  _.Result = Result;
  _.Rule = Rule;
  _.Chess = Chess;
  _.originMustBeCurrentPlayer_nllixi$ = originMustBeCurrentPlayer_0;
  _.destinationMustBeEmptyOrEnemy_nllixi$ = destinationMustBeEmptyOrEnemy;
  _.moveMustBeLegal_nllixi$ = moveMustBeLegal;
  _.kingMustNotBeInCheck_nllixi$ = kingMustNotBeInCheck;
  _.movePiece_nllixi$ = movePiece;
  _.switchPlayer_nllixi$ = switchPlayer;
  Object.defineProperty(ChessSas, 'Companion', {
    get: ChessSas$Companion_getInstance
  });
  _.ChessSas = ChessSas;
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
  Object.defineProperty(ChessPiece, 'Companion', {
    get: ChessPiece$Companion_getInstance
  });
  _.ChessPiece = ChessPiece;
  _.ChessState = ChessState;
  _.GameDisplay = GameDisplay;
  _.Grid = Grid;
  _.PositionedField = PositionedField;
  _.GridDisplay = GridDisplay;
  _.main_kand9s$ = main;
  _.AIPlayable = AIPlayable;
  _.Player = Player;
  _.PlayerController = PlayerController;
  _.HumanController = HumanController;
  _.RandomAIController = RandomAIController;
  _.SimpleAIController = SimpleAIController;
  _.PlayerType = PlayerType;
  _.HumanType = HumanType;
  _.RandomAIType = RandomAIType;
  _.Position = Position;
  _.RuleArea = RuleArea;
  _.RuleSection = RuleSection;
  _.TicTacToe = TicTacToe;
  _.mustPlaceOwnPiece_97dxof$ = mustPlaceOwnPiece;
  _.placePiece_97dxof$ = placePiece_0;
  _.switchPlayer_97dxof$ = switchPlayer_0;
  Object.defineProperty(TicTacToePiece, 'Cross', {
    get: TicTacToePiece$Cross_getInstance
  });
  Object.defineProperty(TicTacToePiece, 'Circle', {
    get: TicTacToePiece$Circle_getInstance
  });
  _.TicTacToePiece = TicTacToePiece;
  _.TicTacToeAction = TicTacToeAction;
  _.TicTacToeDisplay = TicTacToeDisplay;
  _.TicTacToeState = TicTacToeState;
  _.Virus = Virus;
  _.destinationMustBeWithinBoard_9rkvs1$ = destinationMustBeWithinBoard;
  _.originMustBeWithinBoard_9rkvs1$ = originMustBeWithinBoard;
  _.originMustBeCurrentPlayer_9rkvs1$ = originMustBeCurrentPlayer_1;
  _.destinationMustBeEmpty_9rkvs1$ = destinationMustBeEmpty_0;
  _.mustNotMoveTooFar_9rkvs1$ = mustNotMoveTooFar;
  _.movePiece_9rkvs1$ = movePiece_0;
  _.turnNeighbours_9rkvs1$ = turnNeighbours;
  _.changePlayer_9rkvs1$ = changePlayer;
  _.VirusAction = VirusAction;
  _.SimpleVirusAIType = SimpleVirusAIType;
  _.VirusDisplay = VirusDisplay;
  _.VirusState = VirusState;
  main([]);
  Kotlin.defineModule('Tern', _);
  return _;
}(typeof Tern === 'undefined' ? {} : Tern, kotlin, this['kotlinx-coroutines-core']);
