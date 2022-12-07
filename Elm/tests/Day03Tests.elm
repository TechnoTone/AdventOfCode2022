module Day03Tests exposing (tests)

import Day03
import Day03Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 03"
        [ test "Part 1 Example" <| always <| Expect.equal 157 <| Day03.part1 example
        , test "Part 1" <| always <| Expect.equal 7908 <| Day03.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 70 <| Day03.part2 example
        , test "Part 2" <| always <| Expect.equal 2838 <| Day03.part2 input
        ]
