module Day12 exposing (part1, part2)

import Dict exposing (Dict)
import Set exposing (Set)


part1 : String -> Int
part1 =
    parseInput >> shortestClimb


part2 : String -> Int
part2 =
    parseInput >> shortestDescent


type alias Map =
    { heightMap : Dict Int Int
    , dimensions : Dimensions
    , startPos : Int
    , endPos : Int
    }


type alias Dimensions =
    { width : Int
    , height : Int
    }


parseInput : String -> Map
parseInput =
    String.lines
        >> (\lines ->
                Map
                    (parseHeightMap lines)
                    (parseDimensions lines)
                    (parseStartPos lines)
                    (parseEndPos lines)
           )


parseHeightMap : List String -> Dict Int Int
parseHeightMap =
    String.join ""
        >> String.replace "S" "a"
        >> String.replace "E" "z"
        >> String.toList
        >> List.indexedMap (\i c -> ( i, Char.toCode c ))
        >> Dict.fromList


parseDimensions : List String -> Dimensions
parseDimensions lines =
    Dimensions
        (String.length (List.head lines |> Maybe.withDefault ""))
        (List.length lines)


parseStartPos : List String -> Int
parseStartPos =
    findCharPos 'S'


parseEndPos : List String -> Int
parseEndPos =
    findCharPos 'E'


findCharPos : Char -> List String -> Int
findCharPos char lines =
    lines
        |> String.join ""
        |> String.indexes (String.fromChar char)
        |> List.head
        |> Maybe.withDefault 0


shortestClimb : Map -> Int
shortestClimb { heightMap, dimensions, startPos, endPos } =
    let
        { width, height } =
            dimensions

        inRange : Int -> Bool
        inRange pos =
            pos >= 0 && pos < width * height

        isNotTooHigh : Int -> Int -> Bool
        isNotTooHigh currentHeight pos =
            heightOf pos <= currentHeight + 1

        heightOf : Int -> Int
        heightOf pos =
            Dict.get pos heightMap |> Maybe.withDefault 99

        choices : Int -> Set Int -> List Int
        choices pos visited =
            [ pos + 1, pos + width, pos - 1, pos - width ]
                |> List.filter inRange
                |> List.filter (\p -> not (Set.member p visited))
                |> List.filter (isNotTooHigh (heightOf pos))

        step : List ( Int, Int ) -> Set Int -> Int
        step queue visited =
            case queue of
                [] ->
                    0

                ( pos, steps ) :: rest ->
                    let
                        nextSteps =
                            choices pos visited

                        nextStepsSet =
                            Set.fromList nextSteps
                    in
                    if Set.member endPos nextStepsSet then
                        steps + 1

                    else
                        step
                            (rest ++ List.map (\n -> ( n, steps + 1 )) nextSteps)
                            (Set.union visited nextStepsSet)
    in
    step [ ( startPos, 0 ) ] (Set.singleton startPos)


shortestDescent : Map -> Int
shortestDescent { heightMap, dimensions, endPos } =
    let
        { width, height } =
            dimensions

        inRange : Int -> Bool
        inRange pos =
            pos >= 0 && pos < width * height

        isNotTooLow : Int -> Int -> Bool
        isNotTooLow currentHeight pos =
            heightOf pos >= currentHeight - 1

        heightOf : Int -> Int
        heightOf pos =
            Dict.get pos heightMap |> Maybe.withDefault 99

        choices : Int -> Set Int -> List Int
        choices pos visited =
            [ pos + 1, pos + width, pos - 1, pos - width ]
                |> List.filter inRange
                |> List.filter (\p -> not (Set.member p visited))
                |> List.filter (isNotTooLow (heightOf pos))

        step : List ( Int, Int ) -> Set Int -> Int
        step queue visited =
            case queue of
                [] ->
                    0

                ( pos, steps ) :: rest ->
                    let
                        nextSteps =
                            choices pos visited

                        nextStepsSet =
                            Set.fromList nextSteps
                    in
                    if nextSteps |> List.any (heightOf >> (==) 97) then
                        steps + 1

                    else
                        step
                            (rest ++ List.map (\n -> ( n, steps + 1 )) nextSteps)
                            (Set.union visited nextStepsSet)
    in
    step [ ( endPos, 0 ) ] (Set.singleton endPos)
