module Day03 exposing (part1, part2)

import List.Extra as List
import Set exposing (Set)


part1 : List String -> Int
part1 input =
    input
        |> List.map (toRucksack >> getError >> getPriority)
        |> List.sum


part2 : List String -> Int
part2 input =
    input
        |> List.foldl
            (\s ( total, batch ) ->
                case batch of
                    [ a, b ] ->
                        ( groupBadge a b s |> getPriority |> (+) total, [] )

                    _ ->
                        ( total, stringToSet s :: batch )
            )
            ( 0, [] )
        |> Tuple.first


stringToSet : String -> Set Char
stringToSet =
    String.toList >> Set.fromList


getError : ( String, String ) -> Char
getError ( a, b ) =
    Set.intersect (stringToSet a) (stringToSet b)
        |> Set.toList
        |> List.head
        |> Maybe.withDefault ' '


toRucksack : String -> ( String, String )
toRucksack string =
    ( String.left (String.length string // 2) string
    , String.right (String.length string // 2) string
    )


getPriority : Char -> Int
getPriority c =
    if Char.isLower c then
        Char.toCode c - 96

    else
        Char.toCode c - 38


groupBadge : Set Char -> Set Char -> String -> Char
groupBadge a b s =
    s
        |> String.toList
        |> List.find
            (\c ->
                Set.member c a && Set.member c b
            )
        |> Maybe.withDefault ' '
