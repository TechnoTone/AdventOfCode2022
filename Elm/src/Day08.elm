module Day08 exposing (part1, part2)

import Dict exposing (Dict)
import List.Extra as List


part1 : String -> Int
part1 =
    toLinesOfInts
        >> List.indexedMap toTreeList
        >> List.concat
        >> Dict.fromList
        >> visibleTreeCount


part2 : String -> Int
part2 =
    toLinesOfInts
        >> List.indexedMap toTreeList
        >> List.concat
        >> Dict.fromList
        >> maximumScenicScore


toLinesOfInts : String -> List (List Int)
toLinesOfInts =
    String.lines
        >> List.map (String.toList >> List.map (\c -> Char.toCode c - 48))


toTreeList : Int -> List Int -> List ( ( Int, Int ), Int )
toTreeList y =
    List.indexedMap (toTree y)


toTree : Int -> Int -> Int -> ( ( Int, Int ), Int )
toTree y x value =
    ( ( x, y ), value )


visibleTreeCount : Dict ( Int, Int ) Int -> Int
visibleTreeCount trees =
    let
        allCoordinates =
            Dict.keys trees

        { minX, maxX, minY, maxY } =
            getRanges allCoordinates

        isVisible : ( Int, Int ) -> Bool
        isVisible ( x, y ) =
            let
                height =
                    Dict.get ( x, y ) trees |> Maybe.withDefault 0

                treesRight =
                    List.range (x + 1) maxX
                        |> List.filterMap (\x_ -> Dict.get ( x_, y ) trees)

                treesLeft =
                    List.range minX (x - 1)
                        |> List.filterMap (\x_ -> Dict.get ( x_, y ) trees)

                treesAbove =
                    List.range minY (y - 1)
                        |> List.filterMap (\y_ -> Dict.get ( x, y_ ) trees)

                treesBelow =
                    List.range (y + 1) maxY
                        |> List.filterMap (\y_ -> Dict.get ( x, y_ ) trees)

                allTreesAreVisible : List Int -> Bool
                allTreesAreVisible =
                    List.all (\t -> t < height)
            in
            [ treesRight, treesLeft, treesAbove, treesBelow ]
                |> List.any allTreesAreVisible
    in
    allCoordinates
        |> List.filter isVisible
        |> List.length


maximumScenicScore : Dict ( Int, Int ) Int -> Int
maximumScenicScore trees =
    let
        allCoordinates =
            Dict.keys trees

        { minX, maxX, minY, maxY } =
            getRanges allCoordinates

        toScenicScore : ( Int, Int ) -> Int
        toScenicScore ( x, y ) =
            let
                height =
                    Dict.get ( x, y ) trees |> Maybe.withDefault 0

                treesRight =
                    List.range (x + 1) maxX
                        |> List.filterMap (\x_ -> Dict.get ( x_, y ) trees)

                treesLeft =
                    List.range minX (x - 1)
                        |> List.reverse
                        |> List.filterMap (\x_ -> Dict.get ( x_, y ) trees)

                treesAbove =
                    List.range minY (y - 1)
                        |> List.reverse
                        |> List.filterMap (\y_ -> Dict.get ( x, y_ ) trees)

                treesBelow =
                    List.range (y + 1) maxY
                        |> List.filterMap (\y_ -> Dict.get ( x, y_ ) trees)

                visibleTreeCounts : Int -> List Int -> Int
                visibleTreeCounts count heights =
                    case heights of
                        [] ->
                            count

                        h :: hs ->
                            if h < height then
                                visibleTreeCounts (count + 1) hs

                            else
                                count + 1
            in
            [ treesLeft, treesRight, treesAbove, treesBelow ]
                |> List.map (visibleTreeCounts 0)
                |> List.foldl (*) 1
    in
    allCoordinates
        |> List.map toScenicScore
        |> List.maximum
        |> Maybe.withDefault 0


getRanges : List ( Int, Int ) -> { minX : Int, maxX : Int, minY : Int, maxY : Int }
getRanges coordinates =
    let
        ( allXCoordinates, allYCoordinates ) =
            List.unzip coordinates
    in
    { minX = List.minimum allXCoordinates |> Maybe.withDefault 0
    , maxX = List.maximum allXCoordinates |> Maybe.withDefault 0
    , minY = List.minimum allYCoordinates |> Maybe.withDefault 0
    , maxY = List.maximum allYCoordinates |> Maybe.withDefault 0
    }
