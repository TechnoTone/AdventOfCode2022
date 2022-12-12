module Day11Tests exposing (tests)

import Day11
import Day11Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 11"
        [ test "Part 1 Example" <| always <| Expect.equal 10605 <| Day11.part1 example
        , test "Part 1" <| always <| Expect.equal 113232 <| Day11.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 2713310158 <| Day11.part2 example
        , test "Part 2" <| always <| Expect.equal 29703395016 <| Day11.part2 input
        ]
