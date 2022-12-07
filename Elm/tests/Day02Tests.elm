module Day02Tests exposing (tests)

import Day02
import Day02Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 02"
        [ test "Part 1 Example" <| always <| Expect.equal 15 <| Day02.part1 example
        , test "Part 1" <| always <| Expect.equal 10718 <| Day02.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 12 <| Day02.part2 example
        , test "Part 2" <| always <| Expect.equal 14652 <| Day02.part2 input
        ]
