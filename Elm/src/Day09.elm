module Day09 exposing (part1, part2)

import Array exposing (Array)
import List.Extra as List
import Set exposing (Set)


part1 : String -> Int
part1 input =
    input
        |> toInstructions
        |> processInstructions 2
        |> Set.size


part2 : String -> Int
part2 input =
    input
        |> toInstructions
        |> processInstructions 10
        |> Set.size


type alias Instruction =
    { direction : Direction
    , distance : Int
    }


type Direction
    = Up
    | Down
    | Left
    | Right


toInstructions : String -> List Instruction
toInstructions input =
    input
        |> String.lines
        |> List.filterMap toInstruction


toInstruction : String -> Maybe Instruction
toInstruction input =
    case input |> String.split " " of
        [ direction, distStr ] ->
            case ( direction, String.toInt distStr ) of
                ( "U", Just distance ) ->
                    Just <| Instruction Up distance

                ( "D", Just distance ) ->
                    Just <| Instruction Down distance

                ( "L", Just distance ) ->
                    Just <| Instruction Left distance

                ( "R", Just distance ) ->
                    Just <| Instruction Right distance

                _ ->
                    Nothing

        _ ->
            Nothing


type alias Coordinate =
    ( Int, Int )


startCoordinate : Coordinate
startCoordinate =
    ( 0, 0 )


type alias ProcessState =
    { knots : Array Coordinate
    , visited : Set Coordinate
    }


processInstructions : Int -> List Instruction -> Set Coordinate
processInstructions knotCount instructions =
    let
        startState : ProcessState
        startState =
            { knots = Array.initialize knotCount (always <| startCoordinate)
            , visited = Set.singleton <| startCoordinate
            }
    in
    instructions
        |> List.foldl processInstruction startState
        |> .visited


processInstruction : Instruction -> ProcessState -> ProcessState
processInstruction instruction state =
    let
        getKnot : Int -> Array Coordinate -> Coordinate
        getKnot knotIndex =
            Array.get knotIndex >> Maybe.withDefault startCoordinate

        moveKnot : Int -> Coordinate -> ProcessState -> ProcessState
        moveKnot knotIndex newPos { knots, visited } =
            if knotIndex == Array.length knots - 1 then
                { knots = knots |> Array.set knotIndex newPos
                , visited = visited |> Set.insert newPos
                }

            else
                let
                    nextKnot : Coordinate
                    nextKnot =
                        getKnot (knotIndex + 1) knots
                in
                if tooFarApart newPos nextKnot then
                    { knots = knots |> Array.set knotIndex newPos
                    , visited = visited
                    }
                        |> moveKnot (knotIndex + 1) (moveCloser newPos nextKnot)

                else
                    { knots = knots |> Array.set knotIndex newPos
                    , visited = visited
                    }

        moveHead : Int -> ProcessState -> ProcessState
        moveHead distance { knots, visited } =
            let
                newCoordinate : Coordinate
                newCoordinate =
                    knots
                        |> getKnot 0
                        |> moveCoordinate instruction.direction
            in
            if distance == 1 then
                moveKnot 0 newCoordinate { knots = knots, visited = visited }

            else
                moveKnot 0 newCoordinate { knots = knots, visited = visited }
                    |> moveHead (distance - 1)
    in
    moveHead instruction.distance state


moveCoordinate : Direction -> Coordinate -> Coordinate
moveCoordinate direction ( x, y ) =
    case direction of
        Up ->
            ( x, y + 1 )

        Down ->
            ( x, y - 1 )

        Left ->
            ( x - 1, y )

        Right ->
            ( x + 1, y )


tooFarApart : Coordinate -> Coordinate -> Bool
tooFarApart ( x1, y1 ) ( x2, y2 ) =
    abs (x1 - x2) > 1 || abs (y1 - y2) > 1


sign : Int -> Int
sign x =
    x // abs x


moveCloser : Coordinate -> Coordinate -> Coordinate
moveCloser ( tx, ty ) ( kx, ky ) =
    ( kx + sign (tx - kx), ky + sign (ty - ky) )
