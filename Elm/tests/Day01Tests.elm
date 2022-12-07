module Day01Tests exposing (tests)

import Day01
import Day01Input exposing (example, input)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day 01"
        [ test "Part 1 Example" <| always <| Expect.equal 24000 <| Day01.part1 example
        , test "Part 1" <| always <| Expect.equal 72478 <| Day01.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 45000 <| Day01.part2 example
        , test "Part 2" <| always <| Expect.equal 210367 <| Day01.part2 input
        ]
