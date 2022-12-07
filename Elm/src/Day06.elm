module Day06 exposing (part1, part2)

import Set


part1 : String -> Int
part1 =
    String.toList >> findStart 0 4


part2 : String -> Int
part2 =
    String.toList >> findStart 0 14


findStart : Int -> Int -> List Char -> Int
findStart ix size chars =
    if Set.size (Set.fromList (List.take size chars)) == size then
        ix + size

    else
        findStart (ix + 1) size (List.drop 1 chars)
