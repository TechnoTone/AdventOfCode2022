module Day12 exposing (part1, part2)

import Dict exposing (Dict)
import Set exposing (Set)


part1 : String -> Int
part1 =
    parseInput >> shortestClimb


part2 : String -> Int
part2 input =
    0


type alias Map =
    { heightMap : Dict Coordinate Int
    , dimensions : Dimensions
    , startPos : Coordinate
    , endPos : Coordinate
    }


type alias Coordinate =
    ( Int, Int )


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


parseHeightMap : List String -> Dict Coordinate Int
parseHeightMap =
    List.indexedMap
        (\y line ->
            line
                |> String.replace "S" "a"
                |> String.replace "E" "z"
                |> String.toList
                |> List.indexedMap
                    (\x s ->
                        ( ( x, y ), Char.toCode s )
                    )
        )
        >> List.concat
        >> Dict.fromList


parseDimensions : List String -> Dimensions
parseDimensions lines =
    Dimensions
        (String.length (List.head lines |> Maybe.withDefault ""))
        (List.length lines)


parseStartPos : List String -> Coordinate
parseStartPos =
    findCharPos 'S'


parseEndPos : List String -> Coordinate
parseEndPos =
    findCharPos 'E'


findCharPos : Char -> List String -> Coordinate
findCharPos char lines =
    let
        fn : ( List Int, Int ) -> Maybe ( Int, Int )
        fn coord =
            case coord of
                ( [ x ], y ) ->
                    Just ( x, y )

                _ ->
                    Nothing
    in
    lines
        |> List.indexedMap (\y line -> ( String.indexes (String.fromChar char) line, y ))
        |> List.filterMap fn
        |> List.head
        |> Maybe.withDefault ( 0, 0 )


shortestClimb : Map -> Int
shortestClimb { heightMap, dimensions, startPos, endPos } =
    let
        { width, height } =
            dimensions

        inRange : Coordinate -> Bool
        inRange ( x, y ) =
            x >= 0 && x < width && y >= 0 && y < height

        isNotTooHigh : Int -> Coordinate -> Bool
        isNotTooHigh currentHeight pos =
            heightOf pos <= currentHeight + 1

        heightOf : Coordinate -> Int
        heightOf coord =
            Dict.get coord heightMap |> Maybe.withDefault 99

        choices : Coordinate -> Set Coordinate -> List Coordinate
        choices ( x, y ) visited =
            [ ( x + 1, y ), ( x - 1, y ), ( x, y + 1 ), ( x, y - 1 ) ]
                |> List.filter inRange
                |> List.filter (\pos -> not (Set.member pos visited))
                |> List.filter (isNotTooHigh (heightOf ( x, y )))

        step : List ( Coordinate, Int ) -> Set Coordinate -> Int
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
