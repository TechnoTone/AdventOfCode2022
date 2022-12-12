module Day12Tests exposing (tests)

import Day12
import Day12Input exposing (..)
import Expect
import Test exposing (Test, describe, test)


tests : Test
tests =
    describe "Day Day12"
        [ test "Part 1 Example" <| always <| Expect.equal 31 <| Day12.part1 example
        , test "Part 1" <| always <| Expect.equal 504 <| Day12.part1 input
        , test "Part 2 Example" <| always <| Expect.equal 29 <| Day12.part2 example
        , test "Part 2" <| always <| Expect.equal 500 <| Day12.part2 input
        ]
