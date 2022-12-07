module Day05Tests exposing (tests)

import Day05
import Day05Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 05"
        [ test "Part 1 Example" <| always <| Expect.equal "CMZ" <| Day05.part1 example
        , test "Part 1" <| always <| Expect.equal "QNNTGTPFN" <| Day05.part1 input
        , test "Part 2 Example" <| always <| Expect.equal "MCD" <| Day05.part2 example
        , test "Part 2" <| always <| Expect.equal "GGNPJBTTR" <| Day05.part2 input
        ]
