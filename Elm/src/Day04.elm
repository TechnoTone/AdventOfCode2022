module Day04 exposing (part1, part2)


part1 : List String -> Int
part1 input =
    input
        |> List.map inputParser
        |> List.filter isOneRangeASubset
        |> List.length


part2 : List String -> Int
part2 input =
    input
        |> List.map inputParser
        |> List.filter doRangesOverlap
        |> List.length


type alias Range =
    { lower : Int, upper : Int }


toRangeTuple : List Int -> Range
toRangeTuple list =
    case list of
        [ a, b ] ->
            Range a b

        _ ->
            Range 0 0


toPair : List Range -> ( Range, Range )
toPair list =
    case list of
        [ a, b ] ->
            ( a, b )

        _ ->
            ( Range 0 0, Range 0 0 )


inputParser : String -> ( Range, Range )
inputParser =
    -- "2-4,6-8"
    String.split ","
        >> List.map
            (String.split "-"
                >> List.map
                    (String.toInt
                        >> Maybe.withDefault 0
                    )
                >> toRangeTuple
            )
        >> toPair


isOneRangeASubset : ( Range, Range ) -> Bool
isOneRangeASubset ( a, b ) =
    (a.lower <= b.lower && a.upper >= b.upper)
        || (a.lower >= b.lower && a.upper <= b.upper)


doRangesOverlap : ( Range, Range ) -> Bool
doRangesOverlap ( a, b ) =
    a.lower <= b.upper && a.upper >= b.lower
