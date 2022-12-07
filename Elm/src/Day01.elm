module Day01 exposing (part1, part2)


part1 : List Int -> Int
part1 ints =
    ints
        |> getCalories
        |> List.head
        |> Maybe.withDefault 0


part2 : List Int -> Int
part2 ints =
    ints |> getCalories |> List.take 3 |> List.sum


getCalories : List Int -> List Int
getCalories ints =
    (ints ++ [ 0 ])
        |> List.foldl
            (\curr ( next, acc ) ->
                if curr == 0 then
                    ( 0, next :: acc )

                else
                    ( curr + next, acc )
            )
            ( 0, [] )
        |> Tuple.second
        |> List.sort
        |> List.reverse
