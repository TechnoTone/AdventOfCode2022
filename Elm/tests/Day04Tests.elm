module Day04Tests exposing (tests)

import Day04
import Day04Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 04"
        [ test "Part 1 Example" <| always <| Expect.equal 2 <| Day04.part1 example
        , test "Part 1" <| always <| Expect.equal 433 <| Day04.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 4 <| Day04.part2 example
        , test "Part 2" <| always <| Expect.equal 852 <| Day04.part2 input
        ]
