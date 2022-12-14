module Day[FTName]Tests exposing (tests)

import Day[FTName]
import Day[FTName]Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day [FTName]"
        [ test "Part 1 Example" <| always <| Expect.equal 0 <| Day[FTName].part1 example

        --, test "Part 1" <| always <| Expect.equal 0 <| Day[FTName].part1 input
        --, test "Part 2 Example" <| always <| Expect.equal 0 <| Day[FTName].part2 example
        --, test "Part 2" <| always <| Expect.equal 0 <| Day[FTName].part2 input
        ]
