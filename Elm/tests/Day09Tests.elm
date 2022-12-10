module Day09Tests exposing (tests)

import Day09
import Day09Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 09"
        [ test "Part 1 Example" <| always <| Expect.equal 13 <| Day09.part1 example
        , test "Part 1" <| always <| Expect.equal 6190 <| Day09.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 1 <| Day09.part2 example
        , test "Part 2 Example 2" <| always <| Expect.equal 36 <| Day09.part2 example2
        , test "Part 2" <| always <| Expect.equal 2516 <| Day09.part2 input
        ]
