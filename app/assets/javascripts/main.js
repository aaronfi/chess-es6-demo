$(window).load(function() {
    FastClick.attach(document.body);

    var repeating = false;
    var repeatRateTimer = null;

    var throttleSteps = [
        150, 150,
        125, 125,
        100,
        25];
    var throttleCount = -1;

    $(document).keyup( function(e) {
        if (repeatRateTimer != null) {
            clearTimeout(repeatRateTimer);
            repeatRateTimer = null;
        }

        repeating = false;
        cfg.moveSpeed = 150;
        throttleCount = -1;
    });

    $(document).keydown( function(e) {
        if (repeating == true) {
            throttleCount = Math.min(throttleSteps.length-1, throttleCount + 1);

            cfg.moveSpeed = throttleSteps[throttleCount];
            if (repeatRateTimer == null) {
                repeatRateTimer = setTimeout(function() {
                    repeating = false;
                    clearTimeout(repeatRateTimer);
                    repeatRateTimer = null;
                }, 25);
            }

            return;
        }

        // TODO see if you can replace this with $(document).keypress( function(e) { .....
        // http://www.moreonfew.com/how-to-identify-keycode-or-key-pressed-in-jquery/
        repeating = true;

        // keyboard logic
        if (board.is_animating()) {
            return;
        }

        var tag = e.target.tagName.toLowerCase();
        if (tag != 'input' && tag != 'textarea') {
            switch(e.which) {
                case 37:  // left arrow
                    prev();
                    e.preventDefault();
                    break;
                case 38:  // up arrow
                    up();
                    e.preventDefault();
                    break;
                case 39:  // right arrow
                    next();
                    e.preventDefault();
                    break;
                case 40:  // down arrow
                    down();
                    e.preventDefault();
                    break;
                case 13:  // enter key
                    break;
            }
        }
    });

    var computer = true;
    $('#button1').click(function() {
        if ($('#button1').attr('value') == "off") {
            $('#button1').text("Computer: On");
            $('#button1').attr('value', 'on');
            computer = true;
        } else {
            $('#button1').text("Computer: Off");
            $('#button1').attr('value', 'off');
            computer = false;
        }
    });

    function printDebug() {  // eventually remove this function and all its uses
        var doesBoardMatchDisplay = board.fen() === game.toFen().split(' ')[0];
        $('#debug2').text(' ' + game.toString() + ' Board matches display? ' +  (doesBoardMatchDisplay ? 'Yes' : '** NO **'));

        var events = '';
        for (var i = game.currentGame.eventLog._events.length-1; i >= 0; i--) {
            events += game.currentGame.eventLog._events[i].timer + ' ' + game.currentGame.eventLog._events[i].event + '\n';
        }
        $('#debug').text(events);
    }

    function displayPossibleMoves() {
        var moves = game.moves().sort();
        var list = '';
        for(var i=0; i < moves.length; i++) {
            list += moves[i] + ' ';
        }
        $('#possibleMoves').text(list);
    }

    function makeComputerMove() {
        // for converting p4wn.js' internal board representation into algebraic squares
        // http://chessprogramming.wikispaces.com/10x12+Board
        //   + 0123456789
        //   0 ##########
        //  10 ##########
        //  20 #RNBQKBNR#
        //  30 #PPPPPPPP#
        //  40 #........#
        //  50 #........#
        //  60 #........#
        //  70 #........#
        //  80 #pppppppp#
        //  90 #rnbqkbnr#
        // 100 ##########
        // 110 ##########
        function convertExtendedSquareToAlgebraic(i) {
            var lookup = {
                91: 'a8', 92: 'b8', 93: 'c8', 94: 'd8', 95: 'e8', 96: 'f8', 97: 'g8', 98: 'h8',
                81: 'a7', 82: 'b7', 83: 'c7', 84: 'd7', 85: 'e7', 86: 'f7', 87: 'g7', 88: 'h7',
                71: 'a6', 72: 'b6', 73: 'c6', 74: 'd6', 75: 'e6', 76: 'f6', 77: 'g6', 78: 'h6',
                61: 'a5', 62: 'b5', 63: 'c5', 64: 'd5', 65: 'e5', 66: 'f5', 67: 'g5', 68: 'h5',
                51: 'a4', 52: 'b4', 53: 'c4', 54: 'd4', 55: 'e4', 56: 'f4', 57: 'g4', 58: 'h4',
                41: 'a3', 42: 'b3', 43: 'c3', 44: 'd3', 45: 'e3', 46: 'f3', 47: 'g3', 48: 'h3',
                31: 'a2', 32: 'b2', 33: 'c2', 34: 'd2', 35: 'e2', 36: 'f2', 37: 'g2', 38: 'h2',
                21: 'a1', 22: 'b1', 23: 'c1', 24: 'd1', 25: 'e1', 26: 'f1', 27: 'g1', 28: 'h1',
            };

            return lookup[i];
        }

        printDebug();
        setTimeout(function() {
            var recommendedMove = engine.find_best_move(game.toFen());
            var resultMoveContext = game.makeMoveFromAlgebraic(
                convertExtendedSquareToAlgebraic(recommendedMove[0]),
                convertExtendedSquareToAlgebraic(recommendedMove[1])
            );

            board.move(resultMoveContext.move.algebraic);
            board.position(game.toFen());
            printDebug();

            displayPossibleMoves();
        }, 750);
    }

    var variation_mouseover = function(e) {
        e.stopPropagation();
        $('.highlight').removeClass('highlight');
        $(this).addClass('highlight');
    };
    var variation_mouseout =  function(e) {
        e.stopPropagation();
        $(this).removeClass('highlight');
    };
    $('.variation').mouseover(variation_mouseover);
    $('.variation').mouseout(variation_mouseout);

    var moveID = 0;

    function prev() {
        game.prev();
        board.position(game.toFen());

        // reassign "#selected" node
        var selected = $('.selected');
        var prev = selected.attr('data-prev');

        if (prev) {
            selected.removeClass('selected');
            $('#' + prev).addClass('selected');
        }
        printDebug();
        displayPossibleMoves();
    }

    function next() {
        game.next();
        board.position(game.toFen());

        // reassign "#selected" node
        var selected = $('.selected');
        var next = selected.attr('data-next');

        if (next) {
            selected.removeClass('selected');
            $('#' + next).addClass('selected');
        }
        printDebug();
        displayPossibleMoves();
    }

    // TODO need to prompt for which variation, then pass it along to this function;
    // there could be more than one variation to choose from;  defaults to first, for now
    function down(i) {
        if (typeof i === 'undefined') {
            i=0;
        }

        if (game.descendIntoContinuation(i)) {
            board.position(game.toFen());

            // reassign "#selected" node
            var selected = $('.selected');

            var conts = selected.attr('data-continuations').split(',');
            var next = conts[i];

            if (next) {
                selected.removeClass('selected');
                $('#' + next).addClass('selected');
            }
            printDebug();
            displayPossibleMoves();
        }
    }

    function up() {
        if (game.ascendFromCurrentContinuation()) {
            board.position(game.toFen());

            // reassign "#selected" node
            var selected = $('.selected');
            var prev = selected.attr('data-prev');

            if (prev) {
                selected.removeClass('selected');
                $('#' + prev).addClass('selected');
            }
            printDebug();
            displayPossibleMoves();
        }
    }

    var startingTurn = 'w',
        board,
        game = new Chess(),
        engine = new Engine(),
        games = [
            [],
            ['[Event "1001 Brilliant Mates"]',
                '[Site "No forced mate in this position???"]',
                '[Date "????.??.??"]',
                '[Round "?"]',
                '[White "BWTC.0005"]',
                '[Result "*"]',
                '[SetUp "1"]',
                '[FEN "r2qk1r1/p4p2/bp2pQp1/1n1pP1Bp/7P/3P2N1/P1R2PP1/2R3K1 w q - 0 1"]',
                '[PlyCount "8"]',
                '',
                '1. Rc8 Rxc8 2. Rxc8 Kd7 3. Rxd8+ Rxd8 4. Qxd8+ Kc6'],
            ['1. d4 (1. c4 (1. b4 (1. a4 a5) 1... b5) 1... c5) (1. e4 (1. f4 (1. g4 (1. h4 h5) 1... g5) 1... f5) 1... e5) 1... d5 (1... c5 (1... b5 (1... a5))) (1... e5 (1... f5 (1... g5 2. g3) 2. f3) 2. e3) e3 (f3 f6) (g3 g6) (h3 h6) e6 *'],
            ['1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Nxg4 Nxe4 7. d3 Ng3 8. Bxf4 Nxh1 9. Qe2+ Qe7 10. Nf6+ Kd8 11. Bxc7+ Kxc7 12. Nd5+ Kd8 13. Nxe7 Bxe7 14. Qg4 d6 15. Qf4 Rg8 16. Qxf7 Bxh4+ 17. Kd2 Re8 18. Na3 Na6 19. Qh5 Bf6 20. Qxh1 Bxb2 21. Qh4+ Kd7 22. Rb1 Bxa3 23. Qa4+'],
            ['[Event "1001 Brilliant Mates"]',
                '[White "BWTC.0004"]',
                '[Result "*"]',
                '[FEN "r1b1k2r/pp2bppp/8/3N2q1/2p5/8/PPP2PPP/R2QR1K1 w kq - 0 1"]',
                '',
                '1. Nc7+'],
            ['[FEN "rnbqkbnr/pppp1ppp/8/8/4p3/4PN2/PPPP1PPP/RNBQKB1R w KQkq - 0 3"]']
        ];

    game.games = [];
    for(var i=0; i<games.length; i++) {
        $('<button type="button" />', { class: 'game' })
            .append("Game " + (i+1))
            .click(function() {
                game.reset();
                $('.selected-game').removeClass('selected-game');
                $(this).addClass('selected-game');
                selectGame($(this).index()-1);
            })
            .mouseover(variation_mouseover)
            .mouseout(variation_mouseout)
            .addClass('btn btn-secondary')
            .addClass(i == 1 ? 'selected-game' : '')
            .appendTo($('#games'));

        game.loadPgn(games[i].join('\n'), { isPuzzleSolution: true });
    }

    function selectGame(i) {
        game.selectGame(i);
        game.rewindToBeginning();
        displayPossibleMoves();
        board.position(game.toFen());
        startingTurn = game.whoseTurn();
        printDebug();
    }

    var removeGreySquares = function() {
        $('#board .square-55d63').css('background', '');
    };

    var greySquare = function(square) {
        var squareEl = $('#board .square-' + square);

        var background = '#a9a9a9';
        if (squareEl.hasClass('black-3c85d') === true) {
            background = '#696969';
        }

        squareEl.css('background', background);
    };

    var onDragStart = function(source, piece) {
        // do not pick up pieces if the chess game is over or if it's not that side's turn
        if (game.isGameOver() === true ||
            (game.whoseTurn() === 'w' && piece.search(/^b/) !== -1) ||
            (game.whoseTurn() === 'b' && piece.search(/^w/) !== -1)) {
            return false;
        }
    };

    var onDragEnd = function() {
        printDebug();
    };

    var onDrop = function(source, target) {
        removeGreySquares();  // remove highlights

        // see if the move is legal
        if (-1 === jQuery.inArray(
                target,
                game.moves({
                    onlyAlgebraicSquares: true,
                    onlyForSquare: source,
                    onlyDestinationSquares: true })))
        {
            return 'snapback';
        }

        var moveContext = game.makeMoveFromAlgebraic(
            source,
            target
            // TODO need a modal prompt of some kind to choose the promotion piece.  For now, callee defaults to Queen.
        );

        // illegal move
        if (!moveContext) return 'snapback';

        printDebug();
        displayPossibleMoves();

        // TODO need to add a "guard";  currently the user can just right-arrow advance through the
        // entire puzzle solution.  Need to deny them this ability.

        // process and apply the opponent's move in response, if any
        if (computer && game.whoseTurn() !== startingTurn) {
            if (moveContext.move.isPuzzleSolution) {
                console.log("closer...");  // TODO remove debuggery

                var nextMove = game.next();
                if (nextMove) {
                    // NOTE need to wrap this in a delay timer, otherwise the move animation sequence will misbehave
                    setTimeout(function() {
                        board.move(nextMove.move.algebraic);
                        board.position(game.toFen());

                        if (! game.next()) {
                            console.log("puzzle was finished! -- no more White moves needed")
                        } else {
                            game.prev();  // restore our state prior to our inspection fo the next move
                        }

                        printDebug();
                    }, 750);
                } else {
                    console.log("puzzle was finished - black has no further recorded moves!!");
                    isPuzzleSolved = true;
                    makeComputerMove();
                }
            } else {
                makeComputerMove();
            }
        }
        // NOTE this mostly fixes a UI bug where the Rook's movement in castling
        // would not get animated until the other player's next turn.  Ideally, the rook's movement
        // would be animated, but trying board.position(game.toFen(), true) just results in broken UI.
        // Leaving unaminated, for now.
        if (moveContext.move.san.substring(0,3) == 'O-O') {
            board.position(game.toFen(), false);
        }
        // /NOTE
    };

    var onDragMove = function(location, prev_location, origin_location, piece, current_position, current_orientation) {
        // limit square highlighting to only legal moves;
        // TODO wire up to a user option

        if (-1 === jQuery.inArray(
                location,
                game.moves({
                    onlyAlgebraicSquares: true,
                    onlyForSquare: origin_location,
                    onlyDestinationSquares: true })))
        {
            // TODO fix this terrible hack, where we exposing internal constants within chessboardjs
            $('#' + board.SQUARE_ELS_IDS()[location]).removeClass(board.CSS().highlight2);
        }
    };

    var onMouseoverSquare = function(square, piece) {
        // get list of possible moves for this square

        var moves = game.moves({
            onlyForSquare: square,
            onlyAlgebraicSquares: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        // TODO add UI support for square-select (origin), then square-select (destination)

        var squareEl = $('#board .square-' + square);
        squareEl.addClass('highlight2-9c5d2');

        // highlight the possible squares for this piece
        for (var i = 0; i < moves.length; i++) {
            greySquare(moves[i].substring(3,5));
        }
    };

    var onMouseoutSquare = function(square, piece) {
        var squareEl = $('#board .square-' + square);
        squareEl.removeClass('highlight2-9c5d2');
        removeGreySquares();  // remove highlights
    };

    var cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDragMove: onDragMove,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onDragEnd: onDragEnd,
        showNotation: false,
        pieceTheme: '/assets/images/chesspieces/wikipedia/{piece}.png',
        position: game.toFen(),
        moveSpeed: 200,
        showErrors: 'console'
    };
    board = new ChessBoard('board', cfg);

    $('#resizable').resizable({
        resize: function(event, ui) {
            $('#board > div > div').css({ 'border-color': 'blue' });

            $("#board").width( ui.size.width );
            $("#board").height( ui.size.width );  // not a typo;  we set board's height equal to UI's width, to enforce a square board
            board.resize();

            // for some reason, these two commands are necessary;  otherwise the resize triangle can end up misaligned.
            $('#resizable').width( $('#board').width() );
            $('#resizable').height( $('#board').width() );
        },
        stop: function(event, ui) {
            $('#board > div > div').css({ 'border-color': 'black' });
        },
        aspectRatio: true,
        handles: "se"
    });

    printDebug();
    displayPossibleMoves();

    selectGame(1);

    $('#debug').css('visibility', 'visible');
    $('#debug2').css('visibility', 'visible');
    $('#possibleMoves').css('visibility', 'visible');
    $('#button1').css('visibility', 'visible');

    window.chess = game;
});
