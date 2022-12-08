module Day08Tests exposing (tests)

import Day08
import Day08Input exposing (example, input)
import Expect
import Test exposing (Test, describe, skip, test)


tests : Test
tests =
    describe "Day 08"
        [ test "Part 1 Example" <| always <| Expect.equal 21 <| Day08.part1 example
        , test "Part 1" <| always <| Expect.equal 1782 <| Day08.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 8 <| Day08.part2 example
        , test "Part 2" <| always <| Expect.equal 474606 <| Day08.part2 input
        ]
