module Day02 exposing (part1, part2)

import Dict exposing (Dict)


part1 : List String -> Int
part1 =
    Dict.fromList
        [ ( "A X", 1 + 3 )
        , ( "A Y", 2 + 6 )
        , ( "A Z", 3 + 0 )
        , ( "B X", 1 + 0 )
        , ( "B Y", 2 + 3 )
        , ( "B Z", 3 + 6 )
        , ( "C X", 1 + 6 )
        , ( "C Y", 2 + 0 )
        , ( "C Z", 3 + 3 )
        ]
        |> process


part2 : List String -> Int
part2 =
    Dict.fromList
        [ ( "A X", 3 + 0 )
        , ( "A Y", 1 + 3 )
        , ( "A Z", 2 + 6 )
        , ( "B X", 1 + 0 )
        , ( "B Y", 2 + 3 )
        , ( "B Z", 3 + 6 )
        , ( "C X", 2 + 0 )
        , ( "C Y", 3 + 3 )
        , ( "C Z", 1 + 6 )
        ]
        |> process


process : Dict String Int -> List String -> Int
process scoreMap =
    List.foldl
        (\s acc ->
            (Dict.get s scoreMap |> Maybe.withDefault 0) + acc
        )
        0
